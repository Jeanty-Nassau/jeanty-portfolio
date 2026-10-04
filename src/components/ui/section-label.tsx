type SectionLabelProps = {
  number: string;
  children: React.ReactNode;
  dark?: boolean;
};

export function SectionLabel({
  number,
  children,
  dark = false,
}: SectionLabelProps) {
  return (
    <div
      className={[
        "flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.16em]",
        dark ? "text-ink/50" : "text-paper/60",
      ].join(" ")}
    >
      <span>{number}</span>

      <span
        className={[
          "h-px w-6",
          dark ? "bg-ink/20" : "bg-paper/25",
        ].join(" ")}
      />

      <span>{children}</span>
    </div>
  );
}