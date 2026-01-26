'use client';

import Link from 'next/link';

export default function DepartmentCard({
  title,
  description,
  image,
  href,
  tag = 'DEPARTMENT',
  focus = [],
}: {
  title: string;
  description: string;
  image: string;
  href: string;
  tag?: string;
  focus?: string[];
}) {
  return (
    <div className="group relative h-[460px] w-full overflow-hidden rounded-[28px] bg-gray-200">

      <img
        src={image}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-black/25" />

      {/* Top Pills */}
      <div className="absolute left-6 top-6 flex gap-2">
        <span className="rounded-full bg-white/90 px-4 py-1 text-xs font-medium text-[#1E2A2A]">
          Academic
        </span>
        <span className="rounded-full bg-white/90 px-4 py-1 text-xs font-medium text-[#1E2A2A]">
          {tag}
        </span>
      </div>

      {/* Bottom Content */}
      <div className="absolute bottom-0 left-0 right-0 p-8">
        <h3 className="text-2xl font-medium text-white">
          {title}
        </h3>

        <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/90">
          {description}
        </p>

        {/* Focus Areas */}
        {focus.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {focus.map((item, idx) => (
              <li
                key={idx}
                className="rounded-full bg-white/20 px-3 py-1 text-xs text-white"
              >
                {item}
              </li>
            ))}
          </ul>
        )}

        <Link
          href={href}
          className="mt-6 inline-flex items-center gap-3 rounded-full bg-white px-5 py-2 text-sm font-medium text-[#1E2A2A] transition-all duration-300 hover:gap-5"
        >
          View Department <span className="text-lg">→</span>
        </Link>
      </div>
    </div>
  );
}
