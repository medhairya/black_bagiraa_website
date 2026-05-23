import React, {
  Suspense,
  forwardRef,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { Environment, useGLTF } from "@react-three/drei";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import jeeraModelUrl from "../assets/jeera.glb";

gsap.registerPlugin(ScrollTrigger);

const storyPanels = [
  {
    eyebrow: "Premium Energy",
    title: (
      <>
        Black{" "}
        <span className="bg-gradient-to-r from-orange-500 via-amber-300 to-yellow-400 bg-clip-text text-transparent">
          Bagiraa
        </span>
      </>
    ),
    description:
      "A premium antigravity-style product story built around the bottle itself, with bold motion, polished lighting, and a controlled cinematic scroll.",
    isHero: true,
  },
  {
    eyebrow: "Power Source",
    title: (
      <>
        Packed With
        <br />
        Caffeine
      </>
    ),
    description:
      "The first reveal focuses on immediate lift: a strong caffeine charge designed to sharpen attention and unlock high-output energy fast.",
  },
  {
    eyebrow: "Zero Crash Formula",
    title: (
      <>
        Real B-
        <br />
        Vitamins
      </>
    ),
    description:
      "B3, B6, and B12 support cleaner energy delivery, so the story evolves from impact to stamina without the section drifting out of sync.",
  },
  {
    eyebrow: "Active Recovery",
    title: (
      <>
        Hydration
        <br />
        Lock
      </>
    ),
    description:
      "Electrolytes close the sequence with a steadier, calmer frame so the bottle finishes in a premium hero pose instead of dropping into dead scroll space.",
  },
];

const Bottle3D = forwardRef(function Bottle3D({ onReady }, ref) {
  const { scene } = useGLTF(jeeraModelUrl);
  const modelRef = useRef(null);
  const hasReportedReadyRef = useRef(false);

  useLayoutEffect(() => {
    const model = modelRef.current;
    if (!scene || !model) {
      return;
    }

    model.scale.setScalar(1);
    model.position.set(0, 0, 0);

    model.updateMatrixWorld(true);

    const box = new THREE.Box3().setFromObject(model);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const targetHeight = window.innerWidth >= 768 ? 3.15 : 2.55;
    const safeHeight = size.y || Math.max(size.x, size.z, 1);
    const scale = targetHeight / safeHeight;

    model.scale.setScalar(scale);
    model.position.set(
      -center.x * scale,
      -center.y * scale - safeHeight * scale * 0.03,
      -center.z * scale
    );

    scene.traverse((child) => {
      if (!child.isMesh || !child.material) {
        return;
      }

      const materials = Array.isArray(child.material)
        ? child.material
        : [child.material];

      materials.forEach((material) => {
        if ("metalness" in material) {
          material.metalness = Math.max(material.metalness ?? 0, 0.55);
        }
        if ("roughness" in material) {
          material.roughness = Math.min(material.roughness ?? 1, 0.28);
        }
        if ("envMapIntensity" in material) {
          material.envMapIntensity = 1.8;
        }
        material.needsUpdate = true;
      });
    });

    if (!hasReportedReadyRef.current) {
      hasReportedReadyRef.current = true;
      onReady?.();
    }

    ScrollTrigger.refresh();
  }, [onReady, scene]);

  return (
    <group ref={ref}>
      <group ref={modelRef}>
        <primitive object={scene} />
      </group>
    </group>
  );
});

useGLTF.preload(jeeraModelUrl);

const ScrollBottle3D = () => {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const bottleRef = useRef(null);
  const glowRef = useRef(null);
  const progressRef = useRef(null);
  const panelRefs = useRef([]);
  const [isBottleReady, setIsBottleReady] = useState(false);

  useLayoutEffect(() => {
    if (!isBottleReady) {
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
      !glow ||
      !progress ||
      panels.length !== storyPanels.length
    ) {
      return undefined;
    }

    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      const buildTimeline = (isDesktop) => {
        gsap.set(panels, { autoAlpha: 0, yPercent: 14 });
        gsap.set(panels[0], { autoAlpha: 1, yPercent: 0 });
        gsap.set(progress, { scaleY: 0, transformOrigin: "top center" });
        gsap.set(glow, {
          scale: isDesktop ? 1 : 0.86,
          opacity: isDesktop ? 0.22 : 0.18,
        });
        gsap.set(bottle.position, {
          x: isDesktop ? 1.15 : 0,
          y: isDesktop ? -0.12 : 0.32,
          z: 0,
        });
        gsap.set(bottle.rotation, {
          x: isDesktop ? -0.12 : -0.18,
          y: -0.42,
          z: isDesktop ? 0.08 : 0,
        });
        gsap.set(bottle.scale, {
          x: isDesktop ? 1 : 0.88,
          y: isDesktop ? 1 : 0.88,
          z: isDesktop ? 1 : 0.88,
        });

        return gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () =>
                `+=${window.innerHeight * (isDesktop ? 3.2 : 3.6)}`,
              pin: stage,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              fastScrollEnd: true,
            },
          })
          .to(progress, { scaleY: 1, duration: 3 }, 0)
          .to(glow, { scale: isDesktop ? 1.2 : 1.04, opacity: 0.3, duration: 3 }, 0)
          .to(
            bottle.position,
            {
              x: isDesktop ? 1.34 : 0,
              y: isDesktop ? -0.04 : 0.22,
              z: 0.28,
              duration: 1,
            },
            0
          )
          .to(
            bottle.rotation,
            {
              x: isDesktop ? -0.04 : -0.1,
              y: Math.PI * 0.58,
              z: isDesktop ? 0.03 : 0,
              duration: 1,
            },
            0
          )
          .to(panels[0], { autoAlpha: 0, yPercent: -16, duration: 0.35 }, 0.28)
          .fromTo(
            panels[1],
            { autoAlpha: 0, yPercent: 16 },
            { autoAlpha: 1, yPercent: 0, duration: 0.42 },
            0.5
          )
          .to(
            bottle.position,
            {
              x: isDesktop ? 1.5 : 0,
              y: isDesktop ? 0.12 : 0.1,
              z: 0.5,
              duration: 1,
            },
            1
          )
          .to(
            bottle.rotation,
            {
              x: 0.05,
              y: Math.PI * 1.22,
              z: -0.05,
              duration: 1,
            },
            1
          )
          .to(panels[1], { autoAlpha: 0, yPercent: -12, duration: 0.3 }, 1.18)
          .fromTo(
            panels[2],
            { autoAlpha: 0, yPercent: 16 },
            { autoAlpha: 1, yPercent: 0, duration: 0.42 },
            1.4
          )
          .to(
            bottle.position,
            {
              x: isDesktop ? 1.18 : 0,
              y: isDesktop ? 0.02 : 0.02,
              z: 0.16,
              duration: 1,
            },
            2
          )
          .to(
            bottle.rotation,
            {
              x: -0.06,
              y: Math.PI * 2.05,
              z: 0.08,
              duration: 1,
            },
            2
          )
          .to(
            bottle.scale,
            {
              x: isDesktop ? 1.04 : 0.92,
              y: isDesktop ? 1.04 : 0.92,
              z: isDesktop ? 1.04 : 0.92,
              duration: 1,
            },
            2
          )
          .to(panels[2], { autoAlpha: 0, yPercent: -10, duration: 0.3 }, 2.08)
          .fromTo(
            panels[3],
            { autoAlpha: 0, yPercent: 16 },
            { autoAlpha: 1, yPercent: 0, duration: 0.42 },
            2.3
          );
      };

      mm.add("(min-width: 768px)", () => buildTimeline(true));
      mm.add("(max-width: 767px)", () => buildTimeline(false));
    }, section);

    const refreshId = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      cancelAnimationFrame(refreshId);
      ctx.revert();
      mm.revert();
    };
  }, [isBottleReady]);

  return (
    <section ref={sectionRef} className="relative bg-black">
      <div ref={stageRef} className="relative min-h-screen overflow-hidden bg-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_30%,rgba(249,115,22,0.25),transparent_34%),radial-gradient(circle_at_70%_45%,rgba(250,204,21,0.18),transparent_28%),linear-gradient(180deg,#020202_0%,#090909_100%)]" />
        <div
          ref={glowRef}
          className="absolute left-1/2 top-1/2 h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/20 blur-[120px] md:h-[36rem] md:w-[36rem]"
        />

        <div className="absolute inset-0 z-10">
          <Canvas
            camera={{ position: [0, 0, 5], fov: 32 }}
            dpr={[1, 1.75]}
            gl={{
              alpha: true,
              antialias: true,
              powerPreference: "high-performance",
            }}
          >
            <ambientLight intensity={0.9} />
            <directionalLight position={[8, 10, 10]} intensity={3.4} color="#ffffff" />
            <directionalLight position={[-8, 6, -6]} intensity={1.8} color="#ffd089" />
            <spotLight position={[0, 8, 8]} intensity={2.3} angle={0.42} penumbra={0.7} />
            <Environment preset="sunset" />
            <Suspense fallback={null}>
              <Bottle3D
                ref={bottleRef}
                onReady={() => {
                  setIsBottleReady(true);
                }}
              />
            </Suspense>
          </Canvas>
        </div>

        <div className="relative z-20 mx-auto grid min-h-screen w-full max-w-7xl grid-cols-1 items-center px-6 py-10 md:grid-cols-[minmax(0,0.92fr)_minmax(280px,0.78fr)] md:px-12 lg:px-16">
          <div className="relative flex h-[24rem] items-end md:h-[30rem] md:items-center">
            <div className="relative w-full max-w-xl">
              {storyPanels.map((panel, index) => (
                <article
                  key={panel.eyebrow}
                  ref={(node) => {
                    panelRefs.current[index] = node;
                  }}
                  className="absolute inset-0 flex flex-col justify-center pointer-events-none"
                >
                  <span className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-white/60 md:text-sm">
                    {panel.eyebrow}
                  </span>
                  <h1 className="text-4xl font-black uppercase leading-[0.92] text-white md:text-6xl lg:text-7xl">
                    {panel.title}
                  </h1>
                  <p className="mt-5 max-w-lg text-base leading-relaxed text-white/72 md:text-lg">
                    {panel.description}
                  </p>

                  {panel.isHero ? (
                    <>
                      <div className="mt-8 flex flex-wrap gap-4 pointer-events-auto">
                        <a
                          href="https://forms.gle/3BMEc8GTefdTsh9f6"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-full bg-orange-600 px-7 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:scale-[1.02] hover:bg-orange-500 md:px-8 md:py-4"
                        >
                          Enquire Now
                        </a>
                        <button
                          type="button"
                          onClick={() => {
                            document
                              .getElementById("contact-section")
                              ?.scrollIntoView({ behavior: "smooth" });
                          }}
                          className="rounded-full border border-white/20 bg-white/5 px-7 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:scale-[1.02] hover:border-white/40 hover:bg-white/10 md:px-8 md:py-4"
                        >
                          Contact Us
                        </button>
                      </div>

                      <div className="mt-8 hidden items-center gap-3 text-sm uppercase tracking-[0.3em] text-white/40 md:flex">
                        <span className="inline-flex h-10 w-6 items-start justify-center rounded-full border border-white/30 p-1">
                          <span className="h-3 w-1.5 rounded-full bg-white/50" />
                        </span>
                        Scroll to reveal the formula
                      </div>
                    </>
                  ) : null}
                </article>
              ))}
            </div>
          </div>

          <div className="hidden md:block" />
        </div>

        <div className="absolute left-6 top-1/2 z-20 hidden -translate-y-1/2 md:flex md:flex-col md:items-center md:gap-4">
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-white/35">
            Story
          </span>
          <div className="h-44 w-px overflow-hidden rounded-full bg-white/10">
            <div
              ref={progressRef}
              className="h-full w-full origin-top bg-gradient-to-b from-orange-500 via-amber-300 to-yellow-400"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScrollBottle3D;
