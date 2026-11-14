import Link from 'next/link';
import { ArrowLeft, Clock, Tag, User, ArrowRight, BookOpen } from 'lucide-react';
import blogData from '@/data/blog.json';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { breadcrumbSchema, ORG_ID } from '@/lib/schema';

const SITE_URL = 'https://www.viabtech.com';

// Unknown post slugs return a real 404.
export const dynamicParams = false;

type Block = { type: 'h2' | 'p'; text: string } | { type: 'ul'; items: string[] };

/**
 * Turn post content into headings, paragraphs and lists.
 * A "## Heading" line followed directly by text (no blank line) becomes a heading plus a paragraph,
 * so the heading no longer swallows the text under it.
 */
function toBlocks(content: string): Block[] {
  const blocks: Block[] = [];
  for (const chunk of content.split('\n\n')) {
    let rest = chunk.trim();
    if (!rest) continue;
    if (rest.startsWith('## ')) {
      const nl = rest.indexOf('\n');
      blocks.push({ type: 'h2', text: (nl === -1 ? rest : rest.slice(0, nl)).replace(/^## /, '').trim() });
      rest = nl === -1 ? '' : rest.slice(nl + 1).trim();
      if (!rest) continue;
    }
    if (rest.startsWith('- ')) {
      blocks.push({ type: 'ul', items: rest.split('\n').filter(Boolean).map((l) => l.replace(/^- /, '')) });
    } else {
      blocks.push({ type: 'p', text: rest });
    }
  }
  return blocks;
}

export function generateStaticParams() {
  return blogData.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(props: PageProps<'/blog/[slug]'>): Promise<Metadata> {
  const { slug } = await props.params;
  const post = blogData.find((p) => p.slug === slug);
  if (!post) return {};
  const url = `${SITE_URL}/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: url },
    // Drafts stay out of Google until they are reviewed and published.
    ...(post.draft ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      siteName: 'Viabtech',
      locale: 'en_TZ',
    },
  };
}

export default async function BlogPostPage(props: PageProps<'/blog/[slug]'>) {
  const { slug } = await props.params;
  const post = blogData.find((p) => p.slug === slug);
  if (!post) notFound();

  const otherPosts = blogData.filter((p) => p.slug !== slug && !p.draft).sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: { '@type': 'Organization', name: post.author, url: SITE_URL },
    publisher: { '@id': ORG_ID },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
    articleSection: post.category,
  };

  return (
    <>
      <JsonLd data={[articleLd, breadcrumbSchema([['Blog', '/blog'], [post.title, `/blog/${post.slug}`]])]} />
      <section className="page-hero py-16">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 z-10">
          <Link href="/blog" className="inline-flex items-center gap-2 text-text-muted hover:text-primary text-sm mb-6 transition-colors">
            <ArrowLeft size={14} /> Back to Blog
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium flex items-center gap-1"><Tag size={11} /> {post.category}</span>
            <span className="text-xs text-text-muted flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
          </div>
          {post.draft && (
            <p className="inline-block mb-4 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold">
              Draft for review: not listed on the blog or in search results yet
            </p>
          )}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[var(--font-heading)] text-text-primary mb-4 leading-tight">{post.title}</h1>
          <div className="flex items-center gap-4 text-sm text-text-muted">
            <span className="flex items-center gap-1.5"><User size={14} /> {post.author}</span>
            <span>{post.date}</span>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="kepler-card p-8 sm:p-12">
            <div className="prose max-w-none">
              {toBlocks(post.content).map((block, i) => {
                if (block.type === 'h2') {
                  return <h2 key={i} className="text-xl font-bold font-[var(--font-heading)] text-text-primary mt-8 mb-4">{block.text}</h2>;
                }
                if (block.type === 'ul') {
                  return (
                    <ul key={i} className="space-y-2 my-4">
                      {block.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2 text-text-secondary text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  );
                }
                return <p key={i} className="text-text-secondary leading-relaxed mb-4">{block.text}</p>;
              })}
            </div>
          </div>

          {otherPosts.length > 0 && (
            <div className="mt-16">
              <h3 className="text-xl font-bold font-[var(--font-heading)] text-text-primary mb-6">More <span className="text-primary">Articles</span></h3>
              <div className="grid sm:grid-cols-3 gap-6">
                {otherPosts.map((p) => (
                  <Link key={p.id} href={`/blog/${p.slug}`} className="group kepler-card p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs">{p.category}</span>
                    </div>
                    <h4 className="text-sm font-semibold text-text-primary group-hover:text-primary transition-colors line-clamp-2 mb-2">{p.title}</h4>
                    <span className="text-xs text-text-muted">{p.date}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
