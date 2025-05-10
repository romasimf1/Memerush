"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Heart, MessageCircle, Share2, Music, X, Bookmark, Upload } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import VideoPlayer from "@/components/video-player";
import CommentSection from "@/components/comment-section";
import ShareOverlay from "@/components/share-overlay";
import { useMediaQuery } from "@/hooks/use-mobile";

// Sample video data
const VIDEOS = [
  {
    id: 1,
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    username: "@meme_lord",
    displayName: "Meme Lord",
    caption: "When you finally understand that React hook 🤯 #coding #memes #javascript",
    audioInfo: "Original Sound - Meme Rush",
    likes: 4523,
    comments: 128,
    shares: 76,
    bookmarks: 342,
    userAvatar: "/placeholder.svg?height=40&width=40",
    isFollowing: false,
    tags: ["coding", "memes", "javascript"],
  },
  {
    id: 2,
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    username: "@viral_vibes",
    displayName: "Viral Vibes",
    caption: "This is how developers debug in production 💀 #programming #bugs #devlife",
    audioInfo: "Funny Sound - Viral Clips",
    likes: 8921,
    comments: 342,
    shares: 201,
    bookmarks: 567,
    userAvatar: "/placeholder.svg?height=40&width=40",
    isFollowing: true,
    tags: ["programming", "bugs", "devlife"],
  },
  {
    id: 3,
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    username: "@code_comedian",
    displayName: "Code Comedian",
    caption: "POV: When the client asks for 'small changes' 😂 #freelance #clientfromhell",
    audioInfo: "Trending Sound - MemeRush Official",
    likes: 12453,
    comments: 567,
    shares: 890,
    bookmarks: 1243,
    userAvatar: "/placeholder.svg?height=40&width=40",
    isFollowing: false,
    tags: ["freelance", "clientfromhell"],
  },
];

function UploadModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="bg-[#18182b] rounded-2xl p-8 w-full max-w-md relative">
        <button className="absolute top-4 right-4 text-gray-400 hover:text-white" onClick={onClose}><X className="w-6 h-6" /></button>
        <h2 className="text-xl font-bold mb-4 text-white">Загрузить мем-видео</h2>
        <div className="flex flex-col gap-4">
          <input type="file" accept="video/*" className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-[#ff4ecd] file:to-[#a87cff] file:text-white hover:file:bg-[#a87cff]" />
          <Button className="w-full bg-gradient-to-r from-[#ff4ecd] to-[#a87cff] text-white font-bold py-2 rounded-xl">Загрузить</Button>
        </div>
        <p className="text-xs text-gray-400 mt-4">Форматы: mp4, mov, webm. До 60 сек. Мемы приветствуются!</p>
      </div>
    </div>
  );
}

export default function VideoFeed() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [shareVideoId, setShareVideoId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Intersection Observer для смены активного видео
  useEffect(() => {
    const cards = containerRef.current?.querySelectorAll<HTMLElement>("[data-video-card]");
    if (!cards) return;
    const observer = new window.IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting && entry.intersectionRatio > 0.6)
          .map((entry) => Number(entry.target.getAttribute("data-idx")));
        if (visible.length > 0) setActiveIndex(visible[0]);
      },
      { threshold: [0.6] }
    );
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [containerRef.current, isMobile]);

  // Прокрутка к видео по кнопкам (только на десктопе)
  const scrollToVideo = useCallback((idx: number) => {
    const cards = containerRef.current?.querySelectorAll<HTMLElement>("[data-video-card]");
    if (cards && cards[idx]) {
      cards[idx].scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-[#18182b] via-[#232347] to-[#18182b]">
      {/* Upload button и эмодзи-фон только на десктопе */}
      {!isMobile && (
        <>
          <div className="sticky top-0 z-30 flex justify-center py-4 bg-gradient-to-b from-[#18182b]/90 to-transparent">
            <Button className="flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-[#ff4ecd] to-[#a87cff] text-white font-bold shadow-lg hover:scale-105 transition-transform" onClick={() => setShowUpload(true)}>
              <Upload className="w-5 h-5" /> Загрузить мем
            </Button>
          </div>
          <div className="pointer-events-none fixed inset-0 -z-10 select-none opacity-40">
            <div className="absolute left-10 top-10 text-6xl">😂</div>
            <div className="absolute right-10 bottom-10 text-6xl">🔥</div>
            <div className="absolute left-1/2 top-1/3 text-7xl">👾</div>
          </div>
        </>
      )}
      {/* Feed */}
      <div
        ref={containerRef}
        className={`w-full h-screen overflow-y-auto flex justify-center items-center ${isMobile ? "bg-black" : ""}`}
        style={{ scrollSnapType: "y mandatory" }}
      >
        <div className="w-full flex flex-col items-center gap-0">
          {VIDEOS.map((video, idx) => (
            <div
              key={video.id}
              data-video-card
              data-idx={idx}
              className={`relative flex justify-center items-center w-full ${isMobile ? "h-screen" : "h-[90vh]"}`}
              style={{ scrollSnapAlign: "center" }}
            >
              {/* Видео-контейнер */}
              <div
                className={`relative flex flex-col justify-end items-center ${isMobile ? "w-full h-full" : "w-[500px] h-full rounded-3xl shadow-2xl bg-[#232347] overflow-hidden"}`}
              >
                {/* Видео */}
                <div className={`relative w-full h-full ${isMobile ? "" : "aspect-[9/16]"}`}>
                  <VideoPlayer
                    src={video.url}
                    autoPlay={activeIndex === idx}
                    muted
                    loop
                    className={`w-full h-full ${isMobile ? "object-cover" : "object-contain"}`}
                  />
                  {/* Инфо и кнопки поверх видео (мобайл) */}
                  {isMobile && (
                    <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent flex flex-col gap-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8 border-2 border-pink-400/60">
                          <AvatarImage src={video.userAvatar} alt={video.username} />
                          <AvatarFallback>{video.displayName[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-bold text-white text-base">{video.displayName}</div>
                          <div className="text-xs text-gray-400">{video.username}</div>
                        </div>
                        {video.isFollowing ? (
                          <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-green-500/20 text-green-400 font-semibold">Подписки</span>
                        ) : null}
                      </div>
                      <div className="text-white text-base mt-1 mb-1">{video.caption}</div>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {video.tags.map((tag) => (
                          <span key={tag} className="px-2 py-0.5 text-xs rounded-full bg-gradient-to-r from-[#ff4ecd]/30 to-[#a87cff]/30 text-pink-200">#{tag}</span>
                        ))}
                      </div>
                      <div className="flex items-center gap-6 mt-2">
                        <Button className="flex items-center gap-1 text-pink-400 hover:text-pink-500 bg-transparent" aria-label="Лайк">
                          <Heart className="w-5 h-5" /> <span>{video.likes}</span>
                        </Button>
                        <Button className="flex items-center gap-1 text-purple-400 hover:text-purple-500 bg-transparent" aria-label="Комментарии" onClick={() => setShowComments(true)}>
                          <MessageCircle className="w-5 h-5" /> <span>{video.comments}</span>
                        </Button>
                        <Button className="flex items-center gap-1 text-blue-400 hover:text-blue-500 bg-transparent" aria-label="Поделиться" onClick={() => { setShareVideoId(video.id); setShowShare(true); }}>
                          <Share2 className="w-5 h-5" /> <span>{video.shares}</span>
                        </Button>
                        <Button className="flex items-center gap-1 text-yellow-400 hover:text-yellow-500 bg-transparent" aria-label="Сохранить">
                          <Bookmark className="w-5 h-5" /> <span>{video.bookmarks}</span>
                        </Button>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <Music className="w-4 h-4 text-pink-400" />
                        <span className="text-xs text-white font-medium">{video.audioInfo}</span>
                      </div>
                    </div>
                  )}
                  {/* Инфо и кнопки сбоку (десктоп) */}
                  {!isMobile && (
                    <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent flex flex-col gap-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10 border-2 border-pink-400/60">
                          <AvatarImage src={video.userAvatar} alt={video.username} />
                          <AvatarFallback>{video.displayName[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-bold text-white text-base">{video.displayName}</div>
                          <div className="text-xs text-gray-400">{video.username}</div>
                        </div>
                        {video.isFollowing ? (
                          <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-green-500/20 text-green-400 font-semibold">Подписки</span>
                        ) : null}
                      </div>
                      <div className="text-white text-base mt-2 mb-1">{video.caption}</div>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {video.tags.map((tag) => (
                          <span key={tag} className="px-2 py-0.5 text-xs rounded-full bg-gradient-to-r from-[#ff4ecd]/30 to-[#a87cff]/30 text-pink-200">#{tag}</span>
                        ))}
                      </div>
                      <div className="flex items-center gap-6 mt-2">
                        <Button className="flex items-center gap-1 text-pink-400 hover:text-pink-500 bg-transparent" aria-label="Лайк">
                          <Heart className="w-5 h-5" /> <span>{video.likes}</span>
                        </Button>
                        <Button className="flex items-center gap-1 text-purple-400 hover:text-purple-500 bg-transparent" aria-label="Комментарии" onClick={() => setShowComments(true)}>
                          <MessageCircle className="w-5 h-5" /> <span>{video.comments}</span>
                        </Button>
                        <Button className="flex items-center gap-1 text-blue-400 hover:text-blue-500 bg-transparent" aria-label="Поделиться" onClick={() => { setShareVideoId(video.id); setShowShare(true); }}>
                          <Share2 className="w-5 h-5" /> <span>{video.shares}</span>
                        </Button>
                        <Button className="flex items-center gap-1 text-yellow-400 hover:text-yellow-500 bg-transparent" aria-label="Сохранить">
                          <Bookmark className="w-5 h-5" /> <span>{video.bookmarks}</span>
                        </Button>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <Music className="w-4 h-4 text-pink-400" />
                        <span className="text-xs text-white font-medium">{video.audioInfo}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Comments modal */}
      {showComments && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-[#232347] rounded-2xl w-full max-w-lg h-[80vh] flex flex-col relative">
            <button className="absolute top-4 right-4 text-gray-400 hover:text-white z-10" onClick={() => setShowComments(false)}><X className="w-6 h-6" /></button>
            <CommentSection videoId={VIDEOS[activeIndex].id} />
          </div>
        </div>
      )}
      {/* Share modal */}
      {showShare && shareVideoId !== null && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-[#232347] rounded-2xl w-full max-w-lg h-[60vh] flex flex-col relative">
            <button className="absolute top-4 right-4 text-gray-400 hover:text-white z-10" onClick={() => setShowShare(false)}><X className="w-6 h-6" /></button>
            <ShareOverlay videoId={shareVideoId} onClose={() => setShowShare(false)} />
          </div>
        </div>
      )}
      {/* Upload modal */}
      <UploadModal open={showUpload} onClose={() => setShowUpload(false)} />
    </div>
  );
} 