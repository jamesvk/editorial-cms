# Editorial CMS — Claude Code Instructions

## Project Overview

Full-stack MERN editorial content management system. Transforming an existing React frontend into a production-quality fullstack app.

## Tech Stack

- Frontend: React (Vite), Tailwind CSS, Context API
- Backend: Node.js, Express
- Database: MongoDB + Mongoose (MongoDB Atlas)
- Auth: JWT stored in HTTP-only cookies (NOT localStorage)
- Deployment: Vercel (frontend), Render (backend)

## Auth Rules

- NEVER use localStorage for JWT storage
- Always use HTTP-only cookies for JWT
- All article routes must be protected (require valid JWT)

## Code Conventions

- Use async/await (no .then/.catch chains)
- RESTful API conventions
- Separate frontend and backend folders in monorepo structure
- Use .env for all secrets, never hardcode
- Use Tailwind CSS for all styling — no vanilla CSS files

## Styling Rules

- Remove all .css files (except Tailwind base config)
- Use Tailwind utility classes exclusively
- Match the clean, professional aesthetic of AppliTrack

## Folder Structure

editorial-cms/
├── client/ # React frontend (existing code moves here)
├── server/ # Express backend (new)
└── CLAUDE.md

## README

- Keep README updated as features are built
- Include: project description, tech stack, features list, setup instructions, screenshots, live demo link
- Match the quality and format of AppliTrack's README
