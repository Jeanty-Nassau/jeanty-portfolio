const layers = [
  "Next.js / React",
  "Clerk",
  "tRPC + Zod",
  "Prisma",
  "PostgreSQL",
];

export function WeddingArchitecture() {
  return (
    <div className="border-y border-ink/15 py-10">
      <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.16em] text-ink/40">
        Application architecture
      </p>

      <div className="flex flex-wrap items-center gap-3">
        {layers.map((layer, index) => (
          <div
            key={layer}
            className="flex items-center gap-3"
          >
            <span className="border border-ink/15 px-4 py-3 font-mono text-[11px] uppercase tracking-[0.12em]">
              {layer}
            </span>

            {index < layers.length - 1 && (
              <span className="text-ink/30">
                →
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}