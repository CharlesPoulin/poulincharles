// src/app/blog/[...slug]/page.tsx
import Link from 'next/link';
import { notFound } from 'next/navigation';
// Import from our mock file instead of contentlayer/generated
import { allPosts } from 'contentlayer/generated';
import { format } from 'date-fns';
import { Mdx } from '@/components/mdx/MdxComponents';

interface PostPageProps {
  params: {
    slug: string[];
  };
}

async function getPostFromParams(params: PostPageProps['params']) {
  const slug = params?.slug?.join('/');
  const post = allPosts.find((post) => post.slugAsParams === slug);

  if (!post) {
    notFound();
  }

  return post;
}

export async function generateMetadata({ params }: PostPageProps) {
  const post = await getPostFromParams(params);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
  };
}

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slugAsParams.split('/'),
  }));
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostFromParams(params);

  if (!post) {
    notFound();
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'technical':
        return 'bg-blue-100 text-blue-800';
      case 'engineering':
        return 'bg-purple-100 text-purple-800';
      case 'life':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-primary-100 text-primary-800';
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'technical':
        return 'Technical';
      case 'engineering':
        return 'Engineering';
      case 'life':
        return 'Life';
      default:
        return category;
    }
  };

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
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to {getCategoryName(post.category)} Blog
        </Link>
        
        <div className="flex items-center gap-3 mb-4">
          <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${getCategoryColor(post.category)}`}>
            {getCategoryName(post.category)}
          </span>
          <time dateTime={post.date} className="text-primary-500">
            {format(new Date(post.date), 'MMMM d, yyyy')}
          </time>
        </div>
        
        <h1 className="heading-1 mb-6">{post.title}</h1>
        
        {post.description && (
          <p className="text-xl text-primary-700 mb-8 leading-relaxed">
            {post.description}
          </p>
        )}
        
        <hr className="my-8 border-primary-200" />
        
        <div className="prose prose-lg max-w-none">
          <Mdx code={post.body.code} />
        </div>
      </article>
    </div>
  );
}