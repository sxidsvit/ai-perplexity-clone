# AI Perplexity Clone

A modern, open-source web application inspired by Perplexity AI, delivering real-time, AI-powered question answering with seamless user experiences and robust background task automation.

[Live Demo](https://ai-perplexity-clone.vercel.app) 

---

![Demo](demo.gif)

---

## 🚀 Features

- **Real-Time AI Responses**: Powered by Gemini AI for accurate, context-aware answers.
- **Internet Search Integration**: Utilizes the [Brave Web Search API](https://api-dashboard.search.brave.com/app/documentation/web-search/get-started) for fast, privacy-focused web searches.
- **Event-Driven Workflows**: Leverages Inngest for reliable, scalable background tasks.
- **Secure Authentication**: Managed by Clerk for seamless user sign-in and sign-up.
- **Scalable Backend**: Built with Supabase for PostgreSQL, real-time APIs, and storage.
- **Modern Frontend**: Crafted with Next.js, React, Tailwind CSS, and Shadcn UI for a responsive, intuitive interface.
- **Effortless Deployment**: Hosted on Vercel with automatic scaling and zero-downtime updates.

## 🛠️ Technologies Used

- **Next.js**: React framework for server-side rendering, API routes, and optimized performance.
- **Tailwind CSS & Shadcn UI**: For rapid, responsive styling and pre-built UI components.
- **Clerk**: Secure, user-friendly authentication and session management.
- **Inngest**: Event-driven platform for reliable workflows and AI task automation.
- **Supabase**: Open-source Backend-as-a-Service with PostgreSQL, real-time APIs, and serverless functions.
- **Gemini AI**: Advanced language model for generating intelligent, personalized responses.
- **Brave Web Search API**: Privacy-respecting API for web search capabilities.
- **Vercel**: Simplified deployment, hosting, and scaling for web applications.

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or Yarn
- Accounts for Clerk, Supabase, Inngest, Gemini AI, Brave, and Vercel (for deployment)

## ⚙️ Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/sxidsvit/ai-perplexity-clone.git
   cd ai-perplexity-clone
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env.local` file in the root directory and add the following:
   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
   CLERK_SECRET_KEY=
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
   NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/

   NEXT_PUBLIC_SUPABASE_URL=
   NEXT_PUBLIC_SUPABASE_KEY=

   BRAVE_API_KEY=

   GEMINI_API_KEY=
   NEXT_PUBLIC_GEMINI_API_KEY=

   INNGEST_SIGNING_KEY=
   INNGEST_SERVER_HOST=
   ```

4. **Run the Inngest Development Server**:
   In a separate terminal, start the Inngest local development server:
   ```bash
   npx inngest-cli@latest dev
   ```

5. **Run the Application Development Server**:
   In the main terminal, start the Next.js development server:
   ```bash
   npm run dev
   ```

6. **Access the App**:
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚀 Deployment

Deploy to Vercel in just a few steps:

1. Push your repository to GitHub.
2. Connect your repository to Vercel via the Vercel dashboard.
3. Configure environment variables in Vercel.
4. Deploy with:
   ```bash
   npm run build
   vercel --prod
   ```

Alternatively, use Vercel’s GitHub integration for automatic deployments on every push.

## 📬 Contact

Connect with the project maintainer:

[<img alt="Sergiy Antonyuk | LinkedIn" src="https://img.shields.io/badge/LinkedIn-0077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white" />][linkedin]

[linkedin]: https://www.linkedin.com/in/sergiy-antonyuk/

## 🙏 Acknowledgements

A heartfelt thank you to [Tubeguruji](https://www.youtube.com/@tubeguruji) for their inspiring tutorials and invaluable contributions to the developer community.

---
