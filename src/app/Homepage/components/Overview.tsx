'use client';

import Button from '@/components/ui/Button';
import { useRouter } from 'next/navigation';


export default function Overview() {
  const router = useRouter();

  const handleAbout = async () => {
    router.push('/about');
  };

  return (
    <section className="relative w-full bg-white px-10 md:px-24 py-24">
      <div className="mx-auto">
        <div className="mb-8 inline-flex items-center gap-3 rounded-full bg-white px-4 py-2 text-xs font-medium tracking-wide text-[#607274] shadow-sm">
          <span className="h-2 w-2 rounded-full bg-[#B2A59B]" />
          ABOUT THE CONFERENCE
        </div>

        <h2 className=" text-5xl md:text-7xl leading-[1.05] font-medium text-[#607274]">
          International Conference on
          <span className="block text-4xl md:text-6xl text-[#9C8F86]">
            Computational Intelligence and Mathematical Applications
          </span>
        </h2>

        <p className="mt-10 text-sm md:text-3xl leading-relaxed text-[#5F6F73] text-justify">
          CIMA 2026 is an international forum designed to bring together
          researchers, academicians, practitioners, and industry experts from
          across the globe. The conference focuses on advancing research and
          fostering collaboration in the domains of computational intelligence,
          artificial intelligence, and mathematical applications.
        </p>

        <p className="mt-4 text-sm md:text-3xl leading-relaxed text-[#5F6F73] text-justify">
          Hosted by SRM Institute of Science and Technology, CIMA 2026 provides a
          multidisciplinary platform for presenting high-quality research,
          discussing emerging challenges, and exploring innovative solutions
          that bridge theory and real-world applications.
        </p>

        {/* <div className="mt-14">
          <Button onClick={handleAbout}>View Conference Details</Button>
        </div> */}
      </div>
    </section>
  );
}
