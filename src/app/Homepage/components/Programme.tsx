'use client';

export default function Programme() {
  return (
    <section className="relative w-full bg-[#EFEFE8] px-6 py-28">
      <div className="mx-auto max-w-7xl">
        {/* Tag */}
        <div className="mb-10 inline-flex items-center gap-3 rounded-full bg-white px-4 py-2 text-xs font-medium tracking-wide text-[#607274] shadow-sm">
          <span className="h-2 w-2 rounded-full bg-[#B2A59B]" />
          CONFERENCE PROGRAMME
        </div>

        {/* Heading */}
        <h2 className="max-w-5xl text-5xl md:text-7xl leading-[1.05] font-medium text-[#607274]">
          Two Days of
          <span className="block text-[#9C8F86]">
            Research, Innovation & Exchange
          </span>
        </h2>

        {/* Cards */}
        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2">
          {[
            {
              day: 'DAY 01 · 12 MARCH 2026',
              title: 'Inaugural & Vision Sessions',
              text:
                'The conference opens with the inaugural ceremony, keynote addresses, and plenary sessions. Parallel technical sessions begin across Computer Science, Computer Applications, and Mathematics & Statistics, featuring peer-reviewed research presentations.',
              img: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df',
            },
            {
              day: 'DAY 02 · 13 MARCH 2026',
              title: 'Technical Depth & Research Exchange',
              text:
                'Advanced technical sessions continue with invited national and international experts. Research presentations across all tracks are followed by panel discussions, the valedictory function, and certificate distribution.',
              img: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655',
            },
          ].map((card, i) => (
            <div
              key={i}
              className="relative h-[420px] overflow-hidden rounded-[28px]"
            >
              {/* Image */}
              <img
                src={card.img}
                alt={card.title}
                className="absolute inset-0 h-full w-full object-cover"
              />

              {/* Soft Blur Blend */}
              <div className="absolute inset-0">
                <div className="absolute bottom-0 h-2/3 w-full bg-gradient-to-t from-[#1E2A2A]/70 via-[#1E2A2A]/35 to-transparent" />
                <div className="absolute bottom-0 h-1/2 w-full backdrop-blur-md mask-gradient" />
              </div>

              {/* Content */}
              <div className="relative z-10 flex h-full flex-col justify-end p-10">
                <p className="mb-2 text-xs tracking-wide text-[#CFFF9E]">
                  {card.day}
                </p>
                <h3 className="mb-3 text-2xl font-medium text-white">
                  {card.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#E8ECE6] text-justify">
                  {card.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gradient Mask */}
      <style jsx>{`
        .mask-gradient {
          mask-image: linear-gradient(
            to top,
            rgba(0, 0, 0, 1) 0%,
            rgba(0, 0, 0, 0.7) 40%,
            rgba(0, 0, 0, 0.3) 70%,
            rgba(0, 0, 0, 0) 100%
          );
          -webkit-mask-image: linear-gradient(
            to top,
            rgba(0, 0, 0, 1) 0%,
            rgba(0, 0, 0, 0.7) 40%,
            rgba(0, 0, 0, 0.3) 70%,
            rgba(0, 0, 0, 0) 100%
          );
        }
      `}</style>
    </section>
  );
}
