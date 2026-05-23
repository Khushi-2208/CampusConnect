# Architecture Overview - Next.js SaaS Starter

## 🏗️ Architecture Principles

This starter follows clean architecture principles:

- **Separation of Concerns**: UI, business logic, and data layers are separated
- **Type Safety**: Full TypeScript coverage
- **API-First**: RESTful API routes for all operations
- **Scalable**: Easy to extend with new features

## 📊 System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     Client Layer                         │
├─────────────────────────────────────────────────────────┤
│  Landing Page  │  Auth Pages  │  Dashboard  │  AI Agent │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│                   Next.js App Router                     │
├─────────────────────────────────────────────────────────┤
│         Server Components + Client Components            │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│                      API Layer                           │
├─────────────────────────────────────────────────────────┤
│  /api/auth/*  │  /api/agent  │  /api/users/*           │
└─────────────────────────────────────────────────────────┘
                            ↓
┌──────────────────────┬──────────────────────────────────┐
│   Authentication     │      Business Logic              │
│     (NextAuth)       │    (Your Services)               │
└──────────────────────┴──────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│                  Data Access Layer                       │
│                   (Prisma ORM)                          │
└─────────────────────────────────────────────────────────┘
                            ↓
┌────────────────┬──────────────────┬────────────────────┐
│   PostgreSQL   │   Google Gemini  │  External APIs     │
│   Database     │   (AI)           │  (Future)          │
└────────────────┴──────────────────┴────────────────────┘
```

## 🗂️ Folder Structure

```
next-saas-starter/
├── app/                      # Next.js App Router
│   ├── page.tsx             # Landing page
│   ├── layout.tsx           # Root layout
│   ├── globals.css          # Global styles
│   ├── auth/                # Authentication pages
│   │   ├── signin/
│   │   │   └── page.tsx    # Sign in page
│   │   └── signup/
│   │       └── page.tsx    # Sign up page
│   ├── dashboard/
│   │   └── page.tsx        # Protected dashboard
│   ├── agent/
│   │   └── page.tsx        # AI chat interface
│   └── api/                # API routes
│       ├── auth/           # Auth endpoints
│       │   ├── [...nextauth]/  # NextAuth handler
│       │   ├── login/
│       │   ├── logout/
│       │   ├── signup/
│       │   └── register/
│       ├── agent/          # AI agent endpoint
│       │   └── route.ts
│       └── users/          # User management
│
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── migrations/         # Database migrations
│
├── lib/                    # Core utilities
│   ├── auth.ts            # Auth utilities
│   ├── auth-config.ts     # NextAuth config
│   ├── prisma.ts          # Prisma client
│   └── utils.ts           # Helper functions
│
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── auth/             # Auth-related components
│   └── layout/           # Layout components
│
├── types/                # TypeScript types
│   └── next-auth.d.ts   # NextAuth type extensions
│
├── public/               # Static assets
│
├── .env.example         # Environment variables template
├── package.json         # Dependencies
├── tsconfig.json        # TypeScript config
└── tailwind.config.js   # Tailwind config
```

## 🔐 Authentication Flow

```
User Registration:
1. User fills signup form → /auth/signup
2. POST /api/auth/signup
3. Password hashed with bcrypt
4. User created in database
5. JWT token generated
6. Redirect to dashboard

User Login:
1. User fills login form → /auth/signin
2. POST /api/auth/login
3. Credentials verified
4. JWT token generated
5. Redirect to dashboard

Google OAuth:
1. User clicks "Sign in with Google"
2. Redirect to Google OAuth
3. Google callback → /api/auth/callback/google
4. User created/updated in database
5. Session created
6. Redirect to dashboard
```

## 🤖 AI Agent Flow

```
User Chat:
1. User types message → /agent
2. POST /api/agent { message }
3. Call Google Gemini API
4. Stream/Return response
5. Display in chat UI
6. (Optional) Save to database
```

## 📊 Database Schema

```
User (Core user model)
├── id (Primary Key)
├── email (Unique)
├── passwordHash (Optional for OAuth)
├── name
├── image
├── emailVerified
├── preferences (notifications, etc.)
├── createdAt
├── updatedAt
├── accounts[] (OAuth accounts)
├── sessions[] (Active sessions)
├── projects[] (User's projects)
└── conversations[] (AI chats)

Project (Generic workspace/project)
├── id (Primary Key)
├── name
├── description
├── userId (Foreign Key → User)
├── createdAt
└── updatedAt

Conversation (AI chat history)
├── id (Primary Key)
├── userId (Foreign Key → User)
├── title
├── messages[]
├── createdAt
└── updatedAt

Message (Individual chat messages)
├── id (Primary Key)
├── conversationId (Foreign Key → Conversation)
├── role (user | assistant)
├── content
└── createdAt

Account (NextAuth OAuth)
├── id (Primary Key)
├── userId (Foreign Key → User)
├── provider
├── providerAccountId
└── tokens (access_token, refresh_token, etc.)

Session (NextAuth sessions)
├── id (Primary Key)
├── sessionToken (Unique)
├── userId (Foreign Key → User)
└── expires

VerificationToken (Email verification)
├── identifier
├── token (Unique)
└── expires
```

## 🎯 Key Design Decisions

### 1. Next.js App Router

- **Why**: Latest Next.js architecture with RSC support
- **Benefits**: Better performance, simpler data fetching
- **Trade-offs**: Learning curve for those familiar with Pages Router

### 2. Prisma ORM

- **Why**: Type-safe database access, excellent DX
- **Benefits**: Auto-generated types, migrations, studio
- **Trade-offs**: Slightly slower than raw SQL for complex queries

### 3. NextAuth

- **Why**: Industry standard for Next.js auth
- **Benefits**: Built-in OAuth, session management
- **Trade-offs**: Some customization complexity

### 4. Tailwind CSS

- **Why**: Utility-first, highly productive
- **Benefits**: Fast development, small bundle size
- **Trade-offs**: HTML can look cluttered

### 5. Google Gemini

- **Why**: Free tier, good performance
- **Benefits**: Easy to integrate, powerful AI
- **Trade-offs**: Could swap for OpenAI, Claude, etc.

## 🚀 Extensibility Points

### Add New Features

1. **Payment Integration**: Add Stripe/Paddle in `/api/payments/`
2. **Email Service**: Add SendGrid/Resend in `/lib/email.ts`
3. **File Uploads**: Add S3/Cloudinary in `/api/uploads/`
4. **Teams**: Add Team model and invite system
5. **Analytics**: Add PostHog/Mixpanel tracking

### Customize AI Agent

1. **Add Context**: Include user data in prompts
2. **Tool Calling**: Let AI call your APIs
3. **RAG**: Add vector database for knowledge base
4. **Multi-turn**: Save conversation history
5. **Streaming**: Implement streaming responses

### Scale Database

1. **Indexing**: Add indexes for performance
2. **Caching**: Add Redis for frequently accessed data
3. **Read Replicas**: Set up for read-heavy workloads
4. **Sharding**: Partition data by user/tenant

## 🎨 UI/UX Patterns

### Page Structure

```tsx
export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <nav>...</nav> {/* Navigation */}
      <main>...</main> {/* Main content */}
      <footer>...</footer> {/* Footer */}
    </div>
  );
}
```

### Form Pattern

```tsx
const [isLoading, setIsLoading] = useState(false);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    const response = await fetch("/api/endpoint", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error();

    toast.success("Success!");
    router.push("/next-page");
  } catch (error) {
    toast.error("Error message");
  } finally {
    setIsLoading(false);
  }
};
```

### API Route Pattern

```tsx
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    if (!body.field) {
      return NextResponse.json({ error: "Field is required" }, { status: 400 });
    }

    // Business logic
    const result = await doSomething(body);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
```

## 📈 Performance Optimization

### Implemented

- ✅ Next.js automatic code splitting
- ✅ Image optimization with next/image
- ✅ Font optimization
- ✅ CSS-in-JS avoided (using Tailwind)
- ✅ Database connection pooling

### Future Optimizations

- 🔄 Add React Query for client-side caching
- 🔄 Implement ISR for landing page
- 🔄 Add Redis for session storage
- 🔄 Optimize bundle size with dynamic imports
- 🔄 Add CDN for static assets

## 🔒 Security Checklist

### Implemented

- ✅ Password hashing (bcrypt)
- ✅ SQL injection prevention (Prisma)
- ✅ CSRF protection (NextAuth)
- ✅ Secure session handling
- ✅ Environment variable protection

### Best Practices

- 🔒 Never expose API keys client-side
- 🔒 Validate all user input
- 🔒 Use HTTPS in production
- 🔒 Implement rate limiting
- 🔒 Regular dependency updates
- 🔒 Audit logs for sensitive operations

## 🎉 Success!

You now have a production-ready SaaS starter. Focus on building your unique features instead of boilerplate!

**Next Steps:**

1. Customize the branding
2. Add your business logic
3. Deploy to production
4. Ship to users!

Happy coding! 🚀
