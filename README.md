# Medi-Solution

**Your Trusted Digital Medicine Guide**

A modern, dynamic, scalable, and premium medical information & medicine management platform for Bangladesh. Search and explore medicines from major pharmaceutical companies with detailed dosage, side effects, pricing, and usage guidelines.

## Features

- **Medicine Search** — Search by medicine name, generic name, company, or disease
- **Detailed Medicine Pages** — Dosage, side effects, precautions, pricing, storage, and alternatives
- **Company Profiles** — Browse Bangladesh's leading pharmaceutical companies
- **Medicine Comparison** — Compare price, dosage, and side effects side by side
- **Medical Blog** — Expert articles on health tips, drug awareness, and medicine safety
- **User Dashboard** — Save favorites, view history, set medicine reminders
- **Admin Dashboard** — Manage medicines, companies, categories, and blog posts
- **Dark Mode** — Professional medical dark theme
- **Responsive Design** — Optimized for mobile, tablet, and desktop
- **REST API** — Full API endpoints for medicines, companies, and search
- **SEO Optimized** — Dynamic meta tags, structured data, Open Graph support

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Fonts:** Poppins (headings) + Inter (body)

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/medicines` | List all medicines (supports `?q=`, `?category=`, `?page=`, `?limit=`) |
| GET | `/api/medicines/:id` | Get medicine details |
| GET | `/api/companies` | List all companies |
| GET | `/api/search?q=` | Search medicines |
| POST | `/api/auth/login` | User login |
| POST | `/api/auth/register` | User registration |

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Home page
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles & theme
│   ├── medicines/            # Medicine listing & details
│   ├── companies/            # Company listing & profiles
│   ├── blog/                 # Medical blog
│   ├── compare/              # Medicine comparison
│   ├── dashboard/            # User dashboard
│   ├── admin/                # Admin dashboard
│   ├── login/                # Login page
│   ├── register/             # Registration page
│   └── api/                  # REST API routes
├── components/               # Reusable UI components
└── lib/                      # Data, types, utilities
```

## Medical Disclaimer

> Medi-Solution provides medicine information for educational purposes only. Always consult a registered doctor or healthcare professional before taking any medicine.
