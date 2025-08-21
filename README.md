# NeuroChat - Multi-Model AI Chatbot MVP

A powerful, modern AI chatbot that allows you to compare multiple AI models side by side. Built with Next.js 15, Supabase, and TailwindCSS.

## ✨ Features

### 🚀 Core Functionality
- **Multi-Model Support**: Chat with GPT-4, Claude, Gemini, Mistral, DeepSeek, and Llama models
- **Comparison Mode**: Switch between single model chat and side-by-side model comparison
- **Real-time Streaming**: Experience AI responses with live typing effects
- **Session Management**: Save and manage chat conversations
- **Modern UI/UX**: Glassy, responsive design with dark/light mode support

### 📊 Analytics Dashboard
- **Usage Statistics**: Track total messages, costs, and active sessions
- **Performance Metrics**: Monitor latency and cost per model
- **Data Export**: CSV export functionality for analysis
- **Real-time Charts**: Visualize usage patterns over time

### 🔧 Technical Features
- **Next.js 15**: App Router, TypeScript, Server Actions, RSC
- **Supabase Integration**: PostgreSQL database with real-time capabilities
- **TailwindCSS**: Modern, responsive styling with glass morphism
- **Vercel Ready**: Zero-config deployment with automatic scaling

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: TailwindCSS 4, CSS Modules
- **Backend**: Supabase (PostgreSQL, Auth, Realtime)
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React
- **Deployment**: Vercel

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account

### 1. Clone and Install
```bash
git clone <your-repo-url>
cd neurochat
npm install
```

### 2. Set Up Supabase
1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Settings > API to get your project URL and anon key
3. Copy the SQL schema from `supabase/schema.sql` and run it in your Supabase SQL editor

### 3. Environment Variables
Copy `env.example` to `.env.local` and fill in your values:
```bash
cp env.example .env.local
```

Required variables:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## 📁 Project Structure

```
neurochat/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   └── chat/          # Chat endpoints
│   ├── dashboard/         # Analytics dashboard
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page
├── components/            # React components
│   ├── chat/             # Chat interface components
│   ├── dashboard/        # Analytics components
│   └── landing/          # Landing page components
├── lib/                  # Utility functions and configs
│   ├── supabase.ts       # Supabase client
│   ├── ai-providers.ts   # AI provider configurations
│   └── utils.ts          # Helper functions
├── supabase/             # Database schema and migrations
│   └── schema.sql        # PostgreSQL schema
└── public/               # Static assets
```

## 🎯 Key Components

### Chat Interface
- **ChatTabs**: Single model mode with tabbed navigation
- **ChatGrid**: Comparison mode with side-by-side model responses
- **ChatBubble**: Individual message display with model indicators
- **ChatInput**: Message input with action buttons (mic, upload, image)
- **ChatSidebar**: Session management and navigation

### Analytics Dashboard
- **Stats Cards**: Quick overview of usage metrics
- **Charts**: Visual representation of performance data
- **Data Table**: Detailed message history with metadata
- **Export Functionality**: CSV download for data analysis

## 🔌 API Endpoints

### `/api/chat`
- **POST**: Send message to single AI model
- **Streaming**: Real-time response streaming
- **Parameters**: `sessionId`, `model`, `message`

### `/api/chat/compare`
- **POST**: Compare responses across multiple models
- **Streaming**: Parallel response streaming
- **Parameters**: `sessionId`, `models[]`, `message`

## 🗄️ Database Schema

### Tables
- **sessions**: Chat sessions with mode and metadata
- **messages**: Individual chat messages with model info
- **usage_logs**: Cost and token tracking per request

### Features
- Row Level Security (RLS) for user data isolation
- Automatic timestamps and UUID primary keys
- Optimized indexes for performance
- User statistics functions

## 🎨 UI/UX Features

### Design System
- **Glass Morphism**: Modern, translucent UI elements
- **Gradient Backgrounds**: Subtle color transitions
- **Responsive Layout**: Mobile-first design approach
- **Dark/Light Mode**: Theme switching support

### Interactive Elements
- **Hover Effects**: Smooth transitions and animations
- **Loading States**: Skeleton screens and spinners
- **Feedback Buttons**: Thumbs up/down for responses
- **Real-time Updates**: Live typing indicators

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment
```bash
npm run build
npm start
```

## 🔮 Future Enhancements

### Planned Features
- **Authentication**: Supabase Auth with social login
- **Voice Input**: Speech-to-text integration
- **Image Generation**: AI image creation support
- **Rate Limiting**: Per-user daily limits
- **Team Collaboration**: Shared sessions and workspaces

### AI Provider Integration
- **OpenAI**: GPT-4, GPT-4o, GPT-3.5
- **Anthropic**: Claude 3.5, Claude 3 Opus
- **Google**: Gemini 2.0, Gemini 1.5 Pro
- **Mistral**: Large, Medium, Small models
- **DeepSeek**: Chat and Coder variants
- **Meta**: Llama 3.1 family

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check the code comments and component structure
- **Issues**: Report bugs and feature requests via GitHub Issues
- **Discussions**: Join community discussions for help and ideas

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Database powered by [Supabase](https://supabase.com/)
- Styling with [TailwindCSS](https://tailwindcss.com/)
- Charts by [Recharts](https://recharts.org/)
- Icons from [Lucide](https://lucide.dev/)

---

**NeuroChat** - Compare AI models, make informed decisions, and build the future of AI interaction. 🚀
