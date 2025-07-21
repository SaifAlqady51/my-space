"use client";

import { useEffect, useRef, useState } from "react";

const BlackHole = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const centerHoverRef = useRef<HTMLDivElement>(null);
  const [showEnter, setShowEnter] = useState(true);

  useEffect(() => {
    if (!containerRef.current || !centerHoverRef.current) return;

    const container = containerRef.current;
    const centerHover = centerHoverRef.current;
    const h = container.offsetHeight;
    const w = container.offsetWidth;
    const cw = w;
    const ch = h;
    const maxorbit = 255;
    const centery = ch / 2;
    const centerx = cw / 2;

    const startTime = new Date().getTime();
    let currentTime = 0;

    const stars: Star[] = [];
    let collapse = false;
    let expanse = false;
    let returning = false;
    let infiniteRotation = false;

    const canvas = document.createElement("canvas");
    canvas.width = cw;
    canvas.height = ch;
    container.appendChild(canvas);
    const context = canvas.getContext("2d");

    if (!context) return;

    context.globalCompositeOperation = "multiply";

    const setDPI = (canvas: HTMLCanvasElement, dpi: number) => {
      if (!canvas.style.width) canvas.style.width = canvas.width + "px";
      if (!canvas.style.height) canvas.style.height = canvas.height + "px";

      const scaleFactor = dpi / 96;
      canvas.width = Math.ceil(canvas.width * scaleFactor);
      canvas.height = Math.ceil(canvas.height * scaleFactor);
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.scale(scaleFactor, scaleFactor);
    };

    const rotate = (
      cx: number,
      cy: number,
      x: number,
      y: number,
      angle: number,
    ) => {
      const radians = angle;
      const cos = Math.cos(radians);
      const sin = Math.sin(radians);
      const nx = cos * (x - cx) + sin * (y - cy) + cx;
      const ny = cos * (y - cy) - sin * (x - cx) + cy;
      return [nx, ny];
    };

    setDPI(canvas, 192);

    class Star {
      orbital: number;
      x: number;
      y: number;
      yOrigin: number;
      speed: number;
      rotation: number;
      startRotation: number;
      id: number;
      collapseBonus: number;
      color: string;
      hoverPos: number;
      expansePos: number;
      prevR: number;
      prevX: number;
      prevY: number;
      originalY: number;

      constructor() {
        const rands = [];
        rands.push(Math.random() * (maxorbit / 2) + 1);
        rands.push(Math.random() * (maxorbit / 2) + maxorbit);

        this.orbital = rands.reduce((p, c) => p + c, 0) / rands.length;

        this.x = centerx;
        this.y = centery + this.orbital;
        this.yOrigin = centery + this.orbital;
        this.speed = ((Math.floor(Math.random() * 2.5) + 1.5) * Math.PI) / 180;
        this.rotation = 0;
        this.startRotation =
          ((Math.floor(Math.random() * 360) + 1) * Math.PI) / 180;
        this.id = stars.length;
        this.collapseBonus = this.orbital - maxorbit * 0.7;
        if (this.collapseBonus < 0) {
          this.collapseBonus = 0;
        }
        this.color = "rgba(255,255,255," + (1 - this.orbital / 255) + ")";
        this.hoverPos = centery + maxorbit / 2 + this.collapseBonus;
        this.expansePos =
          centery +
          (this.id % 100) * -10 +
          (Math.floor(Math.random() * 20) + 1);
        this.prevR = this.startRotation;
        this.prevX = this.x;
        this.prevY = this.y;
        this.originalY = this.yOrigin;

        stars.push(this);
      }

      draw() {
        if (!context) return;

        if (!expanse && !returning) {
          this.rotation =
            this.startRotation +
            currentTime * this.speed * (infiniteRotation ? 2 : 1);
          if (!collapse) {
            if (this.y > this.yOrigin) {
              this.y -= 2.5;
            }
            if (this.y < this.yOrigin - 4) {
              this.y += (this.yOrigin - this.y) / 10;
            }
          } else {
            if (this.y > this.hoverPos) {
              this.y -= (this.hoverPos - this.y) / -5;
            }
            if (this.y < this.hoverPos - 4) {
              this.y += 2.5;
            }
          }
        } else if (expanse && !returning) {
          this.rotation =
            this.startRotation +
            currentTime * ((this.speed / 2) * (infiniteRotation ? 3 : 1));
          if (this.y > this.expansePos) {
            this.y -= Math.floor(this.expansePos - this.y) / -80;
          }
        } else if (returning) {
          this.rotation =
            this.startRotation +
            currentTime * this.speed * (infiniteRotation ? 2 : 1);
          if (Math.abs(this.y - this.originalY) > 2) {
            this.y += (this.originalY - this.y) / 50;
          } else {
            this.y = this.originalY;
            this.yOrigin = this.originalY;
          }
        }

        context.save();
        context.fillStyle = this.color;
        context.strokeStyle = this.color;
        context.beginPath();
        const oldPos = rotate(
          centerx,
          centery,
          this.prevX,
          this.prevY,
          -this.prevR,
        );
        context.moveTo(oldPos[0], oldPos[1]);
        context.translate(centerx, centery);
        context.rotate(this.rotation);
        context.translate(-centerx, -centery);
        context.lineTo(this.x, this.y);
        context.stroke();
        context.restore();

        this.prevR = this.rotation;
        this.prevX = this.x;
        this.prevY = this.y;
      }
    }

    const handleClick = () => {
      collapse = false;
      expanse = true;
      returning = false;
      infiniteRotation = true;
      setShowEnter(false);

      // No timeout to return - infinite rotation
      // The black hole will keep rotating faster indefinitely
    };

    const handleMouseOver = () => {
      if (expanse === false) {
        collapse = true;
      }
    };

    const handleMouseOut = () => {
      if (expanse === false) {
        collapse = false;
      }
    };

    centerHover.addEventListener("click", handleClick);
    centerHover.addEventListener("mouseover", handleMouseOver);
    centerHover.addEventListener("mouseout", handleMouseOut);

    const loop = () => {
      const now = new Date().getTime();
      currentTime = (now - startTime) / 50;

      if (context) {
        context.fillStyle = "rgba(15, 23, 42, 0.2)";
        context.fillRect(0, 0, cw, ch);

        for (let i = 0; i < stars.length; i++) {
          if (stars[i] !== undefined) {
            stars[i].draw();
          }
        }
      }

      requestAnimationFrame(loop);
    };

    const init = () => {
      if (context) {
        context.fillStyle = "rgba(25,25,25,1)";
        context.fillRect(0, 0, cw, ch);
      }
      for (let i = 0; i < 2500; i++) {
        new Star();
      }
      loop();
    };

    init();

    return () => {
      centerHover.removeEventListener("click", handleClick);
      centerHover.removeEventListener("mouseover", handleMouseOver);
      centerHover.removeEventListener("mouseout", handleMouseOut);
      container.removeChild(canvas);
    };
  }, []);

  return (
    <div
      id="blackhole"
      ref={containerRef}
      className="h-full w-full relative flex"
    >
      <div
        ref={centerHoverRef}
        className={`w-64 h-64 bg-transparent rounded-full absolute left-1/2 top-1/2 -mt-32 -ml-32 z-10 cursor-pointer flex items-center justify-center transition-all duration-500 ${!showEnter ? "opacity-0 pointer-events-none" : ""}`}
      >
        {showEnter && (
          <span className="text-gray-500 font-serif text-lg relative transition-all duration-500">
            <span className="inline-block h-px w-4 mr-3 mb-1 bg-gray-500 transition-all duration-500"></span>
            ENTER
            <span className="inline-block h-px w-4 ml-3 mb-1 bg-gray-500 transition-all duration-500"></span>
          </span>
        )}
      </div>
    </div>
  );
};

export default BlackHole;
