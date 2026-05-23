# Next.js SaaS Starter

A production-ready, minimal SaaS boilerplate built with Next.js 14, TypeScript, Prisma, and Tailwind CSS.

## 🚀 Features

- **Authentication**: Email/password + Google OAuth via NextAuth
- **Database**: PostgreSQL with Prisma ORM
- **AI Integration**: Google Gemini AI agent
- **UI**: Modern, responsive design with Tailwind CSS
- **TypeScript**: Full type safety
- **Production Ready**: Optimized build configuration

## 📁 Project Structure

```
/app
  /auth
    /signin          # Sign in page
    /signup          # Sign up page
  /dashboard         # Protected dashboard
  /agent             # AI chat interface
  /api
    /auth            # Authentication endpoints
    /agent           # AI agent API
  /page.tsx          # Landing page

/prisma
  /schema.prisma     # Database schema

/lib
  /auth.ts           # Auth utilities
  /prisma.ts         # Prisma client

/components          # Reusable UI components
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ (22.x recommended)
- PostgreSQL database
- Google Gemini API key (for AI features)
- Google OAuth credentials (optional, for OAuth)

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd next-saas-starter
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

   Update `.env` with your values:
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `NEXTAUTH_SECRET`: Generate with `openssl rand -base64 32`
   - `GEMINI_API_KEY`: Your Google Gemini API key
   - `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET`: For OAuth (optional)

4. **Set up the database**

   ```bash
   npm run prisma:migrate
   npm run prisma:generate
   ```

5. **Run the development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000)

## 📝 Database Schema

The starter includes these models:

- **User**: Core user data with auth support
- **Account**: NextAuth OAuth accounts
- **Session**: NextAuth sessions
- **VerificationToken**: NextAuth verification
- **Project**: Generic project/workspace model
- **Conversation**: AI chat history
- **Message**: Individual chat messages

## 🔒 Authentication

### Email/Password

- Users can sign up with email and password
- Passwords are hashed with bcrypt
- JWT tokens for session management

### Google OAuth

- Integrated via NextAuth
- Optional - works alongside email/password
- Configure in `.env` with Google Cloud credentials

## 🤖 AI Agent

The AI agent uses Google Gemini for chat completions:

- Generic chat interface
- Conversation history
- Easily customizable for your use case

## 🎨 Customization

### Branding

Update these files with your branding:

- [app/page.tsx](app/page.tsx) - Landing page
- [app/dashboard/page.tsx](app/dashboard/page.tsx) - Dashboard
- Component strings throughout the app

### Database Models

Add your business models to [prisma/schema.prisma](prisma/schema.prisma):

```prisma
model YourModel {
  id        Int      @id @default(autoincrement())
  userId    Int      @map("user_id")
  user      User     @relation(fields: [userId], references: [id])
  // ... your fields
}
```

Then run:

```bash
npm run prisma:migrate
npm run prisma:generate
```

### AI Agent

Customize the AI agent in [app/api/agent/route.ts](app/api/agent/route.ts):

- Add system prompts
- Implement context awareness
- Add tool calling
- Store conversation history

## 📦 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy

### Other Platforms

The app works on any Node.js hosting:

- Build: `npm run build`
- Start: `npm start`
- Ensure PostgreSQL is accessible

## 🧹 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:studio` - Open Prisma Studio

## 🔧 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: NextAuth
- **AI**: Google Gemini
- **UI Components**: Radix UI + Custom

## 📄 License

MIT License - feel free to use this starter for any project!

## 🤝 Contributing

This is a starter template. Fork it and make it your own!

## 💡 Tips

1. **Remove what you don't need**: This is a starter - delete unused features
2. **Add what you need**: Build your unique features on this foundation
3. **Update branding**: Search for "SaaS Starter" and replace with your brand
4. **Customize the landing page**: Make it compelling for your use case
5. **Add your business logic**: Use the Project model or add your own models

## 🚀 What's Next?

- Add your business logic
- Customize the UI to match your brand
- Add payment integration (Stripe, etc.)
- Implement team/organization features
- Add email notifications
- Set up monitoring and analytics

---

**Built for developers, by developers.** Ship faster, focus on what matters. 🎉
