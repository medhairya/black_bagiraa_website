import React, { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroScene from "./HeroScene";
import ScrollNarrative from "./ScrollNarrative";
import FlavorController from "./FlavorController";
import CTASection from "./CTASection";
import { FLAVORS } from "./CanModel";
import { useResponsive3D } from "./useResponsive3D";
import "./ProductExperience.css";

gsap.registerPlugin(ScrollTrigger);

const BRAND_STATE = "bagiraa";

const progressToFlavor = () => BRAND_STATE;

const ProductExperience = () => {
  const pinRef = useRef(null);
  const logoRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const progressRef = useRef(0);

  const [flavor, setFlavor] = useState(BRAND_STATE);
  const [uiProgress, setUiProgress] = useState(0);
  const [ctaVisible, setCtaVisible] = useState(false);
  const [introVisible, setIntroVisible] = useState(true);

  const { isMobile } = useResponsive3D();

  useEffect(() => {
    if (!pinRef.current) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        logoRef.current,
        { opacity: 0, y: -30, letterSpacing: "0.5em" },
        {
          opacity: 1,
          y: 0,
          letterSpacing: "0.15em",
          duration: 1.6,
          ease: "expo.out",
          delay: 0.3,
        }
      );

      gsap.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out", delay: 1.8 }
      );

      ScrollTrigger.create({
        trigger: pinRef.current,
        start: "top top",
        end: () => `+=${window.innerHeight * 3.5}`,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress;
          progressRef.current = progress;
          setUiProgress(progress);

          const nextFlavor = progressToFlavor(progress);
          setFlavor((currentFlavor) =>
            currentFlavor === nextFlavor ? currentFlavor : nextFlavor
          );

          setIntroVisible(progress < 0.05);
          setCtaVisible(progress > 0.88);
        },
      });
    }, pinRef);

    const refreshId = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(refreshId);
      ctx.revert();
    };
  }, []);

  const handleFlavorChange = useCallback((nextFlavor) => {
    setFlavor(nextFlavor);
  }, []);

  const flavorData = FLAVORS[flavor] ?? FLAVORS.bagiraa;

  return (
    <section
      ref={pinRef}
      className="hero-section"
      style={{ height: "100vh" }}
      aria-label="Black Bagiraa product experience"
    >
      <div className="noise-overlay" aria-hidden="true" />

      <div
        className="absolute inset-0 transition-all duration-1000"
        style={{
          background: `radial-gradient(ellipse 70% 60% at 50% 40%, ${flavorData.labelTop}cc 0%, #050505 70%)`,
        }}
        aria-hidden="true"
      />

      <div className="canvas-wrapper">
        <HeroScene flavor={flavor} progress={progressRef} />
      </div>

      <div className="ui-overlay">
        <div
          className={`absolute left-0 right-0 top-0 z-30 flex items-center justify-between pointer-events-none ${
            isMobile ? "px-5 pt-6" : "px-10 pt-8"
          }`}
        >
          <div ref={logoRef} style={{ opacity: 0 }}>
            <p
              className="font-display tracking-widest"
              style={{
                fontSize: isMobile ? "1.3rem" : "1.6rem",
                color: "#F0EDE6",
                letterSpacing: "0.15em",
                lineHeight: 1,
              }}
            >
              BLACK BAGIRAA
            </p>
            <div
              className="mt-1 h-px"
              style={{
                background: `linear-gradient(90deg, ${flavorData.primary}, transparent)`,
                width: "100%",
                transition: "background 1.2s ease",
              }}
            />
          </div>

          {!isMobile && (
            <nav className="flex items-center gap-8" style={{ pointerEvents: "all" }}>
              {["Story", "Energy", "Find Us"].map((item) => (
                <a
                  key={item}
                  href={item === "Find Us" ? "#contact-section" : "#"}
                  className="text-sm tracking-widest transition-colors duration-300"
                  style={{
                    color: "rgba(240,237,230,0.45)",
                    letterSpacing: "0.15em",
                    fontSize: "0.75rem",
                    fontWeight: 400,
                  }}
                  onMouseEnter={(event) => {
                    event.currentTarget.style.color = flavorData.primary;
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.color = "rgba(240,237,230,0.45)";
                  }}
                >
                  {item.toUpperCase()}
                </a>
              ))}
            </nav>
          )}
        </div>

        <div
          className={`absolute inset-0 z-10 flex flex-col items-center justify-center transition-opacity duration-700 ${
            introVisible ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          aria-hidden={!introVisible}
        >
          <p
            className="mb-4 uppercase tracking-widest"
            style={{
              fontSize: isMobile ? "0.65rem" : "0.75rem",
              color: flavorData.primary,
              letterSpacing: "0.35em",
              transition: "color 1.2s ease",
            }}
          >
            Premium Energy Drink
          </p>

          <h1
            className="font-display text-center leading-none"
            style={{
              fontSize: isMobile
                ? "clamp(3.5rem, 16vw, 7rem)"
                : "clamp(5rem, 10vw, 11rem)",
              color: "#F0EDE6",
              letterSpacing: "0.06em",
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            BLACK
            <br />
            <span
              style={{
                color: flavorData.primary,
                filter: `drop-shadow(0 0 30px ${flavorData.primary}80)`,
                transition: "color 1.2s ease, filter 1.2s ease",
              }}
            >
              BAGIRAA
            </span>
          </h1>

          <div
            ref={scrollIndicatorRef}
            className="scroll-indicator absolute bottom-10 flex flex-col items-center gap-2"
            style={{ opacity: 0 }}
          >
            <p
              style={{
                fontSize: "0.6rem",
                letterSpacing: "0.3em",
                color: "rgba(240,237,230,0.35)",
              }}
            >
              SCROLL TO EXPLORE
            </p>
            <svg width="20" height="30" viewBox="0 0 20 30" fill="none" aria-hidden="true">
              <rect x="8" y="6" width="4" height="8" rx="2" fill={flavorData.primary} opacity="0.8" />
              <rect x="1" y="1" width="18" height="28" rx="9" stroke="rgba(240,237,230,0.2)" strokeWidth="1.5" />
            </svg>
          </div>
        </div>

        <div
          className={`transition-opacity duration-700 ${
            introVisible ? "opacity-0" : "opacity-100"
          }`}
        >
          <ScrollNarrative
            progress={uiProgress}
            currentFlavor={flavor}
            isMobile={isMobile}
          />
        </div>

        <div
          className={`absolute z-30 ${isMobile ? "right-5 top-6" : "right-10 top-8"}`}
          style={{ pointerEvents: "all" }}
        >
          <FlavorController
            currentFlavor={flavor}
            onFlavorChange={handleFlavorChange}
          />
        </div>

        <CTASection
          visible={ctaVisible}
          currentFlavor={flavor}
          isMobile={isMobile}
        />

        {!isMobile && (
          <div className="pointer-events-none absolute bottom-6 left-10 z-30 flex items-center gap-3">
            <div className="h-px w-8" style={{ background: "rgba(240,237,230,0.15)" }} />
            <p
              style={{
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                color: "rgba(240,237,230,0.25)",
              }}
            >
              www.blackbagiraa.com
            </p>
          </div>
        )}

        <div
          className="absolute left-0 top-0 z-50 h-px transition-all duration-100"
          style={{
            width: `${uiProgress * 100}%`,
            background: `linear-gradient(90deg, ${flavorData.primary}, ${
              flavorData.accent1 || flavorData.primary
            })`,
            boxShadow: `0 0 8px ${flavorData.primary}`,
            transition: "background 1.2s ease",
          }}
        />
      </div>
    </section>
  );
};

export default ProductExperience;
