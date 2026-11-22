"use client";

import React, { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Player, PlayerRef } from "@remotion/player";
import { Pause, Play } from "lucide-react";

const emptySubscribe = () => () => {};
const getClientMounted = () => true;
const getServerMounted = () => false;

interface RemotionCanvasProps<TProps extends Record<string, unknown>> {
  component: React.ComponentType<TProps>;
  inputProps: TProps;
  compositionWidth: number;
  compositionHeight: number;
  durationInFrames: number;
  fps?: number;
  initialFrame?: number;
  className?: string;
  showPauseControl?: boolean;
  pauseLabel?: string;
  playLabel?: string;
  controls?: boolean;
  loop?: boolean;
  autoPlay?: boolean;
  ariaLabel?: string;
}

export function RemotionCanvas<TProps extends Record<string, unknown>>({
  component,
  inputProps,
  compositionWidth,
  compositionHeight,
  durationInFrames,
  fps = 30,
  initialFrame = 0,
  className = "",
  showPauseControl = false,
  pauseLabel = "Pause animation",
  playLabel = "Play animation",
  controls = false,
  loop = true,
  autoPlay = true,
  ariaLabel,
}: RemotionCanvasProps<TProps>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<PlayerRef>(null);
  const mounted = useSyncExternalStore(
    emptySubscribe,
    getClientMounted,
    getServerMounted,
  );
  const [userPaused, setUserPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(() =>
    typeof window !== "undefined" && window.matchMedia
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false,
  );
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia) {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    }
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[entries.length - 1];
        if (entry) {
          setIsVisible(entry.isIntersecting);
        }
      },
      { rootMargin: "120px", threshold: 0.05 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const shouldPlay = autoPlay && isVisible && !userPaused && !reducedMotion;

  useEffect(() => {
    const player = playerRef.current;
    if (!player || !mounted) return;
    if (shouldPlay) {
      player.play();
    } else {
      player.pause();
    }
  }, [shouldPlay, mounted]);

  const togglePlayback = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const nextPaused = !userPaused;
    setUserPaused(nextPaused);
    if (!nextPaused && reducedMotion) {
      setReducedMotion(false);
    }
    const player = playerRef.current;
    if (player) {
      if (nextPaused) {
        player.pause();
      } else {
        player.play();
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden bg-[#0a0a0a] ${className}`}
      style={{ aspectRatio: `${compositionWidth} / ${compositionHeight}` }}
      role={ariaLabel ? "region" : undefined}
      aria-label={ariaLabel}
    >
      {mounted ? (
        <Player
          ref={playerRef}
          component={component}
          inputProps={inputProps}
          durationInFrames={durationInFrames}
          compositionWidth={compositionWidth}
          compositionHeight={compositionHeight}
          fps={fps}
          initialFrame={initialFrame}
          autoPlay={shouldPlay}
          loop={loop}
          controls={controls}
          clickToPlay={false}
          acknowledgeRemotionLicense
          style={{
            width: "100%",
            height: "100%",
            display: "block",
          }}
        />
      ) : (
        <div
          aria-hidden="true"
          className="h-full w-full bg-[radial-gradient(circle_at_50%_40%,rgba(236,82,27,0.28),#0a0a0a_75%)]"
        />
      )}

      {showPauseControl && mounted && (
        <button
          type="button"
          onClick={togglePlayback}
          aria-label={shouldPlay ? pauseLabel : playLabel}
          className="absolute bottom-14 right-4 z-30 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-[#0a0a0a]/85 text-white backdrop-blur-sm transition duration-150 hover:border-[#ec521b] hover:bg-[#ec521b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white cursor-pointer sm:bottom-12"
        >
          {shouldPlay ? (
            <Pause className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Play className="h-4 w-4 translate-x-0.5" aria-hidden="true" />
          )}
        </button>
      )}
    </div>
  );
}
