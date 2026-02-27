"use client";
import { useState, useRef, useEffect } from "react";

// Videos served from public/videos (no ES module imports for .mp4)
const videos = [
  "/videos/Homy Loan.mp4",
  "/videos/Homy Loan (2).mp4",
  "/videos/Homy Loan (3).mp4",
  "/videos/Homy Loan (4).mp4",
  "/videos/Homy Loan (5).mp4",
  "/videos/Homy Loan (6).mp4",
];

export const useHeroVideo = () => {
  const [selectedVideo] = useState(() => {
    const randomIndex = Math.floor(Math.random() * videos.length);
    return videos[randomIndex];
  });
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log("Video autoplay failed:", error);
      });
    }
  }, []);

  return { videoRef, selectedVideo };
};
