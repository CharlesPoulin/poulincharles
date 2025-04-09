// src/app/blog/[category]/page.tsx
import { notFound } from 'next/navigation';
import { compareDesc } from 'date-fns';
import { allPosts } from 'contentlayer/generated';
import { BlogCategory } from '@/components/blog/BlogCategory';

// Get all unique categories from posts
const getUniqueCategories = () => {
  const categories = allPosts
    .filter(post => post.isPublished !== false) // Use computed isPublished field
    .map(post => post.category || 'uncategorized')
    .filter((category, index, self) => 
      self.indexOf(category) === index && category
    )
    .sort();

  return categories.map(category => ({
    name: category.charAt(0).toUpperCase() + category.slice(1),
    slug: `/blog/${category}`
  }));
};

// Get category descriptions
const getCategoryDescription = (category: string) => {
  switch (category) {
    case 'technical':
      return 'Technical articles on machine learning algorithms, frameworks, and implementation details.';
    case 'engineering':
      return 'Engineering articles on software development, MLOps, and system design.';
    case 'life':
      return 'Articles on career growth, work-life balance, and personal development.';
    case 'experiences':
      return 'Professional experiences and career journeys in machine learning and data science.';
    case 'projects':
      return 'Detailed project showcases and implementations in machine learning and AI.';
    default:
      return `Articles related to ${category}.`;
  }
};

export function generateStaticParams() {
  return getUniqueCategories().map((category) => ({
    category: category.slug.split('/').pop(),
  }));
}

export function generateMetadata({ params }: { params: { category: string } }) {
  const category = params.category;
  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
  
  return {
    title: `${categoryName} Blog | ML Engineer`,
    description: getCategoryDescription(category),
  };
}

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { category } = params;
  
  // For debugging
  console.log(`Requested category: ${category}`);
  
  // Check if the category exists
  const categoryPosts = allPosts.filter(
    post => post.isPublished !== false && 
    (post.category === category || 
     post._raw?.flattenedPath.includes(`/${category}/`)) // Also match by directory
  );
  
  console.log(`Found ${categoryPosts.length} posts in category ${category}`);
  
  // List all found posts for debugging
  categoryPosts.forEach(post => {
    console.log(`- ${post.title} (${post._raw?.flattenedPath})`);
  });
  
  // If category doesn't exist or has no posts, show 404
  if (!categoryPosts.length) {
    notFound();
  }
  
  // Sort posts by date
  const sortedPosts = categoryPosts.sort((a, b) => 
    compareDesc(new Date(a.date), new Date(b.date))
  );
  
  // Format category name for display
  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
  
  // Get unique categories for navigation
  const categories = getUniqueCategories();
  
  return (
    <BlogCategory
      posts={sortedPosts}
      categoryName={categoryName}
      categorySlug={`/blog/${category}`}
      categoryDescription={getCategoryDescription(category)}
      categories={[{ name: 'All', slug: '/blog' }, ...categories]}
    />
  );
}