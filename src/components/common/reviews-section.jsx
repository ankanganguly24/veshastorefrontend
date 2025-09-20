"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ThumbsUp, MessageCircle, Filter, ChevronDown } from "lucide-react";

export default function ReviewsSection({ productId, rating = 4.8, reviewCount = 156 }) {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [showAllReviews, setShowAllReviews] = useState(false);

  // Mock reviews data
  const reviews = [
    {
      id: 1,
      name: "Priya Sharma",
      rating: 5,
      date: "2024-01-15",
      title: "Absolutely Beautiful!",
      comment: "The quality of this kurta set is exceptional. The embroidery work is intricate and the fabric feels premium. Perfect fit and very comfortable to wear for long hours. Highly recommended!",
      verified: true,
      helpful: 12,
      size: "M",
      color: "Blue"
    },
    {
      id: 2,
      name: "Anita Gupta",
      rating: 4,
      date: "2024-01-10",
      title: "Good quality but sizing issue",
      comment: "The product quality is really good and the design is beautiful. However, I found the sizing a bit loose. I ordered M but it felt like L. Other than that, very satisfied with the purchase.",
      verified: true,
      helpful: 8,
      size: "M",
      color: "Pink"
    },
    {
      id: 3,
      name: "Kavita Reddy",
      rating: 5,
      date: "2024-01-05",
      title: "Perfect for festivals",
      comment: "Wore this for Diwali and received so many compliments! The fabric is comfortable and the embroidery is stunning. Fast delivery and excellent packaging. Will definitely order again.",
      verified: true,
      helpful: 15,
      size: "L",
      color: "Red"
    },
    {
      id: 4,
      name: "Meera Patel",
      rating: 4,
      date: "2023-12-28",
      title: "Great value for money",
      comment: "For the price point, this is an excellent purchase. The quality is good and the design is trendy. Delivery was quick and customer service was helpful when I had queries.",
      verified: false,
      helpful: 6,
      size: "S",
      color: "Green"
    },
    {
      id: 5,
      name: "Rashni Singh",
      rating: 5,
      date: "2023-12-20",
      title: "Exceeded expectations",
      comment: "The photos don't do justice to how beautiful this kurta set actually is. The fabric quality is premium and the fit is perfect. Definitely worth every penny spent!",
      verified: true,
      helpful: 10,
      size: "M",
      color: "Purple"
    }
  ];

  const ratingBreakdown = [
    { stars: 5, count: 89, percentage: 57 },
    { stars: 4, count: 45, percentage: 29 },
    { stars: 3, count: 15, percentage: 10 },
    { stars: 2, count: 5, percentage: 3 },
    { stars: 1, count: 2, percentage: 1 }
  ];

  const filterOptions = [
    { value: "all", label: "All Reviews", count: reviewCount },
    { value: "5", label: "5 Stars", count: 89 },
    { value: "4", label: "4 Stars", count: 45 },
    { value: "verified", label: "Verified", count: 134 },
    { value: "photos", label: "With Photos", count: 23 }
  ];

  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 3);

  return (
    <Card className="bg-white/80 backdrop-blur-sm shadow-lg border border-purple-100">
      <CardHeader>
        <CardTitle className="text-2xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Customer Reviews
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Rating Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Overall Rating */}
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                {rating}
              </div>
              <div className="flex items-center justify-center space-x-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    className={`w-5 h-5 ${star <= Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-600">{reviewCount} reviews</p>
            </div>
            
            {/* Rating Breakdown */}
            <div className="flex-1 space-y-2">
              {ratingBreakdown.map((item) => (
                <div key={item.stars} className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600 w-8">{item.stars}★</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-yellow-400 to-orange-400 h-2 rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-8">{item.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="text-2xl font-bold text-green-600">92%</div>
              <p className="text-sm text-green-700">Recommend this product</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-2xl font-bold text-blue-600">4.6</div>
              <p className="text-sm text-blue-700">Quality Rating</p>
            </div>
          </div>
        </div>

        {/* Filter Options */}
        <div className="flex flex-wrap gap-2 pb-4 border-b border-purple-100">
          {filterOptions.map((option) => (
            <Button
              key={option.value}
              variant={selectedFilter === option.value ? "default" : "outline"}
              size="sm"
              className={`${
                selectedFilter === option.value 
                  ? 'bg-purple-600 text-white' 
                  : 'hover:bg-purple-50 hover:border-purple-300'
              }`}
              onClick={() => setSelectedFilter(option.value)}
            >
              {option.label} ({option.count})
            </Button>
          ))}
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          {displayedReviews.map((review) => (
            <Card key={review.id} className="p-4 border border-purple-100 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white font-semibold">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-gray-900">{review.name}</span>
                      {review.verified && (
                        <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
                          Verified Purchase
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-1 mt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          className={`w-4 h-4 ${star <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                        />
                      ))}
                      <span className="text-sm text-gray-500 ml-2">{review.date}</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right text-sm text-gray-500">
                  <div>Size: {review.size}</div>
                  <div>Color: {review.color}</div>
                </div>
              </div>

              <h4 className="font-semibold text-gray-900 mb-2">{review.title}</h4>
              <p className="text-gray-700 mb-3 leading-relaxed">{review.comment}</p>

              <div className="flex items-center justify-between">
                <Button variant="ghost" size="sm" className="text-gray-500 hover:text-purple-600">
                  <ThumbsUp className="w-4 h-4 mr-1" />
                  Helpful ({review.helpful})
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-500 hover:text-purple-600">
                  <MessageCircle className="w-4 h-4 mr-1" />
                  Reply
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Show More/Less Button */}
        {reviews.length > 3 && (
          <div className="text-center">
            <Button
              variant="outline"
              onClick={() => setShowAllReviews(!showAllReviews)}
              className="border-purple-300 text-purple-600 hover:bg-purple-50"
            >
              {showAllReviews ? (
                <>Show Less Reviews</>
              ) : (
                <>
                  Show All {reviewCount} Reviews
                  <ChevronDown className="w-4 h-4 ml-1" />
                </>
              )}
            </Button>
          </div>
        )}

        {/* Write Review Button */}
        <div className="text-center pt-4 border-t border-purple-100">
          <Button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg transition-all">
            Write a Review
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
