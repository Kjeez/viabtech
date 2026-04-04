import Link from 'next/link';
import { Clock, ArrowRight, BookOpen, Tag } from 'lucide-react';
import blogData from '@/data/blog.json';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Blog', description: 'Expert guides and news about printers from Viabtech Tanzania.' };

export default function BlogPage() {
  return (
    <>
      <section className="page-hero py-20">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 z-10">
          <div className="section-badge">Blog</div>
          <h1 className="text-4xl sm:text-5xl font-bold font-[var(--font-heading)] text-text-primary mb-4">Our Blog</h1>
          <p className="text-text-secondary text-lg max-w-2xl">Expert insights, buying guides, and maintenance tips from Tanzania&apos;s trusted printer specialists.</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {blogData.length > 0 && (
            <Link href={`/blog/${blogData[0].slug}`} className="group kepler-card overflow-hidden mb-12 grid lg:grid-cols-2">
              <div className="h-64 lg:h-auto bg-gradient-to-br from-[#e8f4fd] to-[#dbeafe] flex items-center justify-center">
                <BookOpen size={64} className="text-primary/20 group-hover:text-primary/40 transition-colors" />
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">{blogData[0].category}</span>
                  <span className="text-xs text-text-muted flex items-center gap-1"><Clock size={12} /> {blogData[0].readTime}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold font-[var(--font-heading)] text-text-primary group-hover:text-primary transition-colors mb-3">{blogData[0].title}</h2>
                <p className="text-text-secondary leading-relaxed mb-6">{blogData[0].excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-text-muted">{blogData[0].date} · {blogData[0].author}</span>
                  <span className="text-primary font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">Read More <ArrowRight size={14} /></span>
                </div>
              </div>
            </Link>
          )}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogData.slice(1).map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group kepler-card overflow-hidden">
                <div className="h-44 bg-gradient-to-br from-[#e8f4fd] to-[#f0f7ff] flex items-center justify-center">
                  <BookOpen size={40} className="text-primary/15 group-hover:text-primary/30 transition-colors" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium flex items-center gap-1"><Tag size={10} /> {post.category}</span>
                    <span className="text-xs text-text-muted flex items-center gap-1"><Clock size={11} /> {post.readTime}</span>
                  </div>
                  <h3 className="font-semibold text-text-primary group-hover:text-primary transition-colors mb-2 line-clamp-2">{post.title}</h3>
                  <p className="text-sm text-text-secondary line-clamp-2 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-text-muted">
                    <span>{post.date}</span><span className="text-primary flex items-center gap-1">Read <ArrowRight size={12} /></span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
