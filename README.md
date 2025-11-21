📚 EduPro LMS — Next.js | Tailwind | Clerk | i18n

A full Learning Management System (LMS) built with Next.js, designed with clean architecture, multilingual support, role-based authentication, course management, and real-world dashboard features.

🚀 Features
🎓 LMS Core

Full LMS structure with 15+ pages and 32 reusable components

Multi-language UI (EN/AR) with auto translation

Fully responsive design using Tailwind CSS

🔐 Authentication (Clerk)

Register / Login

Protected Routes

Role-based access (Admin / User)

📊 Admin Dashboard

Add / Edit / Delete courses

Manage course details (title, content, thumbnails, price, etc.)

Course Comments Management

🛒 User Features

Enroll in courses

Buy courses directly

Automatic purchase email sent to user (using Resend)

Includes course name + preview image

💬 Other Features

Comments system (per course)

Contact form with email sending

API routes using Next.js Server Actions

Clean component-driven architecture

🛠 Tech Stack

Frontend: Next.js, React.js, Tailwind CSS

Authentication: Clerk Auth

Email: Resend

API: REST API, Server Actions

State: Context API

Tools: Axios, i18n (Intl), App Router

🔗 Live Demo

https://edp-edupro.vercel.app/en

📦 GitHub Repo

https://github.com/OmarSalama17/LMS-Next.js

🖼 Screenshots

(Add 3–5 screenshots here)

Example:

/public/screenshots/home.png  
/public/screenshots/course.png  
/public/screenshots/dashboard.png  

⚙️ Installation
# Clone repo
git clone https://github.com/OmarSalama17/LMS-Next.js

cd LMS-Next.js

# Install packages
npm install

# Add .env variables:
# NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
# CLERK_SECRET_KEY=
# RESEND_API_KEY=

# Run project
npm run dev
