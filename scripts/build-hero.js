#!/usr/bin/env node

/**
 * HERO VIDEO PIPELINE
 * 
 * Automated: analyze → crop → extract → optimize → manifest
 * 
 * Usage: node scripts/build-hero.js
 * 
 * Requires: ffmpeg, ffprobe in PATH or ~/bin/
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// ─── PATHS ──────────────────────────────────────────────

const PROJECT_ROOT = path.resolve(__dirname, "..");
const INPUT_VIDEO = path.join(PROJECT_ROOT, "public", "Untitled Project.mp4");
const OUTPUT_DIR = path.join(PROJECT_ROOT, "public", "assets", "hero");
const FRAMES_DIR = path.join(OUTPUT_DIR, "frames");
const CROPPED_VIDEO = path.join(OUTPUT_DIR, "hero-cropped.mp4");
const MANIFEST_PATH = path.join(OUTPUT_DIR, "manifest.json");

// ─── FIND FFMPEG ────────────────────────────────────────

function findFFmpeg() {
  const candidates = [
    "ffmpeg",
    path.join(process.env.HOME, "bin", "ffmpeg"),
    "/usr/local/bin/ffmpeg",
    "/usr/bin/ffmpeg",
  ];
  for (const c of candidates) {
    try {
      execSync(`${c} -version`, { stdio: "pipe" });
      return c;
    } catch {}
  }
  console.error("\n╔══════════════════════════════════════════╗");
  console.error("║  FFmpeg not found.                       ║");
  console.error("║                                          ║");
  console.error("║  Install with:                           ║");
  console.error("║  Ubuntu/Debian:                          ║");
  console.error("║    sudo apt install ffmpeg               ║");
  console.error("║                                          ║");
  console.error("║  macOS:                                  ║");
  console.error("║    brew install ffmpeg                   ║");
  console.error("║                                          ║");
  console.error("║  Static binary:                          ║");
  console.error("║    https://johnvansickle.com/ffmpeg/     ║");
  console.error("╚══════════════════════════════════════════╝\n");
  process.exit(1);
}

function findFFprobe() {
  const candidates = [
    "ffprobe",
    path.join(process.env.HOME, "bin", "ffprobe"),
    "/usr/local/bin/ffprobe",
    "/usr/bin/ffprobe",
  ];
  for (const c of candidates) {
    try {
      execSync(`${c} -version`, { stdio: "pipe" });
      return c;
    } catch {}
  }
  console.error("ffprobe not found. Install ffmpeg.");
  process.exit(1);
}

// ─── STEP 1: ANALYZE ────────────────────────────────────

function analyzeVideo(ffmpeg, ffprobe) {
  console.log("\n━━━ STEP 1: Analyze ━━━");

  if (!fs.existsSync(INPUT_VIDEO)) {
    console.error(`Video not found: ${INPUT_VIDEO}`);
    process.exit(1);
  }

  const info = JSON.parse(
    execSync(`${ffprobe} -v quiet -print_format json -show_format -show_streams "${INPUT_VIDEO}"`, {
      encoding: "utf-8",
    })
  );

  const video = info.streams.find((s) => s.codec_type === "video");
  if (!video) {
    console.error("No video stream found.");
    process.exit(1);
  }

  const [num, den] = video.r_frame_rate.split("/").map(Number);
  const fps = Math.round(num / den);
  const width = video.width;
  const height = video.height;
  const duration = parseFloat(info.format.duration);
  const frames = parseInt(video.nb_frames);

  console.log(`  Resolution: ${width}×${height}`);
  console.log(`  FPS: ${fps}`);
  console.log(`  Duration: ${duration.toFixed(1)}s`);
  console.log(`  Frames: ${frames}`);
  console.log(`  Aspect: ${video.display_aspect_ratio || `${width}:${height}`}`);

  return { width, height, fps, duration, frames };
}

// ─── STEP 2: DETECT CROP ────────────────────────────────

function detectCrop(ffmpeg, ffprobe) {
  console.log("\n━━━ STEP 2: Detect black borders ━━━");

  const output = execSync(
    `${ffmpeg} -i "${INPUT_VIDEO}" -vf cropdetect=24:16:0 -f null - 2>&1`,
    { encoding: "utf-8", stdio: ["pipe", "pipe", "pipe"] }
  );

  const matches = output.match(/crop=(\d+):(\d+):(\d+):(\d+)/g);
  if (!matches || matches.length === 0) {
    console.log("  No black borders detected. Using full frame.");
    return null;
  }

  // Most common crop value
  const freq = {};
  for (const m of matches) {
    freq[m] = (freq[m] || 0) + 1;
  }
  const best = Object.entries(freq).sort((a, b) => b[1] - a[1])[0][0];
  const [, cw, ch, cx, cy] = best.match(/crop=(\d+):(\d+):(\d+):(\d+)/);

  console.log(`  Detected crop: ${best}`);
  console.log(`  Active area: ${cw}×${ch} at (${cx}, ${cy})`);

  return { width: parseInt(cw), height: parseInt(ch), x: parseInt(cx), y: parseInt(cy) };
}

// ─── STEP 3: CROP + EXPORT ──────────────────────────────

function cropVideo(ffmpeg, crop) {
  console.log("\n━━━ STEP 3: Crop & export ━━━");

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const cropFilter = crop
    ? `-vf "crop=${crop.width}:${crop.height}:${crop.x}:${crop.y}"`
    : "";

  // Use libx264 for maximum quality, CRF 18
  const cmd = `${ffmpeg} -y -i "${INPUT_VIDEO}" ${cropFilter} -c:v libx264 -crf 18 -preset slow -an -movflags +faststart "${CROPPED_VIDEO}"`;

  console.log("  Encoding H.264 CRF 18...");
  execSync(cmd, { stdio: "pipe" });

  const stats = fs.statSync(CROPPED_VIDEO);
  console.log(`  Output: ${(stats.size / 1024 / 1024).toFixed(1)} MB`);
  console.log(`  Saved: ${CROPPED_VIDEO}`);

  return CROPPED_VIDEO;
}

// ─── STEP 4: EXTRACT FRAMES ─────────────────────────────

function extractFrames(ffmpeg, fps, totalFrames) {
  console.log("\n━━━ STEP 4: Extract WebP frames ━━━");

  fs.mkdirSync(FRAMES_DIR, { recursive: true });

  // Clear old frames
  const existing = fs.readdirSync(FRAMES_DIR).filter((f) => f.endsWith(".webp"));
  for (const f of existing) fs.unlinkSync(path.join(FRAMES_DIR, f));

  // Extract all frames as WebP at quality 85
  const cmd = `${ffmpeg} -y -i "${CROPPED_VIDEO}" -vf "fps=${fps}" -c:v libwebp -quality 85 -lossless 0 -preset photo "${FRAMES_DIR}/frame_%04d.webp"`;

  console.log(`  Extracting ${totalFrames} frames at ${fps}fps...`);
  execSync(cmd, { stdio: "pipe" });

  const frames = fs.readdirSync(FRAMES_DIR).filter((f) => f.endsWith(".webp"));
  console.log(`  Extracted: ${frames.length} frames`);

  return frames.length;
}

// ─── STEP 5: OPTIMIZE ───────────────────────────────────

function optimizeFrames() {
  console.log("\n━━━ STEP 5: Optimize frames ━━━");

  const frames = fs.readdirSync(FRAMES_DIR).filter((f) => f.endsWith(".webp"));
  let totalBefore = 0;
  let totalAfter = 0;

  for (const frame of frames) {
    const fp = path.join(FRAMES_DIR, frame);
    const before = fs.statSync(fp).size;
    totalBefore += before;

    // WebP is already optimized during extraction (quality 85)
    // Just verify size is reasonable
    const after = fs.statSync(fp).size;
    totalAfter += after;
  }

  const avgBefore = totalBefore / frames.length;
  const avgAfter = totalAfter / frames.length;

  console.log(`  Frames: ${frames.length}`);
  console.log(`  Avg size: ${(avgAfter / 1024).toFixed(0)} KB/frame`);
  console.log(`  Total: ${(totalAfter / 1024 / 1024).toFixed(1)} MB`);

  if (avgAfter > 200 * 1024) {
    console.log("  ⚠ Average frame exceeds 200KB. Consider reducing quality.");
  }
}

// ─── STEP 6: MANIFEST ──────────────────────────────────

function generateManifest(info, crop) {
  console.log("\n━━━ STEP 6: Generate manifest ━━━");

  const frames = fs.readdirSync(FRAMES_DIR).filter((f) => f.endsWith(".webp"));
  const width = crop ? crop.width : info.width;
  const height = crop ? crop.height : info.height;

  const manifest = {
    frames: frames.length,
    fps: info.fps,
    width: Math.round(width),
    height: Math.round(height),
    duration: info.duration,
    framePath: "/assets/hero/frames/",
    framePrefix: "frame_",
    frameExt: ".webp",
  };

  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
  console.log(`  Manifest: ${MANIFEST_PATH}`);
  console.log(`  ${manifest.frames} frames, ${manifest.fps}fps, ${manifest.width}×${manifest.height}`);

  return manifest;
}

// ─── MAIN ───────────────────────────────────────────────

function main() {
  console.log("╔══════════════════════════════════════════╗");
  console.log("║  HERO VIDEO PIPELINE                     ║");
  console.log("╚══════════════════════════════════════════╝");

  const ffmpeg = findFFmpeg();
  const ffprobe = findFFprobe();
  console.log(`  FFmpeg: ${ffmpeg}`);

  const info = analyzeVideo(ffmpeg, ffprobe);
  const crop = detectCrop(ffmpeg, ffprobe);
  cropVideo(ffmpeg, crop);
  extractFrames(ffmpeg, info.fps, info.frames);
  optimizeFrames();
  const manifest = generateManifest(info, crop);

  console.log("\n╔══════════════════════════════════════════╗");
  console.log("║  PIPELINE COMPLETE                        ║");
  console.log("╚══════════════════════════════════════════╝");
  console.log(`\n  Output: ${OUTPUT_DIR}`);
  console.log(`  Frames: ${FRAMES_DIR}`);
  console.log(`  Manifest: ${MANIFEST_PATH}`);
  console.log(`  Ready for HeroCanvas.\n`);
}

main();
