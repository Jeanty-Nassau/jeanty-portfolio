"use client";

import { useEffect, useRef, useState } from "react";

type AsciiParticle = {
  x: number;
  y: number;

  targetX: number;
  targetY: number;

  vx: number;
  vy: number;

  char: string;

  baseAlpha: number;

  phase: number;
  delay: number;
};

const IMAGE_SRC = "/hero.png";

/*
 * Sparse -> dense.
 *
 * This works particularly well when drawing
 * light glyphs onto a dark / cobalt background.
 */
const ASCII_CHARS = "JEANTYNASSAU";

const DESKTOP_SIZE = 760;

function getSize(width: number) {
  if (width < 480) {
    return 300;
  }

  if (width < 768) {
    return 440;
  }

  if (width < 1200) {
    return 620;
  }

  return DESKTOP_SIZE;
}

function clamp(
  value: number,
  min: number,
  max: number,
) {
  return Math.min(
    max,
    Math.max(min, value),
  );
}

export function AsciiPortrait() {
  const canvasRef =
    useRef<HTMLCanvasElement>(null);

  const particlesRef =
    useRef<AsciiParticle[]>([]);

  const pointerRef = useRef({
    x: -1000,
    y: -1000,

    targetX: -1000,
    targetY: -1000,

    active: false,
  });

  const [size, setSize] =
    useState(DESKTOP_SIZE);

  /*
   * Responsive size.
   */
  useEffect(() => {
    const update = () => {
      setSize(
        getSize(
          window.innerWidth,
        ),
      );
    };

    update();

    window.addEventListener(
      "resize",
      update,
    );

    return () => {
      window.removeEventListener(
        "resize",
        update,
      );
    };
  }, []);

  /*
   * Build ASCII particles from the source PNG.
   */
  useEffect(() => {
    const image = new Image();

    image.src = IMAGE_SRC;

    image.onload = () => {
      const offscreen =
        document.createElement(
          "canvas",
        );

      const context =
        offscreen.getContext(
          "2d",
          {
            willReadFrequently: true,
          },
        );

      if (!context) {
        return;
      }

      offscreen.width = size;
      offscreen.height = size;

      context.clearRect(
        0,
        0,
        size,
        size,
      );

      /*
       * Preserve PNG proportions.
       *
       * The image itself should already be cropped
       * to roughly head + upper chest.
       */
      const maxWidth =
        size * 0.9;

      const maxHeight =
        size * 0.96;

      const scale =
        Math.min(
          maxWidth / image.width,
          maxHeight / image.height,
        );

      const drawWidth =
        image.width * scale;

      const drawHeight =
        image.height * scale;

      const drawX =
        (size - drawWidth) / 2;

      const drawY =
        (size - drawHeight) / 2;

      context.drawImage(
        image,
        drawX,
        drawY,
        drawWidth,
        drawHeight,
      );

      const imageData =
        context.getImageData(
          0,
          0,
          size,
          size,
        );

      const particles:
        AsciiParticle[] = [];

      /*
       * Moderate density.
       *
       * Too dense makes the portrait look
       * like white static.
       */
      const fontSize =
        size < 450
          ? 6
          : 7;

      const columnGap =
        fontSize * 0.72;

      const rowGap =
        fontSize * 1.05;

      /*
       * Average a 3x3 pixel neighborhood.
       *
       * This removes photographic noise and
       * makes facial structure clearer.
       */
      const samplePixel = (
        centerX: number,
        centerY: number,
      ) => {
        let red = 0;
        let green = 0;
        let blue = 0;
        let alpha = 0;

        let samples = 0;

        for (
          let offsetY = -1;
          offsetY <= 1;
          offsetY++
        ) {
          for (
            let offsetX = -1;
            offsetX <= 1;
            offsetX++
          ) {
            const x =
              centerX +
              offsetX;

            const y =
              centerY +
              offsetY;

            if (
              x < 0 ||
              y < 0 ||
              x >= size ||
              y >= size
            ) {
              continue;
            }

            const index =
              (y * size + x) *
              4;

            red +=
              imageData.data[
                index
              ];

            green +=
              imageData.data[
                index + 1
              ];

            blue +=
              imageData.data[
                index + 2
              ];

            alpha +=
              imageData.data[
                index + 3
              ];

            samples++;
          }
        }

        if (
          samples === 0
        ) {
          return null;
        }

        return {
          r: red / samples,
          g: green / samples,
          b: blue / samples,
          a: alpha / samples,
        };
      };

      for (
        let y = 0;
        y < size;
        y += rowGap
      ) {
        for (
          let x = 0;
          x < size;
          x += columnGap
        ) {
          const pixel =
            samplePixel(
              Math.floor(x),
              Math.floor(y),
            );

          if (!pixel) {
            continue;
          }

          /*
           * Transparent background produces nothing.
           */
          if (pixel.a < 100) {
            continue;
          }

          /*
           * Standard perceptual luminance.
           */
          let brightness =
            (0.299 * pixel.r +
              0.587 * pixel.g +
              0.114 * pixel.b) /
            255;

          /*
           * Lift midtones slightly.
           *
           * Face details tend to live here.
           */
          brightness =
            Math.pow(
              brightness,
              0.82,
            );

          /*
           * Increase useful contrast without
           * crushing everything into black / white.
           */
          brightness =
            clamp(
              (brightness -
                0.5) *
                1.15 +
                0.5,
              0,
              1,
            );

          /*
           * Key difference from our previous attempt:
           *
           * BRIGHTNESS directly chooses the glyph.
           *
           * Bright regions get visually denser characters.
           */
          const charIndex =
            Math.floor(
              brightness *
                (ASCII_CHARS.length -
                  1),
            );

          const char =
            ASCII_CHARS[
              charIndex
            ];

          if (
            !char ||
            char === " "
          ) {
            continue;
          }

          /*
           * Brightness also controls opacity.
           *
           * This gives us another channel for detail.
           */
          const baseAlpha =
            clamp(
              0.18 +
                brightness *
                  0.82,
              0.18,
              1,
            );

          const targetX =
            x;

          const targetY =
            y;

          particles.push({
            /*
             * Initial scatter is fairly subtle.
             */
            x:
              targetX +
              (Math.random() -
                0.5) *
                size *
                0.28,

            y:
              targetY +
              (Math.random() -
                0.5) *
                size *
                0.28,

            targetX,
            targetY,

            vx: 0,
            vy: 0,

            char,

            baseAlpha,

            phase:
              Math.random() *
              Math.PI *
              2,

            delay:
              Math.random() *
              0.3,
          });
        }
      }

      particlesRef.current =
        particles;
    };
  }, [size]);

  /*
   * Animate and interact.
   */
  useEffect(() => {
    const canvas =
      canvasRef.current;

    if (!canvas) {
      return;
    }

    const context =
      canvas.getContext("2d");

    if (!context) {
      return;
    }

    const dpr =
      Math.min(
        window.devicePixelRatio ||
          1,
        2,
      );

    canvas.width =
      size * dpr;

    canvas.height =
      size * dpr;

    context.setTransform(
      dpr,
      0,
      0,
      dpr,
      0,
      0,
    );

    const fontSize =
      size < 450
        ? 6
        : 7;

    let frame = 0;

    const startTime =
      performance.now();

    const render = (
      timestamp: number,
    ) => {
      context.clearRect(
        0,
        0,
        size,
        size,
      );

      context.font =
        `${fontSize}px var(--font-geist-mono), monospace`;

      context.textAlign =
        "center";

      context.textBaseline =
        "middle";

      const pointer =
        pointerRef.current;

      /*
       * Smooth pointer.
       */
      if (pointer.active) {
        pointer.x +=
          (pointer.targetX -
            pointer.x) *
          0.22;

        pointer.y +=
          (pointer.targetY -
            pointer.y) *
          0.22;
      }

      const elapsed =
        (timestamp -
          startTime) /
        1000;

      const time =
        timestamp *
        0.001;

      for (
        const particle
        of particlesRef.current
      ) {
        const localTime =
          elapsed -
          particle.delay;

        if (localTime < 0) {
          continue;
        }

        /*
         * Initial fade / formation.
         */
        const entrance =
          clamp(
            localTime /
              1.4,
            0,
            1,
          );

        const easedEntrance =
          1 -
          Math.pow(
            1 - entrance,
            3,
          );

        /*
         * Cursor repulsion.
         */
        let pointerDistance =
          Infinity;

        if (pointer.active) {
          const dx =
            particle.x -
            pointer.x;

          const dy =
            particle.y -
            pointer.y;

          pointerDistance =
            Math.sqrt(
              dx * dx +
              dy * dy,
            );

          const radius =
            size * 0.18;

          if (
            pointerDistance <
              radius &&
            pointerDistance > 0
          ) {
            const strength =
              1 -
              pointerDistance /
                radius;

            /*
             * Strong enough to be clearly visible.
             */
            const force =
              strength *
              strength *
              6;

            particle.vx +=
              (dx /
                pointerDistance) *
              force;

            particle.vy +=
              (dy /
                pointerDistance) *
              force;
          }
        }

        /*
         * Spring characters home.
         */
        particle.vx +=
          (particle.targetX -
            particle.x) *
          0.05;

        particle.vy +=
          (particle.targetY -
            particle.y) *
          0.05;

        /*
         * Barely-visible ambient movement.
         */
        particle.vx +=
          Math.sin(
            time * 0.7 +
              particle.phase,
          ) * 0.0015;

        particle.vy +=
          Math.cos(
            time * 0.65 +
              particle.phase,
          ) * 0.0015;

        particle.vx *= 0.89;
        particle.vy *= 0.89;

        particle.x +=
          particle.vx;

        particle.y +=
          particle.vy;

        /*
         * Small shimmer like Gazi's,
         * but much subtler.
         */
        const shimmer =
          Math.sin(
            time * 1.5 +
              particle.phase,
          ) *
          0.025;

        const alpha =
          clamp(
            particle.baseAlpha *
              easedEntrance +
              shimmer,
            0.05,
            1,
          );

        /*
         * Orange only near cursor.
         */
        const accent =
          pointer.active &&
          pointerDistance <
            size * 0.09;

        context.fillStyle =
          accent
            ? `rgba(255,77,0,${alpha})`
            : `rgba(247,247,242,${alpha})`;

        context.fillText(
          particle.char,
          particle.x,
          particle.y,
        );
      }

      frame =
        requestAnimationFrame(
          render,
        );
    };

    const updatePointer = (
      event: PointerEvent,
    ) => {
      const rect =
        canvas.getBoundingClientRect();

      /*
       * Convert CSS pixels to internal coordinates.
       */
      const scaleX =
        size /
        rect.width;

      const scaleY =
        size /
        rect.height;

      const x =
        (event.clientX -
          rect.left) *
        scaleX;

      const y =
        (event.clientY -
          rect.top) *
        scaleY;

      pointerRef.current.targetX =
        x;

      pointerRef.current.targetY =
        y;

      if (
        !pointerRef.current.active
      ) {
        pointerRef.current.x =
          x;

        pointerRef.current.y =
          y;
      }

      pointerRef.current.active =
        true;
    };

    const handlePointerLeave =
      () => {
        pointerRef.current.active =
          false;

        pointerRef.current.x =
          -1000;

        pointerRef.current.y =
          -1000;

        pointerRef.current.targetX =
          -1000;

        pointerRef.current.targetY =
          -1000;
      };

    canvas.addEventListener(
      "pointerenter",
      updatePointer,
    );

    canvas.addEventListener(
      "pointermove",
      updatePointer,
    );

    canvas.addEventListener(
      "pointerleave",
      handlePointerLeave,
    );

    frame =
      requestAnimationFrame(
        render,
      );

    return () => {
      cancelAnimationFrame(
        frame,
      );

      canvas.removeEventListener(
        "pointerenter",
        updatePointer,
      );

      canvas.removeEventListener(
        "pointermove",
        updatePointer,
      );

      canvas.removeEventListener(
        "pointerleave",
        handlePointerLeave,
      );
    };
  }, [size]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="
        block
        pointer-events-none
        md:pointer-events-auto
        md:cursor-crosshair
        md:touch-none
      "
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    />
  );
}