'use client';

export default function ConferenceEvents() {
  return (
    <section className="w-full bg-white px-6 py-24">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-16 max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-3 rounded-full bg-white px-4 py-2 text-xs font-medium tracking-wide text-[#1E2A2A]">
            <span className="h-2 w-2 rounded-full bg-[#CFFF9E]" />
            CONFERENCE EVENTS
          </div>

          <h2 className="text-3xl md:text-5xl leading-[1.1] font-medium text-[#1E2A2A]">
            CIMA 2026 is structured around
            <br />
            three complementary academic events.
          </h2>

          <p className="mt-6 text-sm leading-relaxed text-[#4B5B5B]">
            Each event format plays a distinct role in knowledge exchange and
            collaboration, together shaping a comprehensive and impactful
            conference experience.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Card 01 */}
          <div className="relative rounded-[24px] bg-[#CFFF9E] p-10 text-[#1E2A2A]">
            <div className="mb-16">
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                className="text-[#1E2A2A]"
              >
                <path
                  d="M12 2v20M5 5l14 14M19 5L5 19"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </div>

            <p className="mb-2 text-xs tracking-wide text-[#1E2A2A]">
              KEYNOTE
            </p>

            <h3 className="mb-3 text-xl font-medium">
              Keynote & Plenary Sessions
            </h3>

            <p className="text-sm leading-relaxed text-[#1E2A2A]">
              Distinguished speakers and chief guests present visionary talks
              highlighting emerging trends, breakthroughs, and future
              directions in computational intelligence and mathematical
              sciences.
            </p>
          </div>

          {/* Card 02 */}
          <div className="relative rounded-[24px] bg-[#1E2A2A] p-10 text-white">
            <div className="mb-16">
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                className="text-white"
              >
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
                <path
                  d="M12 7v10M7 12h10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </div>

            <p className="mb-2 text-xs tracking-wide text-white">
              TECHNICAL
            </p>

            <h3 className="mb-3 text-xl font-medium">
              Technical Paper Presentations
            </h3>

            <p className="text-sm leading-relaxed text-white">
              Researchers present peer-reviewed papers across multiple tracks,
              enabling in-depth discussion of theoretical advances, applied
              research, and interdisciplinary studies.
            </p>
          </div>

          {/* Card 03 */}
          <div className="relative rounded-[24px] bg-[#EFEFE8] p-10 text-[#1E2A2A]">
            <div className="mb-16">
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                className="text-[#1E2A2A]"
              >
                <path
                  d="M12 3l4 6h-8l4-6zM4 21h16"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </div>

            <p className="mb-2 text-xs tracking-wide text-[#6A7A7A]">
              INTERACTIVE
            </p>

            <h3 className="mb-3 text-xl font-medium">
              Workshops & Special Sessions
            </h3>

            <p className="text-sm leading-relaxed text-[#4B5B5B]">
              Focused sessions, invited talks, and interactive discussions
              designed to encourage collaboration between academia, industry,
              and emerging researchers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
