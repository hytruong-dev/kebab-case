import React from "react";
import { Composition, Folder } from "remotion";
import { BrainEpisode, type BrainEpisodeProps, brainEpisodeDuration } from "./brain/BrainEpisode";
import { BrainShort, type BrainShortProps, brainShortDuration } from "./brain/BrainShort";
import { FPS as BRAIN_FPS } from "./brain/kit";
import { EffectsGallery, galleryHeight } from "./gallery/EffectsGallery";
import { TransitionsGallery, transitionsGalleryDuration } from "./gallery/TransitionsGallery";
import { PaperConfetti } from "./paper/PaperConfetti";
import { PaperLandscape, type PaperLandscapeProps } from "./paper/PaperLandscape";

const FPS = 30;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Brain & Psychology channel — the standard episode template (see .agents/skills/learned/brain-explainer-episode). */}
      <Folder name="BrainChannel">
        {/* props = projects/<slug>/audio/timeline.json + asset list, built by projects/<slug>/scripts/render.mjs. */}
        <Composition
          id="BrainEpisode"
          component={BrainEpisode}
          durationInFrames={BRAIN_FPS * 10}
          fps={BRAIN_FPS}
          width={1920}
          height={1080}
          defaultProps={{ items: [], total: 10, tail: 1.5, withAudio: false } satisfies BrainEpisodeProps}
          calculateMetadata={({ props }) => ({ durationInFrames: brainEpisodeDuration(props) })}
        />
        <Composition
          id="BrainShort"
          component={BrainShort}
          durationInFrames={BRAIN_FPS * 35}
          fps={BRAIN_FPS}
          width={1080}
          height={1920}
          defaultProps={{ items: [], total: 35, tail: 0.45, withAudio: false, ep: "ep01", audioDir: "short01" } satisfies BrainShortProps}
          calculateMetadata={({ props }) => ({ durationInFrames: brainShortDuration(props) })}
        />
      </Folder>

      {/* Paper-cut plates handed to HyperFrames (scripts/build-plates.mjs). */}
      <Folder name="Plates">
        <Composition
          id="PaperLandscape"
          component={PaperLandscape}
          durationInFrames={150}
          fps={FPS}
          width={1920}
          height={1080}
          defaultProps={{ title: "Ngày mới", subtitle: "a paper-cut morning", variant: "day" } satisfies PaperLandscapeProps}
        />
        <Composition
          id="PaperLandscapeDusk"
          component={PaperLandscape}
          durationInFrames={150}
          fps={FPS}
          width={1920}
          height={1080}
          defaultProps={{ title: "Hoàng hôn", subtitle: "the same world, re-lit", variant: "dusk" } satisfies PaperLandscapeProps}
        />
        <Composition id="PaperConfetti" component={PaperConfetti} durationInFrames={75} fps={FPS} width={1920} height={1080} />
      </Folder>

      <Folder name="Galleries">
        <Composition id="EffectsGallery" component={EffectsGallery} durationInFrames={120} fps={FPS} width={1920} height={galleryHeight()} />
        <Composition id="TransitionsGallery" component={TransitionsGallery} durationInFrames={transitionsGalleryDuration()} fps={FPS} width={1920} height={1080} />
      </Folder>
    </>
  );
};
