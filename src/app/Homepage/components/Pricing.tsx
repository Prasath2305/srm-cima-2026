'use client';

import PricingTicket from '@/components/ui/PricingTicket';

export default function Pricing() {
  return (
    <section className="w-full bg-white px-6 py-10">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-16">
          <div className="mb-6 inline-flex items-center gap-3 rounded-full bg-[#EFEFE8] px-4 py-2 text-xs font-medium tracking-wide text-[#607274] shadow-sm">
            <span className="h-2 w-2 rounded-full bg-[#B2A59B]" />
            REGISTRATION FEES
          </div>

          <h2 className="max-w-5xl text-5xl md:text-7xl leading-[1.05] font-medium text-[#607274]">
            Participation
            <span className="block text-[#9C8F86]">
              Categories & Fees
            </span>
          </h2>
        </div>

        {/* Tickets */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <PricingTicket
            category="UG / PG Students"
            price="₹200"
            image="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b"
            includes={[
              'Conference Access',
              'Technical Sessions',
              'E-Certificate',
            ]}
          />

          <PricingTicket
            category="Research Scholars"
            price="₹1500"
            image="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40"
            includes={[
              'Paper Presentation',
              'Conference Kit',
              'Publication Eligibility',
            ]}
          />

          <PricingTicket
            category="Academicians"
            price="₹3000"
            image="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
            includes={[
              'Paper Presentation',
              'Session Chair Eligibility',
              'Conference Proceedings',
            ]}
          />

          <PricingTicket
            category="Industry Persons"
            price="₹3500"
            image="https://images.unsplash.com/photo-1504384308090-c894fdcc538d"
            includes={[
              'Industry Sessions',
              'Networking Access',
              'Participation Certificate',
            ]}
          />
        </div>
      </div>
    </section>
  );
}
