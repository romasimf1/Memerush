import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { redirect } from 'next/navigation';
import PostCard from '@/components/PostCard';

const mockPosts = [
  {
    id: 1,
    author: {
      username: 'memelord',
      avatar: 'https://i.pravatar.cc/100?img=1',
    },
    timestamp: '3h ago',
    mediaUrl: 'https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif',
    mediaType: 'gif',
    caption: 'When the code finally works after hours of debugging 😂',
  },
  {
    id: 2,
    author: {
      username: 'catfan',
      avatar: 'https://i.pravatar.cc/100?img=2',
    },
    timestamp: '1h ago',
    mediaUrl: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=600&q=80',
    mediaType: 'image',
    caption: 'This is how I feel on Mondays.',
  },
  {
    id: 3,
    author: {
      username: 'videoqueen',
      avatar: 'https://i.pravatar.cc/100?img=3',
    },
    timestamp: '10m ago',
    mediaUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    mediaType: 'video',
    caption: 'POV: You deploy to prod without tests',
  },
  {
    id: 4,
    author: {
      username: 'doge',
      avatar: 'https://i.pravatar.cc/100?img=4',
    },
    timestamp: 'just now',
    mediaUrl: 'https://media.giphy.com/media/3o6Zt481isNVuQI1l6/giphy.gif',
    mediaType: 'gif',
    caption: 'Such meme. Much wow.',
  },
];

export default async function FeedPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/');
  }

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white font-sans flex flex-col items-center py-8 px-2">
      <div className="w-full max-w-2xl flex flex-col gap-6">
        {mockPosts.map((post) => (
          <PostCard
            key={post.id}
            author={post.author}
            timestamp={post.timestamp}
            mediaUrl={post.mediaUrl}
            mediaType={post.mediaType}
            caption={post.caption}
          />
        ))}
      </div>
    </main>
  );
} 