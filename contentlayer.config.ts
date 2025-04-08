import { defineDocumentType, makeSource } from 'contentlayer/source-files';

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `(posts/**/*.mdx|blog/**/*.mdx)`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    description: { type: 'string', required: false },
    image: { type: 'string', required: false },
    category: { type: 'string', required: true },
    published: { type: 'string', required: false, default: 'true' },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (post) => {
        const pathSegments = post._raw.flattenedPath.split('/');
        const category = post.category || pathSegments[pathSegments.length - 2] || 'general';
        const filename = pathSegments.pop();
        return `/blog/${category}/${filename}`;
      },
    },
    slugAsParams: {
      type: 'string',
      resolve: (post) => {
        const pathSegments = post._raw.flattenedPath.split('/');
        const category = post.category || pathSegments[pathSegments.length - 2] || 'general';
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
    published: { type: 'string', required: false, default: 'true' },
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
    published: { type: 'string', required: false, default: 'true' },
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