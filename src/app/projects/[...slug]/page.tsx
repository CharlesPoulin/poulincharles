import Link from 'next/link';
import { notFound } from 'next/navigation';
import { allProjects } from 'contentlayer/generated';
import { format } from 'date-fns';
import { Mdx } from '@/components/mdx/MdxComponents';

interface ProjectPageProps {
  params: {
    slug: string[];
  };
}

async function getProjectFromParams(params: ProjectPageProps['params']) {
  const slug = params?.slug?.join('/');
  const project = allProjects.find((project) => project.slugAsParams === slug);

  if (!project) {
    notFound();
  }

  return project;
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const project = await getProjectFromParams(params);

  if (!project) {
    return {};
  }

  return {
    title: `${project.title} | ML Engineer Portfolio`,
    description: project.description,
  };
}

export async function generateStaticParams() {
  return allProjects.map((project) => ({
    slug: project.slugAsParams.split('/'),
  }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = await getProjectFromParams(params);

  if (!project) {
    notFound();
  }

  return (
    <div className="container-base py-12 md:py-16">
      <article className="max-w-4xl mx-auto">
        <Link
          href="/projects"
          className="inline-flex items-center text-accent-600 hover:text-accent-700 mb-6"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Projects
        </Link>

        <div className="bg-gradient-to-br from-accent-50 to-primary-50 rounded-xl p-8 mb-8">
          <h1 className="heading-1 mb-4">{project.title}</h1>
          
          <p className="text-xl text-primary-700 mb-6 leading-relaxed">
            {project.description}
          </p>
          
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <time dateTime={project.date} className="text-primary-500">
              {format(new Date(project.date), 'MMMM d, yyyy')}
            </time>
            
            {project.techs && project.techs.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {project.techs.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 bg-white text-primary-700 text-sm font-medium rounded-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex flex-wrap gap-4">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-primary-800 text-white rounded-lg hover:bg-primary-900 transition"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                GitHub Repository
              </a>
            )}
            
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Live Demo
              </a>
            )}
          </div>
        </div>

        {project.image && (
          <div className="mb-8">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
        )}
        
        <div className="prose prose-lg max-w-none">
          <Mdx code={project.body.code} />
        </div>
      </article>
    </div>
  );
}