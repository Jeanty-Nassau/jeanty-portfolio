export default function Loading() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-cobalt text-paper">
      <div className="relative mx-auto flex min-h-screen w-full max-w-[1440px] flex-col px-6 py-8 md:px-10 lg:px-12">
        <div className="flex items-center justify-between border-b border-paper/20 pb-6">
          <p className="font-medium tracking-[-0.03em]">
            JEANTY NASSAU
          </p>

          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper/40">
            System / Loading
          </p>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xl">
            <div className="mb-8 flex items-center justify-between">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-orange">
                Reconstructing interface
              </p>

              <div className="h-2 w-2 animate-pulse rounded-full bg-orange" />
            </div>

            <div className="relative overflow-hidden border-y border-paper/15 py-10">
              <div className="loading-grid font-mono text-[11px] leading-6 text-paper/20">
                01001010 01000101 01000001 01001110
                <br />
                01010100 01011001 00100000 01001110
                <br />
                01000001 01010011 01010011 01000001
                <br />
                01010101 00100000 00101111 00100000
                <br />
                01001100 01001111 01000001 01000100
              </div>

              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2">
                <div className="relative h-[2px] overflow-hidden bg-paper/10">
                  <div className="loading-line absolute inset-y-0 left-0 w-1/3 bg-orange" />
                </div>
              </div>

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-cobalt via-transparent to-cobalt" />
            </div>

            <div className="mt-8 flex items-end justify-between">
              <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-paper/30">
                Awaiting route / resolving modules
              </p>

              <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-paper/30">
                0x01
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-paper/20 pt-6">
          <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-paper/30">
            Please stand by
          </p>
        </div>
      </div>
    </main>
  );
}