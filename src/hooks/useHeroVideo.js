import { useState, useRef, useEffect } from "react";

// Videos served from public/videos
const videos = [
  "/videos/Homy Loan.mp4",
  "/videos/Homy Loan (2).mp4",
  "/videos/Homy Loan (3).mp4",
  "/videos/Homy Loan (4).mp4",
  "/videos/Homy Loan (5).mp4",
  "/videos/Homy Loan (6).mp4",
];

export const useHeroVideo = () => {
  // Deterministic selection to avoid hydration mismatch
  const [selectedVideo] = useState(videos[0]);
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
