// src/components/MdxRenderer.tsx
"use client";

import { useMemo } from 'react';
import { getMDXComponent } from 'next-contentlayer/hooks';
import ReactMarkdown from 'react-markdown';

interface MdxRendererProps {
  code: string;
}

export function MdxRenderer({ code }: MdxRendererProps) {
  const trimmedCode = code.trim();
  // Heuristic: if the code does not contain an "export default" or does not start with "var Component=",
  // assume it is plain Markdown.
  const isPlainMarkdown = !trimmedCode.includes("export default") && !trimmedCode.startsWith("var Component=");

  if (isPlainMarkdown) {
    return <ReactMarkdown>{code}</ReactMarkdown>;
  }

  // Otherwise, assume the code is compiled MDX and use getMDXComponent.
  const MDXComponent = useMemo(() => {
    try {
      return getMDXComponent(code);
    } catch (error) {
      console.error("getMDXComponent failed, falling back to ReactMarkdown", error);
      return null;
    }
  }, [code]);

  return MDXComponent ? <MDXComponent /> : <ReactMarkdown>{code}</ReactMarkdown>;
}
