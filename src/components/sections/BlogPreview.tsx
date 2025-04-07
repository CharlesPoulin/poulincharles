'use client';

import Link from 'next/link';
import { format } from 'date-fns';

const blogPosts = [
  {
    id: 'introduction-to-transformers',
    title: 'Introduction to Transformer Models',
    description: 'Learn about the architecture that powers modern NLP models like GPT and BERT.',
    date: '2024-01-15',
    category: 'technical',
    readingTime: '8 min read',
    slug: '/blog/technical/introduction-to-transformers',
  },
  {
    id: 'ml-system-design',
    title: 'Designing ML Systems for Production',
    description: 'Best practices for designing and deploying machine learning systems in production environments.',
    date: '2024-01-05',
    category: 'engineering',
    readingTime: '12 min read',
    slug: '/blog/engineering/ml-system-design',
  },
  {
    id: 'learning-approaches',
    title: 'Effective Learning Approaches for ML Engineers',
    description: 'How to efficiently learn and stay up-to-date in the rapidly evolving field of machine learning.',
    date: '2023-12-20',
    category: 'life',
    readingTime: '5 min read',
    slug: '/blog/life/learning-approaches',
  },
];

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

export function BlogPreview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {blogPosts.map((post) => (
        <BlogPostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

function BlogPostCard({ post }) {
  const { title, description, date, category, readingTime, slug } = post;
  const formattedDate = format(new Date(date), 'MMM d, yyyy');
  
  return (
    <Link href={slug} className="card group h-full flex flex-col">
      <div className="p-6 flex-grow">
        <div className="flex items-center gap-3 mb-3">
          <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${getCategoryColor(category)}`}>
            {getCategoryName(category)}
          </span>
          <span className="text-primary-500 text-sm">{formattedDate}</span>
        </div>
        
        <h3 className="text-xl font-semibold text-primary-900 mb-2 group-hover:text-accent-600 transition">
          {title}
        </h3>
        
        <p className="text-primary-600 mb-4">{description}</p>
      </div>
      
      <div className="px-6 pb-6 pt-2 border-t border-primary-100 flex items-center justify-between">
        <span className="text-primary-500 text-sm">{readingTime}</span>
        <span className="text-accent-600 font-medium text-sm group-hover:underline">Read article</span>
      </div>
    </Link>
  );
}