"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import api from "@/utils/axios";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export default function CategorySection() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { data: categoriesData, isLoading } = useQuery({
		queryKey: ["categories"],
		queryFn: async () => {
			const response = await api.get("/product/category");
			return response.data;
		},
		staleTime: Infinity,
		gcTime: Infinity,
	});

	const categories = categoriesData?.data?.categories || [];

	// Display top 8 categories for a balanced grid
	const displayedCategories = categories.slice(0, 8);

	return (
		<section className="py-24 bg-white border-t border-gray-50">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
					<div>
						<h2 className="text-3xl font-light text-gray-900 tracking-tight mb-3">
							Collections
						</h2>
						<div className="w-12 h-px bg-primary mb-4"></div>
						<p className="text-sm text-gray-500 max-w-md">
							Explore our curated categories designed for your unique style.
						</p>
					</div>
					
					{categories.length > 8 && (
						<button 
							onClick={() => setIsModalOpen(true)}
							className="group flex items-center text-sm font-medium text-gray-900 hover:text-primary transition-colors"
						>
							View All Categories
							<ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
						</button>
					)}
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
					{isLoading
						? Array.from({ length: 8 }).map((_, index) => (
								<div
									key={index}
									className="h-32 bg-gray-50 animate-pulse rounded-sm"
								/>
						  ))
						: displayedCategories.map((category) => (
								<Link
									key={category.id}
									href={`/category/${category.id}`}
									className="group relative flex flex-col justify-between p-8 h-40 bg-gray-50 hover:bg-white border border-transparent hover:border-gray-100 hover:shadow-lg transition-all duration-300 rounded-sm overflow-hidden"
								>
									{/* Decorative background circle */}
									<div className="absolute -right-4 -bottom-4 w-24 h-24 bg-primary/5 rounded-full group-hover:scale-150 transition-transform duration-500" />
									
									<div className="relative z-10 flex justify-between items-start">
										<h3 className="text-xl font-light text-gray-900 group-hover:text-primary transition-colors">
											{category.name}
										</h3>
										<ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
									</div>

									<div className="relative z-10">
										<span className="text-xs font-medium text-gray-500 uppercase tracking-wider group-hover:text-primary/80 transition-colors">
											Shop Now
										</span>
									</div>
								</Link>
						  ))}
				</div>

				<Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
					<DialogContent className="max-w-4xl mx-auto p-8 bg-white">
						<DialogHeader className="mb-6">
							<DialogTitle className="text-2xl font-light text-gray-900">
								All Collections
							</DialogTitle>
						</DialogHeader>
						<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
							{categories.map((category) => (
								<Link
									key={category.id}
									href={`/category/${category.id}`}
									onClick={() => setIsModalOpen(false)}
									className="group p-6 border border-gray-100 hover:border-primary/20 hover:bg-primary/5 transition-all text-center rounded-sm"
								>
									<h3 className="text-sm font-medium text-gray-900 group-hover:text-primary transition-colors">
										{category.name}
									</h3>
								</Link>
							))}
						</div>
					</DialogContent>
				</Dialog>
			</div>
		</section>
	);
}
