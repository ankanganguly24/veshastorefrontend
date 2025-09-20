"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Save, Upload, X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PageHeader } from "@/components/common/page-header";

const homepageSchema = z.object({
  heroTitle: z.string().min(1, "Hero title is required"),
  heroSubtitle: z.string().min(1, "Hero subtitle is required"),
  heroButtonText: z.string().min(1, "Button text is required"),
  heroButtonLink: z.string().min(1, "Button link is required"),
  featuredTitle: z.string().min(1, "Featured section title is required"),
  featuredSubtitle: z.string().optional(),
  aboutTitle: z.string().min(1, "About title is required"),
  aboutDescription: z.string().min(10, "About description must be at least 10 characters"),
  newsletterTitle: z.string().min(1, "Newsletter title is required"),
  newsletterDescription: z.string().min(1, "Newsletter description is required"),
});

export default function EditHomepage() {
  const [isLoading, setIsLoading] = useState(false);
  const [heroImages, setHeroImages] = useState([
    { id: '1', url: '/images/hero/hero1.jpg', alt: 'Hero Banner 1' },
    { id: '2', url: '/images/hero/hero2.jpg', alt: 'Hero Banner 2' }
  ]);

  const form = useForm({
    resolver: zodResolver(homepageSchema),
    defaultValues: {
      heroTitle: "Discover Premium Fashion",
      heroSubtitle: "Explore our latest collection of premium clothing and accessories",
      heroButtonText: "Shop Now",
      heroButtonLink: "/products",
      featuredTitle: "Featured Products",
      featuredSubtitle: "Handpicked items just for you",
      aboutTitle: "About Vesha",
      aboutDescription: "We are passionate about bringing you the finest fashion with exceptional quality and style.",
      newsletterTitle: "Stay Updated",
      newsletterDescription: "Subscribe to our newsletter for the latest trends and exclusive offers",
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    // Mock API call
    setTimeout(() => {
      console.log("Homepage data:", data);
      setIsLoading(false);
    }, 2000);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setHeroImages(prev => [...prev, {
          id: Date.now() + Math.random(),
          url: e.target.result,
          alt: file.name
        }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (id) => {
    setHeroImages(prev => prev.filter(img => img.id !== id));
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Edit Homepage"
        description="Manage homepage content and banners"
      >
        <Button variant="outline" asChild>
          <Link href="/admin/cms">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to CMS
          </Link>
        </Button>
      </PageHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Hero Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Hero Section</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="heroTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hero Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter hero title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="heroSubtitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hero Subtitle</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter hero subtitle" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="heroButtonText"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Button Text</FormLabel>
                          <FormControl>
                            <Input placeholder="Shop Now" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="heroButtonLink"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Button Link</FormLabel>
                          <FormControl>
                            <Input placeholder="/products" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Hero Images */}
              <Card>
                <CardHeader>
                  <CardTitle>Hero Images</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                      <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                      <div className="mt-4">
                        <label htmlFor="hero-images" className="cursor-pointer">
                          <span className="mt-2 block text-sm font-medium text-foreground">
                            Drop hero images here or click to upload
                          </span>
                          <input
                            id="hero-images"
                            type="file"
                            multiple
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageUpload}
                          />
                        </label>
                      </div>
                    </div>

                    {heroImages.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {heroImages.map((image) => (
                          <div key={image.id} className="relative group">
                            <Image
                              src={image.url}
                              alt={image.alt}
                              width={200}
                              height={128}
                              className="w-full h-32 object-cover rounded-lg border border-border"
                            />
                            <Button
                              variant="destructive"
                              size="icon"
                              className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => removeImage(image.id)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Featured Products Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Featured Products Section</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="featuredTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Section Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Featured Products" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="featuredSubtitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Section Subtitle (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Handpicked items just for you" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* About Section */}
              <Card>
                <CardHeader>
                  <CardTitle>About Section</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="aboutTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>About Title</FormLabel>
                        <FormControl>
                          <Input placeholder="About Vesha" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="aboutDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>About Description</FormLabel>
                        <FormControl>
                          <textarea
                            className="w-full min-h-[120px] px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            placeholder="Tell visitors about your brand..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Newsletter Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Newsletter Section</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="newsletterTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Newsletter Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Stay Updated" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="newsletterDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Newsletter Description</FormLabel>
                        <FormControl>
                          <textarea
                            className="w-full min-h-[80px] px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            placeholder="Newsletter description..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Actions */}
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/admin/cms">Cancel</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
