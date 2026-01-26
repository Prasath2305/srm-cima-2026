'use client';

type ButtonProps = {
  children?: React.ReactNode;
  onClick?: () => void;
};

export default function Button({ children, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="
        group inline-flex items-center gap-6
        rounded-2xl border-2 border-[#1E2A2A]
        bg-[#EFEFE8] px-6 py-2
        transition-all duration-300
        hover:bg-[#1E2A2A]
        active:scale-95
      "
    >
      <span
        className="
          text-base font-medium text-[#1E2A2A]
          transition-colors duration-300
          group-hover:text-[#CFFF9E]
        "
      >
        {children ?? 'View All Posts'}
      </span>

      <span
        className="
          flex items-center justify-center
          rounded-lg bg-[#CFFF9E] p-2
          transition-all duration-300
          group-hover:rotate-45
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="
            h-5 w-5 text-[#1E2A2A]
            transition-all duration-300
            group-hover:-rotate-45
          "
        >
          <path
            fill="currentColor"
            d="M5 13h11.17l-4.88 4.88c-.39.39-.39 1.03 0 1.42s1.02.39 1.41 0l6.59-6.59a.996.996 0 0 0 0-1.41l-6.58-6.6a.996.996 0 1 0-1.41 1.41L16.17 11H5c-.55 0-1 .45-1 1s.45 1 1 1"
          />
        </svg>
      </span>
    </button>
  );
}
