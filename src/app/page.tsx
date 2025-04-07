import Link from 'next/link';
import Image from 'next/image';
import { MLVisualization } from '@/components/sections/MLVisualization';
import { FeaturedProjects } from '@/components/sections/FeaturedProjects';
import { BlogPreview } from '@/components/sections/BlogPreview';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="py-20 md:py-28">
        <div className="container-base">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="heading-1 mb-6">
                Machine Learning <span className="text-accent-600">Engineer</span>
              </h1>
              <p className="text-xl text-primary-700 mb-8 max-w-lg">
                Building intelligent systems and sharing knowledge through technical writing
                and engineering insights.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/projects"
                  className="px-6 py-3 bg-accent-600 text-white rounded-lg font-medium hover:bg-accent-700 transition"
                >
                  View Projects
                </Link>
                <Link
                  href="/blog"
                  className="px-6 py-3 bg-white text-primary-800 border border-primary-200 rounded-lg font-medium hover:bg-primary-50 transition"
                >
                  Read Blog
                </Link>
              </div>
            </div>
            
            <div className="h-[400px] w-full">
              <MLVisualization />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary-50">
        <div className="container-base">
          <h2 className="heading-2 mb-12 text-center">Featured Projects</h2>
          <FeaturedProjects />
          <div className="mt-12 text-center">
            <Link
              href="/projects"
              className="px-6 py-3 bg-white text-primary-800 border border-primary-200 rounded-lg font-medium hover:bg-primary-100 transition"
            >
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-base">
          <h2 className="heading-2 mb-12 text-center">Latest from the Blog</h2>
          <BlogPreview />
          <div className="mt-12 text-center">
            <Link
              href="/blog"
              className="px-6 py-3 bg-white text-primary-800 border border-primary-200 rounded-lg font-medium hover:bg-primary-100 transition"
            >
              View All Posts
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}