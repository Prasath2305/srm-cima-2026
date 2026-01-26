'use client';

import Link from 'next/link';

type PricingTicketProps = {
  category: string;
  price: string;
  image: string;
  mode?: string;
  includes?: string[];
};

export default function PricingTicket({
  category,
  price,
  image,
  includes = [],
  mode = 'HYBRID MODE',
}: PricingTicketProps) {
  return (
    <div className="relative w-full sm:w-[320px] overflow-hidden rounded-[28px] bg-[#EFEFE8]">

      {/* TOP IMAGE */}
      <div
        className="relative h-[180px] bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="absolute inset-0 bg-black/25" />

        <div className="relative z-10 flex h-full items-end px-6 pb-5">
          <h3 className="text-xl font-semibold tracking-wide text-white">
            {category}
          </h3>
        </div>
      </div>

      {/* SIDE CUTS */}
      <div className="absolute left-[-18px] top-[220px] h-9 w-9 rounded-full bg-white" />
      <div className="absolute right-[-18px] top-[220px] h-9 w-9 rounded-full bg-white" />

      {/* CONTENT */}
      <div className="px-6 pt-8 pb-6">
        <p className="text-xs tracking-wide text-[#9C8F86]">
          Registration Fee
        </p>

        <p className="mt-1 text-2xl font-semibold text-[#1E2A2A]">
          {price}
        </p>

        {/* INCLUDES */}
        {includes.length > 0 && (
          <ul className="mt-4 space-y-1 text-sm text-[#4F5F5F]">
            {includes.map((item, index) => (
              <li key={index} className="flex gap-2">
                <span className="text-[#B2A59B]">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}

        {/* REGISTER BUTTON */}
        <Link
          href="/register"
          className="mt-6 flex w-full items-center justify-center rounded-full bg-[#1E2A2A] px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-[#607274]"
        >
          Register Now
        </Link>

        {/* DIVIDER */}
        <div className="my-6 border-t border-dashed border-[#DED0B6]" />

        {/* FOOTER */}
        <div className="flex justify-center">
          <span className="text-xl font-bold tracking-[0.4em] text-[#607274]">
            CIMA’26
          </span>
        </div>

        <p className="mt-4 text-center text-xs tracking-wide text-[#9C8F86]">
          {mode}
        </p>
      </div>
    </div>
  );
}
