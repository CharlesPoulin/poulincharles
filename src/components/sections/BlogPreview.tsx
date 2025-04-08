'use client';

import Link from 'next/link';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { allPosts } from 'contentlayer/generated';
import { compareDesc } from 'date-fns';

// Function to get category styling
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

// Function to get formatted category name
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
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Get the latest 3 published posts
    const latestPosts = allPosts
      .filter(post => post.published)
      .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
      .slice(0, 3);
    
    setPosts(latestPosts);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.length > 0 ? (
        posts.map((post) => (
          <BlogPostCard key={post._id} post={post} />
        ))
      ) : (
        <div className="col-span-3 text-center py-12">
          <p className="text-primary-600">No blog posts available.</p>
        </div>
      )}
    </div>
  );
}

function BlogPostCard({ post }) {
  const { title, description, date, category, slug } = post;
  const formattedDate = format(new Date(date), 'MMM d, yyyy');
  
  // Calculate approximate reading time
  const calculateReadingTime = (text) => {
    const wordsPerMinute = 200;
    const wordCount = text?.split(/\s+/).length || 0;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return readingTime < 1 ? '1 min read' : `${readingTime} min read`;
  };
  
  const readingTime = calculateReadingTime(post.body?.code || '');
  
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