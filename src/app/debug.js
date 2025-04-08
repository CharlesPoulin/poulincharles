// Create this file as app/debug.js or pages/debug.js (depending on your Next.js setup)
import { allPosts, allProjects, allExperiences } from 'contentlayer/generated';

export default function DebugPage() {
  // Check if data is properly loaded
  return (
    <div style={{ padding: '2rem' }}>
      <h1>ContentLayer Debug Page</h1>
      
      <section>
        <h2>Posts ({allPosts.length})</h2>
        <ul>
          {allPosts.map((post) => (
            <li key={post._id}>
              {post.title} - Published: {post.published} - isPublished: {String(post.isPublished)}
              <br />
              <small>Slug: {post.slug}</small>
            </li>
          ))}
        </ul>
      </section>
      
      <section>
        <h2>Projects ({allProjects.length})</h2>
        <ul>
          {allProjects.map((project) => (
            <li key={project._id}>
              {project.title} - Published: {project.published} - isPublished: {String(project.isPublished)}
            </li>
          ))}
        </ul>
      </section>
      
      <section>
        <h2>Experiences ({allExperiences.length})</h2>
        <ul>
          {allExperiences.map((exp) => (
            <li key={exp._id}>
              {exp.title} - Published: {exp.published} - isPublished: {String(exp.isPublished)}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}