// src/components/mdx/MDXComponent.tsx
'use client';

import { useMDXComponent } from 'next-contentlayer/hooks';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';

function Anchor({ href = '', ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  if (href.startsWith('/')) return <Link href={href} {...props} />;
  if (href.startsWith('#')) return <a href={href} {...props} />;
  return <a target="_blank" rel="noopener noreferrer" href={href} {...props} />;
}

function RoundedImage(props: React.ComponentProps<typeof Image>) {
  return <Image className="rounded-lg" alt={props.alt ?? ''} {...props} />;
}

interface CalloutProps {
  children: ReactNode;
  type?: 'default' | 'warning' | 'info';
  icon?: ReactNode;
}

function Callout({ children, type = 'default', icon }: CalloutProps) {
  const palettes = {
    default: 'bg-accent-50 border-accent-200 text-accent-800',
    warning: 'bg-amber-50 border-amber-200 text-amber-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
  };
  
  return (
    <div className={`my-6 border-l-4 p-4 rounded-r-lg ${palettes[type]}`}>
      <div className="flex items-start gap-3">
        {icon}
        <div>{children}</div>
      </div>
    </div>
  );
}

const components = {
  a: Anchor,
  img: RoundedImage,
  Image: RoundedImage,
  Callout,
};

export default function MDXComponent({ code }: { code: string }) {
  if (!code) {
    return <div>No MDX content provided.</div>;
  }
  
  const Component = useMDXComponent(code);
  
  return (
    <article className="prose prose-lg max-w-none prose-headings:font-bold prose-a:text-accent-600">
      <Component components={components} />
    </article>
  );
}