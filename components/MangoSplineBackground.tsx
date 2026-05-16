"use client";

import { useCallback, useEffect, useRef } from "react";
import Spline from "@splinetool/react-spline";
import type { Application, SPEObject } from "@splinetool/runtime";
import { registerGsap } from "@/lib/gsap";

const SCENE_URL =
  "https://prod.spline.design/wyqPKmVJna7xc7Mb/scene.splinecode";

type ObjectSnapshot = {
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
  scale: { x: number; y: number; z: number };
};

type RotationSnapshot = {
  rotation: { x: number; y: number; z: number };
};

declare global {
  interface Window {
    __mangoSplineDebug?: {
      found: {
        hero: boolean;
        head: boolean;
        leftEye: boolean;
        rightEye: boolean;
      };
      objectNames: string[];
    };
  }
}

function readNumber(value: unknown, fallback: number) {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function snapshotObject(object: SPEObject): ObjectSnapshot {
  return {
    position: {
      x: readNumber(object.position.x, 0),
      y: readNumber(object.position.y, 0),
      z: readNumber(object.position.z, 0)
    },
    rotation: {
      x: readNumber(object.rotation.x, 0),
      y: readNumber(object.rotation.y, 0),
      z: readNumber(object.rotation.z, 0)
    },
    scale: {
      x: readNumber(object.scale.x, 1),
      y: readNumber(object.scale.y, 1),
      z: readNumber(object.scale.z, 1)
    }
  };
}

function snapshotRotation(object: SPEObject): RotationSnapshot {
  return {
    rotation: {
      x: readNumber(object.rotation.x, 0),
      y: readNumber(object.rotation.y, 0),
      z: readNumber(object.rotation.z, 0)
    }
  };
}

function findObject(
  spline: Application,
  name: string,
  aliases: string[] = []
): SPEObject | undefined {
  const exact = spline.findObjectByName(name);

  if (exact) {
    return exact;
  }

  const lowerNames = [name, ...aliases].map((value) => value.toLowerCase());

  return spline
    .getAllObjects()
    .find((object) => lowerNames.includes(object.name.toLowerCase()));
}

export default function MangoSplineBackground() {
  const rootRef = useRef<HTMLDivElement>(null);
  const splineWrapRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<SPEObject | null>(null);
  const leftEyeRef = useRef<SPEObject | null>(null);
  const rightEyeRef = useRef<SPEObject | null>(null);
  const headBaseRef = useRef<RotationSnapshot | null>(null);
  const leftEyeBaseRef = useRef<RotationSnapshot | null>(null);
  const rightEyeBaseRef = useRef<RotationSnapshot | null>(null);
  const objectTweensRef = useRef<gsap.core.Tween[]>([]);
  const lookTweensRef = useRef<gsap.core.Tween[]>([]);

  const killObjectTweens = useCallback(() => {
    objectTweensRef.current.forEach((tween) => tween.kill());
    objectTweensRef.current = [];
  }, []);

  const killLookTweens = useCallback(() => {
    lookTweensRef.current.forEach((tween) => tween.kill());
    lookTweensRef.current = [];
  }, []);

  const handleLoad = useCallback(
    (spline: Application) => {
      const { gsap, ScrollTrigger } = registerGsap();
      gsap.registerPlugin(ScrollTrigger);

      killObjectTweens();
      killLookTweens();

      const hero = findObject(spline, "HeroObject", ["Bot"]);
      const head = findObject(spline, "RobotHead", ["Head", "Robot Head"]);
      const leftEye = findObject(spline, "LeftEye", ["Left Eye", "Eye_L"]);
      const rightEye = findObject(spline, "RightEye", ["Right Eye", "Eye_R"]);
      const objectNames = spline
        .getAllObjects()
        .map((object) => object.name)
        .filter(Boolean);

      window.__mangoSplineDebug = {
        found: {
          hero: Boolean(hero),
          head: Boolean(head),
          leftEye: Boolean(leftEye),
          rightEye: Boolean(rightEye)
        },
        objectNames
      };

      if (!head || !leftEye || !rightEye) {
        console.warn(
          "Spline look targets were not all found. In the Spline editor, name objects HeroObject, RobotHead, LeftEye, and RightEye.",
          window.__mangoSplineDebug
        );
      }

      headRef.current = head ?? null;
      leftEyeRef.current = leftEye ?? null;
      rightEyeRef.current = rightEye ?? null;
      headBaseRef.current = head ? snapshotRotation(head) : null;
      leftEyeBaseRef.current = leftEye ? snapshotRotation(leftEye) : null;
      rightEyeBaseRef.current = rightEye ? snapshotRotation(rightEye) : null;

      if (!hero) {
        ScrollTrigger.refresh();
        return;
      }

      const base = snapshotObject(hero);
      hero.visible = true;
      hero.position.x = base.position.x + 96;
      hero.position.y = base.position.y + 28;
      hero.scale.x = base.scale.x * 0.84;
      hero.scale.y = base.scale.y * 0.84;
      hero.scale.z = base.scale.z * 0.84;

      const objectTweens: gsap.core.Tween[] = [
        gsap.to(hero.position, {
          x: base.position.x + 58,
          y: base.position.y + 42,
          duration: 1,
          ease: "none",
          scrollTrigger: {
            start: 0,
            end: 800,
            scrub: true,
            invalidateOnRefresh: true
          }
        }),
        gsap.to(hero.scale, {
          x: base.scale.x * 0.92,
          y: base.scale.y * 0.92,
          z: base.scale.z * 0.92,
          duration: 1,
          ease: "none",
          scrollTrigger: {
            start: 0,
            end: 800,
            scrub: true,
            invalidateOnRefresh: true
          }
        }),
        gsap.to(hero.rotation, {
          x: base.rotation.x + 0.08,
          y: base.rotation.y + 0.68,
          duration: 1,
          ease: "none",
          scrollTrigger: {
            start: 0,
            end: 800,
            scrub: true,
            invalidateOnRefresh: true
          }
        })
      ];

      const projects = document.getElementById("projects");
      const contact = document.getElementById("contact");

      if (projects) {
        objectTweens.push(
          gsap.to(hero.rotation, {
            y: base.rotation.y + 1,
            z: base.rotation.z + 0.04,
            duration: 1,
            ease: "none",
            scrollTrigger: {
              trigger: projects,
              start: "top bottom",
              end: "bottom top",
              scrub: true
            }
          })
        );
      }

      if (contact) {
        objectTweens.push(
          gsap.to(hero.scale, {
            x: base.scale.x * 1.04,
            y: base.scale.y * 1.04,
            z: base.scale.z * 1.04,
            duration: 1,
            ease: "none",
            scrollTrigger: {
              trigger: contact,
              start: "top bottom",
              end: "bottom bottom",
              scrub: true
            }
          })
        );
      }

      objectTweensRef.current = objectTweens;
      ScrollTrigger.refresh();
    },
    [killLookTweens, killObjectTweens]
  );

  useEffect(() => {
    const { gsap, ScrollTrigger } = registerGsap();
    gsap.registerPlugin(ScrollTrigger);

    const root = rootRef.current;
    const splineWrap = splineWrapRef.current;

    if (!root || !splineWrap) {
      return;
    }

    const lookAt = (normalizedX: number, normalizedY: number) => {
      const head = headRef.current;
      const leftEye = leftEyeRef.current;
      const rightEye = rightEyeRef.current;
      const headBase = headBaseRef.current;
      const leftEyeBase = leftEyeBaseRef.current;
      const rightEyeBase = rightEyeBaseRef.current;
      const x = gsap.utils.clamp(-1, 1, normalizedX);
      const y = gsap.utils.clamp(-1, 1, normalizedY);

      killLookTweens();

      if (head && headBase) {
        lookTweensRef.current.push(
          gsap.to(head.rotation, {
            x: headBase.rotation.x + y * 0.18,
            y: headBase.rotation.y + x * 0.35,
            duration: 0.95,
            ease: "power3.out",
            overwrite: true
          })
        );
      }

      if (leftEye && leftEyeBase) {
        lookTweensRef.current.push(
          gsap.to(leftEye.rotation, {
            x: leftEyeBase.rotation.x + y * 0.075,
            y: leftEyeBase.rotation.y + x * 0.12,
            duration: 0.78,
            ease: "power3.out",
            overwrite: true
          })
        );
      }

      if (rightEye && rightEyeBase) {
        lookTweensRef.current.push(
          gsap.to(rightEye.rotation, {
            x: rightEyeBase.rotation.x + y * 0.075,
            y: rightEyeBase.rotation.y + x * 0.12,
            duration: 0.78,
            ease: "power3.out",
            overwrite: true
          })
        );
      }
    };

    const resetLook = () => lookAt(0, 0);

    const handlePointerMove = (event: PointerEvent) => {
      const normalizedX = (event.clientX / window.innerWidth) * 2 - 1;
      const normalizedY = -((event.clientY / window.innerHeight) * 2 - 1);

      lookAt(normalizedX, normalizedY);
    };

    const sectionTweens: gsap.core.Tween[] = [];
    let sectionSetup: gsap.core.Tween | null = null;

    const context = gsap.context(() => {
      gsap.set(splineWrap, {
        autoAlpha: 0.45,
        xPercent: 1,
        yPercent: 2,
        scale: 0.98,
        filter: "blur(0px)"
      });

      gsap
        .timeline({
          scrollTrigger: {
            start: 0,
            end: 800,
            scrub: true,
            invalidateOnRefresh: true
          },
          defaults: { ease: "none" }
        })
        .to(splineWrap, {
          autoAlpha: 0.85,
          xPercent: 0,
          yPercent: 2,
          scale: 1.02,
          duration: 1
        });

      gsap
        .timeline({
          scrollTrigger: {
            start: 800,
            end: 1600,
            scrub: true,
            invalidateOnRefresh: true
          },
          defaults: { ease: "none" }
        })
        .to(splineWrap, {
          autoAlpha: 0.32,
          filter: "blur(1.5px)",
          duration: 1
        });

      sectionSetup = gsap.delayedCall(0.2, () => {
        const projects = document.getElementById("projects");
        const contact = document.getElementById("contact");

        if (projects) {
          sectionTweens.push(
            gsap.to(splineWrap, {
              autoAlpha: 0.26,
              duration: 1,
              ease: "none",
              scrollTrigger: {
                trigger: projects,
                start: "top bottom",
                end: "top top",
                scrub: true
              }
            })
          );
        }

        if (contact) {
          sectionTweens.push(
            gsap.to(splineWrap, {
              autoAlpha: 0.5,
              xPercent: 0,
              yPercent: 0,
              scale: 1.06,
              filter: "blur(0.4px)",
              duration: 1,
              ease: "none",
              scrollTrigger: {
                trigger: contact,
                start: "top bottom",
                end: "bottom bottom",
                scrub: true
              }
            })
          );
        }

        ScrollTrigger.refresh();
      });
    }, root);

    const handleResize = () => ScrollTrigger.refresh();

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", resetLook);
    window.addEventListener("blur", resetLook);
    window.addEventListener("resize", handleResize);
    ScrollTrigger.refresh();

    return () => {
      killObjectTweens();
      killLookTweens();
      sectionSetup?.kill();
      sectionTweens.forEach((tween) => tween.kill());
      context.revert();
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", resetLook);
      window.removeEventListener("blur", resetLook);
      window.removeEventListener("resize", handleResize);
    };
  }, [killLookTweens, killObjectTweens]);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-black"
    >
      <div ref={splineWrapRef} className="mango-spline-scene absolute inset-0">
        <Spline
          scene={SCENE_URL}
          onLoad={handleLoad}
          renderOnDemand={false}
          className="absolute inset-0 h-full w-full"
        />
      </div>
      <div className="mango-spline-radial absolute inset-0" />
      <div className="mango-spline-vignette absolute inset-0" />
      <div className="mango-spline-noise absolute inset-0" />
    </div>
  );
}
