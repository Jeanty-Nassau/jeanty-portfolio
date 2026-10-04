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
        "flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.16em]",
        dark ? "text-ink/55" : "text-paper/65",
      ].join(" ")}
    >
      <span className="font-bold text-orange">{number}</span>

      <span className="h-px w-6 bg-orange/80" />

      <span>{children}</span>
    </div>
  );
}
