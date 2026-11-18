import { Composition, Folder } from "remotion";
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
