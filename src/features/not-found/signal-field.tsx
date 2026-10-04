"use client";

import {
  useEffect,
  useState,
} from "react";

const COLUMNS = 18;
const ROWS = 12;
const TOTAL = COLUMNS * ROWS;

const GLYPHS = [
  "0",
  "1",
  ".",
  ":",
  "/",
  "\\",
  "+",
  "-",
  "*",
];

/*
 * Important:
 *
 * This is deterministic.
 *
 * Server and browser will generate the exact same
 * initial character for every index.
 */
function getInitialGlyph(
  index: number,
) {
  return GLYPHS[
    index % GLYPHS.length
  ];
}

function randomGlyph() {
  return GLYPHS[
    Math.floor(
      Math.random() *
        GLYPHS.length,
    )
  ];
}

type CellState = {
  glyph: string;
  active: boolean;
};

function createInitialCells(): CellState[] {
  return Array.from(
    {
      length: TOTAL,
    },
    (_, index) => ({
      glyph:
        getInitialGlyph(index),

      /*
       * Keep the initial SSR state stable.
       *
       * Random activity begins only after hydration.
       */
      active: false,
    }),
  );
}

export function SignalField() {
  const [cells, setCells] =
    useState<CellState[]>(
      createInitialCells,
    );

  const [
    hoveredCell,
    setHoveredCell,
  ] = useState<{
    col: number;
    row: number;
  } | null>(null);

  /*
   * Randomness starts AFTER React hydrates.
   *
   * Math.random() is completely safe here.
   */
  useEffect(() => {
    const timeoutId =
      window.setTimeout(() => {
        /*
         * Immediately make the field look less
         * uniform after hydration.
         */
        setCells((previous) =>
          previous.map(
            (cell, index) => ({
              glyph:
                Math.random() >
                0.45
                  ? randomGlyph()
                  : cell.glyph,

              active:
                (index * 7) %
                  13 ===
                0,
            }),
          ),
        );
      }, 0);

    const interval =
      window.setInterval(() => {
        setCells(
          (previous) => {
            /*
             * First let previous flashes decay.
             */
            const next =
              previous.map(
                (cell) => ({
                  ...cell,
                  active:
                    Math.random() >
                    0.94,
                }),
              );

            /*
             * Random mutations give the grid
             * its noisy / corrupted signal feel.
             */
            const mutationCount =
              12;

            for (
              let i = 0;
              i <
              mutationCount;
              i++
            ) {
              const index =
                Math.floor(
                  Math.random() *
                    next.length,
                );

              next[index] = {
                glyph:
                  randomGlyph(),

                active: true,
              };
            }

            return next;
          },
        );
      }, 150);

    return () => {
      window.clearTimeout(timeoutId);
      window.clearInterval(interval);
    };
  }, []);

  return (
    <div
      className="
        group
        relative
        overflow-hidden
        border
        border-paper/15
        bg-ink/40
        p-4
        md:p-6
      "
      onMouseLeave={() =>
        setHoveredCell(null)
      }
    >
      <div className="mb-4 flex items-center justify-between border-b border-paper/10 pb-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-paper/40">
          Signal field / route
          anomaly
        </p>

        <div className="flex items-center gap-2">
          <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-paper/30">
            unstable
          </span>

          <span className="h-2 w-2 rounded-full bg-orange" />
        </div>
      </div>

      <div
        className="
          grid
          gap-x-2
          gap-y-1
          font-mono
          text-[11px]
          leading-none
          md:text-xs
        "
        style={{
          gridTemplateColumns:
            `repeat(${COLUMNS}, minmax(0, 1fr))`,
        }}
      >
        {cells.map(
          (cell, index) => {
            const row =
              Math.floor(
                index /
                  COLUMNS,
              );

            const col =
              index %
              COLUMNS;

            const hovered =
              hoveredCell !==
                null &&
              hoveredCell.col ===
                col &&
              hoveredCell.row ===
                row;

            const distance =
              hoveredCell
                ? Math.abs(
                    hoveredCell.col -
                      col,
                  ) +
                  Math.abs(
                    hoveredCell.row -
                      row,
                  )
                : Infinity;

            const isNear =
              distance <= 2;

            let className =
              "select-none transition-colors duration-150";

            if (hovered) {
              className +=
                " text-orange";
            } else if (
              isNear
            ) {
              className +=
                " text-paper";
            } else if (
              cell.active
            ) {
              className +=
                " text-paper/80";
            } else {
              className +=
                " text-paper/25";
            }

            return (
              <span
                key={index}
                className={
                  className
                }
                onMouseEnter={() =>
                  setHoveredCell({
                    col,
                    row,
                  })
                }
              >
                {cell.glyph}
              </span>
            );
          },
        )}
      </div>

      <div className="mt-6 flex items-end justify-between border-t border-paper/10 pt-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-paper/35">
            No matching route
            in current graph.
          </p>

          <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.15em] text-paper/20">
            ERR_ROUTE_NULL /
            0x404
          </p>
        </div>

        <div className="font-mono text-[9px] text-orange/70">
          404
        </div>
      </div>
    </div>
  );
}