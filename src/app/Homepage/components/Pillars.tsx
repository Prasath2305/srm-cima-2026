'use client';

export default function Pillars() {
  return (
    <section className="w-full px-6 py-24 bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 overflow-hidden rounded-[28px] md:grid-cols-3 ">
        {/* Card 01 */}
        <div className="relative bg-[#CFFF9E] p-12">
          <span className="absolute right-10 top-8 text-sm font-medium text-[#1E2A2A]">
            01.
          </span>

          <div className="mb-24">
            <svg
              width="64"
              height="64"
              viewBox="0 0 64 64"
              fill="none"
              className="text-[#1E2A2A]"
            >
              <circle cx="32" cy="32" r="4" fill="currentColor" />
              {[...Array(24)].map((_, i) => (
                <line
                  key={i}
                  x1="32"
                  y1="2"
                  x2="32"
                  y2="14"
                  stroke="currentColor"
                  strokeWidth="1"
                  transform={`rotate(${i * 15} 32 32)`}
                />
              ))}
            </svg>
          </div>

          <h3 className="mb-4 text-2xl font-medium text-[#1E2A2A]">
            Computational Intelligence
          </h3>

          <p className="max-w-sm text-sm leading-relaxed text-[#1E2A2A]">
            Leveraging intelligent algorithms and adaptive systems to model,
            analyze, and solve complex computational problems with precision.
          </p>
        </div>

        {/* Card 02 */}
        <div className="relative bg-[#1E2A2A] p-12">
          <span className="absolute right-10 top-8 text-sm font-medium text-[#E8ECE6]">
            02.
          </span>

          <div className="mb-24">
            <svg
              width="72"
              height="72"
              viewBox="0 0 72 72"
              fill="none"
              className="text-[#E8ECE6]"
            >
              {[...Array(6)].map((_, i) => (
                <polygon
                  key={i}
                  points="36,6 60,18 60,46 36,58 12,46 12,18"
                  stroke="currentColor"
                  strokeWidth="1"
                  fill="none"
                  transform={`scale(${1 - i * 0.08}) translate(${i * 3} ${i * 3})`}
                />
              ))}
            </svg>
          </div>

          <h3 className="mb-4 text-2xl font-medium text-white">
            Mathematical Applications
          </h3>

          <p className="max-w-sm text-sm leading-relaxed text-[#D6DBD6]">
            Applying mathematical modeling, statistical inference, and analytical
            frameworks to advance scientific and engineering research.
          </p>
        </div>

        {/* Card 03 */}
        <div className="relative bg-[#EFEFE8] p-12">
          <span className="absolute right-10 top-8 text-sm font-medium text-[#1E2A2A]">
            03.
          </span>

          <div className="mb-24">
            <svg
              width="72"
              height="72"
              viewBox="0 0 72 72"
              fill="none"
              className="text-[#1E2A2A]"
            >
              <g stroke="currentColor" strokeWidth="1">
                <polygon points="36,8 64,24 36,40 8,24" fill="none" />
                <polygon points="36,32 64,48 36,64 8,48" fill="none" />
                <line x1="8" y1="24" x2="8" y2="48" />
                <line x1="64" y1="24" x2="64" y2="48" />
                <line x1="36" y1="40" x2="36" y2="64" />
              </g>
            </svg>
          </div>

          <h3 className="mb-4 text-2xl font-medium text-[#1E2A2A]">
            Artificial Intelligence
          </h3>

          <p className="max-w-sm text-sm leading-relaxed text-[#4F5F5F]">
            Advancing AI-driven systems through data-centric models, learning
            algorithms, and intelligent decision-making frameworks.
          </p>
        </div>
      </div>
    </section>
  );
}
