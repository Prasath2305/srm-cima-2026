'use client';

import DepartmentCard from '@/components/ui/DepartmentCard';

export default function Departments() {
  return (
    <section className="w-full bg-white px-6 py-28">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-14">
          <div className="mb-6 inline-flex items-center gap-3 rounded-full bg-white px-4 py-2 text-xs font-medium tracking-wide text-[#607274] shadow-sm">
            <span className="h-2 w-2 rounded-full bg-[#B2A59B]" />
            PARTICIPATING DEPARTMENTS
          </div>

          <h2 className="max-w-5xl text-5xl md:text-7xl leading-[1.05] font-medium text-[#607274]">
            Academic Disciplines
            <span className="block text-[#9C8F86]">
              Driving CIMA 2026
            </span>
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 md:flex md:gap-6 md:overflow-hidden">
          
          <DepartmentCard
            title="Computer Applications"
            description="Industry-oriented applied computing focused on real-world problem solving."
            image="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
            href="https://www.srmist.edu.in/department/department-of-computer-applications/"
            // focus={['Applied AI', 'Software Systems', 'Data Science']}
          />

          <DepartmentCard
            title="Computer Science"
            description="Advanced computational research shaping intelligent systems and next-generation technologies."
            image="https://images.unsplash.com/photo-1518770660439-4636190af475"
            href="https://www.srmist.edu.in/department/department-of-computer-science/"
            // focus={['Artificial Intelligence', 'Machine Learning', 'Cyber Security']}
          />


          <DepartmentCard
            title="Mathematics & Statistics"
            description="Mathematical foundations and statistical frameworks supporting computational intelligence."
            image="https://images.unsplash.com/photo-1509228468518-180dd4864904"
            href="https://www.srmist.edu.in/department/department-of-mathematics-and-statistics/"
            // focus={['Statistical Inference', 'Optimization', 'Mathematical Modeling']}
          />
        </div>
      </div>
    </section>
  );
}
