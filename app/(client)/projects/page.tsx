
"use client"
import React, { useState, useMemo } from 'react'

const ProjectsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'web', name: 'Web Development' },
    { id: 'mobile', name: 'Mobile Apps' },
    { id: 'design', name: 'UI/UX Design' },
    { id: 'backend', name: 'Backend' }
  ]

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      category: 'web',
      description: 'A full-featured e-commerce platform with user authentication, payment processing, inventory management, and admin dashboard. Built with scalability and performance in mind.',
      image: '/api/placeholder/600/400',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redis'],
      features: ['User Authentication', 'Payment Integration', 'Admin Dashboard', 'Real-time Inventory'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      status: 'completed',
      year: '2024'
    },
    {
      id: 2,
      title: 'Task Management App',
      category: 'web',
      description: 'Real-time collaborative task management application with drag-and-drop functionality, team collaboration features, and advanced analytics dashboard.',
      image: '/api/placeholder/600/400',
      technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Socket.io', 'Tailwind'],
      features: ['Real-time Sync', 'Drag & Drop', 'Team Collaboration', 'Analytics Dashboard'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      status: 'completed',
      year: '2024'
    },
    {
      id: 3,
      title: 'Weather Dashboard',
      category: 'web',
      description: 'Beautiful weather dashboard with location-based forecasts, interactive maps, historical data visualization, and severe weather alerts.',
      image: '/api/placeholder/600/400',
      technologies: ['React', 'API Integration', 'Chart.js', 'Mapbox', 'Tailwind'],
      features: ['Location Search', 'Interactive Maps', 'Historical Data', 'Weather Alerts'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      status: 'completed',
      year: '2023'
    },
    {
      id: 4,
      title: 'Fitness Tracker Mobile App',
      category: 'mobile',
      description: 'Cross-platform mobile application for tracking workouts, nutrition, and health metrics with social features and personalized recommendations.',
      image: '/api/placeholder/600/400',
      technologies: ['React Native', 'Firebase', 'Redux', 'Node.js', 'MongoDB'],
      features: ['Workout Tracking', 'Nutrition Logging', 'Social Features', 'Health Analytics'],
      liveUrl: '#',
      githubUrl: 'https://github.com',
      status: 'in-progress',
      year: '2024'
    },
    {
      id: 5,
      title: 'Banking API System',
      category: 'backend',
      description: 'Secure and scalable RESTful API for banking operations with transaction processing, user management, and comprehensive audit logging.',
      image: '/api/placeholder/600/400',
      technologies: ['Node.js', 'Express', 'PostgreSQL', 'JWT', 'Docker'],
      features: ['Secure Transactions', 'User Management', 'Audit Logging', 'API Documentation'],
      liveUrl: '#',
      githubUrl: 'https://github.com',
      status: 'completed',
      year: '2023'
    },
    {
      id: 6,
      title: 'Design System Library',
      category: 'design',
      description: 'Comprehensive design system with reusable components, design tokens, documentation, and Storybook integration for consistent UI across products.',
      image: '/api/placeholder/600/400',
      technologies: ['React', 'TypeScript', 'Storybook', 'Figma', 'Tailwind'],
      features: ['Component Library', 'Design Tokens', 'Documentation', 'Theme System'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      status: 'completed',
      year: '2023'
    }
  ]

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchTerm])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'web':
        return 'bg-blue-100 text-blue-800'
      case 'mobile':
        return 'bg-purple-100 text-purple-800'
      case 'backend':
        return 'bg-green-100 text-green-800'
      case 'design':
        return 'bg-pink-100 text-pink-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              My Projects
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A collection of my work showcasing different technologies, challenges, and solutions
            </p>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search projects by name, technology, or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <svg
                  className="absolute left-4 top-3.5 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredProjects.length} of {projects.length} projects
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div key={project.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              {/* Project Image */}
              <div className="relative h-48 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-t-lg flex items-center justify-center">
                <div className="text-center">
                  <svg className="w-16 h-16 text-blue-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  <p className="text-sm text-gray-600">Project Preview</p>
                </div>
                <div className="absolute top-4 right-4 flex gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                    {project.status.replace('-', ' ')}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(project.category)}`}>
                    {categories.find(c => c.id === project.category)?.name}
                  </span>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold text-gray-900">{project.title}</h3>
                  <span className="text-sm text-gray-500">{project.year}</span>
                </div>
                
                <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span key={tech} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded text-xs">
                      +{project.technologies.length - 4} more
                    </span>
                  )}
                </div>

                {/* Key Features */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Key Features:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {project.features.slice(0, 2).map((feature) => (
                      <li key={feature} className="flex items-center">
                        <svg className="w-3 h-3 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  {project.liveUrl && project.liveUrl !== '#' && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-center font-medium text-sm"
                    >
                      Live Demo
                    </a>
                  )}
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-center font-medium text-sm ${
                      project.liveUrl === '#' ? 'col-span-2' : ''
                    }`}
                  >
                    View Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProjectsPage