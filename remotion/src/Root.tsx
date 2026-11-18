import { Composition, Folder } from "remotion";
import { EileanChapter, type EileanChapterProps } from "./eilean/EileanChapter";
import { FPS as EILEAN_FPS } from "./eilean/kit";
import { EffectsGallery, galleryHeight } from "./gallery/EffectsGallery";
import { TransitionsGallery, transitionsGalleryDuration } from "./gallery/TransitionsGallery";
import { PaperConfetti } from "./paper/PaperConfetti";
import { PaperLandscape, type PaperLandscapeProps } from "./paper/PaperLandscape";

const FPS = 30;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Plates rendered here and handed to HyperFrames (see scripts/build-plates.mjs). */}
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
        {/* Transparent: render as alpha WebM so HyperFrames can layer it. */}
        <Composition id="PaperConfetti" component={PaperConfetti} durationInFrames={75} fps={FPS} width={1920} height={1080} />
      </Folder>

      {/* Eilean Mòr: one plate per chapter; props (shot timing) come from scripts/build-eilean.mjs --props. */}
      <Folder name="EileanMor">
        <Composition
          id="EileanChapter"
          component={EileanChapter}
          durationInFrames={EILEAN_FPS * 10}
          fps={EILEAN_FPS}
          width={1920}
          height={1080}
          defaultProps={{ shots: [{ shot: "title-card", start: 0, dur: 5 }, { shot: "storm-sea", start: 5, dur: 5 }], total: 10 } satisfies EileanChapterProps}
          calculateMetadata={({ props }) => ({ durationInFrames: Math.max(1, Math.round(props.total * EILEAN_FPS)) })}
        />
      </Folder>

      <Folder name="Galleries">
        <Composition
          id="EffectsGallery"
          component={EffectsGallery}
          durationInFrames={120}
          fps={FPS}
          width={1920}
          height={galleryHeight()}
        />
        <Composition
          id="TransitionsGallery"
          component={TransitionsGallery}
          durationInFrames={transitionsGalleryDuration()}
          fps={FPS}
          width={1920}
          height={1080}
        />
      </Folder>
    </>
  );
};
