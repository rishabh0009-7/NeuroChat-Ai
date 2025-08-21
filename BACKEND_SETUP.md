# NeuroChat Backend Setup Guide

This guide will help you set up the complete backend infrastructure for NeuroChat, including PostgreSQL database, Prisma ORM, NextAuth.js authentication, and OpenRouter AI integration.

## 🏗️ Architecture Overview

```
Frontend (Next.js 15) → API Routes → Database Service → Prisma → PostgreSQL
                              ↓
                    OpenRouter API → Multiple AI Models
                              ↓
                    NextAuth.js → Authentication
```

## 📋 Prerequisites

- Node.js 18+ and npm
- PostgreSQL database (local or cloud)
- OpenRouter API key
- OAuth provider credentials (Google/GitHub - optional)

## 🗄️ Database Setup

### Option 1: Local PostgreSQL

1. **Install PostgreSQL**
   ```bash
   # macOS (using Homebrew)
   brew install postgresql
   brew services start postgresql
   
   # Ubuntu/Debian
   sudo apt update
   sudo apt install postgresql postgresql-contrib
   sudo systemctl start postgresql
   
   # Windows
   # Download from https://www.postgresql.org/download/windows/
   ```

2. **Create Database**
   ```bash
   sudo -u postgres psql
   CREATE DATABASE chatbot;
   CREATE USER chatbot_user WITH PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE chatbot TO chatbot_user;
   \q
   ```

### Option 2: Cloud PostgreSQL

Choose one of these providers:

- **Neon** (PostgreSQL): https://neon.tech
- **Supabase** (PostgreSQL): https://supabase.com
- **Railway** (PostgreSQL): https://railway.app
- **Render** (PostgreSQL): https://render.com

Get your connection string in the format:
```
postgresql://username:password@host:port/database
```

## 🔧 Environment Configuration

1. **Copy environment template**
   ```bash
   cp env.local.example .env.local
   ```

2. **Update `.env.local`**
   ```bash
   # Database
   DATABASE_URL="postgresql://username:password@host:port/database"
   
   # NextAuth
   NEXTAUTH_SECRET="generate-a-random-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   
   # OpenRouter (AI Models)
   OPENROUTER_API_KEY="sk-xxxx"
   
   # OAuth (optional)
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   GITHUB_ID="your-github-client-id"
   GITHUB_SECRET="your-github-client-secret"
   ```

3. **Generate NextAuth secret**
   ```bash
   openssl rand -base64 32
   ```

## 🚀 Database Initialization

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Generate Prisma client**
   ```bash
   npm run db:generate
   ```

3. **Push database schema**
   ```bash
   npm run db:push
   ```

4. **Seed database (optional)**
   ```bash
   npm run db:seed
   ```

5. **Or run the complete setup script**
   ```bash
   npm run db:setup
   ```

## 🔑 OpenRouter API Setup

1. **Sign up at OpenRouter**: https://openrouter.ai
2. **Get your API key** from the dashboard
3. **Add to environment**: `OPENROUTER_API_KEY=sk-xxxx`

OpenRouter provides access to:
- OpenAI models (GPT-4, GPT-4o, GPT-4o Mini)
- Anthropic models (Claude 3.5 Sonnet, Claude 3 Opus)
- Google models (Gemini 2.0 Flash, Gemini 2.0 Pro)
- Mistral models (Mistral Large, Mistral Medium)
- DeepSeek models (DeepSeek Chat)
- Meta models (Llama 3.1 8B, Llama 3.1 70B)

## 🔐 Authentication Setup

### Google OAuth (Optional)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Copy Client ID and Client Secret to `.env.local`

### GitHub OAuth (Optional)

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Create a new OAuth App
3. Set Homepage URL: `http://localhost:3000`
4. Set Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
5. Copy Client ID and Client Secret to `.env.local`

## 🧪 Testing the Backend

1. **Start the development server**
   ```bash
   npm run dev
   ```

2. **Test API endpoints**
   ```bash
   # Get available models
   curl http://localhost:3000/api/models
   
   # Get analytics (requires auth)
   curl http://localhost:3000/api/analytics
   
   # Get sessions (requires auth)
   curl http://localhost:3000/api/sessions
   ```

3. **Open Prisma Studio** (database browser)
   ```bash
   npm run db:studio
   ```

## 📊 Database Schema

The application uses these main tables:

- **User**: Authentication and user management
- **Session**: Chat sessions (single/compare mode)
- **Message**: Individual chat messages
- **UsageLog**: AI model usage tracking
- **Account**: OAuth provider accounts
- **Session_auth**: NextAuth.js sessions

## 🔧 Available Scripts

```bash
# Database operations
npm run db:generate    # Generate Prisma client
npm run db:push        # Push schema to database
npm run db:seed        # Seed with sample data
npm run db:setup       # Complete database setup
npm run db:studio      # Open Prisma Studio
npm run db:migrate     # Create and apply migrations
npm run db:reset       # Reset database

# Development
npm run dev            # Start development server
npm run build          # Build for production
npm run start          # Start production server
npm run lint           # Run ESLint
```

## 🚨 Troubleshooting

### Common Issues

1. **Database connection failed**
   - Check `DATABASE_URL` format
   - Ensure PostgreSQL is running
   - Verify user permissions

2. **Prisma client not generated**
   ```bash
   npm run db:generate
   ```

3. **Authentication errors**
   - Verify `NEXTAUTH_SECRET` is set
   - Check OAuth provider credentials
   - Ensure redirect URIs match

4. **OpenRouter API errors**
   - Verify `OPENROUTER_API_KEY` is valid
   - Check API key permissions
   - Ensure sufficient credits

### Reset Everything

```bash
# Reset database
npm run db:reset

# Clean install
rm -rf node_modules package-lock.json
npm install

# Regenerate Prisma client
npm run db:generate
```

## 🚀 Production Deployment

### Vercel + External PostgreSQL

1. **Deploy to Vercel**
   ```bash
   npm run build
   vercel --prod
   ```

2. **Set environment variables** in Vercel dashboard
3. **Use external PostgreSQL** (Neon, Supabase, Railway)
4. **Update `DATABASE_URL`** to production database
5. **Set `NEXTAUTH_URL`** to your domain

### Environment Variables for Production

```bash
DATABASE_URL="postgresql://user:password@prod-host:5432/chatbot"
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="your-production-secret"
OPENROUTER_API_KEY="sk-xxxx"
```

## 📚 API Documentation

### Authentication Required Endpoints

- `POST /api/chat` - Single model chat
- `POST /api/chat/compare` - Multi-model comparison
- `GET /api/sessions` - List user sessions
- `POST /api/sessions` - Create new session
- `GET /api/sessions/[id]` - Get session details
- `PUT /api/sessions/[id]` - Update session
- `DELETE /api/sessions/[id]` - Delete session
- `GET /api/analytics` - User analytics

### Public Endpoints

- `GET /api/models` - Available AI models
- `GET /api/auth/*` - NextAuth.js endpoints

## 🎯 Next Steps

1. **Test the backend** with sample data
2. **Integrate with frontend** components
3. **Add rate limiting** and error handling
4. **Implement user management** features
5. **Add monitoring** and logging
6. **Set up CI/CD** pipeline

## 📞 Support

- **Prisma**: https://prisma.io/docs
- **NextAuth.js**: https://next-auth.js.org
- **OpenRouter**: https://openrouter.ai/docs
- **PostgreSQL**: https://www.postgresql.org/docs

---

**Happy coding! 🚀**
