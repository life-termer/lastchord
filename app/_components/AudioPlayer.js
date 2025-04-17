// components/KaraokePlayer.js
import { useEffect, useRef, useState } from "react";

export default function AudioPlayer({ audioUrl, lyrics, lyricsName }) {
  const audioRef = useRef(null);
  const scrollRef = useRef(null);
  const [currentLine, setCurrentLine] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const time = audioRef.current?.currentTime;
      if (!time) return;

      const nextLine = lyrics.findIndex(
        (seg, i) =>
          time >= seg.start &&
          (i === lyrics.length - 1 || time < lyrics[i + 1].start)
      );
      if (nextLine !== -1 && nextLine !== currentLine) {
        setCurrentLine(nextLine);
      }
    }, 100);
    scrollRef.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "start",
    });
    return () => clearInterval(interval);
  }, [lyrics, currentLine, scrollRef]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{lyricsName}</h1>
      <audio controls ref={audioRef} src={audioUrl} className="w-full mb-4" />

      <div className="max-h-[calc(100vh-300px)] overflow-y-auto font-mono leading-relaxed">
        {lyrics.map((seg, i) => (
          <div
            key={i}
            ref={i === currentLine ? scrollRef : null}
            className={`transition-all duration-500 px-2 py-1 rounded ${
              i === currentLine
                ? "bg-emerald-800/40 text-black font-bold"
                : "text-gray-600  text-md"
            }`}
          >
            {seg.text}
          </div>
        ))}
      </div>
    </div>
  );
}
