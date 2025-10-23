"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import api from "@/utils/axios";

export default function CategorySection() {
	const [categories, setCategories] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await api.get("/product/category");
				if (response.data?.data?.categories) {
					setCategories(response.data.data.categories);
				}
			} catch (error) {
				console.error("Failed to fetch categories:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchCategories();
	}, []);

	const displayedCategories = categories.slice(0, 6);

	return (
		<section className="py-12 bg-primary/5">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-10">
					<h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
						Shop by Category
					</h2>
					<p className="text-lg text-gray-600 max-w-2xl mx-auto">
						Explore our wide range of categories designed for every occasion and
						style.
					</p>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
					{isLoading
						? Array.from({ length: 6 }).map((_, index) => (
								<div
									key={index}
									className="block p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
								>
									<Skeleton className="h-6 w-3/4 mb-2" />
								</div>
						  ))
						: displayedCategories.map((category) => (
								<Link
									key={category.id}
									href={`/category/${category.id}`}
									className="block p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:bg-primary/5 transition-all"
								>
									<h3 className="text-xl font-bold text-gray-900 hover:text-primary transition-colors text-center">
										{category.name}
									</h3>
								</Link>
						  ))}
				</div>

				<div className="text-center mt-8">
					<Button onClick={() => setIsModalOpen(true)} className="px-6 py-2">
						Show All Categories
					</Button>
				</div>

				<Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
					<DialogContent className="max-w-4xl mx-auto p-6">
						<DialogHeader className="text-center">
							<DialogTitle className="text-2xl font-bold text-primary">
								All Categories
							</DialogTitle>
						</DialogHeader>
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
							{categories.map((category) => (
								<Link
									key={category.id}
									href={`/category/${category.id}`}
									className="block p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:bg-primary/5 transition-all"
								>
									<h3 className="text-lg font-bold text-gray-900 hover:text-primary transition-colors text-center">
										{category.name}
									</h3>
								</Link>
							))}
						</div>
						<DialogFooter className="mt-6 text-center">
							<Button
								variant="outline"
								onClick={() => setIsModalOpen(false)}
								className="px-6 py-2"
							>
								Close
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>
		</section>
	);
}
