# 🌱 Project Exodus

**Building the world's most accessible sustainability hub.**

A complete, production-ready platform that disrupts the current web through unprecedented interactivity, depth, and visual distinctiveness. Made with 🌱 by Sage.

---

## ✨ What We've Built So Far

### Session 1 - Foundation & Design (2025-11-17)

**🎨 Design System**
- Custom earthy color palette (Moss, Earth, Terra, Ocean, Sand)
- Organic, natural aesthetic with personality
- Smooth animations and transitions
- Glass effects, gradients, and living elements
- Full dark mode support
- Custom scrollbar and selection styles

**🏗️ Core Infrastructure**
- Next.js 14 with App Router + TypeScript
- Tailwind CSS v4 with custom theme
- Prisma ORM with comprehensive schema (30+ models)
- Production-ready file structure

**🎯 Homepage**
- Immersive hero section with animated gradients
- Mission statement and value propositions
- Stats showcase
- Call-to-action sections
- Responsive footer

**📦 Database Schema**
30+ interconnected models including:
- User authentication & profiles
- Product directory with sustainability metrics
- Educational content management
- Community forums with nested replies
- Social features (follows, badges, projects)
- Admin logging & moderation
- Notifications & email templates

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- PostgreSQL database (we recommend [Neon](https://neon.tech) free tier)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/JohnnyDo3/ProjectExodus.git
   cd ProjectExodus
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

   Then edit `.env` and add:
   - `DATABASE_URL` - Your PostgreSQL connection string
   - `NEXTAUTH_SECRET` - Generate with: `openssl rand -base64 32`
   - Other optional services (Cloudinary, Resend, etc.)

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open [http://localhost:3000](http://localhost:3000)**

---

## 🎨 Design Philosophy

**"Sustainable Home"** - A living, breathing ecosystem within a website.

- **Aesthetic**: Natural, organic, earth-first - but NOT minimalist or boring
- **Feeling**: Should feel like coming HOME to a sustainable future
- **Vibe**: Think bio-architecture meets digital space
- **Distinctiveness**: Absolutely different from current web standards

**Color Palette**:
- **Moss** (#489450): Vibrant life, growth
- **Earth** (#8c7a62): Warm, grounded
- **Terra** (#d46643): Warm terracotta accent
- **Ocean** (#429393): Deep trust, calm
- **Sand** (#fafaf9): Soft, natural backgrounds

---

## 📋 What's Next

### Immediate Priorities
1. ✅ Foundation & Design System
2. 🔄 Database setup & migrations
3. ⏳ Navigation & Layout components
4. ⏳ Admin panel foundation
5. ⏳ Product management system
6. ⏳ User authentication (NextAuth.js)
7. ⏳ Educational content system
8. ⏳ Community forums
9. ⏳ Real content & data
10. ⏳ 3D elements & advanced animations
11. ⏳ SEO & performance optimization
12. ⏳ Security measures
13. ⏳ Production deployment

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion + GSAP
- **3D Graphics**: Three.js / React Three Fiber (planned)
- **UI Components**: Radix UI
- **Forms**: React Hook Form + Zod
- **Charts**: Recharts
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js (Next.js API Routes)
- **Database**: PostgreSQL (Neon - serverless)
- **ORM**: Prisma
- **Auth**: NextAuth.js v5
- **File Storage**: Cloudinary (planned)
- **Email**: Resend (planned)

### DevOps
- **Hosting**: Vercel
- **Version Control**: Git + GitHub
- **Package Manager**: npm

**Why This Stack?**
- ✅ Budget-friendly (generous free tiers)
- ✅ Scalable (free to enterprise)
- ✅ Best-in-class DX
- ✅ Edge-first performance
- ✅ End-to-end TypeScript

---

## 📊 Database Schema

**Key Model Groups:**
1. **Authentication** (4 models): User, Account, Session, VerificationToken
2. **Products** (11 models): Full product management with sustainability metrics
3. **Content** (6 models): Article system with categories and tags
4. **Community** (6 models): Forum with nested replies and moderation
5. **Social** (4 models): User follows, badges, gamification
6. **Projects** (3 models): Collaborative sustainability initiatives
7. **System** (6 models): Notifications, reports, admin logs, email templates

**Key Features:**
- Hierarchical categories
- Comprehensive sustainability tracking
- Nested comment/reply systems
- Full moderation and reporting
- Flexible JSON fields for extensibility
- Optimized indexes

See `prisma/schema.prisma` for the complete schema.

---

## 🤝 Contributing

This project is currently in active development. Check back soon for contribution guidelines!

---

## 📄 License

TBD

---

## 🌍 Our Mission

Making sustainability accessible, understandable, and actionable for everyone. One product, one article, one community at a time.

**Let's build something extraordinary. Let's build Project Exodus.**

---

Made with 🌱 by Sage • 2025
