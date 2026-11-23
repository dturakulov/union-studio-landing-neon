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
  fit?: "contain" | "cover";
  showPauseControl?: boolean;
  externalPaused?: boolean;
  seekRequest?: { frame: number; nonce: number } | null;
  pauseButtonClassName?: string;
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
  fit = "contain",
  showPauseControl = false,
  externalPaused,
  seekRequest,
  pauseButtonClassName = "absolute bottom-4 right-4 z-30",
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

  const effectivePaused = externalPaused ?? userPaused;
  const shouldPlay =
    autoPlay &&
    isVisible &&
    !effectivePaused &&
    (!reducedMotion || externalPaused === false);

  useEffect(() => {
    const player = playerRef.current;
    if (!player || !mounted) return;
    if (shouldPlay) {
      player.play();
    } else {
      player.pause();
    }
  }, [shouldPlay, mounted]);

  useEffect(() => {
    const player = playerRef.current;
    if (!player || !mounted || !seekRequest) return;
    player.seekTo(seekRequest.frame);
  }, [seekRequest, mounted]);

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

  const isCover = fit === "cover";

  const playerNode = mounted ? (
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
  );

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden bg-[#0a0a0a] ${className}`}
      style={
        isCover
          ? { containerType: "size" }
          : { aspectRatio: `${compositionWidth} / ${compositionHeight}` }
      }
      role={ariaLabel ? "region" : undefined}
      aria-label={ariaLabel}
    >
      {isCover ? (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: `max(100cqw, calc(100cqh * ${compositionWidth} / ${compositionHeight}))`,
            height: `max(100cqh, calc(100cqw * ${compositionHeight} / ${compositionWidth}))`,
          }}
        >
          {playerNode}
        </div>
      ) : (
        playerNode
      )}

      {showPauseControl && mounted && (
        <button
          type="button"
          onClick={togglePlayback}
          aria-label={shouldPlay ? pauseLabel : playLabel}
          className={`${pauseButtonClassName} inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-[#0a0a0a]/85 text-white backdrop-blur-sm transition duration-150 hover:border-[#ec521b] hover:bg-[#ec521b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white cursor-pointer`}
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
