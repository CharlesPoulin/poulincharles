import { allPosts } from 'contentlayer/generated';
import { compareDesc } from 'date-fns';
import { BlogCategory } from '@/components/blog/BlogCategory';

export const metadata = {
  title: 'Life Blog | ML Engineer Portfolio',
  description: 'Personal growth, productivity, and life lessons for ML Engineers',
};

export default function LifeBlogPage() {
  const posts = allPosts
    .filter((post) => post.published && post.category === 'life')
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
      categoryName="Life"
      categorySlug="/blog/life"
      categoryDescription="Personal growth, productivity tips, and life lessons for ML Engineers."
      categories={categories}
    />
  );
}