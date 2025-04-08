import Link from 'next/link';
import Image from 'next/image';
import { allProjects } from 'contentlayer/generated';
import { compareDesc } from 'date-fns';

export function FeaturedProjects() {
  const projects = allProjects
    .filter((project) => project.published && project.featured)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
    .slice(0, 3);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.length > 0 ? (
        projects.map((project) => (
          <Link key={project._id} href={project.slug}>
            <article className="card h-full overflow-hidden hover:shadow-md transition">
              <div className="bg-gradient-to-br from-accent-100 to-primary-100 aspect-video flex items-center justify-center">
                {project.image ? (
                  <div className="relative w-full h-full">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <svg
                    className="w-12 h-12 text-accent-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-primary-900 mb-2">
                  {project.title}
                </h3>
                <p className="text-primary-600 mb-4 line-clamp-2">{project.description}</p>
                
                {project.techs && project.techs.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techs.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-primary-100 text-primary-600 text-xs font-medium rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techs.length > 3 && (
                      <span className="px-2 py-1 bg-primary-100 text-primary-600 text-xs font-medium rounded-md">
                        +{project.techs.length - 3} more
                      </span>
                    )}
                  </div>
                )}
                
                <div className="flex items-center mt-2">
                  <span className="text-accent-600 font-medium text-sm">
                    View project details
                  </span>
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
            </article>
          </Link>
        ))
      ) : (
        <div className="col-span-3 text-center py-12">
          <p className="text-primary-600">No featured projects yet. Check back soon!</p>
        </div>
      )}
    </div>
  );
}