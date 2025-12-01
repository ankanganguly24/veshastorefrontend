import { blogPosts } from "@/data/blog-data";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, ArrowLeft, Share2 } from "lucide-react";

export async function generateMetadata({ params }) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  
  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.seo.title} | Vesha Editorial`,
    description: post.seo.description,
    keywords: post.seo.keywords,
    openGraph: {
      title: post.seo.title,
      description: post.seo.description,
      images: [post.image],
      type: "article",
    },
  };
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    return notFound();
  }

  return (
    <article className="min-h-screen bg-white pb-20">
      {/* Hero Image */}
      <div className="relative h-[50vh] md:h-[60vh] w-full">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 bg-gradient-to-t from-black/80 to-transparent">
          <div className="container mx-auto max-w-4xl">
            <div className="flex gap-2 mb-4">
              {post.tags.map((tag) => (
                <Badge key={tag} className="bg-white text-black hover:bg-gray-200 border-none">
                  {tag}
                </Badge>
              ))}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center gap-6 text-white/90 text-sm md:text-base">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {post.author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {post.date}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 max-w-3xl -mt-10 relative z-10">
        <div className="bg-white rounded-t-3xl p-6 md:p-12 shadow-xl">
          <Link href="/blogs" className="inline-flex items-center text-gray-500 hover:text-black mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Editorial
          </Link>

          <div 
            className="prose prose-lg max-w-none prose-headings:font-light prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-primary hover:prose-a:text-primary/80 prose-img:rounded-xl"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="mt-12 pt-8 border-t border-gray-100 flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Share this article
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="rounded-full">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
