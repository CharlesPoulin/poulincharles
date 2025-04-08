// src/components/RawMarkdownRenderer.tsx
'use client';

import React, { useEffect, useState } from 'react';

interface RawMarkdownRendererProps {
  filePath: string;
}

export default function RawMarkdownRenderer({ filePath }: RawMarkdownRendererProps) {
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMarkdown() {
      try {
        // Fetch the raw content
        const response = await fetch(`/api/markdown?path=${encodeURIComponent(filePath)}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch markdown: ${response.statusText}`);
        }
        
        const data = await response.json();
        setContent(data.content);
      } catch (err) {
        console.error('Error fetching markdown:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    }

    fetchMarkdown();
  }, [filePath]);

  // Render loading state
  if (isLoading) {
    return <div className="animate-pulse">Loading content...</div>;
  }

  // Render error state
  if (error) {
    return <div className="text-red-500">Error loading content: {error}</div>;
  }

  // Function to convert markdown to HTML
  const markdownToHtml = (markdown: string) => {
    // Basic markdown parsing - this can be enhanced
    return markdown
      // Headers
      .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold my-4">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold my-3">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-xl font-bold my-2">$1</h3>')
      
      // Lists
      .replace(/^\s*- (.*$)/gm, '<li class="ml-6 list-disc">$1</li>')
      .replace(/^\s*\* (.*$)/gm, '<li class="ml-6 list-disc">$1</li>')
      .replace(/^\s*\d+\. (.*$)/gm, '<li class="ml-6 list-decimal">$1</li>')
      
      // Paragraphs
      .replace(/^(?!\s*<[hlu])/gm, '<p class="my-2">$&</p>')
      
      // Wrap lists properly
      .replace(/<li class="ml-6 list-disc">/g, (match, index, str) => {
        // If previous character isn't part of a list, start a new list
        return index > 0 && str.slice(index-5, index).includes('</li>') 
          ? match 
          : '<ul class="my-4">' + match;
      })
      .replace(/<li class="ml-6 list-decimal">/g, (match, index, str) => {
        // If previous character isn't part of a list, start a new list
        return index > 0 && str.slice(index-5, index).includes('</li>') 
          ? match 
          : '<ol class="my-4">' + match;
      })
      .replace(/<\/li>\s*(?!<li)/g, '</li></ul>')
      .replace(/<\/li>\s*(?!<li|\s*<\/[ou]l>)/g, '</li></ol>')
      
      // Bold and italic
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      
      // Links
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-blue-500 hover:underline">$1</a>')
      
      // Remove frontmatter
      .replace(/^---[\s\S]*?---/m, '');
  };

  return (
    <div 
      className="prose prose-lg max-w-none" 
      dangerouslySetInnerHTML={{ __html: markdownToHtml(content) }}
    />
  );
}