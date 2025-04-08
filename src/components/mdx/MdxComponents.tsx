// src/components/mdx/MdxComponents.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getMDXComponent } from 'next-contentlayer/hooks';

function CustomLink({ href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  if (href && href.startsWith('/')) {
    return <Link href={href} {...props} />;
  }

  if (href && href.startsWith('#')) {
    return <a {...props} href={href} />;
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} href={href} />;
}

function RoundedImage(props: any) {
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

// Components to be used in MDX
const components = {
  a: CustomLink,
  img: RoundedImage,
  Image,
  Callout,
};

// Main export - renders MDX content
export function Mdx({ code }: { code: string }) {
  const Component = React.useMemo(() => {
    try {
      if (code && typeof code === 'string') {
        // Try to use getMDXComponent first
        try {
          return getMDXComponent(code);
        } catch (err) {
          // If that fails, use the custom parser function as fallback
          return () => processMarkdown(code);
        }
      }
      return () => <div>No content available</div>;
    } catch (error) {
      console.error('Error parsing MDX:', error);
      return () => <div>Error rendering content</div>;
    }
  }, [code]);

  return (
    <div className="prose prose-lg max-w-none prose-headings:font-bold prose-a:text-accent-600">
      {Component && <Component components={components} />}
    </div>
  );
}

// Process markdown content as a fallback
function processMarkdown(content: string) {
  if (!content) return <div>No content available</div>;
  
  try {
    // Simple regex-based markdown processing
    let processed = content
      // Process headers
      .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold mt-8 mb-4">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold mt-7 mb-3">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-xl font-bold mt-6 mb-2">$1</h3>')
      .replace(/^#### (.*$)/gm, '<h4 class="text-lg font-bold mt-5 mb-2">$1</h4>')
      
      // Process code blocks
      .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre class="bg-gray-100 p-4 rounded-md overflow-auto my-4 text-sm"><code class="language-$1">$2</code></pre>')
      
      // Process inline code
      .replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm">$1</code>')
      
      // Process bold and italic
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      
      // Process links
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-accent-600 hover:underline">$1</a>')
      
      // Process lists
      .replace(/^[\*\-] (.*$)/gm, '<li class="ml-6 list-disc my-1">$1</li>')
      .replace(/^(\d+)\. (.*$)/gm, '<li class="ml-6 list-decimal my-1" value="$1">$2</li>')
      
      // Process paragraphs
      .replace(/^(?!<h|<li|<ul|<ol|<p|<pre|<blockquote)(.*$)/gm, (match, content) => {
        return content.trim() ? `<p class="my-4 leading-relaxed">${content}</p>` : '';
      });
    
    // Convert list items into proper lists
    const lines = processed.split('\n');
    let inList = false;
    let listType = '';
    processed = lines.map((line, i) => {
      if (line.startsWith('<li class="ml-6 list-disc')) {
        if (!inList || listType !== 'ul') {
          inList = true;
          listType = 'ul';
          return '<ul class="my-4">' + line;
        }
        return line;
      } else if (line.startsWith('<li class="ml-6 list-decimal')) {
        if (!inList || listType !== 'ol') {
          inList = true;
          listType = 'ol';
          return '<ol class="my-4">' + line;
        }
        return line;
      } else if (inList) {
        inList = false;
        return (listType === 'ul' ? '</ul>' : '</ol>') + '\n' + line;
      } else {
        return line;
      }
    }).join('\n');
    
    if (inList) {
      processed += '\n' + (listType === 'ul' ? '</ul>' : '</ol>');
    }
    
    return <div dangerouslySetInnerHTML={{ __html: processed }} />;
  } catch (error) {
    console.error('Error processing markdown:', error);
    return <div>Error rendering content</div>;
  }
}