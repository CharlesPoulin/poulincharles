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
    published: { type: 'boolean', required: false, default: true },
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
    published: { type: 'boolean', required: false, default: true },
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
    published: { type: 'boolean', required: false, default: true },
  },
  computedFields: {
    id: {
      type: 'string',
      resolve: (experience) => experience._raw.flattenedPath.split('/').pop(),
    },
  },
}));

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Post, Project, Experience],
  disableImportAliasWarning: true,
});