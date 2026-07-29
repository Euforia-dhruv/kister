"use client";

import { useState } from "react";

interface TimelineSegment {
  id: string;
  start: number; // scroll position 0-1
  end: number;
  enter: (progress: number) => void; // called as segment is entered
  update: (progress: number) => void; // called every frame while active
  leave: () => void;
}

class MasterTimelineEngine {
  private segments: TimelineSegment[] = [];
  private activeSegment: string | null = null;
  private scrollProgress: number = 0;
  private rafId: number | null = null;
  private callbacks: Set<(progress: number) => void> = new Set();

  addSegment(segment: TimelineSegment) {
    this.segments.push(segment);
    this.segments.sort((a, b) => a.start - b.start);
  }

  onProgress(callback: (progress: number) => void) {
    this.callbacks.add(callback);
    return () => this.callbacks.delete(callback);
  }

  update(scrollProgress: number) {
    this.scrollProgress = scrollProgress;

    // Find active segment
    const active = this.segments.find(
      (s) => scrollProgress >= s.start && scrollProgress < s.end
    );

    if (active && active.id !== this.activeSegment) {
      // Leave previous
      if (this.activeSegment) {
        const prev = this.segments.find((s) => s.id === this.activeSegment);
        prev?.leave();
      }
      // Enter new
      active.enter(0);
      this.activeSegment = active.id;
    }

    // Update active segment
    if (active) {
      const segmentProgress =
        (scrollProgress - active.start) / (active.end - active.start);
      active.update(Math.max(0, Math.min(1, segmentProgress)));
    }

    // Notify callbacks
    this.callbacks.forEach((cb) => cb(scrollProgress));
  }

  destroy() {
    this.segments.forEach((s) => s.leave());
    this.segments = [];
    this.callbacks.clear();
    if (this.rafId) cancelAnimationFrame(this.rafId);
  }
}

export type { TimelineSegment, MasterTimelineEngine };

export function useMasterTimeline() {
  const [engine] = useState(() => new MasterTimelineEngine());
  return engine;
}
