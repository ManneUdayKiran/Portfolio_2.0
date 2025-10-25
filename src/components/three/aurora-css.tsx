"use client";

export default function AuroraCSS() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Aurora Layer 1 - Main flow */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute w-[200%] h-[200%] -top-1/2 -left-1/2 animate-aurora-flow"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 20% 40%, rgba(120, 119, 198, 0.8) 0%, transparent 50%),
              radial-gradient(ellipse 60% 40% at 80% 60%, rgba(139, 92, 246, 0.6) 0%, transparent 50%),
              radial-gradient(ellipse 100% 30% at 40% 20%, rgba(59, 130, 246, 0.4) 0%, transparent 50%)
            `,
          }}
        />
      </div>

      {/* Aurora Layer 2 - Secondary flow */}
      <div className="absolute inset-0 opacity-25">
        <div
          className="absolute w-[180%] h-[180%] -top-1/4 -left-1/4 animate-aurora-flow-reverse"
          style={{
            background: `
              radial-gradient(ellipse 70% 35% at 60% 70%, rgba(168, 85, 247, 0.7) 0%, transparent 50%),
              radial-gradient(ellipse 90% 45% at 30% 30%, rgba(59, 130, 246, 0.5) 0%, transparent 50%),
              radial-gradient(ellipse 50% 60% at 90% 50%, rgba(236, 72, 153, 0.4) 0%, transparent 50%)
            `,
          }}
        />
      </div>

      {/* Aurora Layer 3 - Accent lights */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute w-[150%] h-[150%] -top-1/3 -left-1/3 animate-aurora-pulse"
          style={{
            background: `
              radial-gradient(ellipse 40% 80% at 70% 20%, rgba(16, 185, 129, 0.6) 0%, transparent 50%),
              radial-gradient(ellipse 60% 30% at 20% 80%, rgba(139, 92, 246, 0.8) 0%, transparent 50%),
              radial-gradient(ellipse 80% 40% at 90% 90%, rgba(59, 130, 246, 0.4) 0%, transparent 50%)
            `,
          }}
        />
      </div>

      {/* Aurora Layer 4 - Subtle movement */}
      <div className="absolute inset-0 opacity-15">
        <div
          className="absolute w-[220%] h-[120%] -top-1/4 -left-1/2 animate-aurora-drift"
          style={{
            background: `
              radial-gradient(ellipse 90% 20% at 10% 60%, rgba(236, 72, 153, 0.9) 0%, transparent 50%),
              radial-gradient(ellipse 70% 50% at 50% 10%, rgba(59, 130, 246, 0.6) 0%, transparent 50%),
              radial-gradient(ellipse 40% 70% at 90% 80%, rgba(168, 85, 247, 0.7) 0%, transparent 50%)
            `,
          }}
        />
      </div>

      {/* Shimmering overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-400/10 to-transparent animate-shimmer" />
      </div>
    </div>
  );
}
