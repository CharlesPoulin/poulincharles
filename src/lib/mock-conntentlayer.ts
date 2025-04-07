// Save this file to: src/lib/mock-contentlayer.ts

// This is a temporary mock of contentlayer/generated exports
// to allow the app to build while you set up actual content

export const allPosts = [
    {
      _id: 'post-1',
      title: 'Getting Started with Neural Networks',
      description: 'A beginner-friendly introduction to neural networks and deep learning.',
      date: new Date('2023-12-15').toISOString(),
      category: 'technical',
      published: true,
      slug: '/blog/technical/getting-started-with-neural-networks',
      slugAsParams: 'technical/getting-started-with-neural-networks',
      body: {
        code: '# Getting Started with Neural Networks\n\nThis is a sample post.'
      }
    },
    {
      _id: 'post-2',
      title: 'Deploying ML Models to Production',
      description: 'Best practices for deploying machine learning models to production environments.',
      date: new Date('2023-11-20').toISOString(),
      category: 'engineering',
      published: true,
      slug: '/blog/engineering/deploying-ml-models-to-production',
      slugAsParams: 'engineering/deploying-ml-models-to-production',
      body: {
        code: '# Deploying ML Models to Production\n\nThis is a sample post.'
      }
    },
    {
      _id: 'post-3',
      title: 'Balancing Work and Learning in ML',
      description: 'How to maintain a healthy balance between work and continuous learning in ML.',
      date: new Date('2023-10-15').toISOString(),
      category: 'life',
      published: true,
      slug: '/blog/life/balancing-work-and-learning-in-ml',
      slugAsParams: 'life/balancing-work-and-learning-in-ml',
      body: {
        code: '# Balancing Work and Learning in ML\n\nThis is a sample post.'
      }
    }
  ];
  
  export const allProjects = [
    {
      _id: 'project-1',
      title: 'Neural Style Transfer',
      description: 'A deep learning implementation of neural style transfer using TensorFlow and Keras.',
      date: new Date('2023-12-01').toISOString(),
      image: '/images/projects/neural-style-transfer.jpg',
      github: 'https://github.com/yourusername/neural-style-transfer',
      demo: 'https://neural-style-demo.vercel.app',
      techs: ['TensorFlow', 'Keras', 'Python', 'Computer Vision'],
      published: true,
      slug: '/projects/neural-style-transfer',
      slugAsParams: 'neural-style-transfer',
      body: {
        code: '# Neural Style Transfer\n\nThis is a sample project.'
      }
    },
    {
      _id: 'project-2',
      title: 'Recommendation System',
      description: 'A collaborative filtering recommendation system built with PyTorch and deployed with FastAPI.',
      date: new Date('2023-11-01').toISOString(),
      image: '/images/projects/recommendation-system.jpg',
      github: 'https://github.com/yourusername/recommendation-system',
      demo: 'https://recommendation-demo.vercel.app',
      techs: ['PyTorch', 'FastAPI', 'Python', 'Recommendation Systems'],
      published: true,
      slug: '/projects/recommendation-system',
      slugAsParams: 'recommendation-system',
      body: {
        code: '# Recommendation System\n\nThis is a sample project.'
      }
    }
  ];
  
  export const allExperiences = [
    {
      _id: 'experience-1',
      title: 'Machine Learning Engineer',
      company: 'AI Solutions Inc.',
      location: 'San Francisco, CA',
      startDate: new Date('2022-01-15').toISOString(),
      endDate: new Date('2023-08-30').toISOString(),
      current: false,
      techs: ['PyTorch', 'TensorFlow', 'Python', 'AWS', 'Docker'],
      published: true,
      body: {
        code: '## Responsibilities\n\n- Developed and deployed machine learning models\n- Optimized model inference time'
      }
    },
    {
      _id: 'experience-2',
      title: 'Data Scientist',
      company: 'Data Insights Co.',
      location: 'Remote',
      startDate: new Date('2020-05-01').toISOString(),
      endDate: new Date('2021-12-31').toISOString(),
      current: false,
      techs: ['Python', 'Pandas', 'scikit-learn', 'SQL'],
      published: true,
      body: {
        code: '## Responsibilities\n\n- Performed data analysis and built predictive models\n- Worked with stakeholders to define KPIs'
      }
    }
  ];