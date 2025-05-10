"use client";

import { X } from "lucide-react";

interface ShareOverlayProps {
  onClose: () => void;
  videoId: number;
}

const SHARE_PLATFORMS = [
  { id: "whatsapp", name: "WhatsApp", icon: "📱" },
  { id: "telegram", name: "Telegram", icon: "✈️" },
  { id: "vk", name: "VK", icon: "🌐" },
  { id: "facebook", name: "Facebook", icon: "👥" },
  { id: "twitter", name: "Twitter", icon: "🐦" },
  { id: "email", name: "Email", icon: "📧" },
  { id: "copy", name: "Copy Link", icon: "🔗" },
  { id: "qr", name: "QR Code", icon: "📲" },
  { id: "instagram", name: "Instagram", icon: "📸" },
  { id: "tiktok", name: "TikTok", icon: "🎵" },
  { id: "snapchat", name: "Snapchat", icon: "👻" },
  { id: "pinterest", name: "Pinterest", icon: "📌" },
];

export default function ShareOverlay({ onClose, videoId }: ShareOverlayProps) {
  const handleShare = (platform: string) => {
    // In a real app, this would implement actual sharing functionality
    console.log(`Sharing video ${videoId} on ${platform}`);
    // Simulate sharing success
    const shareButton = document.getElementById(`share-${platform}`);
    if (shareButton) {
      shareButton.classList.add("scale-110");
      setTimeout(() => {
        shareButton.classList.remove("scale-110");
        if (platform === "copy") {
          alert("Ссылка скопирована!");
        }
        setTimeout(onClose, 500);
      }, 300);
    }
  };

  return (
    <div className="absolute inset-0 z-30 bg-black/90 backdrop-blur-sm animate-slide-up">
      <div className="flex justify-between items-center p-4 border-b border-gray-800">
        <h3 className="text-lg font-bold text-white">Поделиться</h3>
        <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-800">
          <X className="w-6 h-6 text-white" />
        </button>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-4 gap-6">
          {SHARE_PLATFORMS.map((platform) => (
            <button
              key={platform.id}
              id={`share-${platform.id}`}
              className="flex flex-col items-center transition-transform hover:scale-110"
              onClick={() => handleShare(platform.id)}
            >
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#ff4ecd] to-[#a87cff] flex items-center justify-center mb-2 shadow-lg">
                <span className="text-2xl">{platform.icon}</span>
              </div>
              <span className="text-xs text-white text-center">{platform.name}</span>
            </button>
          ))}
        </div>
        <div className="mt-8 p-4 bg-gray-800/50 rounded-xl">
          <p className="text-sm text-gray-300 mb-2">Ссылка на видео</p>
          <div className="flex gap-2">
            <div className="flex-1 bg-gray-700 text-white text-sm p-3 rounded-lg truncate">
              https://memerush.app/video/{videoId}
            </div>
            <button
              className="px-4 py-2 bg-gradient-to-r from-[#ff4ecd] to-[#a87cff] rounded-lg text-white font-medium"
              onClick={() => handleShare("copy")}
            >
              Копировать
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 