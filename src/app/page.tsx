"use client";

import ScrollScene from "@/components/engine/ScrollScene";
import ActProgress from "@/components/engine/ActProgress";
import ActDivider from "@/components/engine/ActDivider";
import ActSilence from "@/components/acts/ActSilence";
import ActAnatomy from "@/components/acts/ActAnatomy";
import ActManufacturing from "@/components/acts/ActManufacturing";
import ActMaterials from "@/components/acts/ActMaterials";
import ActIntelligence from "@/components/acts/ActIntelligence";
import ActBuildTimeline from "@/components/acts/ActBuildTimeline";
import ActBeforeAfter from "@/components/acts/ActBeforeAfter";
import ActFinalReveal from "@/components/acts/ActFinalReveal";

export default function Home() {
  return (
    <main className="relative bg-void">
      <ActProgress />

      <div data-act-index={0}>
        <ScrollScene height="200vh">
          {(progress) => <ActSilence progress={progress} />}
        </ScrollScene>
      </div>
      <ActDivider actNumber={2} />

      <div data-act-index={1}>
        <ScrollScene height="300vh">
          {(progress) => <ActAnatomy progress={progress} />}
        </ScrollScene>
      </div>
      <ActDivider actNumber={3} />

      <div data-act-index={2}>
        <ScrollScene height="300vh">
          {(progress) => <ActManufacturing progress={progress} />}
        </ScrollScene>
      </div>
      <ActDivider actNumber={4} />

      <div data-act-index={3}>
        <ScrollScene height="250vh">
          {(progress) => <ActMaterials progress={progress} />}
        </ScrollScene>
      </div>
      <ActDivider actNumber={5} />

      <div data-act-index={4}>
        <ScrollScene height="250vh">
          {(progress) => <ActIntelligence progress={progress} />}
        </ScrollScene>
      </div>
      <ActDivider actNumber={6} />

      <div data-act-index={5}>
        <ScrollScene height="250vh">
          {(progress) => <ActBuildTimeline progress={progress} />}
        </ScrollScene>
      </div>
      <ActDivider actNumber={7} />

      <div data-act-index={6}>
        <ScrollScene height="300vh">
          {(progress) => <ActBeforeAfter progress={progress} />}
        </ScrollScene>
      </div>
      <ActDivider actNumber={8} />

      <div data-act-index={7}>
        <ScrollScene height="350vh">
          {(progress) => <ActFinalReveal progress={progress} />}
        </ScrollScene>
      </div>
    </main>
  );
}
