"use client";

import { useRef, useEffect } from "react";
import { Video } from "../lib/videos";
import { HeartIcon, ChatBubbleLeftEllipsisIcon, ArrowUpTrayIcon } from "@heroicons/react/24/solid";

type Props = {
  video: Video;
  playing: boolean;
  onLike?: () => void;
  onComment?: () => void;
  onShare?: () => void;
};

export default function VideoPlayer({ video, playing, onLike, onComment, onShare }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  // Управление воспроизведением
  useEffect(() => {
    if (!ref.current) return;
    if (playing) {
      ref.current.play().catch(() => {});
    } else {
      ref.current.pause();
    }
  }, [playing]);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <video
        ref={ref}
        src={video.url}
        className="w-full h-full object-cover rounded-lg bg-black"
        loop
        playsInline
        controls={false}
        preload="auto"
        tabIndex={-1}
        aria-label={`Video by @${video.username}`}
      />
      {/* Overlay UI */}
      <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
        {/* Bottom left: username & music */}
        <div className="absolute left-0 bottom-0 p-4 flex flex-col gap-2 pointer-events-auto">
          <span className="text-white font-bold text-lg drop-shadow-sm">@{video.username}</span>
          <span className="flex items-center gap-2 text-gray-300 text-sm bg-gray-800/70 rounded-md px-2 py-1">
            <span role="img" aria-label="music">🎵</span>
            {video.music}
          </span>
        </div>
        {/* Right: action buttons */}
        <div className="absolute right-4 bottom-24 flex flex-col gap-4 pointer-events-auto">
          <button
            aria-label="Лайкнуть видео"
            className="bg-gray-800/70 hover:bg-gray-700 rounded-full p-3 transition"
            tabIndex={0}
            onClick={onLike}
          >
            <HeartIcon className="w-7 h-7 text-pink-400" />
          </button>
          <button
            aria-label="Комментарии"
            className="bg-gray-800/70 hover:bg-gray-700 rounded-full p-3 transition"
            tabIndex={0}
            onClick={onComment}
          >
            <ChatBubbleLeftEllipsisIcon className="w-7 h-7 text-purple-400" />
          </button>
          <button
            aria-label="Поделиться"
            className="bg-gray-800/70 hover:bg-gray-700 rounded-full p-3 transition"
            tabIndex={0}
            onClick={onShare}
          >
            <ArrowUpTrayIcon className="w-7 h-7 text-blue-400" />
          </button>
        </div>
      </div>
    </div>
  );
} 