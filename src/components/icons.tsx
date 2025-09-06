import type { SVGProps } from "react";

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M6 9.5V7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2.5" />
      <path d="M12 18v-5" />
      <path d="M10 16l2-2 2 2" />
      <path d="M18 10v7a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-7" />
      <path d="M12 5V2" />
      <path d="M9 5H7" />
      <path d="M17 5h-2" />
    </svg>
  );
}
