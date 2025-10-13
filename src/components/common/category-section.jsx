"use client";

import { Card } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const categories = [
	{
		id: 1,
		name: "Nawabi Exclusive",
		slug: "nawabi-exclusive",
		image:
			"https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=200&fit=crop",
		description: "Royal heritage wear",
		itemCount: "120+ items",
	},
	{
		id: 2,
		name: "Festive Wear",
		slug: "festive-wear",
		image:
			"https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=300&h=200&fit=crop",
		description: "Celebration ready outfits",
		itemCount: "85+ items",
	},
	{
		id: 3,
		name: "Casual Chic",
		slug: "casual-chic",
		image:
			"https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=300&h=200&fit=crop",
		description: "Everyday elegance",
		itemCount: "200+ items",
	},
	{
		id: 4,
		name: "Wedding Collection",
		slug: "wedding-collection",
		image:
			"https://images.unsplash.com/photo-1583391733956-6c78276477e1?w=300&h=200&fit=crop",
		description: "Bridal & special occasions",
		itemCount: "65+ items",
	},
	{
		id: 5,
		name: "Winter Wear",
		slug: "winter-wear",
		image:
			"https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=200&fit=crop",
		description: "Cozy & stylish layers",
		itemCount: "95+ items",
	},
	{
		id: 6,
		name: "Accessories",
		slug: "accessories",
		image:
			"https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&h=200&fit=crop",
		description: "Complete your look",
		itemCount: "150+ items",
	},
	{
		id: 7,
		name: "Spark & Style",
		slug: "spark-style",
		image:
			"https://images.unsplash.com/photo-1566479179817-0a0ca2e18c72?w=300&h=200&fit=crop",
		description: "Contemporary fashion",
		itemCount: "110+ items",
	},
	{
		id: 8,
		name: "Retro Collection",
		slug: "retro-collection",
		image:
			"https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=300&h=200&fit=crop",
		description: "Vintage inspired",
		itemCount: "75+ items",
	},
];

export default function CategorySection() {
	return (
		<section className="py-12 bg-primary/5">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-10">
					<h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
						Shop by Category
					</h2>
					<p className="text-lg text-gray-600 max-w-2xl mx-auto">
						Discover our curated collections designed for every occasion and style
						preference
					</p>
				</div>

				{/* Horizontal scrollable cards */}
				<div className="relative">
					<div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
						<style jsx>{`
							.scrollbar-hide {
								-ms-overflow-style: none;
								scrollbar-width: none;
							}
							.scrollbar-hide::-webkit-scrollbar {
								display: none;
							}
						`}</style>

						{categories.map((category) => (
							<Link
								key={category.id}
								href={`/category/${category.slug}`}
								className="group flex-shrink-0"
							>
								<Card className="w-72 h-80 overflow-hidden hover:shadow-xl transition-all duration-300 group-hover:scale-105 bg-white">
									<div className="relative h-48 overflow-hidden">
										<img
											src={category.image}
											alt={category.name}
											className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
										/>
										<div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
										<div className="absolute bottom-4 left-4 text-white">
											<div className="text-sm font-medium opacity-90">
												{category.itemCount}
											</div>
										</div>
									</div>

									<div className="p-6">
										<div className="flex items-center justify-between">
											<div>
												<h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
													{category.name}
												</h3>
												<p className="text-gray-600 text-sm">
													{category.description}
												</p>
											</div>
											<ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
										</div>
									</div>
								</Card>
							</Link>
						))}
					</div>

					{/* Scroll indicator */}
					<div className="flex justify-center mt-6">
						<div className="flex items-center space-x-2 text-sm text-gray-500">
							<span>Scroll for more categories</span>
							<ChevronRight className="w-4 h-4" />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
