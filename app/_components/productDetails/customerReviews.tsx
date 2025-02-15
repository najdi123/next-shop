"use client";

import React from "react";
import { Review } from "@/types";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type Props = {
  reviews: Review[];
};

export default function CustomerReviews({ reviews }: Props) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Customer Reviews</h3>

      {reviews.length > 0 ? (
        <div className="flex flex-col space-y-4 max-w-[500px] mx-auto">
          {reviews.map((review) => (
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
