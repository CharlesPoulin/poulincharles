// src/app/blog/page.tsx
import { compareDesc } from 'date-fns';
import { allPosts } from 'contentlayer/generated';
import { BlogCategory } from '@/components/blog/BlogCategory';

// Get all unique categories from posts
const getUniqueCategories = () => {
  const categories = allPosts
    .filter(post => post.isPublished !== false) // Use computed isPublished field
    .map(post => post.category || extractCategoryFromPath(post._raw?.flattenedPath || ''))
    .filter((category, index, self) => 
      self.indexOf(category) === index && category
    )
    .sort();

  return categories.map(category => ({
    name: category.charAt(0).toUpperCase() + category.slice(1),
    slug: `/blog/${category}`
  }));
};

// Extract category from the file path if not specified in frontmatter
const extractCategoryFromPath = (path: string): string => {
  const segments = path.split('/');
  if (segments.length > 1) {
    return segments[segments.length - 2];
  }
  return 'uncategorized';
};

export const metadata = {
  title: 'Blog | ML Engineer',
  description: 'Articles on machine learning, engineering, and more.',
};

export default function BlogPage() {
  // Get all published posts and sort by date
  const posts = allPosts
    .filter(post => post.isPublished !== false)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));
  
  // Get unique categories
  const categories = getUniqueCategories();
  
  console.log(`Found ${posts.length} posts and ${categories.length} categories`);
  
  // Debug print all post paths and categories
  posts.forEach(post => {
    console.log(`Post: ${post.title}, Category: ${post.category || extractCategoryFromPath(post._raw?.flattenedPath || '')}, Path: ${post._raw?.flattenedPath || 'unknown'}`);
  });

  return (
    <BlogCategory
      posts={posts}
      categoryName="All"
      categorySlug="/blog"
      categoryDescription="All articles on machine learning, engineering, and more."
      categories={[{ name: 'All', slug: '/blog' }, ...categories]}
    />
  );
}