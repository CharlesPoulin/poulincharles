import { allPosts } from 'contentlayer/generated';
import { compareDesc } from 'date-fns';
import { BlogCategory } from '@/components/blog/BlogCategory';

export const metadata = {
  title: 'Engineering Blog | ML Engineer Portfolio',
  description: 'Engineering articles about machine learning systems, MLOps, and best practices',
};

export default function EngineeringBlogPage() {
  const posts = allPosts
    .filter((post) => post.published && post.category === 'engineering')
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
      categoryName="Engineering"
      categorySlug="/blog/engineering"
      categoryDescription="Articles about building and deploying ML systems, MLOps, and engineering best practices."
      categories={categories}
    />
  );
}