# UniMS - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Prerequisites
- Node.js 18+ installed
- PostgreSQL 14+ installed (or use Docker)
- Git installed

### Option 1: Quick Start (Without Database)

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) - You'll see the dashboard!

> **Note**: Without database setup, some features won't work, but you can explore the UI, navigation, and timetable drag-and-drop functionality.

### Option 2: Full Setup with Docker (Recommended)

```bash
# 1. Install dependencies
npm install

# 2. Copy environment file
cp .env.example .env

# 3. Start PostgreSQL and Redis with Docker
npm run docker:up

# 4. Generate Prisma client
npm run db:generate

# 5. Push database schema
npm run db:push

# 6. Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### Option 3: Manual Database Setup

```bash
# 1. Install dependencies
npm install

# 2. Create PostgreSQL database
createdb unims

# 3. Copy and configure .env
cp .env.example .env
# Edit .env and set: DATABASE_URL="postgresql://user:password@localhost:5432/unims"

# 4. Generate Prisma client
npm run db:generate

# 5. Push database schema
npm run db:push

# 6. Start development server
npm run dev
```

## 📱 Exploring the Application

### 1. Dashboard
- Navigate to `/dashboard`
- View statistics, quick actions, recent activities
- Explore the responsive layout

### 2. Timetable (Star Feature)
- Go to **Timetable** → **Class Schedule**
- Drag subjects from the left panel to time slots
- Watch real-time conflict detection
- Try the "Auto-Generate" button
- Use Undo/Redo buttons
- Check the stats dashboard

### 3. Students
- Go to **Students** → **All Students**
- Browse the student list
- Use search and filters
- View statistics

### 4. Navigation
- Click the sidebar toggle button (bottom left) to collapse/expand
- Try the theme toggle in the header (moon/sun icon)
- Click notifications bell to see dropdown
- Test mobile responsiveness (resize browser)

## 🎨 Customization

### Change Primary Color

Edit `app/globals.css`:

```css
:root {
  --primary: 221.2 83.2% 53.3%; /* Change these HSL values */
}
```

### Add New Module to Sidebar

Edit `components/layout/sidebar-nav.tsx`:

```typescript
const navigationItems: NavItem[] = [
  // ... existing items
  {
    title: "Your Module",
    icon: YourIcon,
    href: "/your-module",
    badge: 5, // Optional
  },
];
```

### Create New Page

```bash
# Create directory
mkdir -p app/(main)/your-module

# Create page
touch app/(main)/your-module/page.tsx
```

```typescript
export default function YourModulePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Your Module</h1>
      {/* Your content */}
    </div>
  );
}
```

## 🧪 Development Tips

### View Database
```bash
npm run db:studio
```
Opens Prisma Studio at [http://localhost:5555](http://localhost:5555)

### Check Logs
```bash
# View Docker logs
docker-compose logs -f

# View specific service
docker-compose logs -f postgres
```

### Hot Reload
Next.js automatically hot reloads when you save files. No need to restart!

### Type Checking
```bash
# Run TypeScript type check
npx tsc --noEmit
```

## 🐛 Common Issues

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 npm run dev
```

### Database Connection Error
```bash
# Check if PostgreSQL is running
docker-compose ps

# Restart services
docker-compose restart
```

### Prisma Client Not Generated
```bash
npm run db:generate
```

### Module Not Found Error
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
```

## 📚 Next Steps

1. **Explore the Code**
   - Check `components/timetable/` for drag-and-drop implementation
   - Look at `types/index.ts` for TypeScript definitions
   - Review `prisma/schema.prisma` for database structure

2. **Read Documentation**
   - [README.md](./README.md) - Complete feature list
   - [ARCHITECTURE.md](./ARCHITECTURE.md) - System architecture
   - [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md) - Development roadmap
   - [FEATURES.md](./FEATURES.md) - Detailed feature breakdown

3. **Extend the System**
   - Implement authentication (NextAuth.js recommended)
   - Add API routes for CRUD operations
   - Create forms with validation (Zod)
   - Add more pages and features

4. **Deploy**
   - Frontend: Vercel (recommended for Next.js)
   - Backend: Railway, Render, or AWS
   - Database: Managed PostgreSQL (Supabase, Neon, or AWS RDS)

## 🎯 Feature Highlights

### What Works Right Now
✅ Complete UI/UX with 20+ modules  
✅ Responsive design (mobile, tablet, desktop)  
✅ Dark/Light mode  
✅ Advanced timetable with drag-and-drop  
✅ Real-time conflict detection  
✅ Dashboard with statistics  
✅ Student management interface  
✅ Database schema ready  

### Coming Soon
🚧 Authentication & Authorization  
🚧 API endpoints  
🚧 Real data integration  
🚧 Complete CRUD operations  
🚧 More modules implementation  

## 💡 Pro Tips

1. **Use Keyboard Shortcuts**
   - The search bar is designed for `⌘K` shortcut (to be implemented)
   - Sidebar can be toggled with keyboard

2. **Mobile Testing**
   - Open Chrome DevTools
   - Toggle device toolbar (Ctrl+Shift+M)
   - Test on various screen sizes

3. **Component Reuse**
   - Check `components/ui/` for reusable components
   - Use the `cn()` utility for className management

4. **State Management**
   - Timetable uses React hooks for state
   - For complex state, Zustand is available

5. **Styling**
   - Use Tailwind utility classes
   - Follow the existing design system
   - Check `globals.css` for custom CSS variables

## 🤝 Need Help?

- Check the comprehensive [README.md](./README.md)
- Review [ARCHITECTURE.md](./ARCHITECTURE.md) for system design
- Look at existing components for examples
- Refer to [Next.js Documentation](https://nextjs.org/docs)

## 🎉 Enjoy Building!

This is a solid foundation for a world-class University Management System. The timetable module alone demonstrates production-ready code with advanced features like drag-and-drop and conflict detection.

Build amazing features on top of this foundation! 🚀
