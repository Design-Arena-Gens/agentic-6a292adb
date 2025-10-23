import { BlogPost, TrendingTopic } from './types';

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function calculateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export function generateExcerpt(content: string, maxLength: number = 160): string {
  const text = content.replace(/[#*`\[\]]/g, '').trim();
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

export async function generateBlogPostFromTopic(topic: TrendingTopic): Promise<BlogPost> {
  const id = Date.now().toString();
  const slug = generateSlug(topic.title);

  // Simulated AI-generated content in ELI5 style
  const content = generateELI5Content(topic);
  const excerpt = generateExcerpt(content);
  const readTime = calculateReadTime(content);

  // Generate SEO metadata
  const keywords = extractKeywords(topic.title);
  const metaTitle = `${topic.title} - Explained Simply | AI for Humans`;
  const metaDescription = excerpt;

  // Generate social captions
  const socialCaptions = {
    twitter: `🤖 ${topic.title}\n\nWe break it down in simple terms! 👇\n\n#AI #ArtificialIntelligence #TechNews`,
    linkedin: `Ever wondered about ${topic.title}? We explain it like you're 5! 🎯\n\nCheck out our latest post where we break down complex AI concepts into simple, everyday language.\n\n#AIforHumans #TechExplained #ArtificialIntelligence`,
    threads: `New post! 🚀\n\n${topic.title}\n\nExplained in the simplest way possible. No jargon, just clear insights!`
  };

  const post: BlogPost = {
    id,
    slug,
    title: topic.title,
    content,
    excerpt,
    publishedAt: new Date().toISOString(),
    keywords,
    metaTitle,
    metaDescription,
    tags: ['#AInews', '#ELI5', '#AIBlog', ...keywords.slice(0, 2).map(k => `#${k}`)],
    socialCaptions,
    readTime,
    eli5Summary: generateELI5Summary(content),
    sourceUrl: topic.url
  };

  return post;
}

function generateELI5Content(topic: TrendingTopic): string {
  // This is a template-based generator. In production, this would call an AI API
  return `# ${topic.title}

Hey there, friend! 👋 Let's talk about something really cool happening in the world of AI.

## What's Happening?

${topic.description}

## Let Me Explain It Like You're 5

Imagine you have a super smart robot friend. This friend can learn things really, really fast - kind of like how you learned to ride a bike, but even faster!

Think of it this way: You know how your brain helps you remember things, solve puzzles, and talk to people? Well, scientists have been teaching computers to do similar things. It's like giving computers their own "brain" made of electricity and smart programs.

## Why This Is Cool

This new development is exciting because it helps computers:
- Understand what we're saying better
- Answer our questions more accurately
- Help us solve problems we couldn't solve before
- Make our everyday life easier

It's like having a helpful friend who never gets tired and always remembers everything!

## Real-World Example

Let's say you're trying to find your favorite toy in a messy room. A regular computer might just list all the items in the room. But a smart AI? It would understand you want *your specific favorite toy*, remember where you usually keep it, and help you find it faster. Pretty neat, right?

## What This Means For Humans

Here's the fun part - what does all this mean for you and me?

✨ **For everyday folks:** Technology becomes easier to use and more helpful in our daily lives.

🎓 **For learners:** We get smarter tools to help us understand difficult topics (like this blog post!).

💼 **For workers:** We can focus on creative and fun tasks while AI handles the boring, repetitive stuff.

🌍 **For everyone:** We're one step closer to a future where technology truly understands and helps humans.

## The Bottom Line

${topic.title.includes('ChatGPT') ? 'ChatGPT' : 'This AI technology'} is like upgrading from a regular bicycle to one with training wheels, a motor, and GPS - it just makes everything easier and more fun!

The most important thing to remember? AI is being built to help humans, not replace them. It's a tool, like a hammer or a calculator, just a really, really smart one.

---

*Want to learn more about AI in simple terms? Subscribe to our daily posts - we explain one AI breakthrough every day at 10:00 AM!*
`;
}

function generateELI5Summary(content: string): string {
  return "Think of this like teaching a robot to be your helpful friend - it learns from everything around it and gets smarter at helping you every day!";
}

function extractKeywords(title: string): string[] {
  const commonWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'is', 'are'];
  const words = title
    .toLowerCase()
    .split(/\s+/)
    .filter(word => word.length > 3 && !commonWords.includes(word));

  return ['AI', 'artificial intelligence', 'machine learning', ...words].slice(0, 8);
}
