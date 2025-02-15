"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Review } from "@/types";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAddReviewMutation } from "@/app/store/apiSlice";

type Props = {
  productId: number;
  reviews: Review[];
};

type ReviewFormInputs = {
  name: string;
  review: string;
};

export default function CustomerReviews({ productId, reviews }: Props) {
  const [customerReviews, setCustomerReviews] = useState<Review[]>(reviews);
  const [addReview, { isLoading, isError }] = useAddReviewMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReviewFormInputs>();

  const onSubmit = async (data: ReviewFormInputs) => {
    const newReview: Review = {
      name: data.name,
      review: data.review,
      timestamp: new Date().toISOString(),
    };

    try {
      // Optimistically update UI before API request completes
      setCustomerReviews((prev) => [newReview, ...prev]);

      // Send review to backend API
      await addReview({
        productId,
        name: data.name,
        review: data.review,
      }).unwrap();

      reset(); // Clear the form after successful submission
    } catch (error) {
      console.error("Failed to submit review:", error);
      // If the request fails, remove the optimistically added review
      setCustomerReviews((prev) => prev.filter((r) => r !== newReview));
    }
  };

  return (
    <div className="space-y-6 max-w-[500px] mx-auto">
      <h3 className="text-xl font-semibold">Customer Reviews</h3>

      {/* Review Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          {...register("name", { required: "Name is required" })}
          placeholder="Your Name"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}

        <Textarea
          {...register("review", { required: "Review is required" })}
          placeholder="Write your review..."
        />
        {errors.review && (
          <p className="text-red-500">{errors.review.message}</p>
        )}

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit Review"}
        </Button>

        {isError && (
          <p className="text-red-500 mt-2">Failed to submit review.</p>
        )}
      </form>

      <Separator />

      {/* Display Reviews */}
      {customerReviews.length > 0 ? (
        <div className="flex flex-col space-y-4">
          {customerReviews.map((review) => (
            <Card key={review.timestamp} className="p-4 shadow-md border">
              <CardHeader className="flex items-center justify-between">
                <span className="font-semibold text-foreground">
                  {review.name}
                </span>
              </CardHeader>

              <Separator />

              <CardContent className="mt-3 text-muted-foreground">
                {review.review}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">No reviews yet.</p>
      )}
    </div>
  );
}
