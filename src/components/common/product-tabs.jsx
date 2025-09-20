"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Shirt, Droplets, Sun, Wind, Star, ThumbsUp, Verified } from "lucide-react";
import { memo, useMemo, useState, useEffect } from "react";
import ReviewModal from "./review-modal";

const ProductTabs = memo(({ description, washCare, features = [], productId, productName }) => {
  const [reviews, setReviews] = useState([]);

  // Load reviews from localStorage
  useEffect(() => {
    const allReviews = JSON.parse(localStorage.getItem('productReviews') || '[]');
    const productReviews = allReviews.filter(review => review.productId === productId);
    setReviews(productReviews);
  }, [productId]);

  // Listen for review updates
  useEffect(() => {
    const handleReviewUpdate = () => {
      const allReviews = JSON.parse(localStorage.getItem('productReviews') || '[]');
      const productReviews = allReviews.filter(review => review.productId === productId);
      setReviews(productReviews);
    };

    window.addEventListener('storage', handleReviewUpdate);
    return () => window.removeEventListener('storage', handleReviewUpdate);
  }, [productId]);

  const washCareInstructions = useMemo(() => [
    {
      icon: Shirt,
      title: "Dry Clean Only",
      description: "Professional dry cleaning recommended for best results"
    },
    {
      icon: Sun,
      title: "Avoid Direct Sunlight",
      description: "Do not dry in direct sunlight to prevent fading"
    },
    {
      icon: Droplets,
      title: "Store Properly",
      description: "Keep in a cool, dry place when not in use"
    },
    {
      icon: Wind,
      title: "Air Dry",
      description: "If washing at home, air dry in shade"
    }
  ], []);

  // Calculate review statistics
  const reviewStats = useMemo(() => {
    if (reviews.length === 0) {
      return { averageRating: 0, totalReviews: 0, distribution: {} };
    }

    const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
    const distribution = {};
    for (let i = 1; i <= 5; i++) {
      distribution[i] = reviews.filter(review => review.rating === i).length;
    }

    return {
      averageRating: parseFloat(averageRating.toFixed(1)),
      totalReviews: reviews.length,
      distribution
    };
  }, [reviews]);

  return (
    <Card className="bg-white/80 backdrop-blur-sm shadow-lg border border-purple-100">
      <CardContent className="p-6">
        <Tabs defaultValue="description" className="w-full my-4">
          <TabsList className="grid w-full grid-cols-4 bg-purple-50 border border-purple-200 py-8">
            <TabsTrigger 
              value="description"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white"
            >
              Description
            </TabsTrigger>
            <TabsTrigger 
              value="features"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white"
            >
              Features
            </TabsTrigger>
            <TabsTrigger 
              value="care"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white"
            >
              Wash Care
            </TabsTrigger>
            <TabsTrigger 
              value="reviews"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white"
            >
              Reviews ({reviewStats.totalReviews})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-6">
            <div className="space-y-8">
              {/* Product Description Header */}
              <div className="text-center pb-4 border-b border-purple-100">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                  Product Description
                </h3>
                <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full"></div>
              </div>
              
              {/* Main Description */}
              <div className="bg-gradient-to-br from-purple-50 via-white to-blue-50 p-6 rounded-xl border border-purple-100 shadow-sm">
                <p className="text-gray-800 leading-relaxed text-lg font-light tracking-wide">
                  {description}
                </p>
              </div>
              
              {/* Key Highlights */}
              <div className="bg-white p-6 rounded-xl border border-purple-200 shadow-lg">
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mr-3">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900">Key Highlights</h4>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { title: "Premium Quality Fabric", desc: "Finest materials for lasting comfort" },
                    { title: "Comfortable Fit", desc: "Designed for all-day comfort" },
                    { title: "Latest Fashion Trends", desc: "Contemporary styling meets tradition" },
                    { title: "Perfect for Special Occasions", desc: "Elegant choice for celebrations" }
                  ].map((highlight, index) => (
                    <div key={index} className="group hover:scale-105 transition-all duration-300">
                      <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg border border-purple-100 hover:border-purple-300 hover:shadow-md transition-all">
                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <CheckCircle className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <h5 className="font-semibold text-gray-900 mb-1">{highlight.title}</h5>
                            <p className="text-sm text-gray-600">{highlight.desc}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gradient-to-br from-purple-100 to-purple-50 rounded-lg border border-purple-200">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Shirt className="w-6 h-6 text-white" />
                  </div>
                  <h5 className="font-semibold text-purple-900 mb-1">Premium Craftsmanship</h5>
                  <p className="text-xs text-purple-700">Meticulously crafted with attention to detail</p>
                </div>
                
                <div className="text-center p-4 bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg border border-blue-200">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <h5 className="font-semibold text-blue-900 mb-1">Quality Assured</h5>
                  <p className="text-xs text-blue-700">Tested for durability and comfort</p>
                </div>
                
                <div className="text-center p-4 bg-gradient-to-br from-indigo-100 to-indigo-50 rounded-lg border border-indigo-200">
                  <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Sun className="w-6 h-6 text-white" />
                  </div>
                  <h5 className="font-semibold text-indigo-900 mb-1">Festive Ready</h5>
                  <p className="text-xs text-indigo-700">Perfect for celebrations and special events</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="features" className="mt-6">
            <div className="space-y-8">
              {/* Features Header */}
              <div className="text-center pb-4 border-b border-purple-100">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                  Product Features
                </h3>
                <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full"></div>
              </div>
              
              {features.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {features.map((feature, index) => (
                    <div key={index} className="group hover:scale-105 transition-all duration-300">
                      <div className="bg-gradient-to-br from-white to-purple-50 p-5 rounded-xl border border-purple-200 hover:border-purple-400 hover:shadow-lg transition-all">
                        <div className="flex items-start space-x-4">
                          <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <CheckCircle className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="text-gray-800 font-medium leading-relaxed">{feature}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { title: "Premium Cotton Fabric", desc: "Soft, breathable, and comfortable for all-day wear" },
                    { title: "Intricate Embroidery Work", desc: "Hand-crafted details that showcase traditional artistry" },
                    { title: "Perfect Fit & Cut", desc: "Tailored to provide comfort without compromising style" },
                    { title: "Color-Fast Technology", desc: "Maintains vibrant colors wash after wash" },
                    { title: "Easy Care Instructions", desc: "Simple maintenance for busy lifestyles" },
                    { title: "Versatile Styling", desc: "Perfect for both casual and formal occasions" }
                  ].map((feature, index) => (
                    <div key={index} className="group hover:scale-105 transition-all duration-300">
                      <div className="bg-gradient-to-br from-white to-blue-50 p-5 rounded-xl border border-purple-200 hover:border-blue-400 hover:shadow-lg transition-all">
                        <div className="flex items-start space-x-4">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <CheckCircle className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-gray-900 font-semibold mb-1">{feature.title}</h4>
                            <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="care" className="mt-6">
            <div className="space-y-8">
              {/* Wash Care Header */}
              <div className="text-center pb-4 border-b border-purple-100">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                  Wash Care Instructions
                </h3>
                <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full"></div>
              </div>
              
              {/* Care Description */}
              <div className="bg-gradient-to-br from-yellow-50 via-white to-orange-50 p-6 rounded-xl border border-yellow-200 shadow-sm">
                <p className="text-gray-800 leading-relaxed text-lg font-light">{washCare}</p>
              </div>

              {/* Care Instructions Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {washCareInstructions.map((instruction, index) => {
                  const IconComponent = instruction.icon;
                  return (
                    <div key={index} className="group hover:scale-105 transition-all duration-300">
                      <div className="bg-gradient-to-br from-white to-purple-50 p-6 rounded-xl border border-purple-200 hover:border-purple-400 hover:shadow-lg transition-all">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-900 mb-2">{instruction.title}</h4>
                            <p className="text-gray-600 leading-relaxed">{instruction.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Material Information */}
              <div className="bg-white p-6 rounded-xl border border-blue-200 shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mr-3">
                    <Shirt className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900">Material & Composition</h4>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Badge variant="secondary" className="bg-gradient-to-r from-blue-100 to-blue-50 text-blue-800 px-3 py-1 text-sm font-medium">100% Cotton</Badge>
                  <Badge variant="secondary" className="bg-gradient-to-r from-green-100 to-green-50 text-green-800 px-3 py-1 text-sm font-medium">Breathable</Badge>
                  <Badge variant="secondary" className="bg-gradient-to-r from-purple-100 to-purple-50 text-purple-800 px-3 py-1 text-sm font-medium">Hypoallergenic</Badge>
                  <Badge variant="secondary" className="bg-gradient-to-r from-emerald-100 to-emerald-50 text-emerald-800 px-3 py-1 text-sm font-medium">Eco-Friendly</Badge>
                </div>
              </div>

              {/* Pro Tips */}
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-xl border border-yellow-300 shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="text-2xl mr-3">💡</div>
                  <h4 className="text-xl font-bold text-yellow-900">Pro Care Tips</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "Turn inside out before washing to protect embroidery",
                    "Use mild detergent to maintain fabric quality", 
                    "Store on hangers to prevent wrinkles",
                    "Iron on medium heat with protective cloth"
                  ].map((tip, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                      <p className="text-yellow-800 font-medium">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <div className="space-y-6">
              {/* Reviews Header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 border-b border-purple-100">
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                    Customer Reviews
                  </h3>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.round(reviewStats.averageRating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-lg font-semibold text-gray-900">
                        {reviewStats.averageRating}
                      </span>
                    </div>
                    <span className="text-gray-600">
                      ({reviewStats.totalReviews} review{reviewStats.totalReviews !== 1 ? 's' : ''})
                    </span>
                  </div>
                </div>
                
                <ReviewModal productId={productId} productName={productName}>
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                    Write a Review
                  </Button>
                </ReviewModal>
              </div>

              {/* Rating Distribution */}
              {reviewStats.totalReviews > 0 && (
                <div className="bg-gradient-to-br from-purple-50 via-white to-blue-50 p-6 rounded-xl border border-purple-100">
                  <h4 className="font-semibold text-gray-900 mb-4">Rating Distribution</h4>
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center space-x-3">
                        <span className="text-sm font-medium text-gray-700 w-8">{rating}★</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-2 rounded-full transition-all duration-300"
                            style={{
                              width: `${reviewStats.totalReviews > 0 ? (reviewStats.distribution[rating] / reviewStats.totalReviews) * 100 : 0}%`
                            }}
                          />
                        </div>
                        <span className="text-sm text-gray-600 w-8">
                          {reviewStats.distribution[rating] || 0}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Reviews List */}
              {reviews.length > 0 ? (
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="bg-white p-6 rounded-xl border border-purple-200 shadow-sm">
                      <div className="flex flex-col md:flex-row justify-between items-start mb-4">
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating
                                      ? 'text-yellow-400 fill-current'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            {review.verified && (
                              <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                                <Verified className="w-3 h-3 mr-1" />
                                Verified Purchase
                              </Badge>
                            )}
                          </div>
                          <h5 className="font-semibold text-gray-900 mb-1">{review.title}</h5>
                          <p className="text-sm text-gray-600">
                            By {review.reviewerName} • {new Date(review.date).toLocaleDateString()}
                          </p>
                        </div>
                        
                        {review.recommend && (
                          <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                            <ThumbsUp className="w-3 h-3 mr-1" />
                            Recommends
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-gray-800 leading-relaxed mb-4">{review.comment}</p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center space-x-4">
                          <button className="hover:text-purple-600 transition-colors">
                            Helpful ({review.helpful || 0})
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-purple-400" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">No Reviews Yet</h4>
                  <p className="text-gray-600 mb-6">
                    Be the first to review this product and help others make informed decisions.
                  </p>
                  <ReviewModal productId={productId} productName={productName}>
                    <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                      Write the First Review
                    </Button>
                  </ReviewModal>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
});

ProductTabs.displayName = "ProductTabs";

export default ProductTabs;
