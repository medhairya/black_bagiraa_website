import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Scene3D from "./Scene3D";
import ScrollNarrative from "./ScrollNarrative";
import MobileExperience from "./MobileExperience";
import { productFlavors } from "./flavors";
import "./ProductExperience.css";

gsap.registerPlugin(ScrollTrigger);

const desktopFlavorProgress = [0.18, 0.46, 0.72];

const getDesktopStep = (progress) => {
  if (progress < 0.17) {
    return 0;
  }
  if (progress < 0.39) {
    return 1;
  }
  if (progress < 0.61) {
    return 2;
  }
  if (progress < 0.82) {
    return 3;
  }
  return 4;
};

const getDesktopFlavor = (progress) => {
  if (progress < 0.42) {
    return 0;
  }
  if (progress < 0.68) {
    return 1;
  }
  return 2;
};

const DesktopExperience = () => {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const bottleRef = useRef(null);
  const glowRef = useRef(null);
  const progressRef = useRef(null);
  const scrollTriggerRef = useRef(null);
  const panelRefs = useRef([]);
  const activeFlavorRef = useRef(0);
  const activeStepRef = useRef(0);
  const [activeFlavor, setActiveFlavor] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [bottleReady, setBottleReady] = useState(false);

  useLayoutEffect(() => {
    if (!bottleReady) {
      return undefined;
    }

    const section = sectionRef.current;
    const stage = stageRef.current;
    const bottle = bottleRef.current;
    const glow = glowRef.current;
    const progress = progressRef.current;
    const panels = panelRefs.current.filter(Boolean);

    if (
      !section ||
      !stage ||
      !bottle ||
      !bottle.root ||
      !bottle.spin ||
      !glow ||
      !progress ||
      panels.length !== 5
    ) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      const compactDesktop = window.innerWidth < 1180;
      const anchorX = compactDesktop ? 0.74 : 1.06;
      const baseScale = compactDesktop ? 0.84 : 0.9;

      gsap.set(panels, { autoAlpha: 0, yPercent: 14 });
      gsap.set(panels[0], { autoAlpha: 1, yPercent: 0 });
      gsap.set(progress, { scaleY: 0, transformOrigin: "top center" });
      gsap.set(glow, { scale: 0.94, opacity: 0.22 });
      gsap.set(bottle.root.position, { x: anchorX, y: 0.06, z: 0 });
      gsap.set(bottle.root.scale, {
        x: baseScale,
        y: baseScale,
        z: baseScale,
      });
      gsap.set(bottle.spin.rotation, { x: -0.16, y: -0.96, z: 0.05 });

      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          id: "bagiraa-story",
          trigger: section,
          start: "top top",
          end: () => `+=${window.innerHeight * 4.8}`,
          pin: stage,
          scrub: 1.05,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
          onUpdate: (self) => {
            const nextStep = getDesktopStep(self.progress);
            const nextFlavor = getDesktopFlavor(self.progress);

            if (activeStepRef.current !== nextStep) {
              activeStepRef.current = nextStep;
              setActiveStep(nextStep);
            }

            if (activeFlavorRef.current !== nextFlavor) {
              activeFlavorRef.current = nextFlavor;
              setActiveFlavor(nextFlavor);
            }
          },
        },
      });

      scrollTriggerRef.current = timeline.scrollTrigger;

      timeline
        .to(progress, { scaleY: 1, duration: 4 }, 0)
        .to(glow, { scale: 1.16, opacity: 0.34, duration: 4 }, 0)
        .to(
          bottle.root.scale,
          {
            x: compactDesktop ? 0.92 : 0.99,
            y: compactDesktop ? 0.92 : 0.99,
            z: compactDesktop ? 0.92 : 0.99,
            duration: 0.9,
          },
          0
        )
        .to(
          bottle.spin.rotation,
          { x: -0.08, y: 0.28, z: 0.04, duration: 0.9 },
          0
        )
        .to(panels[0], { autoAlpha: 0, yPercent: -16, duration: 0.3 }, 0.24)
        .fromTo(
          panels[1],
          { autoAlpha: 0, yPercent: 14 },
          { autoAlpha: 1, yPercent: 0, duration: 0.38 },
          0.44
        )
        .to(
          bottle.root.scale,
          {
            x: compactDesktop ? 0.98 : 1.04,
            y: compactDesktop ? 0.98 : 1.04,
            z: compactDesktop ? 0.98 : 1.04,
            duration: 1,
          },
          1
        )
        .to(
          bottle.spin.rotation,
          { x: 0.04, y: 1.76, z: -0.03, duration: 1 },
          1
        )
        .to(glow, { scale: 1.3, opacity: 0.42, duration: 1 }, 1)
        .to(panels[1], { autoAlpha: 0, yPercent: -12, duration: 0.28 }, 1.18)
        .fromTo(
          panels[2],
          { autoAlpha: 0, yPercent: 14 },
          { autoAlpha: 1, yPercent: 0, duration: 0.38 },
          1.4
        )
        .to(
          bottle.root.scale,
          {
            x: compactDesktop ? 0.96 : 1.02,
            y: compactDesktop ? 0.96 : 1.02,
            z: compactDesktop ? 0.96 : 1.02,
            duration: 1,
          },
          2
        )
        .to(
          bottle.spin.rotation,
          { x: -0.02, y: 3.08, z: 0.04, duration: 1 },
          2
        )
        .to(glow, { scale: 1.36, opacity: 0.46, duration: 1 }, 2)
        .to(panels[2], { autoAlpha: 0, yPercent: -12, duration: 0.28 }, 2.16)
        .fromTo(
          panels[3],
          { autoAlpha: 0, yPercent: 14 },
          { autoAlpha: 1, yPercent: 0, duration: 0.38 },
          2.38
        )
        .to(
          bottle.root.scale,
          {
            x: compactDesktop ? 0.88 : 0.94,
            y: compactDesktop ? 0.88 : 0.94,
            z: compactDesktop ? 0.88 : 0.94,
            duration: 0.92,
          },
          3
        )
        .to(
          bottle.spin.rotation,
          { x: -0.1, y: 4.26, z: 0.02, duration: 0.92 },
          3
        )
        .to(glow, { scale: 1.06, opacity: 0.26, duration: 0.92 }, 3)
        .to(panels[3], { autoAlpha: 0, yPercent: -10, duration: 0.26 }, 3.16)
        .fromTo(
          panels[4],
          { autoAlpha: 0, yPercent: 14 },
          { autoAlpha: 1, yPercent: 0, duration: 0.42 },
          3.34
        );
    }, section);

    const refreshId = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      cancelAnimationFrame(refreshId);
      scrollTriggerRef.current = null;
      ctx.revert();
    };
  }, [bottleReady]);

  const activeTheme = productFlavors[activeFlavor] ?? productFlavors[0];

  const scrollToFlavor = (index) => {
    const trigger = scrollTriggerRef.current;
    if (!trigger) {
      return;
    }

    const scrollTop =
      trigger.start + desktopFlavorProgress[index] * (trigger.end - trigger.start);
    window.scrollTo({ top: scrollTop, behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className="relative hidden bg-black md:block"
      style={{
        backgroundImage: `radial-gradient(circle at 74% 28%, ${activeTheme.accent}1f, transparent 28%), linear-gradient(180deg, #020202 0%, ${activeTheme.surface} 58%, #000000 100%)`,
      }}
    >
      <div ref={stageRef} className="relative min-h-screen overflow-hidden">
        <div className="product-experience__grain absolute inset-0" />
        <div
          ref={glowRef}
          className="absolute left-[68%] top-1/2 z-10 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px]"
          style={{
            background: `radial-gradient(circle, ${activeTheme.accent}55 0%, ${activeTheme.accentSoft}22 48%, transparent 72%)`,
          }}
        />

        <Scene3D
          activeFlavor={activeFlavor}
          bottleRef={bottleRef}
          onBottleReady={() => setBottleReady(true)}
        />

        <div className="absolute inset-0 z-20">
          <ScrollNarrative
            flavors={productFlavors}
            activeFlavor={activeFlavor}
            activeStep={activeStep}
            progressRef={progressRef}
            registerPanel={(index, node) => {
              panelRefs.current[index] = node;
            }}
            onSelectFlavor={scrollToFlavor}
          />
        </div>
      </div>
    </section>
  );
};

const ProductExperience = () => {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window === "undefined" ? false : window.innerWidth < 768
  );

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const updateViewport = (event) => {
      setIsMobile(event.matches);
    };

    setIsMobile(media.matches);
    if (media.addEventListener) {
      media.addEventListener("change", updateViewport);
    } else {
      media.addListener(updateViewport);
    }

    return () => {
      if (media.removeEventListener) {
        media.removeEventListener("change", updateViewport);
      } else {
        media.removeListener(updateViewport);
      }
    };
  }, []);

  if (isMobile) {
    return <MobileExperience flavors={productFlavors} />;
  }

  return <DesktopExperience />;
};

export default ProductExperience;
