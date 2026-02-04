# API Documentation

This document describes the RESTful API endpoints for the MongoDB integration.

## Base URL
All API routes are prefixed with `/api`

## Authentication
Currently, no authentication is implemented. **This should be added in production.**

---

## Projects API

### Get All Projects
```http
GET /api/projects
```

**Query Parameters:**
- `category` (optional): Filter by category (`web`, `mobile`, `design`, `backend`)
- `status` (optional): Filter by status (`completed`, `in-progress`, `planned`)

**Example:**
```bash
GET /api/projects?category=web&status=completed
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "E-Commerce Platform",
      "category": "web",
      "description": "A full-featured e-commerce platform...",
      "technologies": ["React", "Node.js", "MongoDB"],
      "features": ["User Authentication", "Payment Integration"],
      "status": "completed",
      "year": "2024",
      "createdAt": "2024-02-15T10:00:00.000Z",
      "updatedAt": "2024-02-15T10:00:00.000Z"
    }
  ]
}
```

### Get Single Project
```http
GET /api/projects/[id]
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "E-Commerce Platform",
    ...
  }
}
```

### Create Project
```http
POST /api/projects
```

**Request Body:**
```json
{
  "title": "New Project",
  "category": "web",
  "description": "Project description",
  "technologies": ["React", "TypeScript"],
  "features": ["Feature 1", "Feature 2"],
  "status": "planned",
  "year": "2024",
  "liveUrl": "https://example.com",
  "githubUrl": "https://github.com/example",
  "image": "/images/project.jpg"
}
```

**Required Fields:** `title`, `category`, `description`

### Update Project
```http
PUT /api/projects/[id]
```

**Request Body:** Same as POST, but all fields are optional (only include fields to update)

### Delete Project
```http
DELETE /api/projects/[id]
```

---

## Users API

### Get All Users
```http
GET /api/users
```

**Query Parameters:**
- `role` (optional): Filter by role (`admin`, `manager`, `developer`, `designer`)
- `status` (optional): Filter by status (`active`, `inactive`)
- `search` (optional): Search by name or email

**Example:**
```bash
GET /api/users?role=developer&status=active&search=john
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "role": "developer",
      "status": "active",
      "joinDate": "2023-01-15",
      "skills": ["React", "Node.js"],
      ...
    }
  ]
}
```

### Get Single User
```http
GET /api/users/[id]
```

### Create User
```http
POST /api/users
```

**Request Body:**
```json
{
  "name": "Jane Doe",
  "email": "jane.doe@example.com",
  "role": "developer",
  "status": "active",
  "department": "Engineering",
  "skills": ["React", "TypeScript"],
  "bio": "Full stack developer..."
}
```

**Required Fields:** `name`, `email`

### Update User
```http
PUT /api/users/[id]
```

### Delete User
```http
DELETE /api/users/[id]
```

---

## Contact API

### Submit Contact Form
```http
POST /api/contact
```

**Request Body:**
```json
{
  "name": "John Smith",
  "email": "john.smith@example.com",
  "subject": "Project Inquiry",
  "message": "I'm interested in working with you..."
}
```

**Required Fields:** `name`, `email`, `message`

**Response:**
```json
{
  "success": true,
  "message": "Contact form submitted successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Smith",
    "email": "john.smith@example.com",
    "subject": "Project Inquiry",
    "message": "...",
    "status": "new",
    "createdAt": "2024-02-15T10:00:00.000Z"
  }
}
```

### Get All Contact Submissions (Admin)
```http
GET /api/contact
```

**Query Parameters:**
- `status` (optional): Filter by status (`new`, `read`, `replied`)

### Get Single Contact Submission
```http
GET /api/contact/[id]
```

### Update Contact Submission Status
```http
PUT /api/contact/[id]
```

**Request Body:**
```json
{
  "status": "read"
}
```

### Delete Contact Submission
```http
DELETE /api/contact/[id]
```

---

## Error Responses

All endpoints return errors in the following format:

```json
{
  "success": false,
  "error": "Error message here"
}
```

**Common HTTP Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `404` - Not Found
- `409` - Conflict (e.g., duplicate email)
- `500` - Internal Server Error

---

## Database Collections

The following MongoDB collections are used:

1. **projects** - Stores portfolio projects
2. **users** - Stores user/admin data
3. **contact_submissions** - Stores contact form submissions

---

## Environment Variables

Required environment variables (in `.env`):

```env
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/database?appName=AppName
MONGODB_DB_NAME=portfolio  # Optional, defaults to database name in URL or 'portfolio'
```

---

## Usage Examples

### Fetching Projects in React Component

```typescript
async function fetchProjects() {
  const res = await fetch('/api/projects?category=web')
  const data = await res.json()
  if (data.success) {
    console.log(data.data) // Array of projects
  }
}
```

### Creating a Project

```typescript
async function createProject(projectData: Project) {
  const res = await fetch('/api/projects', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(projectData)
  })
  const data = await res.json()
  return data
}
```

### Submitting Contact Form

```typescript
async function submitContact(formData: {
  name: string
  email: string
  subject: string
  message: string
}) {
  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  })
  const data = await res.json()
  return data
}
```
