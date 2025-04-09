// src/components/mdx/index.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';

// Base components for MDX rendering
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

// Component mapping
const components = {
  a: Anchor,
  img: RoundedImage,
  Image: RoundedImage,
  Callout,
};

interface MDXProps {
  code: string;
}

export function MDX({ code }: MDXProps) {
  // Instead of rendering MDX directly, we'll render a simple div for now
  // This avoids the contentlayer hook issues
  return (
    <div className="prose prose-lg max-w-none prose-headings:font-bold prose-a:text-accent-600">
      <div className="mdx-content">
        <p className="text-gray-600 italic mb-6">
          Note: MDX content is currently being rendered as static HTML due to compatibility issues. 
          Some interactive elements may not function as expected.
        </p>
        
        {/* Render the raw HTML directly */}
        <div dangerouslySetInnerHTML={{ __html: code || '' }} />
      </div>
    </div>
  );
}