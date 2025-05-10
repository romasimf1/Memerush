"use client";

import { useState, useRef, useEffect } from "react";
// Заглушки для Avatar, Button, Input (замени на свои UI-компоненты при необходимости)
const Avatar = ({ children, className }: any) => <div className={className}>{children}</div>;
const AvatarImage = ({ src, alt }: any) => <img src={src} alt={alt} />;
const AvatarFallback = ({ children }: any) => <span>{children}</span>;
const Button = ({ children, ...props }: any) => <button {...props}>{children}</button>;
const Input = (props: any) => <input {...props} />;
const Heart = (props: any) => <span {...props}>❤️</span>;
const Send = (props: any) => <span {...props}>📤</span>;
const MoreHorizontal = (props: any) => <span {...props}>⋯</span>;

const SAMPLE_COMMENTS = [
  { id: 1, username: "@react_fan", displayName: "React Fan", avatar: "/placeholder.svg?height=40&width=40", text: "This is so relatable! 😂 Happens to me all the time!", likes: 42, time: "2 часа назад", replies: [] },
  { id: 2, username: "@code_ninja", displayName: "Code Ninja", avatar: "/placeholder.svg?height=40&width=40", text: "The client: 'Just a small change.' The change: *rewrites the entire codebase*", likes: 128, time: "5 часов назад", replies: [ { id: 21, username: "@dev_life", displayName: "Dev Life", avatar: "/placeholder.svg?height=40&width=40", text: "Story of my life 😭", likes: 24, time: "4 часа назад" } ] },
  { id: 3, username: "@dev_life", displayName: "Dev Life", avatar: "/placeholder.svg?height=40&width=40", text: "I felt this in my soul 💀", likes: 76, time: "1 день назад", replies: [] },
  { id: 4, username: "@ui_designer", displayName: "UI Designer", avatar: "/placeholder.svg?height=40&width=40", text: "Can we talk about how accurate this is? 👏", likes: 53, time: "2 дня назад", replies: [] },
  { id: 5, username: "@junior_dev", displayName: "Junior Dev", avatar: "/placeholder.svg?height=40&width=40", text: "Me trying to explain to my boss why the 'small change' took 3 days 🙃", likes: 89, time: "3 дня назад", replies: [] },
];

interface CommentSectionProps { videoId: number }

export default function CommentSection({ videoId }: CommentSectionProps) {
  const [comments, setComments] = useState(SAMPLE_COMMENTS);
  const [newComment, setNewComment] = useState("");
  const [likedComments, setLikedComments] = useState<Record<number, boolean>>({});
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");
  const commentInputRef = useRef<HTMLInputElement>(null);
  const commentsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => { if (commentInputRef.current) { setTimeout(() => { commentInputRef.current?.focus(); }, 300); } }, []);

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const comment = { id: Date.now(), username: "@user", displayName: "You", avatar: "/placeholder.svg?height=40&width=40", text: newComment, likes: 0, time: "Только что", replies: [] };
    setComments([comment, ...comments]);
    setNewComment("");
  };

  const handleAddReply = (commentId: number) => {
    if (!replyText.trim()) return;
    const reply = { id: Date.now(), username: "@user", displayName: "You", avatar: "/placeholder.svg?height=40&width=40", text: replyText, likes: 0, time: "Только что" };
    const updatedComments = comments.map((comment) => { if (comment.id === commentId) { return { ...comment, replies: [reply, ...(comment.replies || [])] }; } return comment; });
    setComments(updatedComments);
    setReplyText("");
    setReplyingTo(null);
  };

  const toggleLikeComment = (commentId: number) => {
    setLikedComments((prev) => ({ ...prev, [commentId]: !prev[commentId] }));
  };

  return (
    <div className="h-full flex flex-col">
      <div ref={commentsContainerRef} className="flex-1 overflow-y-auto p-4 space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="space-y-4">
            <div className="flex gap-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={comment.avatar || "/placeholder.svg"} alt={comment.username} />
                <AvatarFallback>{comment.username.substring(1, 3).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-white">{comment.displayName}</span>
                    <span className="text-xs text-gray-400 ml-2">{comment.username}</span>
                  </div>
                  <button className="text-gray-400 hover:text-white"><MoreHorizontal className="w-5 h-5" /></button>
                </div>
                <p className="text-gray-200 mt-1">{comment.text}</p>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-xs text-gray-400">{comment.time}</span>
                  <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-white" onClick={() => toggleLikeComment(comment.id)}>
                    <Heart className={`w-4 h-4 ${likedComments[comment.id] ? "fill-pink-500 text-pink-500" : "fill-transparent"}`} />
                    <span>{likedComments[comment.id] ? comment.likes + 1 : comment.likes}</span>
                  </button>
                  <button className="text-xs text-gray-400 hover:text-white" onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}>Ответить</button>
                </div>
                {replyingTo === comment.id && (
                  <div className="mt-3 flex gap-2">
                    <Avatar className="w-8 h-8"><AvatarImage src="/placeholder.svg?height=32&width=32" alt="You" /><AvatarFallback>ME</AvatarFallback></Avatar>
                    <div className="flex-1 flex gap-2">
                      <Input className="flex-1 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 text-sm" placeholder={`Ответить на комментарий ${comment.username}...`} value={replyText} onChange={(e) => setReplyText(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { handleAddReply(comment.id); } }} autoFocus />
                      <Button size="icon" className="bg-gradient-to-r from-[#ff4ecd] to-[#a87cff] hover:shadow-[0_0_10px_rgba(168,124,255,0.5)]" onClick={() => handleAddReply(comment.id)}><Send className="w-4 h-4" /></Button>
                    </div>
                  </div>
                )}
                {comment.replies && comment.replies.length > 0 && (
                  <div className="mt-3 space-y-3 pl-6 border-l-2 border-gray-800">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="flex gap-3">
                        <Avatar className="w-8 h-8"><AvatarImage src={reply.avatar || "/placeholder.svg"} alt={reply.username} /><AvatarFallback>{reply.username.substring(1, 3).toUpperCase()}</AvatarFallback></Avatar>
                        <div className="flex-1">
                          <div className="flex items-center"><span className="font-semibold text-white text-sm">{reply.displayName}</span><span className="text-xs text-gray-400 ml-2">{reply.username}</span></div>
                          <p className="text-gray-200 text-sm mt-1">{reply.text}</p>
                          <div className="flex items-center gap-4 mt-1">
                            <span className="text-xs text-gray-400">{reply.time}</span>
                            <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-white" onClick={() => toggleLikeComment(reply.id)}><Heart className={`w-3 h-3 ${likedComments[reply.id] ? "fill-pink-500 text-pink-500" : "fill-transparent"}`} /><span>{likedComments[reply.id] ? reply.likes + 1 : reply.likes}</span></button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-gray-800 bg-black/50 sticky bottom-0">
        <div className="flex gap-2">
          <Avatar className="w-8 h-8"><AvatarImage src="/placeholder.svg?height=32&width=32" alt="You" /><AvatarFallback>ME</AvatarFallback></Avatar>
          <div className="flex-1 flex gap-2">
            <Input ref={commentInputRef} className="flex-1 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400" placeholder="Добавить комментарий..." value={newComment} onChange={(e) => setNewComment(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { handleAddComment(); } }} />
            <Button size="icon" className="bg-gradient-to-r from-[#ff4ecd] to-[#a87cff] hover:shadow-[0_0_10px_rgba(168,124,255,0.5)]" onClick={handleAddComment}><Send className="w-4 h-4" /></Button>
          </div>
        </div>
      </div>
    </div>
  );
} 