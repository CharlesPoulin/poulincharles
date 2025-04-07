import Link from 'next/link';
import { allPosts } from 'contentlayer/generated';
import { compareDesc } from 'date-fns';

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
    <div className="container-base py-12 md:py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="heading-1 mb-4">Life Blog</h1>
        <p className="text-xl text-primary-700 mb-8">
          Personal growth, productivity tips, and life lessons for ML Engineers.
        </p>

        <div className="flex space-x-4 mb-8 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={category.slug}
              className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap ${
                category.slug === '/blog/life'
                  ? 'bg-accent-600 text-white'
                  : 'bg-primary-100 text-primary-700 hover:bg-primary-200'
              }`}
            >
              {category.name}
            </Link>
          ))}
        </div>

        <div className="space-y-8">
          {posts.length > 0 ? (
            posts.map((post) => (
              <Link key={post._id} href={post.slug} className="block">
                <article className="card p-6 hover:border-accent-300 transition">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-green-100 text-green-800 capitalize">
                      Life
                    </span>
                    <time
                      dateTime={post.date}
                      className="text-sm text-primary-500"
                    >
                      {new Date(post.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </time>
                  </div>
                  <h2 className="text-2xl font-semibold text-primary-900 group-hover:text-accent-600 mb-2">
                    {post.title}
                  </h2>
                  {post.description && (
                    <p className="text-primary-600">{post.description}</p>
                  )}
                </article>
              </Link>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-primary-600 mb-4">No life blog posts yet.</p>
              <Link
                href="/blog"
                className="inline-flex px-4 py-2 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition"
              >
                View all posts
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}