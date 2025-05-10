"use client";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div style={{ padding: 32 }}>
      <h2>Что-то пошло не так!</h2>
      <pre style={{ color: 'red' }}>{error.message}</pre>
      <button onClick={() => reset()}>Попробовать снова</button>
    </div>
  );
} 