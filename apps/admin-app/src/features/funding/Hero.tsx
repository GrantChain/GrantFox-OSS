"use client";

import { DottedMap } from "@/components/ui/dotted-map";
import { useEffect, useState } from "react";

const markers = [
  // North America
  {
    lat: 37.7749,
    lng: -122.4194,
    size: 0.3,
  }, // San Francisco
  // Central America - Costa Rica
  {
    lat: 9.7489,
    lng: -83.7534,
    size: 0.35,
  }, // Costa Rica (un poco más grande)
  // South America
  {
    lat: -23.5505,
    lng: -46.6333,
    size: 0.3,
  }, // São Paulo, Brazil
  // Europe
  {
    lat: 52.52,
    lng: 13.405,
    size: 0.3,
  }, // Berlin, Germany
  // Africa
  {
    lat: -1.2921,
    lng: 36.8219,
    size: 0.3,
  }, // Nairobi, Kenya
  // Asia
  {
    lat: 35.6762,
    lng: 139.6503,
    size: 0.3,
  }, // Tokyo, Japan
  // Oceania
  {
    lat: -33.8688,
    lng: 151.2093,
    size: 0.3,
  }, // Sydney, Australia
];

export const Hero = () => {
  return (
    <div className="flex w-full mx-auto overflow-x-hidden">
      <div className={`h-[250px] w-full overflow-hidden rounded-xl border`}>
        <DottedMap markers={markers} />
      </div>
    </div>
  );
};
