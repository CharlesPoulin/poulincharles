# ML Engineer Portfolio Website

A minimalist, Apple-inspired portfolio website for Machine Learning Engineers featuring a 3D visualization, blog sections, projects showcase, and professional experience.

## Features

- 💻 Clean, minimalist design with a white color scheme
- 🧠 Interactive 3D visualization of machine learning concepts
- 📝 Multiple blog categories (Technical, Engineering, Life)
- 🚀 Projects showcase with detailed pages
- 📊 Professional experience timeline
- 📱 Responsive design for all devices
- 📄 Easy content management with Markdown/MDX

## Tech Stack

- **Next.js 14** - React framework with App Router
- **Tailwind CSS** - Utility-first CSS framework
- **Three.js** - 3D visualization library
- **ContentLayer** - Content management with MDX
- **TypeScript** - Type-safe JavaScript
- **Framer Motion** - Animations library

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn or pnpm

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/ml-engineer-portfolio.git
   cd ml-engineer-portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Create the required directories:
   ```bash
   mkdir -p content/blog/technical content/blog/engineering content/blog/life
   mkdir -p content/projects content/experience
   mkdir -p public/images/projects
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) to see your website.

## Content Management

### Blog Posts

Create Markdown files in the following directories:
- `content/blog/technical/` - For technical blog posts
- `content/blog/engineering/` - For engineering blog posts
- `content/blog/life/` - For life blog posts

Each blog post should have this frontmatter:

```md
---
title: Your Blog Post Title
description: A brief description of your blog post
date: 2024-01-15
category: technical # or engineering, life
published: true
---

Your content here...
```

### Projects

Create project files in `content/projects/` with this frontmatter:

```md
---
title: Project Title
description: A brief description of your project
date: 2024-01-15
techs: ['Technology 1', 'Technology 2']
github: https://github.com/yourusername/project
demo: https://demo-link.com
published: true
---

Your project details here...
```

### Experience

Create experience files in `content/experience/` with this frontmatter:

```md
---
title: Job Title
company: Company Name
location: Location (Remote)
startDate: 2022-01-01
endDate: 2023-01-01 # omit for current positions
current: true # for current position
techs: ['Skill 1', 'Skill 2']
published: true
---

Your responsibilities and achievements here...
```

## Deployment on Vercel

This project is optimized for deployment on Vercel. Follow these steps to deploy:

1. Create a Vercel account at [vercel.com](https://vercel.com) if you don't have one.

2. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```

3. Log in to Vercel:
   ```bash
   vercel login
   ```

4. Deploy to Vercel:
   ```bash
   vercel
   ```

   This will guide you through the deployment process. Answer the prompts as needed.

5. For production deployment:
   ```bash
   vercel --prod
   ```

### Connecting to an Existing Domain

If you already have a domain (like poulincharles.com), you can connect it to your Vercel project:

1. Go to your Vercel dashboard
2. Select your project
3. Go to "Settings" > "Domains"
4. Add your domain and follow the DNS configuration instructions

## Customization

### Changing Personal Information

Update the following files to personalize your portfolio:

- `src/components/layout/Navbar.tsx` - Update the site name
- `src/components/layout/Footer.tsx` - Update personal information and social links
- `src/app/page.tsx` - Update the hero section

### Styling

The design uses Tailwind CSS for styling. Main color schemes and typography are defined in:

- `tailwind.config.js` - Color schemes and typography settings
- `src/app/globals.css` - Global styles and custom components

## License

This project is licensed under the MIT License - see the LICENSE file for details.