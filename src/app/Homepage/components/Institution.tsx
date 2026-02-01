'use client';

export default function Institution() {
  return (
    <section className="relative w-full bg-[#EFEFE8] py-12">
      
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://campuspro.co.in/collage-image/1748856026_row_14.jpg')",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-[#EFEFE8]/90 backdrop-blur-[1px]" />

      {/* Content */}
      <div className="relative z-10 px-6">
        <div className="mx-auto max-w-7xl">

          {/* Section Tag */}
          <div className="mb-10 inline-flex items-center gap-3 rounded-full bg-white px-4 py-2 text-xs font-medium tracking-wide text-[#607274] shadow-sm">
            <span className="h-2 w-2 rounded-full bg-[#B2A59B]" />
            HOST INSTITUTION
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 gap-20 md:grid-cols-2">

            {/* LEFT CONTENT */}
            <div>
              <h2 className="text-5xl md:text-7xl leading-[1.05] font-medium text-[#607274]">
                SRM Institute of Science
                <span className="block text-[#9C8F86]">
                  and Technology
                </span>
              </h2>

              <div className="mt-12 space-y-4">
                <p className="text-sm md:text-2xl leading-relaxed text-[#4F5F5F] text-justify">
                  SRM Institute of Science and Technology (SRM IST), formerly
                  known as SRM University, is one of India’s top-ranking
                  universities with a vibrant academic community of over 20,000
                  students and more than 2,600 faculty members across its
                  campuses.
                </p>

                <p className="text-sm md:text-2xl leading-relaxed text-[#4F5F5F] text-justify">
                  The university offers a wide range of undergraduate,
                  postgraduate, and doctoral programmes across Engineering,
                  Management, Medicine, Health Sciences, Science, and
                  Humanities. Its research ecosystem includes more than 224
                  government-funded projects with an outlay exceeding INR 115
                  Crores.
                </p>
              </div>
            </div>

            {/* RIGHT CONTENT */}
            <div className="flex flex-col justify-end">
              <h3 className="text-4xl md:text-5xl leading-[1.1] font-medium text-[#607274]">
                Faculty of Science
                <span className="block text-[#9C8F86]">
                  and Humanities
                </span>
              </h3>

              <div className="mt-8 space-y-4">
                <p className="text-sm md:text-2xl leading-relaxed text-[#4F5F5F] text-justify">
                  Established in 2003, the Faculty of Science and Humanities
                  (FSH) at SRMIST, Kattankulathur, has grown into a vibrant
                  academic ecosystem with 24 departments, over 7,500 students,
                  250+ faculty members, and 180 research scholars.
                </p>

                <p className="text-sm md:text-2xl leading-relaxed text-[#4F5F5F] text-justify">
                  The faculty remains deeply committed to addressing global
                  challenges through interdisciplinary education, research,
                  and distinctive academic programmes that foster innovation,
                  intellectual growth, and societal impact.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
