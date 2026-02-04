/**
 * Seed script to populate MongoDB with initial data
 * Run with: npx tsx scripts/seed.ts
 * Or: npm run seed (if added to package.json)
 */

import { getDatabase } from '../lib/db'
import { Project, User } from '../lib/types'

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seed...')
    const db = await getDatabase()

    // Seed Projects
    const projectsCollection = db.collection<Project>('projects')
    const existingProjects = await projectsCollection.countDocuments()
    
    if (existingProjects === 0) {
      const projects: Omit<Project, '_id'>[] = [
        {
          title: 'E-Commerce Platform',
          category: 'web',
          description: 'A full-featured e-commerce platform with user authentication, payment processing, inventory management, and admin dashboard. Built with scalability and performance in mind.',
          technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redis'],
          features: ['User Authentication', 'Payment Integration', 'Admin Dashboard', 'Real-time Inventory'],
          liveUrl: 'https://example.com',
          githubUrl: 'https://github.com',
          status: 'completed',
          year: '2024',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Task Management App',
          category: 'web',
          description: 'Real-time collaborative task management application with drag-and-drop functionality, team collaboration features, and advanced analytics dashboard.',
          technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Socket.io', 'Tailwind'],
          features: ['Real-time Sync', 'Drag & Drop', 'Team Collaboration', 'Analytics Dashboard'],
          liveUrl: 'https://example.com',
          githubUrl: 'https://github.com',
          status: 'completed',
          year: '2024',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Weather Dashboard',
          category: 'web',
          description: 'Beautiful weather dashboard with location-based forecasts, interactive maps, historical data visualization, and severe weather alerts.',
          technologies: ['React', 'API Integration', 'Chart.js', 'Mapbox', 'Tailwind'],
          features: ['Location Search', 'Interactive Maps', 'Historical Data', 'Weather Alerts'],
          liveUrl: 'https://example.com',
          githubUrl: 'https://github.com',
          status: 'completed',
          year: '2023',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Fitness Tracker Mobile App',
          category: 'mobile',
          description: 'Cross-platform mobile application for tracking workouts, nutrition, and health metrics with social features and personalized recommendations.',
          technologies: ['React Native', 'Firebase', 'Redux', 'Node.js', 'MongoDB'],
          features: ['Workout Tracking', 'Nutrition Logging', 'Social Features', 'Health Analytics'],
          status: 'in-progress',
          year: '2024',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Banking API System',
          category: 'backend',
          description: 'Secure and scalable RESTful API for banking operations with transaction processing, user management, and comprehensive audit logging.',
          technologies: ['Node.js', 'Express', 'PostgreSQL', 'JWT', 'Docker'],
          features: ['Secure Transactions', 'User Management', 'Audit Logging', 'API Documentation'],
          status: 'completed',
          year: '2023',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Design System Library',
          category: 'design',
          description: 'Comprehensive design system with reusable components, design tokens, documentation, and Storybook integration for consistent UI across products.',
          technologies: ['React', 'TypeScript', 'Storybook', 'Figma', 'Tailwind'],
          features: ['Component Library', 'Design Tokens', 'Documentation', 'Theme System'],
          liveUrl: 'https://example.com',
          githubUrl: 'https://github.com',
          status: 'completed',
          year: '2023',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]

      await projectsCollection.insertMany(projects)
      console.log(`✅ Inserted ${projects.length} projects`)
    } else {
      console.log(`⏭️  Projects collection already has ${existingProjects} documents, skipping...`)
    }

    // Seed Users
    const usersCollection = db.collection<User>('users')
    const existingUsers = await usersCollection.countDocuments()
    
    if (existingUsers === 0) {
      const users: Omit<User, '_id'>[] = [
        {
          name: 'John Doe',
          email: 'john.doe@example.com',
          role: 'admin',
          status: 'active',
          avatar: 'JD',
          joinDate: '2023-01-15',
          lastLogin: new Date().toISOString(),
          projects: 12,
          completedTasks: 89,
          performance: 95,
          department: 'Engineering',
          location: 'New York, USA',
          phone: '+1 (555) 123-4567',
          skills: ['React', 'Node.js', 'TypeScript', 'MongoDB'],
          bio: 'Senior Full Stack Developer with 8+ years of experience in building scalable web applications.',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Jane Smith',
          email: 'jane.smith@example.com',
          role: 'manager',
          status: 'active',
          avatar: 'JS',
          joinDate: '2023-03-20',
          lastLogin: new Date().toISOString(),
          projects: 8,
          completedTasks: 156,
          performance: 92,
          department: 'Product',
          location: 'San Francisco, USA',
          phone: '+1 (555) 234-5678',
          skills: ['Project Management', 'Agile', 'Scrum', 'Leadership'],
          bio: 'Product Manager with expertise in agile methodologies and team leadership.',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Bob Johnson',
          email: 'bob.johnson@example.com',
          role: 'developer',
          status: 'active',
          avatar: 'BJ',
          joinDate: '2023-06-10',
          lastLogin: new Date().toISOString(),
          projects: 15,
          completedTasks: 234,
          performance: 88,
          department: 'Engineering',
          location: 'Austin, USA',
          phone: '+1 (555) 345-6789',
          skills: ['Python', 'Django', 'PostgreSQL', 'Docker'],
          bio: 'Backend Developer specializing in Python and cloud infrastructure.',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]

      await usersCollection.insertMany(users)
      console.log(`✅ Inserted ${users.length} users`)
    } else {
      console.log(`⏭️  Users collection already has ${existingUsers} documents, skipping...`)
    }

    console.log('✨ Database seed completed successfully!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    process.exit(1)
  }
}

seedDatabase()
