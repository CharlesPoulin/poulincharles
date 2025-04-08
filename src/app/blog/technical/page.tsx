// src/app/blog/technical/page.tsx
import { allPosts } from 'contentlayer/generated';
import { compareDesc } from 'date-fns';
import { BlogCategory } from '@/components/blog/BlogCategory';

export const metadata = {
  title: 'Technical Blog | ML Engineer Portfolio',
  description: 'Technical articles about machine learning, deep learning, and AI algorithms',
};

export default function TechnicalBlogPage() {
  // Normalize category name to handle potential discrepancies
  const posts = allPosts
    .filter((post) => {
      const normalizedCategory = post.category.toLowerCase().trim();
      return post.published && normalizedCategory === 'technical';
    })
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

  const categories = [
    { name: 'All', slug: '/blog' },
    { name: 'Technical', slug: '/blog/technical' },
    { name: 'Engineering', slug: '/blog/engineering' },
    { name: 'Life', slug: '/blog/life' },
  ];

  return (
    <BlogCategory
      posts={posts}
      categoryName="Technical"
      categorySlug="/blog/technical"
      categoryDescription="Deep dives into machine learning algorithms, models, and techniques."
      categories={categories}
    />
  );
}