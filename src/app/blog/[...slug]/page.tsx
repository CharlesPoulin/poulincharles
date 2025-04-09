// src/app/blog/[...slug]/page.tsx
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { allPosts } from 'contentlayer/generated';
import { format } from 'date-fns';
import { MDXContent } from '@/components/mdx/MDXContent';

interface BlogPostPageProps {
  params: { 
    slug: string[] 
  };
}

export function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slugAsParams.split('/'),
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const resolvedParams = await Promise.resolve(params);
  const slugString = resolvedParams.slug.join('/');
  const post = allPosts.find((post) => post.slugAsParams === slugString);
  
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found',
    };
  }
  
  return {
    title: `${post.title} | ML Engineer Blog`,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const resolvedParams = await Promise.resolve(params);
  const slugString = resolvedParams.slug.join('/');
  const post = allPosts.find((post) => post.slugAsParams === slugString);
  
  if (!post) {
    notFound();
  }
  
  const formattedDate = format(new Date(post.date), 'MMMM d, yyyy');
  
  // Get the Markdown content from the post
  // First try to get raw content, then fall back to code property
  const markdownContent = post.body.raw || post.body.code || '';
  
  return (
    <div className="container-base py-12 md:py-16">
      <article className="max-w-3xl mx-auto">
        <Link
          href={`/blog/${post.category}`}
          className="inline-flex items-center text-accent-600 hover:text-accent-700 mb-6"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to {post.category.charAt(0).toUpperCase() + post.category.slice(1)} Blog
        </Link>
        
        <div className="bg-gradient-to-br from-accent-50 to-primary-50 rounded-xl p-8 mb-8">
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
          <p className="text-xl text-primary-700 mb-6 leading-relaxed">{post.description}</p>
          <div className="flex flex-wrap items-center gap-4">
            <time dateTime={post.date} className="text-primary-500">
              {formattedDate}
            </time>
            <span className="px-2.5 py-1 capitalize bg-primary-100 text-primary-700 text-sm font-medium rounded-md">
              {post.category}
            </span>
          </div>
        </div>
        
        <MDXContent content={markdownContent} />
      </article>
    </div>
  );
}