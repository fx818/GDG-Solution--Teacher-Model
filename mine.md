# Landing Page and Dashboard Integration Guide

## Project Structure

The project consists of two main parts:
- Landing page
- Dashboard application
## Integration Steps

### 1. Setting Up the Project

1. Initialized a Next.js project in the frontend directory
   ```bash
   npx create-next-app@latest frontend
   ```

2. Configured the project to use Tailwind CSS and shadcn/ui component library
   ```bash
   cd frontend
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

3. Added shadcn/ui components
   ```bash
   npx shadcn-ui@latest init
   ```

### 2. Implementing the Landing Page

1. Created the landing page components in `frontend/src/app/page.js`
2. Transferred and adapted the styles from edubuddy-boost to Next.js
3. Implemented responsive design for various screen sizes
4. Created components for:
   - Hero section
   - Features section
   - Testimonials
   - Pricing plans
   - Footer

### 3. Creating the Dashboard

1. Developed a comprehensive sidebar navigation in `frontend/src/components/dashboard/DashboardSidebar.jsx`
2. Implemented dashboard layout in `frontend/src/app/dashboard/layout.js`
3. Created individual dashboard pages and components

### 4. Authentication Flow

1. Implemented sign-in and sign-up pages
2. Created authentication context to manage user state
3. Added protected routes for dashboard access

## Route Structure

| Route | Description | Component Path |
|-------|-------------|---------------|
| `/` | Landing page | `frontend/src/app/page.js` |
| `/signup` | Registration page | `frontend/src/app/signup/page.js` |
| `/login` | Login page | `frontend/src/app/login/page.js` |
| `/dashboard` | Dashboard overview | `frontend/src/app/dashboard/page.js` |
| `/dashboard/profile` | User profile | `frontend/src/app/dashboard/profile/page.js` |
| `/dashboard/videos` | Video lectures | `frontend/src/app/dashboard/videos/page.js` |
| `/dashboard/attendance` | Attendance tracking | `frontend/src/app/dashboard/attendance/page.js` |
| `/dashboard/grades` | Results/Grades | `frontend/src/app/dashboard/results/page.js` |
| `/dashboard/tests` | Tests & Quizzes | `frontend/src/app/dashboard/tests/page.js` |
| `/dashboard/plagiarism` | Plagiarism checker | `frontend/src/app/dashboard/plagiarism/page.js` |
| `/dashboard/doubts` | Doubt Engine | `frontend/src/app/dashboard/doubt-engine/page.js` |
| `/dashboard/pdfs` | PDF interaction | `frontend/src/app/dashboard/pdfs/page.js` |
| `/dashboard/notes` | Notes & Documents | `frontend/src/app/dashboard/notes/page.js` |
| `/dashboard/settings` | User settings | `frontend/src/app/dashboard/settings/page.js` |
| `/dashboard/support` | Help & Support | `frontend/src/app/dashboard/support/page.js` |

## Navigation Flow

1. Users first land on the homepage (`/`)
2. From there, they can:
   - Sign up (`/signup`) if they're new users
   - Log in (`/login`) if they're existing users
   - Learn more about the platform through the landing page sections

3. After authentication, users are redirected to the dashboard (`/dashboard`)
4. The dashboard sidebar provides navigation to all dashboard features

## State Management

- Used React context for global state management
- Implemented local state with React hooks for component-specific state
- Utilized Next.js data fetching mechanisms for API interactions