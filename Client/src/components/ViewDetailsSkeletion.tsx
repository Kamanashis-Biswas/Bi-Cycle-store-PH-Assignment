import { Skeleton } from "@/components/ui/skeleton";

export default function ViewDetailsSkeletion() {
    return (
        <div className="container mx-auto p-4 m-4 grid md:grid-cols-5 gap-10 border bg-white">
            {/* Image Skeleton */}
            <div className="md:col-span-2 border">
                <Skeleton className="w-full h-64 mx-auto" />
            </div>

            {/* Right Section */}
            <div className="md:col-span-3 space-y-5">
                {/* Created At & Stock */}
                <div className="flex items-center justify-between">
                    <Skeleton className="w-36 h-6" />
                    <Skeleton className="w-20 h-6" />
                </div>

                {/* Title */}
                <Skeleton className="w-3/4 h-10" />

                {/* Brand */}
                <Skeleton className="w-1/2 h-6" />

                <div className="border"></div>

                {/* Type & Availability */}
                <div className="flex items-center gap-10">
                    <Skeleton className="w-32 h-6" />
                    <Skeleton className="w-24 h-6" />
                </div>

                <div className="border"></div>

                {/* Description */}
                <Skeleton className="w-full h-20" />

                <div className="border"></div>

                {/* Price */}
                <Skeleton className="w-32 h-8" />

                <div className="border"></div>

                {/* Buttons */}
                <div className="flex items-center gap-5">
                    <Skeleton className="w-28 h-10 rounded" />
                    <Skeleton className="w-32 h-10 rounded" />
                </div>
            </div>
        </div>
    );
}
