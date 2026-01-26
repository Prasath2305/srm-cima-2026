'use client';

import Button from '@/components/ui/Button';

export default function AboutConferenceSection() {
  return (
    <section className="w-full bg-[#EFEFE8] px-6 py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 md:grid-cols-2">
        {/* Image */}
        <div className="overflow-hidden rounded-[24px]">
          <img
            src="/images/conference-about.jpg"
            alt="Academic Conference Discussion"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Content */}
        <div>
          <div className="mb-6 inline-flex items-center gap-3 rounded-full bg-white px-4 py-2 text-xs font-medium tracking-wide text-[#1E2A2A]">
            <span className="h-2 w-2 rounded-full bg-[#CFFF9E]" />
            ABOUT THE CONFERENCE
          </div>

          <h2 className="max-w-xl text-3xl md:text-5xl leading-[1.1] font-medium text-[#1E2A2A]">
            Advancing research at the intersection of
            <br />
            Computational Intelligence and
            <br />
            Mathematical Applications.
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-8 text-sm leading-relaxed text-[#4B5B5B] text-justify">
            <p>
              The International Conference on Computational Intelligence and
              Mathematical Applications (CIMA 2026) is an academic forum that
              brings together researchers, academicians, practitioners, and
              industry experts from around the world. The conference aims to
              promote the exchange of ideas, research findings, and innovative
              solutions in the domains of computer science, artificial
              intelligence, and mathematical sciences.
            </p>

            <p>
              Hosted by SRM Institute of Science and Technology, CIMA 2026 focuses
              on addressing emerging challenges and opportunities through
              research papers, case studies, and industry presentations. The
              conference encourages interdisciplinary collaboration and
              knowledge sharing to advance intelligent systems and applied
              mathematical research.
            </p>
          </div>

          <div className="mt-14">
            <Button>View Conference Details</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
