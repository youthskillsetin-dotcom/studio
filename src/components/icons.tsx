import Image from 'next/image';
import type { SVGProps } from 'react';

export function Logo(props: Omit<React.ComponentProps<typeof Image>, 'src' | 'alt'>) {
  return (
    <Image
      src="/LOGO.png"
      alt="YouthSkillSet Logo"
      width={24}
      height={24}
      {...props}
    />
  );
}
