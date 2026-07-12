export function AmbientBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div
        className="absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full opacity-[0.06] blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, var(--foreground) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute top-1/3 right-0 h-[400px] w-[500px] translate-x-1/3 rounded-full opacity-[0.04] blur-[100px]"
        style={{
          background:
            "radial-gradient(circle, var(--foreground) 0%, transparent 70%)",
        }}
      />
      <div className="noise-overlay absolute inset-0 opacity-[0.025] mix-blend-overlay" />
    </div>
  );
}
