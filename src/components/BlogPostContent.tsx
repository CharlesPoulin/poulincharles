// src/components/BlogPostContent.tsx
"use client";

import { useMemo } from 'react';
import { getMDXComponent } from 'next-contentlayer/hooks';
import { Mdx } from '@/components/mdx/MdxComponents';

interface BlogPostContentProps {
  code: string;
}

export default function BlogPostContent({ code }: BlogPostContentProps) {
  // Use the Mdx component that's already defined for consistent rendering
  return (
    <div className="prose prose-lg max-w-none">
      <Mdx code={code} />
    </div>
  );
}