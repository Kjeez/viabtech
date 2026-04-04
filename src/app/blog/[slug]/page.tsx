import Link from 'next/link';
import { ArrowLeft, Clock, Tag, User, ArrowRight, BookOpen } from 'lucide-react';
import blogData from '@/data/blog.json';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return blogData.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage(props: PageProps<'/blog/[slug]'>) {
  const { slug } = await props.params;
  const post = blogData.find((p) => p.slug === slug);
  if (!post) notFound();

  const otherPosts = blogData.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <section className="page-hero py-16">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 z-10">
          <Link href="/blog" className="inline-flex items-center gap-2 text-text-muted hover:text-primary text-sm mb-6 transition-colors">
            <ArrowLeft size={14} /> Back to Blog
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium flex items-center gap-1"><Tag size={11} /> {post.category}</span>
            <span className="text-xs text-text-muted flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
          </div>
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
              {post.content.split('\n\n').map((paragraph, i) => {
                if (paragraph.startsWith('## ')) {
                  return <h2 key={i} className="text-xl font-bold font-[var(--font-heading)] text-text-primary mt-8 mb-4">{paragraph.replace('## ', '')}</h2>;
                }
                if (paragraph.startsWith('- ')) {
                  const items = paragraph.split('\n').filter(Boolean);
                  return (
                    <ul key={i} className="space-y-2 my-4">
                      {items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2 text-text-secondary text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                          {item.replace('- ', '')}
                        </li>
                      ))}
                    </ul>
                  );
                }
                return <p key={i} className="text-text-secondary leading-relaxed mb-4">{paragraph}</p>;
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
