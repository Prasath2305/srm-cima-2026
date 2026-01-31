'use client';

export default function Footer() {
  return (
    <footer className="w-full bg-[#1E2A2A] px-6 py-20 text-[#D6DBD6]">
      <div className="mx-auto max-w-7xl">

        {/* Top */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">

          {/* About */}
          <div>
            <h3 className="mb-4 text-lg font-medium text-white">
              CIMA’26
            </h3>
            <p className="text-sm leading-relaxed">
              International Conference on Computational Intelligence and
              Mathematical Applications, hosted by SRM Institute of Science
              and Technology in hybrid mode.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>About the Conference</li>
              <li>Participating Departments</li>
              <li>Registration Fees</li>
              <li>Paper Submission</li>
            </ul>
          </div>

          {/* Institution */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">
              Host Institution
            </h4>
            <p className="text-sm leading-relaxed">
              SRM Institute of Science and Technology<br />
              Faculty of Science and Humanities<br />
              Kattankulathur, Tamil Nadu, India
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="my-12 border-t border-white/10" />

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-4 text-xs md:flex-row">
          <p>
            © 2026 CIMA. All rights reserved.
          </p>
          <p>
            Designed & Developed by Chan's Team
          </p>
        </div>
      </div>
    </footer>
  );
}
