"use client";

import { useState, useCallback, memo } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Star, Upload, X } from "lucide-react";

// Zod schema for form validation
const reviewSchema = z.object({
  rating: z.number().min(1, "Please select a rating").max(5, "Rating must be between 1 and 5"),
  title: z.string().min(3, "Title must be at least 3 characters").max(100, "Title must be less than 100 characters"),
  comment: z.string().min(10, "Review must be at least 10 characters").max(1000, "Review must be less than 1000 characters"),
  name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name must be less than 50 characters"),
  email: z.string().email("Please enter a valid email").optional().or(z.literal("")),
  recommend: z.boolean()
});

const ReviewModal = memo(({ children, productId, productName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Initialize react-hook-form with zod resolver
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isValid }
  } = useForm({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
      title: "",
      comment: "",
      name: "",
      email: "",
      recommend: true
    },
    mode: "onChange"
  });

  const watchedRating = watch("rating");
  const watchedTitle = watch("title");
  const watchedComment = watch("comment");

  const handleRatingClick = useCallback((value) => {
    setValue("rating", value);
    setHoveredRating(0);
  }, [setValue]);

  const handleRatingHover = useCallback((value) => {
    setHoveredRating(value);
  }, []);

  const onSubmit = useCallback(async (data) => {
    setIsSubmitting(true);

    try {
      // Create review object
      const review = {
        id: Date.now(),
        productId,
        productName,
        rating: data.rating,
        title: data.title.trim(),
        comment: data.comment.trim(),
        reviewerName: data.name.trim(),
        reviewerEmail: data.email?.trim() || "",
        recommend: data.recommend,
        date: new Date().toISOString(),
        verified: false,
        helpful: 0
      };

      // Save to localStorage
      const existingReviews = JSON.parse(localStorage.getItem('productReviews') || '[]');
      existingReviews.push(review);
      localStorage.setItem('productReviews', JSON.stringify(existingReviews));

      // Show success state briefly
      setIsSuccess(true);
      
      // Close modal after brief success state
      setTimeout(() => {
        reset();
        setIsOpen(false);
        setHoveredRating(0);
        setIsSuccess(false);
      }, 1500);

    } catch (error) {
      console.error("Error submitting review:", error);
      // Could implement error toast here instead of alert
    } finally {
      setIsSubmitting(false);
    }
  }, [productId, productName, reset]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    // Reset form when closing
    reset();
    setHoveredRating(0);
    setIsSuccess(false);
  }, [reset]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            {isSuccess ? "Review Submitted!" : "Write a Review"}
          </DialogTitle>
          <p className="text-gray-600 mt-2">
            {isSuccess ? "Thank you for sharing your experience!" : `Share your experience with ${productName}`}
          </p>
        </DialogHeader>

        {isSuccess ? (
          // Success State
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Review Submitted Successfully!</h3>
            <p className="text-gray-600 text-center">
              Your review has been saved and will help other customers make informed decisions.
            </p>
          </div>
        ) : (
          // Form State
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4">
          {/* Rating Section */}
          <div>
            <Label className="text-base font-semibold text-gray-900 mb-3 block">
              Overall Rating *
            </Label>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => handleRatingClick(value)}
                  onMouseEnter={() => handleRatingHover(value)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-8 h-8 transition-colors ${
                      value <= (hoveredRating || watchedRating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 text-sm text-gray-600">
                {watchedRating > 0 && (
                  <>
                    {watchedRating} star{watchedRating !== 1 ? 's' : ''} - 
                    {watchedRating === 1 && " Poor"}
                    {watchedRating === 2 && " Fair"}
                    {watchedRating === 3 && " Good"}
                    {watchedRating === 4 && " Very Good"}
                    {watchedRating === 5 && " Excellent"}
                  </>
                )}
              </span>
            </div>
            {errors.rating && (
              <p className="text-red-500 text-sm mt-1">{errors.rating.message}</p>
            )}
          </div>

          {/* Review Title */}
          <div>
            <Label htmlFor="review-title" className="text-base font-semibold text-gray-900 mb-2 block">
              Review Title *
            </Label>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="review-title"
                  placeholder="Summarize your experience in a few words"
                  className="border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                  maxLength={100}
                />
              )}
            />
            <div className="flex justify-between items-center mt-1">
              <p className="text-xs text-gray-500">{watchedTitle?.length || 0}/100 characters</p>
              {errors.title && (
                <p className="text-red-500 text-xs">{errors.title.message}</p>
              )}
            </div>
          </div>

          {/* Review Comment */}
          <div>
            <Label htmlFor="review-comment" className="text-base font-semibold text-gray-900 mb-2 block">
              Your Review *
            </Label>
            <Controller
              name="comment"
              control={control}
              render={({ field }) => (
                <textarea
                  {...field}
                  id="review-comment"
                  placeholder="Tell others about your experience with this product. What did you like or dislike? How did it fit? What's the quality like?"
                  className="w-full min-h-[120px] px-3 py-2 border border-purple-200 rounded-md focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none resize-vertical"
                  maxLength={1000}
                />
              )}
            />
            <div className="flex justify-between items-center mt-1">
              <p className="text-xs text-gray-500">{watchedComment?.length || 0}/1000 characters</p>
              {errors.comment && (
                <p className="text-red-500 text-xs">{errors.comment.message}</p>
              )}
            </div>
          </div>

          {/* Recommendation */}
          <div>
            <Label className="text-base font-semibold text-gray-900 mb-3 block">
              Would you recommend this product?
            </Label>
            <Controller
              name="recommend"
              control={control}
              render={({ field }) => (
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={field.value === true}
                      onChange={() => field.onChange(true)}
                      className="text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-gray-700">Yes, I recommend this product</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={field.value === false}
                      onChange={() => field.onChange(false)}
                      className="text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-gray-700">No, I don't recommend this product</span>
                  </label>
                </div>
              )}
            />
          </div>

          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="reviewer-name" className="text-base font-semibold text-gray-900 mb-2 block">
                Your Name *
              </Label>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="reviewer-name"
                    placeholder="Enter your name"
                    className="border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                  />
                )}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="reviewer-email" className="text-base font-semibold text-gray-900 mb-2 block">
                Email (Optional)
              </Label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="reviewer-email"
                    type="email"
                    placeholder="Enter your email"
                    className="border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                  />
                )}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">We'll never share your email publicly</p>
            </div>
          </div>

          {/* Terms and Submit */}
          <div className="border-t pt-6">
            <div className="mb-4">
              <p className="text-xs text-gray-600 leading-relaxed">
                By submitting this review, you agree that it contains only truthful information about your experience with this product. 
                Reviews are subject to moderation and may be edited for clarity.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                className="border-gray-300 hover:bg-gray-50"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || !isValid}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Submitting..." : "Submit Review"}
              </Button>
            </div>
          </div>
        </form>
        )}
      </DialogContent>
    </Dialog>
  );
});

ReviewModal.displayName = "ReviewModal";

export default ReviewModal;
