// // 'use client';

// // import Button from '@/components/ui/Button';

// // export default function Hero() {
// //   return (
// //     <section className="w-full bg-[#EFEFE8] px-6 pt-6 md:pt-6">
// //       <div
// //         className="relative min-h-[90vh] md:min-h-[90vh] overflow-hidden rounded-[28px]"
// //         style={{
// //           background: 'linear-gradient(135deg, #CFFF9E 0%, #EFEFE8 100%)',
// //         }}
// //       >
// //         {/* Background Video */}
// //         <video
// //           autoPlay
// //           loop
// //           muted
// //           playsInline
// //           className="absolute inset-0 h-full w-full object-cover"
// //           style={{ filter: 'brightness(0.75) saturate(0.85)' }}
// //         >
// //           <source src="/videos/CTAbg.mp4" type="video/mp4" />
// //         </video>

// //         {/* Overlay */}
// //         <div
// //           className="absolute inset-0"
// //           style={{
// //             background:
// //               'linear-gradient(to right, rgba(30,42,42,0.9), rgba(30,42,42,0.35))',
// //           }}
// //         />

// //         {/* Hero Content */}
// //         <div className="relative z-10 flex h-full items-end px-10 pb-20 pt-24">
// //           <div className="max-w-4xl">
// //             <p className="mb-6 inline-flex items-center rounded-full bg-[#1E2A2A] px-4 py-2 text-xs font-medium tracking-wide text-[#CFFF9E]">
// //               INTERNATIONAL CONFERENCE · HYBRID MODE · MARCH 2026
// //             </p>

// //             <h2 className="text-3xl md:text-5xl leading-[1.05] font-medium text-[#CFFF9E]">
// //               International Conference on
// //               <br />
// //               Computational Intelligence and
// //               <br />
// //               Mathematical Applications
// //             </h2>

// //             <p className="mt-6 max-w-2xl text-sm text-[#EFEFE8]">
// //               CIMA 2026 brings together researchers, academicians, and industry
// //               experts to explore advances in artificial intelligence,
// //               computational intelligence, and mathematical sciences through
// //               high-impact research and collaboration.
// //             </p>
// //           </div>
// //         </div>

// //         {/* Bottom Right CTA */}
// //         <div className="absolute bottom-10 right-10 z-20">
// //           <Button>About Event</Button>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // }













// 'use client';

// import { useEffect, useState } from 'react';
// import Button from '@/components/ui/Button';

// export default function Hero() {
//   const [isLoaded, setIsLoaded] = useState(false);

//   useEffect(() => {
//     setIsLoaded(true);
//   }, []);

//   return (
//     <section className="w-full bg-[#EFEFE8] px-6 pt-6 md:pt-6">
//       <div
//         className="relative min-h-[90vh] md:min-h-[90vh] overflow-hidden rounded-[28px]"
//         style={{
//           background: 'linear-gradient(135deg, #CFFF9E 0%, #EFEFE8 100%)',
//           transform: isLoaded ? 'scale(1)' : 'scale(0.05)',
//           opacity: isLoaded ? 1 : 0,
//           transition: 'transform 2s cubic-bezier(0.16, 1, 0.3, 1), opacity 2s cubic-bezier(0.16, 1, 0.3, 1)',
//           transformOrigin: 'center center',
//         }}
//       >
//         {/* Background Video */}
//         <video
//           autoPlay
//           loop
//           muted
//           playsInline
//           className="absolute inset-0 h-full w-full object-cover"
//           style={{ filter: 'brightness(0.75) saturate(0.85)' }}
//         >
//           <source src="/videos/CTAbg.mp4" type="video/mp4" />
//         </video>

//         {/* Overlay */}
//         <div
//           className="absolute inset-0"
//           style={{
//             background:
//               'linear-gradient(to right, rgba(30,42,42,0.9), rgba(30,42,42,0.35))',
//           }}
//         />

//         {/* Hero Content */}
//         <div className="relative z-10 flex h-full items-end px-10 pb-20 pt-24">
//           <div className="max-w-4xl">
//             <p className="mb-6 inline-flex items-center rounded-full bg-[#1E2A2A] px-4 py-2 text-xs font-medium tracking-wide text-[#CFFF9E]">
//               INTERNATIONAL CONFERENCE · HYBRID MODE · MARCH 2026
//             </p>

//             <h2 className="text-3xl md:text-5xl leading-[1.05] font-medium text-[#CFFF9E]">
//               International Conference on
//               <br />
//               Computational Intelligence and
//               <br />
//               Mathematical Applications
//             </h2>

//             <p className="mt-6 max-w-2xl text-sm text-[#EFEFE8]">
//               CIMA 2026 brings together researchers, academicians, and industry
//               experts to explore advances in artificial intelligence,
//               computational intelligence, and mathematical sciences through
//               high-impact research and collaboration.
//             </p>
//           </div>
//         </div>

//         {/* Bottom Right CTA */}
//         <div className="absolute bottom-10 right-10 z-20">
//           <Button>About Event</Button>
//         </div>
//       </div>
//     </section>
//   );
// }













'use client';

import { useEffect, useState } from 'react';
import Button from '@/components/ui/Button';
import { useRouter } from 'next/navigation';

export default function Hero() {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleAbout = async () => {
    router.push('/about');
  };

  return (
    <section className="w-full bg-[#EFEFE8] px-6 pt-6 md:pt-6">
      <div
        className="relative min-h-[90vh] md:min-h-[90vh] overflow-hidden rounded-[28px]"
        style={{
          background: 'linear-gradient(135deg, #CFFF9E 0%, #EFEFE8 100%)',
          transform: isLoaded ? 'scale(1)' : 'scale(0.05)',
          opacity: isLoaded ? 1 : 0,
          transition: 'transform 2s cubic-bezier(0.16, 1, 0.3, 1), opacity 2s cubic-bezier(0.16, 1, 0.3, 1)',
          transformOrigin: 'center center',
        }}
      >
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          style={{ filter: 'brightness(0.75) saturate(0.85)' }}
        >
          <source src="/videos/CTAbg.mp4" type="video/mp4" />
        </video>

        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(30,42,42,0.9), rgba(30,42,42,0.35))',
          }}
        />

        {/* Hero Content */}
        <div className="relative z-10 flex h-full items-end px-10 pb-20 pt-24">
          <div className="max-w-4xl">
            {/* Logos - Added above the title */}
            <div className="flex items-center gap-6 mb-8">
              <a href="https://logo1-link.com" target="_blank" rel="noopener noreferrer">
                <img 
                  src="https://kapp-bucket.s3.ap-south-1.amazonaws.com/news-subdomain/thumbnail/1748448961111-srme.png" 
                  alt="Partner 1 Logo"
                  className="h-20 w-auto opacity-90 hover:opacity-100 transition-opacity"
                />
              </a>
              <a href="" target="_blank" rel="noopener noreferrer">
                <img 
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzJqExYnzPYlln1NiRVUtSYwLgw1V9xPXv6Q&s" 
                  alt="Partner 2 Logo"
                  className="h-20 w-auto opacity-90 hover:opacity-100 transition-opacity"
                />
              </a>
            </div>

            <p className="mb-6 inline-flex items-center rounded-full bg-[#1E2A2A] px-4 py-2 text-xs font-medium tracking-wide text-[#CFFF9E]">
              INTERNATIONAL CONFERENCE  · MARCH 2026
            </p>

            <h2 className="text-3xl md:text-5xl leading-[1.05] font-medium text-[#CFFF9E]">
              International Conference on
              <br />
              Computational Intelligence and
              <br />
              Mathematical Applications
            </h2>

            <p className="mt-6 max-w-2xl text-sm text-[#EFEFE8]">
              CIMA 2026 brings together researchers, academicians, and industry
              experts to explore advances in artificial intelligence,
              computational intelligence, and mathematical sciences through
              high-impact research and collaboration.
            </p>
          </div>
        </div>

        {/* Bottom Right CTA */}
        <div className="absolute bottom-10 right-10 z-20">
          
          <Button onClick={handleAbout}>About Event</Button>
        </div>
      </div>
    </section>
  );
}
