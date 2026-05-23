import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Scene3D from "./Scene3D";
import FlavorController from "./FlavorController";

gsap.registerPlugin(ScrollTrigger);

const mobileSteps = (flavors) => [
  {
    id: "mobile-intro",
    eyebrow: "Premium Product Reveal",
    title: "The bottle stays alive on every scroll.",
    body:
      "Mobile keeps the same premium bottle system, but the motion is lighter, steadier, and optimized for touch devices.",
    flavorIndex: 0,
  },
  {
    id: flavors[0].id,
    eyebrow: flavors[0].eyebrow,
    title: flavors[0].headline,
    body: flavors[0].description,
    flavorIndex: 0,
  },
  {
    id: flavors[1].id,
    eyebrow: flavors[1].eyebrow,
    title: flavors[1].headline,
    body: flavors[1].description,
    flavorIndex: 1,
  },
  {
    id: flavors[2].id,
    eyebrow: flavors[2].eyebrow,
    title: flavors[2].headline,
    body: flavors[2].description,
    flavorIndex: 2,
  },
  {
    id: "mobile-cta",
    eyebrow: "Ready To Move",
    title: "Choose the charge that fits your grind.",
    body:
      "Scroll-led flavour transitions, one geometry system, and tuned mobile performance without oversized scenes or dead space.",
    flavorIndex: 2,
    cta: true,
  },
];

const mobileBottlePoses = [
  {
    position: { x: 0, y: 0.08, z: 0 },
    rotation: { x: -0.14, y: -0.5, z: 0.03 },
    scale: { x: 0.86, y: 0.86, z: 0.86 },
  },
  {
    position: { x: 0, y: 0.08, z: 0 },
    rotation: { x: -0.08, y: 0.42, z: 0.02 },
    scale: { x: 0.94, y: 0.94, z: 0.94 },
  },
  {
    position: { x: 0, y: 0.08, z: 0 },
    rotation: { x: 0.02, y: 1.84, z: -0.03 },
    scale: { x: 0.98, y: 0.98, z: 0.98 },
  },
  {
    position: { x: 0, y: 0.08, z: 0 },
    rotation: { x: -0.04, y: 3.08, z: 0.04 },
    scale: { x: 1, y: 1, z: 1 },
  },
  {
    position: { x: 0, y: 0.08, z: 0 },
    rotation: { x: -0.08, y: 4.16, z: 0.02 },
    scale: { x: 0.9, y: 0.9, z: 0.9 },
  },
];

const MobileExperience = ({ flavors }) => {
  const sectionRef = useRef(null);
  const bottleRef = useRef(null);
  const cardRefs = useRef([]);
  const [activeFlavor, setActiveFlavor] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [bottleReady, setBottleReady] = useState(false);
  const steps = mobileSteps(flavors);

  useLayoutEffect(() => {
    if (!bottleReady) {
      return undefined;
    }

    const section = sectionRef.current;
    const cards = cardRefs.current.filter(Boolean);
    if (!section || cards.length !== steps.length) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { autoAlpha: 0.4, y: 36 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 78%",
            },
          }
        );

        ScrollTrigger.create({
          trigger: card,
          start: "top 58%",
          end: "bottom 42%",
          onToggle: (self) => {
            if (!self.isActive) {
              return;
            }

            setActiveStep(index);
            setActiveFlavor(steps[index].flavorIndex);
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, [bottleReady, flavors]);

  useEffect(() => {
    if (!bottleReady || !bottleRef.current?.root || !bottleRef.current?.spin) {
      return;
    }

    const pose = mobileBottlePoses[activeStep] ?? mobileBottlePoses[0];
    gsap.to(bottleRef.current.root.position, {
      ...pose.position,
      duration: 0.9,
      ease: "power3.out",
    });
    gsap.to(bottleRef.current.spin.rotation, {
      ...pose.rotation,
      duration: 0.9,
      ease: "power3.out",
    });
    gsap.to(bottleRef.current.root.scale, {
      ...pose.scale,
      duration: 0.9,
      ease: "power3.out",
    });
  }, [activeStep, bottleReady]);

  const scrollToFlavor = (index) => {
    const target = cardRefs.current[index + 1];
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-black md:hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 18%, ${flavors[activeFlavor].accent}33, transparent 32%), linear-gradient(180deg, #020202 0%, ${flavors[activeFlavor].surface} 58%, #000000 100%)`,
        }}
      />
      <div className="product-experience__grain absolute inset-0" />

      <div className="sticky top-0 z-10 h-[62svh] overflow-hidden">
        <Scene3D
          activeFlavor={activeFlavor}
          isMobile={true}
          bottleRef={bottleRef}
          onBottleReady={() => setBottleReady(true)}
        />

        <div className="absolute inset-x-0 top-0 z-20 px-4 pt-4">
          <div className="rounded-[2rem] border border-white/10 bg-black/25 p-4 backdrop-blur-xl">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-white/40">
              Mobile Story
            </p>
            <h2 className="mt-2 text-2xl font-black uppercase text-white">
              {flavors[activeFlavor].name}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-white/65">
              Same geometry. Dynamic label. Tuned motion for steady mobile performance.
            </p>
            <FlavorController
              flavors={flavors}
              activeFlavor={activeFlavor}
              onSelect={scrollToFlavor}
              className="mt-4"
            />
          </div>
        </div>
      </div>

      <div className="relative z-20 -mt-[8svh] space-y-5 px-4 pb-16">
        {steps.map((step, index) => {
          const flavor = flavors[step.flavorIndex];
          return (
            <article
              key={step.id}
              ref={(node) => {
                cardRefs.current[index] = node;
              }}
              className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
            >
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-white/40">
                {step.eyebrow}
              </p>
              <h3 className="mt-3 text-3xl font-black uppercase leading-[0.92] text-white">
                {step.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-white/70">
                {step.body}
              </p>

              {!step.cta ? (
                <>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {flavor.benefits.map((benefit) => (
                      <span
                        key={benefit}
                        className="rounded-full border px-3 py-2 text-[0.68rem] font-medium uppercase tracking-[0.18em]"
                        style={{
                          borderColor: `${flavor.accent}55`,
                          background: `${flavor.accent}12`,
                          color: flavor.text,
                        }}
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>
                  <div className="mt-5 grid grid-cols-3 gap-2">
                    {flavor.metrics.map((metric) => (
                      <div
                        key={metric}
                        className="rounded-2xl border border-white/8 bg-black/20 px-3 py-3 text-center text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-white/65"
                      >
                        {metric}
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    to="/products"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-black"
                  >
                    Buy Now
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <a
                    href="https://forms.gle/3BMEc8GTefdTsh9f6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-white/15 bg-transparent px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white"
                  >
                    Enquire
                  </a>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default MobileExperience;
