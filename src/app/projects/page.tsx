// src/app/projects/page.tsx
import Link from 'next/link';
// Import from our mock file instead of contentlayer/generated
import { allProjects } from 'contentlayer/generated';
import { compareDesc } from 'date-fns';

export const metadata = {
  title: 'Projects | ML Engineer Portfolio',
  description: 'Machine learning and AI projects showcase',
};

export default function ProjectsPage() {
  const projects = allProjects
    .filter((project) => project.published)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

  return (
    <div className="container-base py-12 md:py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="heading-1 mb-4">Projects</h1>
        <p className="text-xl text-primary-700 mb-12">
          A showcase of my machine learning and artificial intelligence projects.
        </p>

        <div className="grid grid-cols-1 gap-8">
          {projects.map((project) => (
            <Link key={project._id} href={project.slug} className="block">
              <article className="card overflow-hidden hover:shadow-md transition">
                <div className="md:flex">
                  <div className="md:w-1/3 bg-gradient-to-br from-accent-100 to-primary-100 aspect-video md:aspect-auto flex items-center justify-center">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <svg className="w-16 h-16 text-accent-500" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M21 12C21 12 18 18 12 18C6 18 3 12 3 12C3 12 6 6 12 6C18 6 21 12 21 12Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                  <div className="p-6 md:w-2/3">
                    <h2 className="text-2xl font-semibold text-primary-900 mb-2 group-hover:text-accent-600">
                      {project.title}
                    </h2>
                    <p className="text-primary-600 mb-4">{project.description}</p>
                    
                    {project.techs && project.techs.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.techs.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-primary-100 text-primary-600 text-xs font-medium rounded-md"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    <div className="flex items-center mt-2">
                      <span className="text-accent-600 font-medium text-sm">View project details</span>
                      <svg
                        className="w-4 h-4 ml-1 text-accent-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}