'use client';

import { useMDXComponent } from 'next-contentlayer/hooks';
import Image from 'next/image';
import Link from 'next/link';

function CustomLink({ href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  if (href && href.startsWith('/')) {
    return <Link href={href} {...props} />;
  }

  if (href && href.startsWith('#')) {
    return <a {...props} href={href} />;
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} href={href} />;
}

function RoundedImage(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  return <Image className="rounded-lg" alt={props.alt || ''} {...props} />;
}

function Callout({
  children,
  type = 'default',
  icon,
}: {
  children: React.ReactNode;
  type?: 'default' | 'warning' | 'info';
  icon?: string;
}) {
  const typeStyles = {
    default: 'bg-accent-50 border-accent-200 text-accent-800',
    warning: 'bg-amber-50 border-amber-200 text-amber-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
  };

  return (
    <div className={`p-4 border-l-4 rounded-r-lg my-6 ${typeStyles[type]}`}>
      <div className="flex items-start">
        {icon && <span className="mr-3">{icon}</span>}
        <div>{children}</div>
      </div>
    </div>
  );
}

const components = {
  a: CustomLink,
  img: RoundedImage,
  Callout,
};

export function Mdx({ code }: { code: string }) {
  const Component = useMDXComponent(code);
  return <Component components={components} />;
}