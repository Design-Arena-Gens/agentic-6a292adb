# AI for Humans Blog

An autonomous blogging and SEO expert agent that simplifies AI for everyone by posting easy-to-understand articles daily.

## 🎯 Mission

To simplify AI for everyone by posting one easy-to-understand article daily at 10:00 AM. Each post explains the latest AI news or breakthroughs as if explaining to a 5-year-old, making complex ideas fun, friendly, and crystal clear.

## 🚀 Live Site

**Production URL:** https://agentic-6a292adb.vercel.app

## ✨ Features

### Core Functionality

- **Daily Publishing Routine (10:00 AM):**
  - Scans trusted tech and AI news sources
  - Selects trending AI topics
  - Writes 500-800 word blog posts in ELI5 (Explain Like I'm 5) style
  - Includes "What this means for humans" summary

- **SEO Optimization:**
  - Optimized meta titles and descriptions
  - Target keywords based on AI-related search volumes
  - Internal linking suggestions
  - Social sharing captions for Twitter/X, LinkedIn, and Threads

- **Admin Dashboard:**
  - View trending AI topics
  - Generate posts on demand
  - Monitor automation schedule
  - Track post statistics

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Deployment:** Vercel
- **Analytics:** Vercel Analytics

## 📝 Usage

### Generate a Post Manually

Visit the Admin Dashboard and click "Generate New Post" to create a new blog post from trending AI topics.

### API Endpoints

- `GET /api/posts` - List all blog posts
- `GET /api/trending` - Get trending AI topics
- `POST /api/generate` - Generate a new blog post
- `GET /api/cron` - Automated cron job endpoint (scheduled for 10:00 AM daily)

## 🎨 Content Style

### Voice & Tone
- Simple, friendly, human-like, warm tone
- Explains concepts as if to a curious 5-year-old or non-technical adult
- No jargon unless explained
- Avoids robotic or corporate phrasing

### Post Structure
- Title: Simple and attractive
- Body: 500-800 words in plain English with metaphors and analogies
- Summary: "What this means for humans" section
- SEO: Optimized metadata and keywords
- Social: Ready-to-use captions for sharing

---

**Built with ❤️ to make AI accessible to everyone**

*New post every day at 10:00 AM*
