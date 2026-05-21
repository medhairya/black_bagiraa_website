import React, { useEffect, useRef } from "react";

const MistCanvas = () => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const widthRef = useRef(0);
  const heightRef = useRef(0);
  const noiseOffsetRef = useRef(0);

  const drawMist = () => {
    const ctx = ctxRef.current;
    const width = widthRef.current;
    const height = heightRef.current;
    const noiseOffset = noiseOffsetRef.current;

    if (!ctx) return;

    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;

    for (let y = 0; y < height; y += 2) {
      for (let x = 0; x < width; x += 2) {
        const index = (x + y * width) * 4;
        const alpha = Math.floor(
          50 +
            50 *
              Math.sin(
                (x * 0.01 + noiseOffset) * 2 +
                  (y * 0.01 + noiseOffset) * 1.5
              )
        );

        data[index] = 255; // red
        data[index + 1] = 255; // green
        data[index + 2] = 255; // blue
        data[index + 3] = alpha; // alpha
      }
    }

    ctx.putImageData(imageData, 0, 0);
  };

  const animateMist = () => {
    noiseOffsetRef.current += 0.015;
    drawMist();
    requestAnimationFrame(animateMist);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctxRef.current = ctx;

    widthRef.current = window.innerWidth;
    heightRef.current = window.innerHeight;

    canvas.width = widthRef.current;
    canvas.height = heightRef.current;

    animateMist();

    canvas.style.animation = "fadeOut 3s ease-in-out 3.5s forwards";

    // Cleanup if needed
    return () => {
      // No cleanup required here for animation frame
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 999,
        pointerEvents: "none",
        background: "transparent",
      }}
    />
  );
};

export default MistCanvas;
