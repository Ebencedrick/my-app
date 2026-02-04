# MongoDB Integration Setup Guide

This guide will help you set up and use the MongoDB integration in this Next.js application.

## Prerequisites

- Node.js installed
- MongoDB Atlas account (or local MongoDB instance)
- MongoDB connection string

## Setup Steps

### 1. Environment Variables

Create a `.env` file in the root directory (if it doesn't exist) and add your MongoDB connection string:

```env
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/database?appName=AppName
MONGODB_DB_NAME=portfolio  # Optional, will use database name from URL if not specified
```

**Note:** The `.env` file is already in `.gitignore` to keep your credentials secure.

### 2. Install Dependencies

If you haven't already, install the project dependencies:

```bash
npm install
```

This will install MongoDB driver and other required packages.

### 3. Seed Initial Data (Optional)

To populate your database with sample projects and users, run the seed script:

```bash
npm run seed
```

This will create:
- 6 sample projects in the `projects` collection
- 3 sample users in the `users` collection

**Note:** The seed script will skip collections that already have data to avoid duplicates.

### 4. Start the Development Server

```bash
npm run dev
```

Your API routes will be available at:
- `http://localhost:3000/api/projects`
- `http://localhost:3000/api/users`
- `http://localhost:3000/api/contact`

## Database Collections

The application uses three MongoDB collections:

1. **projects** - Portfolio projects
2. **users** - User/admin data
3. **contact_submissions** - Contact form submissions

## Testing the API

### Test Projects API

```bash
# Get all projects
curl http://localhost:3000/api/projects

# Get projects by category
curl http://localhost:3000/api/projects?category=web

# Get a specific project
curl http://localhost:3000/api/projects/[project-id]
```

### Test Users API

```bash
# Get all users
curl http://localhost:3000/api/users

# Get users by role
curl http://localhost:3000/api/users?role=developer
```

### Test Contact API

```bash
# Submit contact form
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Project Inquiry",
    "message": "I am interested in working with you."
  }'
```

## Using the API in Your Components

### Fetching Projects

```typescript
async function getProjects() {
  const res = await fetch('/api/projects')
  const data = await res.json()
  if (data.success) {
    return data.data
  }
  return []
}
```

### Creating a Project

```typescript
async function createProject(project: Project) {
  const res = await fetch('/api/projects', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(project)
  })
  return await res.json()
}
```

## File Structure

```
lib/
  ├── db.ts          # MongoDB connection utility
  └── types.ts       # TypeScript type definitions

app/
  └── api/
      ├── projects/      # Projects API routes
      │   ├── route.ts
      │   └── [id]/
      │       └── route.ts
      ├── users/         # Users API routes
      │   ├── route.ts
      │   └── [id]/
      │       └── route.ts
      └── contact/       # Contact form API routes
          ├── route.ts
          └── [id]/
              └── route.ts

scripts/
  └── seed.ts        # Database seeding script
```

## Troubleshooting

### Connection Issues

If you're having trouble connecting to MongoDB:

1. **Check your connection string** - Make sure it's correctly formatted
2. **Verify network access** - For MongoDB Atlas, ensure your IP is whitelisted
3. **Check environment variables** - Ensure `.env` file is in the root directory
4. **Restart the dev server** - After changing `.env`, restart Next.js

### Database Name Issues

The application will:
1. First try to extract the database name from the MongoDB URL
2. Fall back to `MONGODB_DB_NAME` environment variable
3. Default to `'portfolio'` if neither is available

### Common Errors

**"Please add your Mongo URI to .env"**
- Make sure `.env` file exists and contains `MONGODB_URL`

**"Connection timeout"**
- Check your internet connection
- Verify MongoDB Atlas IP whitelist settings
- Ensure the connection string is correct

**"Invalid project ID"**
- Make sure you're using a valid MongoDB ObjectId format

## Next Steps

1. **Add Authentication** - Protect admin routes with authentication
2. **Add Validation** - Implement more robust input validation
3. **Add Error Handling** - Improve error messages and logging
4. **Add Pagination** - For large datasets
5. **Add Filtering** - More advanced query options

## Security Notes

⚠️ **Important:** 
- Never commit `.env` files to version control
- Add authentication before deploying to production
- Validate and sanitize all user inputs
- Use environment variables for all sensitive data

## Additional Resources

- [MongoDB Node.js Driver Documentation](https://www.mongodb.com/docs/drivers/node/current/)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [API Documentation](./API_DOCUMENTATION.md) - Complete API reference
