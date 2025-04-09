// contentlayer.config.ts
import { defineDocumentType, makeSource } from 'contentlayer/source-files';

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/*.mdx`, // Matches all MDX files in any directory
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    description: { type: 'string', required: false },
    image: { type: 'string', required: false },
    category: { type: 'string', required: false, default: 'uncategorized' }, // Make category optional with default
    published: { type: 'string', required: false, default: 'true' }, // Handle string "true\r" values
    company: { type: 'string', required: false }, // Added for ml-engineer.mdx
    location: { type: 'string', required: false }, // Added for ml-engineer.mdx
    startDate: { type: 'date', required: false }, // Added for ml-engineer.mdx
    endDate: { type: 'date', required: false }, // Added for ml-engineer.mdx
    techs: { type: 'list', of: { type: 'string' }, required: false }, // Added for ml-engineer.mdx
    github: { type: 'string', required: false }, // Added for project files
    demo: { type: 'string', required: false }, // Added for project files
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (post) => {
        // Extract category and filename
        const pathSegments = post._raw.flattenedPath.split('/');
        // Default to the directory name as category if not specified in frontmatter
        const category = post.category || 
                       (pathSegments.length > 1 ? pathSegments[pathSegments.length - 2] : 'uncategorized');
        const filename = pathSegments.pop();
        return `/blog/${category}/${filename}`;
      },
    },
    slugAsParams: {
      type: 'string',
      resolve: (post) => {
        // Extract category and filename
        const pathSegments = post._raw.flattenedPath.split('/');
        // Default to the directory name as category if not specified in frontmatter
        const category = post.category || 
                       (pathSegments.length > 1 ? pathSegments[pathSegments.length - 2] : 'uncategorized');
        const filename = pathSegments.pop();
        return `${category}/${filename}`;
      },
    },
    // Add a computedField to properly handle the boolean conversion
    isPublished: {
      type: 'boolean',
      resolve: (post) => {
        // Handle cases where the published field might have \r or other whitespace
        if (typeof post.published === 'string') {
          return post.published.trim() === 'true';
        }
        return post.published === true || post.published === undefined;
      },
    },
  },
}));

export const Project = defineDocumentType(() => ({
  name: 'Project',
  filePathPattern: `projects/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    description: { type: 'string', required: true },
    image: { type: 'string', required: false },
    github: { type: 'string', required: false },
    demo: { type: 'string', required: false },
    techs: { type: 'list', of: { type: 'string' }, required: false },
    published: { type: 'string', required: false, default: 'true' }, // Changed to string type
    featured: { type: 'boolean', required: false, default: false },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (project) => `/projects/${project._raw.flattenedPath.split('/').pop()}`,
    },
    slugAsParams: {
      type: 'string',
      resolve: (project) => `${project._raw.flattenedPath.split('/').pop()}`,
    },
    // Add a computedField for the boolean value
    isPublished: {
      type: 'boolean',
      resolve: (project) => {
        if (typeof project.published === 'string') {
          return project.published.trim() === 'true';
        }
        return project.published === true || project.published === undefined;
      },
    },
  },
}));

export const Experience = defineDocumentType(() => ({
  name: 'Experience',
  filePathPattern: `experiences/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    company: { type: 'string', required: true },
    location: { type: 'string', required: false },
    startDate: { type: 'date', required: true },
    endDate: { type: 'date', required: false },
    current: { type: 'boolean', required: false, default: false },
    techs: { type: 'list', of: { type: 'string' }, required: false },
    published: { type: 'string', required: false, default: 'true' }, // Changed to string type
  },
  computedFields: {
    id: {
      type: 'string',
      resolve: (experience) => experience._raw.flattenedPath.split('/').pop(),
    },
    // Add a computedField for the boolean value
    isPublished: {
      type: 'boolean',
      resolve: (experience) => {
        if (typeof experience.published === 'string') {
          return experience.published.trim() === 'true';
        }
        return experience.published === true || experience.published === undefined;
      },
    },
  },
}));

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Post, Project, Experience],
  disableImportAliasWarning: true,
});