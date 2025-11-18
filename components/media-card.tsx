"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tag } from "@/components/ui/tag";
import { Badge } from "@/components/ui/badge";

export interface MediaCardProps {
  title: string;
  description?: string;
  image: string;
  href: string;
  tags?: string[];
  year?: number;
  className?: string;
}

export function MediaCard({
  title,
  description,
  image,
  href,
  tags = [],
  year,
  className,
}: MediaCardProps) {
  // Default placeholder image if none provided
  const imageUrl = image || "/images/placeholder.svg";

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
      className={cn("group relative", className)}
    >
      <Link href={href} className="block">
        <div className="relative aspect-video overflow-hidden rounded-md bg-muted">
          {/* Image */}
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            unoptimized
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          {/* Year badge */}
          {year && (
            <div className="absolute right-2 top-2">
              <Badge variant="year">{year}</Badge>
            </div>
          )}

          {/* Play button on hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-black/50 backdrop-blur-sm">
              <Play className="h-5 w-5 fill-white text-white" />
            </div>
          </div>

          {/* Content overlay */}
          <div className="absolute bottom-0 left-0 right-0 translate-y-2 p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <h3 className="mb-1 font-semibold text-white line-clamp-1">
              {title}
            </h3>
            {description && (
              <p className="mb-2 text-sm text-gray-300 line-clamp-2">
                {description}
              </p>
            )}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {tags.slice(0, 3).map((tag) => (
                  <Tag key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Tag>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Title below (always visible) */}
        <div className="mt-2">
          <h3 className="text-sm font-medium text-white line-clamp-1 group-hover:text-netflix-red transition-colors">
            {title}
          </h3>
        </div>
      </Link>
    </motion.div>
  );
}
