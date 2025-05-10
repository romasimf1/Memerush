import React from 'react';

interface PostCardProps {
  author: {
    username: string;
    avatar: string;
  };
  timestamp: string;
  mediaUrl: string;
  mediaType: 'image' | 'gif' | 'video';
  caption: string;
  onLike?: () => void;
  onComment?: () => void;
  onShare?: () => void;
}

export const PostCard: React.FC<PostCardProps> = ({ author, timestamp, mediaUrl, mediaType, caption, onLike, onComment, onShare }) => {
  return (
    <div className="bg-[#18182b] rounded-xl shadow-lg p-4 flex flex-col gap-4 w-full max-w-xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={author.avatar} alt={author.username} className="w-10 h-10 rounded-full object-cover border border-purple-700/40" />
          <span className="font-semibold text-white text-base">{author.username}</span>
        </div>
        <span className="text-xs text-gray-400">{timestamp}</span>
      </div>
      {/* Media */}
      <div className="w-full flex justify-center items-center rounded-lg overflow-hidden bg-black/30">
        {mediaType === 'image' || mediaType === 'gif' ? (
          <img src={mediaUrl} alt="meme" className="max-h-96 w-full object-contain" />
        ) : (
          <video src={mediaUrl} controls className="max-h-96 w-full object-contain bg-black" />
        )}
      </div>
      {/* Caption */}
      <div className="text-white text-base font-normal px-1">{caption}</div>
      {/* Actions */}
      <div className="flex items-center gap-6 px-1">
        <button onClick={onLike} className="flex items-center gap-1 text-pink-400 hover:text-pink-500 transition text-lg">
          <span role="img" aria-label="like">❤️</span>
        </button>
        <button onClick={onComment} className="flex items-center gap-1 text-purple-400 hover:text-purple-500 transition text-lg">
          <span role="img" aria-label="comment">💬</span>
        </button>
        <button onClick={onShare} className="flex items-center gap-1 text-blue-400 hover:text-blue-500 transition text-lg">
          <span role="img" aria-label="share">↗️</span>
        </button>
      </div>
    </div>
  );
};

export default PostCard; 