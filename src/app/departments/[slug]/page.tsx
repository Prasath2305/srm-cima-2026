type Department = {
  title: string;
  image: string;
  about: string;
  ug?: string[];
  pg?: string[];
  other?: string[];
};

const departments: Record<string, Department> = {
  'computer-applications': {
    title: 'Department of Computer Applications',
    image:
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d',
    about:
      'The Department of Computer Applications, College of Sciences, Faculty of Science and Humanities at SRM Institute of Science and Technology has been a paradigm of academic excellence since its inception in 2006. The department is known for its modern curriculum, industry-aligned syllabus, and strong academic outcomes across undergraduate and postgraduate programmes.',
    ug: [
      'BCA',
      'BCA Generative Artificial Intelligence',
      'BCA Data Science',
    ],
    pg: [
      'MCA',
      'M.Sc. Applied Data Science',
      'MCA Generative Artificial Intelligence',
    ],
  },

  'computer-science': {
    title: 'Department of Computer Science',
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475',
    about:
      'The Department of Computer Science, Faculty of Science and Humanities, SRMIST is committed to developing a holistic learning environment that blends strong theoretical foundations with modern computational practices. The curriculum encourages active, continuous learning supported by internships, co-operative programmes, and research-oriented training.',
    ug: [
      'B.Sc. Computer Science',
      'B.Sc. Computer Science (Cyber Security)',
      'B.Sc. Computer Science (Artificial Intelligence & Machine Learning)',
      'BS Agentic Artificial Intelligence',
      'BS Big Data Analytics',
    ],
    pg: [
      'M.Sc. Computer Science',
      'M.Sc. Information Technology',
      'M.Sc. Full Stack Development',
      'MS Agentic Artificial Intelligence & Machine Learning',
      'MS Data Science',
    ],
  },

  'mathematics-statistics': {
    title: 'Department of Mathematics & Statistics',
    image:
      'https://images.unsplash.com/photo-1509228468518-180dd4864904',
    about:
      'Established in 2005, the Department of Mathematics and Statistics focuses on pure, applied, and applicable mathematics. The department caters to students from diverse academic backgrounds and plays a vital role in building strong analytical and quantitative foundations essential for interdisciplinary research and professional growth.',
    other: [
      'B.Sc. Statistics',
      'BS Statistics (Honours)',
      'Ph.D. Programme',
      'Value-added Mathematics & Statistics courses',
    ],
  },
};

export default async function DepartmentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const department = departments[slug];

  if (!department) {
    return (
      <section className="px-6 py-24 max-w-5xl mx-auto">
        <h1 className="text-2xl">Department not found</h1>
      </section>
    );
  }

  return (
    <main className="w-full bg-white">
      {/* HERO */}
      <section className="relative h-[60vh] w-full">
        <img
          src={department.image}
          alt={department.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 flex h-full items-end px-6 pb-16">
          <h1 className="max-w-4xl text-4xl md:text-6xl font-medium text-white">
            {department.title}
          </h1>
        </div>
      </section>

      {/* CONTENT */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm leading-relaxed text-[#4F5F5F]">
            {department.about}
          </p>

          {/* UG */}
          {department.ug && (
            <>
              <h2 className="mt-14 text-xl font-medium text-[#1E2A2A]">
                Undergraduate Programmes
              </h2>
              <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {department.ug.map((item, i) => (
                  <li
                    key={i}
                    className="rounded-lg border border-[#ECEDE6] px-4 py-3 text-sm text-[#4F5F5F]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* PG */}
          {department.pg && (
            <>
              <h2 className="mt-14 text-xl font-medium text-[#1E2A2A]">
                Postgraduate Programmes
              </h2>
              <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {department.pg.map((item, i) => (
                  <li
                    key={i}
                    className="rounded-lg border border-[#ECEDE6] px-4 py-3 text-sm text-[#4F5F5F]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* OTHER */}
          {department.other && (
            <>
              <h2 className="mt-14 text-xl font-medium text-[#1E2A2A]">
                Programmes Offered
              </h2>
              <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {department.other.map((item, i) => (
                  <li
                    key={i}
                    className="rounded-lg border border-[#ECEDE6] px-4 py-3 text-sm text-[#4F5F5F]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
