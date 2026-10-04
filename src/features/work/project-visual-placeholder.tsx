type ProjectVisualPlaceholderProps = {
  label?: string;
};

export function ProjectVisualPlaceholder({
  label = "Project visual",
}: ProjectVisualPlaceholderProps) {
  return (
    <div className="flex aspect-[16/9] items-center justify-center bg-ink text-paper">
      <div className="text-center">
        <div className="mx-auto mb-6 h-2.5 w-2.5 rounded-full bg-orange" />

        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper/45">
          {label}
        </p>
      </div>
    </div>
  );
}