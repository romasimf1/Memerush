"use client";

import { useState, useEffect } from "react";
import { videos, Video } from "../lib/videos";
import dynamic from "next/dynamic";
import { useSwipeable } from "react-swipeable";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";

const VideoPlayer = dynamic<{ video: Video; playing: boolean }>(() => import("@/components/video-player"), { ssr: false });

export default function VideoFeed() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isMobile, setIsMobile] = useState(false);

  // Responsive check
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Wheel navigation (desktop)
  useEffect(() => {
    if (isMobile) return;
    let last = 0;
    const onWheel = (e: WheelEvent) => {
      if (Date.now() - last < 400) return;
      if (e.deltaY > 40 && active < videos.length - 1) {
        setDirection(1);
        setActive((i) => i + 1);
        last = Date.now();
      }
      if (e.deltaY < -40 && active > 0) {
        setDirection(-1);
        setActive((i) => i - 1);
        last = Date.now();
      }
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [active, isMobile]);

  // Swipe navigation (mobile)
  const swipeHandlers = useSwipeable({
    onSwipedUp: () => {
      if (active < videos.length - 1) {
        setDirection(1);
        setActive((i) => i + 1);
      }
    },
    onSwipedDown: () => {
      if (active > 0) {
        setDirection(-1);
        setActive((i) => i - 1);
      }
    },
    trackTouch: true,
    trackMouse: false,
  });

  // Keyboard navigation (accessibility)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" && active < videos.length - 1) {
        setDirection(1);
        setActive((i) => i + 1);
      }
      if (e.key === "ArrowUp" && active > 0) {
        setDirection(-1);
        setActive((i) => i - 1);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  // Запретить body scroll (на всякий случай)
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div
      {...swipeHandlers}
      className={clsx(
        "relative w-screen h-screen overflow-hidden bg-gradient-to-b from-gray-800 to-gray-900 flex items-center justify-center"
      )}
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={videos[active].id}
          custom={direction}
          initial={{ y: direction > 0 ? 1000 : -1000, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: direction > 0 ? -1000 : 1000, opacity: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 40 }}
          className={clsx(
            "absolute inset-0 flex items-center justify-center",
            isMobile ? "w-screen h-screen" : "w-full h-full"
          )}
        >
          <div
            className={clsx(
              "relative bg-gray-900 shadow-2xl",
              isMobile
                ? "w-screen h-screen rounded-none"
                : "w-[500px] h-[90vh] rounded-lg flex items-center justify-center"
            )}
          >
            <VideoPlayer video={videos[active]} playing={true} />
          </div>
        </motion.div>
      </AnimatePresence>
      {/* MemeRush emoji/gradient overlays for desktop */}
      {!isMobile && (
        <div className="pointer-events-none fixed inset-0 -z-10 select-none opacity-30">
          <div className="absolute left-10 top-10 text-6xl">😂</div>
          <div className="absolute right-10 bottom-10 text-6xl">🔥</div>
          <div className="absolute left-1/2 top-1/3 text-7xl">👾</div>
        </div>
      )}
    </div>
  );
} 