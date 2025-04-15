// components/KaraokePlayer.js
import { useEffect, useRef, useState } from "react";

export default function AudioPlayer({ audioUrl, segments }) {
  const audioRef = useRef(null);
  const [currentLine, setCurrentLine] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const time = audioRef.current?.currentTime;
      if (!time) return;

      const nextLine = segments.findIndex(
        (seg, i) =>
          time >= seg.start && (i === segments.length - 1 || time < segments[i + 1].start)
      );
      if (nextLine !== -1 && nextLine !== currentLine) {
        setCurrentLine(nextLine);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [segments, currentLine]);

  return (
    <div className="p-4">
      <audio controls ref={audioRef} src={audioUrl} className="w-full mb-4" />

      <div className="max-h-96 overflow-y-auto font-mono leading-relaxed">
        {segments.map((seg, i) => (
          <div
            key={i}
            className={`transition-all px-2 py-1 rounded ${
              i === currentLine ? "bg-yellow-200 text-black font-bold" : "text-gray-600"
            }`}
          >
            {seg.text}
          </div>
        ))}
      </div>
    </div>
  );
}
