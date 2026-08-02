import fs from 'fs';
import path from 'path';

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  readingTime: string;
  content: string;
}

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts');

function parseFrontmatter(raw: string): { data: Record<string, any>; content: string } {
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };
  const [, fm, content] = match;
  const data: Record<string, any> = {};
  fm.split('\n').forEach(line => {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) return;
    const key = line.slice(0, colonIdx).trim();
    const rawVal = line.slice(colonIdx + 1).trim();
    if (rawVal.startsWith('[') && rawVal.endsWith(']')) {
      data[key] = rawVal.slice(1, -1).split(',').map(s => s.trim().replace(/^["']|["']$/g, '')).filter(Boolean);
    } else {
      data[key] = rawVal.replace(/^["']|["']$/g, '');
    }
  });
  return { data, content };
}

function mdToHtml(md: string): string {
  let html = md;
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="rounded-lg w-full my-6" loading="lazy" />');
  html = html.replace(/^### (.+)$/gm, '<h3 class="text-xl font-bold text-gray-900 mt-8 mb-3">$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold text-gray-900 mt-8 mb-4">$1</h1>');
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold">$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary-600 hover:text-primary-800 underline" rel="noopener">$1</a>');
  html = html.replace(/^- (.+)$/gm, '<li class="ml-6 list-disc mb-1">$1</li>');
  html = html.replace(/^\d+\. (.+)$/gm, '<li class="ml-6 list-decimal mb-1">$1</li>');
  html = html.replace(/^> (.+)$/gm, '<blockquote class="border-l-4 border-primary-400 pl-4 italic text-gray-600 my-4">$1</blockquote>');
  html = html.replace(/^---$/gm, '<hr class="my-8 border-gray-200" />');
  const blocks = html.split(/\n{2,}/);
  html = blocks.map(block => {
    const b = block.trim();
    if (!b) return '';
    if (/^<(h[1-6]|ul|ol|li|img|blockquote|hr|div|table)/.test(b)) return b;
    return '<p class="mb-4 text-gray-700 leading-relaxed">' + b.replace(/\n/g, ' ') + '</p>';
  }).join('\n');
  html = html.replace(/((?:<li[^>]*>[\s\S]*?<\/li>\n?)+)/g, '<ul class="my-4 space-y-1">$1</ul>');
  return html;
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'));
  const posts = files.map(file => {
    const raw = fs.readFileSync(path.join(POSTS_DIR, file), 'utf-8');
    const { data, content } = parseFrontmatter(raw);
    const wordCount = content.split(/\s+/).length;
    return {
      slug: file.replace(/\.md$/, ''),
      title: data.title || 'Untitled',
      description: data.description || '',
      date: data.date || '',
      author: data.author || 'FreshLock Team',
      tags: Array.isArray(data.tags) ? data.tags : [],
      readingTime: Math.ceil(wordCount / 200) + ' min read',
      content: mdToHtml(content.trim()),
    } as BlogPost;
  });
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(POSTS_DIR, slug + '.md');
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = parseFrontmatter(raw);
  const wordCount = content.split(/\s+/).length;
  return {
    slug,
    title: data.title || 'Untitled',
    description: data.description || '',
    date: data.date || '',
    author: data.author || 'FreshLock Team',
    tags: Array.isArray(data.tags) ? data.tags : [],
    readingTime: Math.ceil(wordCount / 200) + ' min read',
    content: mdToHtml(content.trim()),
  };
}

export function getRelatedPosts(slug: string, limit: number = 3): BlogPost[] {
  const all = getAllPosts();
  const current = all.find(p => p.slug === slug);
  if (!current) return [];
  const others = all.filter(p => p.slug !== slug);
  // Score by shared tags, then by date recency
  const scored = others.map(p => {
    const sharedTags = p.tags.filter(t => current.tags.includes(t)).length;
    return { post: p, score: sharedTags * 10 + (new Date(p.date).getTime() / 1e12) };
  });
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map(s => s.post);
}
