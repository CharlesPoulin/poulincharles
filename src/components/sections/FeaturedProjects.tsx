'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

const projects = [
  {
    id: 'neural-style-transfer',
    title: 'Neural Style Transfer',
    description: 'A deep learning implementation of neural style transfer using TensorFlow and Keras.',
    tags: ['Deep Learning', 'TensorFlow', 'Computer Vision'],
    image: '/images/projects/neural-style-transfer.jpg',
    link: '/projects/neural-style-transfer'
  },
  {
    id: 'recommendation-system',
    title: 'Recommendation System',
    description: 'A collaborative filtering recommendation system built with PyTorch and deployed with FastAPI.',
    tags: ['PyTorch', 'FastAPI', 'Recommendation Systems'],
    image: '/images/projects/recommendation-system.jpg',
    link: '/projects/recommendation-system'
  },
  {
    id: 'anomaly-detection',
    title: 'Anomaly Detection',
    description: 'Real-time anomaly detection system for IoT sensor data using autoencoders.',
    tags: ['Anomaly Detection', 'Time Series', 'Autoencoders'],
    image: '/images/projects/anomaly-detection.jpg',
    link: '/projects/anomaly-detection'
  }
];

export function FeaturedProjects() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}

function ProjectCard({ project }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Link 
      href={project.link}
      className="card overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-video relative overflow-hidden bg-primary-100">
        <div className="w-full h-full bg-gradient-to-br from-accent-100 to-primary-100 flex items-center justify-center">
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
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-primary-900 mb-2 group-hover:text-accent-600 transition">
          {project.title}
        </h3>
        <p className="text-primary-600 mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span 
              key={tag} 
              className="px-2 py-1 bg-primary-100 text-primary-600 text-xs font-medium rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}