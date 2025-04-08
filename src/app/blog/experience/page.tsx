// src/app/experience/page.tsx
// Import from our mock file instead of contentlayer/generated
import { allExperiences } from 'contentlayer/generated';
import { compareDesc } from 'date-fns';
import { Mdx } from '@/components/mdx/MdxComponents';

export const metadata = {
  title: 'Experience | ML Engineer Portfolio',
  description: 'Professional experience as a Machine Learning Engineer',
};

export default function ExperiencePage() {
  const experiences = allExperiences
    .filter((exp) => exp.published)
    .sort((a, b) => {
      if (a.current) return -1;
      if (b.current) return 1;
      return compareDesc(new Date(a.startDate), new Date(b.startDate));
    });

  return (
    <div className="container-base py-12 md:py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="heading-1 mb-4">Experience</h1>
        <p className="text-xl text-primary-700 mb-12">
          My professional journey as a Machine Learning Engineer.
        </p>

        <div className="space-y-12">
          {experiences.map((experience) => {
            const startDate = new Date(experience.startDate);
            const endDate = experience.endDate 
              ? new Date(experience.endDate)
              : null;
            
            const startYear = startDate.getFullYear();
            const startMonth = startDate.toLocaleString('default', { month: 'short' });
            
            const endYear = endDate 
              ? endDate.getFullYear() 
              : null;
            const endMonth = endDate 
              ? endDate.toLocaleString('default', { month: 'short' })
              : null;
            
            const dateString = endDate 
              ? `${startMonth} ${startYear} - ${endMonth} ${endYear}`
              : `${startMonth} ${startYear} - Present`;
            
            return (
              <div key={experience._id} className="relative pl-8 md:pl-0">
                <div className="md:grid md:grid-cols-5 md:gap-8">
                  <div className="md:col-span-1 mb-4 md:mb-0">
                    <div className="md:text-right space-y-2">
                      <h3 className="text-lg font-semibold text-primary-900 md:hidden">
                        {experience.title}
                      </h3>
                      <p className="text-primary-600">{dateString}</p>
                      {experience.location && (
                        <p className="text-primary-500 text-sm">{experience.location}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="md:col-span-4">
                    <div className="h-full relative">
                      <div className="absolute -left-8 md:-left-12 top-1.5 h-4 w-4 rounded-full bg-accent-500"></div>
                      {experience._id !== experiences[experiences.length - 1]._id && (
                        <div className="absolute -left-6 md:-left-10 top-5 bottom-0 w-0.5 bg-primary-200"></div>
                      )}
                      
                      <div className="card p-6">
                        <h3 className="text-xl font-semibold text-primary-900 mb-1 hidden md:block">
                          {experience.title}
                        </h3>
                        <h4 className="text-lg font-medium text-primary-700 mb-4">
                          {experience.company}
                        </h4>
                        
                        {experience.techs && experience.techs.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {experience.techs.map((tech) => (
                              <span
                                key={tech}
                                className="px-2 py-1 bg-primary-100 text-primary-600 text-xs font-medium rounded-md"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                        
                        <div className="prose prose-sm">
                          <Mdx code={experience.body.code} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}