import React from "react";
import { ArrowRight, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import FlavorController from "./FlavorController";

const ScrollNarrative = ({
  flavors,
  activeFlavor,
  activeStep,
  progressRef,
  registerPanel,
  onSelectFlavor,
}) => {
  const steps = [
    {
      id: "hero",
      eyebrow: "The King Of Energy",
      title: "Black Bagiraa",
      copy:
        "A darker, sharper product reveal built around one premium bottle system, tuned for smooth energy storytelling instead of noisy stacked sections.",
      meta: ["Apple-grade pacing", "Cinematic 3D motion", "One unified scroll scene"],
      hero: true,
    },
    {
      id: flavors[0].id,
      eyebrow: flavors[0].eyebrow,
      title: flavors[0].headline,
      copy: flavors[0].description,
      flavorIndex: 0,
      icon: <Zap className="h-4 w-4" />,
    },
    {
      id: flavors[1].id,
      eyebrow: flavors[1].eyebrow,
      title: flavors[1].headline,
      copy: flavors[1].description,
      flavorIndex: 1,
      icon: <Sparkles className="h-4 w-4" />,
    },
    {
      id: flavors[2].id,
      eyebrow: flavors[2].eyebrow,
      title: flavors[2].headline,
      copy: flavors[2].description,
      flavorIndex: 2,
      icon: <ShieldCheck className="h-4 w-4" />,
    },
    {
      id: "cta",
      eyebrow: "Ready To Launch",
      title: "Pick your charge and move.",
      copy:
        "The experience resolves into a cleaner call to action with the bottle still alive, framed, and premium instead of disappearing into dead scroll space.",
      cta: true,
    },
  ];

  return (
    <div className="relative z-20 mx-auto grid min-h-screen w-full max-w-7xl grid-cols-[92px_minmax(0,1fr)] gap-4 px-6 py-8 md:px-10 lg:grid-cols-[120px_minmax(0,1fr)] lg:px-16">
      <div className="hidden flex-col items-center justify-center gap-5 md:flex">
        <span className="text-[0.65rem] font-semibold uppercase tracking-[0.42em] text-white/35">
          Story
        </span>
        <div className="h-48 w-px overflow-hidden rounded-full bg-white/10">
          <div
            ref={progressRef}
            className="h-full w-full origin-top bg-gradient-to-b from-orange-500 via-amber-300 to-yellow-200"
          />
        </div>
        <div className="space-y-3 text-left">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center gap-3">
              <span
                className={`h-2.5 w-2.5 rounded-full transition ${
                  activeStep === index ? "bg-white shadow-[0_0_16px_rgba(255,255,255,0.5)]" : "bg-white/20"
                }`}
              />
              <span
                className={`text-[0.6rem] uppercase tracking-[0.28em] transition ${
                  activeStep === index ? "text-white/75" : "text-white/30"
                }`}
              >
                {index === 0 ? "Enter" : index === steps.length - 1 ? "Buy" : flavors[index - 1].name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative grid min-h-screen items-center">
        <div className="relative h-[33rem] max-w-2xl">
          {steps.map((step, index) => {
            const flavor = step.flavorIndex >= 0 ? flavors[step.flavorIndex] : null;

            return (
              <article
                key={step.id}
                ref={(node) => registerPanel(index, node)}
                className={`product-experience__panel absolute inset-0 flex max-w-xl flex-col justify-center ${
                  index === 0 ? "product-experience__panel--initial" : ""
                }`}
              >
                <span className="mb-4 text-xs font-semibold uppercase tracking-[0.38em] text-white/55 md:text-sm">
                  {step.eyebrow}
                </span>
                <h2 className="max-w-2xl text-4xl font-black uppercase leading-[0.9] text-white md:text-6xl lg:text-7xl">
                  {step.title}
                </h2>
                <p className="mt-5 max-w-lg text-base leading-relaxed text-white/72 md:text-lg">
                  {step.copy}
                </p>

                {step.hero ? (
                  <>
                    <div className="mt-8 flex flex-wrap gap-3">
                      {step.meta.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.24em] text-white/70"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                    <div className="mt-8 flex flex-wrap gap-4">
                      <Link
                        to="/products"
                        className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-7 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-black transition hover:scale-[1.02] hover:bg-amber-300"
                      >
                        View Flavours
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                      <a
                        href="https://forms.gle/3BMEc8GTefdTsh9f6"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full border border-white/15 bg-white/5 px-7 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-white transition hover:scale-[1.02] hover:border-white/35 hover:bg-white/10"
                      >
                        Enquire Now
                      </a>
                    </div>
                  </>
                ) : null}

                {flavor ? (
                  <>
                    <div className="mt-8 flex flex-wrap gap-3">
                      {flavor.benefits.map((benefit) => (
                        <span
                          key={benefit}
                          className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-[0.18em]"
                          style={{
                            color: flavor.text,
                            borderColor: `${flavor.accent}55`,
                            background: `${flavor.accent}12`,
                          }}
                        >
                          {step.icon}
                          {benefit}
                        </span>
                      ))}
                    </div>
                    <div className="mt-6 grid max-w-lg grid-cols-3 gap-3">
                      {flavor.metrics.map((metric) => (
                        <div
                          key={metric}
                          className="rounded-3xl border border-white/8 bg-black/25 px-4 py-4 text-center backdrop-blur-md"
                        >
                          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-white/65">
                            {metric}
                          </p>
                        </div>
                      ))}
                    </div>
                  </>
                ) : null}

                {step.cta ? (
                  <div className="mt-8 max-w-lg rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                    <p className="text-sm uppercase tracking-[0.3em] text-white/45">
                      Three flavours. One bottle system.
                    </p>
                    <p className="mt-3 text-white/75">
                      Same geometry, dynamic label system, and tuned motion across desktop and mobile.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-4">
                      <Link
                        to="/products"
                        className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-black transition hover:scale-[1.02]"
                      >
                        Buy Now
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => {
                          document
                            .getElementById("contact-section")
                            ?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="rounded-full border border-white/15 bg-transparent px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:border-white/35 hover:bg-white/10"
                      >
                        Contact Team
                      </button>
                    </div>
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>

        <FlavorController
          flavors={flavors}
          activeFlavor={activeFlavor}
          onSelect={onSelectFlavor}
          className="absolute bottom-10 left-0"
        />
      </div>
    </div>
  );
};

export default ScrollNarrative;
