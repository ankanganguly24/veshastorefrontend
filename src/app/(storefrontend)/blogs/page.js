import { blogPosts } from "@/data/blog-data";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User } from "lucide-react";

export const metadata = {
  title: "Vesha Editorial | Fashion & Culture Blog",
  description: "Explore the latest in Indian ethnic fashion, styling tips, and cultural insights from the Vesha Editorial team.",
  keywords: "ethnic fashion blog, indian wear tips, vesha editorial, fashion trends",
};

export default function BlogsPage() {
  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-4 tracking-tight">
            The Vesha Editorial
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light">
            Stories of craftsmanship, culture, and style. Dive into the world of Indian ethnic fashion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {blogPosts.map((post) => (
            <Link key={post.id} href={`/blogs/${post.slug}`} className="group">
              <Card className="h-full border-none shadow-none hover:shadow-lg transition-all duration-300 overflow-hidden bg-gray-50">
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white/90 text-black hover:bg-white border-none backdrop-blur-sm">
                      {post.tags[0]}
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>
                  <CardTitle className="text-2xl font-light text-gray-900 group-hover:text-primary transition-colors leading-tight">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-gray-600 line-clamp-3 font-light">
                    {post.excerpt}
                  </CardDescription>
                  <div className="mt-4 flex items-center gap-2 text-sm font-medium text-black underline decoration-1 underline-offset-4 group-hover:decoration-2">
                    Read Story
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
