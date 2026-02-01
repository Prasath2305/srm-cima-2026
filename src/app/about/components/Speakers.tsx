'use client';

export default function SpeakersSection() {
  return (
    <section className="w-full bg-[#EFEFE8] px-6 py-14">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-3 rounded-full bg-white px-4 py-2 text-xs font-medium tracking-wide text-[#1E2A2A]">
            <span className="h-2 w-2 rounded-full bg-[#CFFF9E]" />
            SPEAKERS
          </div>

          <h2 className="text-3xl md:text-5xl leading-[1.1] font-medium text-[#1E2A2A]">
            Distinguished speakers
            <br />
            shaping CIMA 2026.
          </h2>

          <p className="mt-6 text-sm leading-relaxed text-[#4B5B5B]">
            CIMA 2026 features eminent academicians, researchers, and industry
            experts delivering keynote addresses and invited talks across
            computational intelligence, artificial intelligence, and
            mathematical sciences.
          </p>
        </div>

        {/* Speaker Cards */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {/* Speaker Card */}
          <div className="group relative overflow-hidden rounded-[24px] bg-white p-6 transition-shadow duration-300 hover:shadow-xl">
            <div className="overflow-hidden rounded-[18px]">
              <img
                src="/images/speakers/speaker-1.jpg"
                alt="Chief Guest"
                className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
              />
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-medium text-[#1E2A2A]">
                Dr. Shamala Subramaniam
              </h3>
              <p className="mt-1 text-xs uppercase tracking-wide text-[#6A7A7A]">
                Chief Guest · Computer Science
              </p>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <span className="text-xs tracking-wide text-[#1E2A2A]">
                VIEW PROFILE
              </span>

              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#CFFF9E] text-[#1E2A2A] transition-transform duration-300 group-hover:translate-x-1">
                →
              </div>
            </div>
          </div>

          {/* Speaker Card */}
          <div className="group relative overflow-hidden rounded-[24px] bg-white p-6 transition-shadow duration-300 hover:shadow-xl">
            <div className="overflow-hidden rounded-[18px]">
              <img
                src="/images/speakers/speaker-2.jpg"
                alt="Keynote Speaker"
                className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
              />
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-medium text-[#1E2A2A]">
                Dr. Sayan Kumar Ray
              </h3>
              <p className="mt-1 text-xs uppercase tracking-wide text-[#6A7A7A]">
                Keynote Speaker · Malaysia
              </p>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <span className="text-xs tracking-wide text-[#1E2A2A]">
                VIEW PROFILE
              </span>

              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#CFFF9E] text-[#1E2A2A] transition-transform duration-300 group-hover:translate-x-1">
                →
              </div>
            </div>
          </div>

          {/* Speaker Card */}
          <div className="group relative overflow-hidden rounded-[24px] bg-white p-6 transition-shadow duration-300 hover:shadow-xl">
            <div className="overflow-hidden rounded-[18px]">
              <img
                src="/images/speakers/speaker-3.jpg"
                alt="Resource Person"
                className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
              />
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-medium text-[#1E2A2A]">
                Dr. T. Sathiyaraj
              </h3>
              <p className="mt-1 text-xs uppercase tracking-wide text-[#6A7A7A]">
                Resource Person · Mathematics
              </p>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <span className="text-xs tracking-wide text-[#1E2A2A]">
                VIEW PROFILE
              </span>

              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#CFFF9E] text-[#1E2A2A] transition-transform duration-300 group-hover:translate-x-1">
                →
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
