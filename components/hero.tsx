"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Play, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroProps {
  title: string;
  tagline: string;
  description: string;
  image: string;
  imageMobile?: string;
  cvUrl?: string;
  ctaPrimary?: {
    label: string;
    href: string;
  };
  ctaSecondary?: {
    label: string;
    href: string;
  };
}

export function Hero({
  title,
  tagline,
  description,
  image,
  imageMobile,
  cvUrl,
  ctaPrimary,
  ctaSecondary,
}: HeroProps) {
  // Default placeholder if no image
  const imageUrl = image || "/images/placeholder.svg";
  const imageMobileUrl = imageMobile || imageUrl;

  return (
    <section className="relative flex h-[90vh] w-full items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        {/* Desktop Image */}
        <div className="hidden md:block h-full w-full">
          <Image
            src={imageUrl}
            alt={title}
            fill
            priority
            className="object-cover"
            quality={90}
            unoptimized
          />
        </div>
        {/* Mobile Image */}
        <div className="block md:hidden h-full w-full">
          <Image
            src={imageMobileUrl}
            alt={title}
            fill
            priority
            className="object-cover"
            quality={90}
            unoptimized
          />
        </div>
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto md:mx-0 md:ml-[5%] lg:ml-[8%]"
        >
          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-2 text-sm font-semibold uppercase tracking-wider text-netflix-red"
          >
            {tagline}
          </motion.p>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mb-4 font-display text-5xl font-bold text-white sm:text-6xl lg:text-7xl"
          >
            {title}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mb-8 text-lg text-gray-300 sm:text-xl"
          >
            {description}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-wrap gap-4"
          >
            {ctaPrimary && (
              <Button
                size="lg"
                className="gap-2 text-base font-semibold"
                asChild
              >
                <a href={ctaPrimary.href}>
                  <Play className="h-5 w-5 fill-current" />
                  {ctaPrimary.label}
                </a>
              </Button>
            )}
            {ctaSecondary && (
              <Button
                size="lg"
                variant="outline"
                className="gap-2 border-white/20 bg-white/10 text-base font-semibold text-white backdrop-blur-sm hover:bg-white/20"
                asChild
              >
                <a href={ctaSecondary.href}>
                  {ctaSecondary.label}
                  <ArrowRight className="h-5 w-5" />
                </a>
              </Button>
            )}
            {cvUrl && (
              <Button
                size="lg"
                variant="outline"
                className="gap-2 border-white/20 bg-white/10 text-base font-semibold text-white backdrop-blur-sm hover:bg-white/20"
                asChild
              >
                <a href={cvUrl} download target="_blank" rel="noopener noreferrer">
                  <Download className="h-5 w-5" />
                  Télécharger mon CV
                </a>
              </Button>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-netflix-black to-transparent" />
    </section>
  );
}
