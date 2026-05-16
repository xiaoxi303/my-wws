"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { registerGsap } from "@/lib/gsap";

type SceneState = {
  hero: number;
  about: number;
  contact: number;
};

type SceneEvent = CustomEvent<{ progress: number }>;

type DeviceOrientationEventWithPermission = typeof DeviceOrientationEvent & {
  requestPermission?: () => Promise<PermissionState>;
};

export default function WebGLScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;

    if (!mount) {
      return;
    }

    const { gsap } = registerGsap();
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      42,
      window.innerWidth / window.innerHeight,
      0.1,
      120
    );
    camera.position.z = 9.5;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      preserveDrawingBuffer: true,
      powerPreference: "high-performance"
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.className = "webgl-canvas";
    mount.appendChild(renderer.domElement);

    const count = window.innerWidth < 768 ? 720 : 1500;
    const positions = new Float32Array(count * 3);
    const randoms = new Float32Array(count);

    for (let index = 0; index < count; index += 1) {
      const spread = window.innerWidth < 768 ? 7.5 : 10.5;
      positions[index * 3] = (Math.random() - 0.5) * spread;
      positions[index * 3 + 1] = (Math.random() - 0.5) * spread * 0.82;
      positions[index * 3 + 2] = (Math.random() - 0.5) * 7.5;
      randoms[index] = Math.random();
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    particleGeometry.setAttribute("aRandom", new THREE.BufferAttribute(randoms, 1));

    const particleMaterial = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uHero: { value: 0 },
        uContact: { value: 0 },
        uOpacity: { value: 0 }
      },
      vertexShader: `
        uniform float uTime;
        uniform vec2 uMouse;
        uniform float uHero;
        uniform float uContact;
        attribute float aRandom;
        varying float vAlpha;

        void main() {
          vec3 p = position;
          float wave = sin(uTime * 0.25 + p.x * 0.85 + p.y * 1.2) * 0.16;
          vec2 field = p.xy / 5.0;
          float pointer = smoothstep(0.55, 0.0, distance(field, uMouse));
          vec2 dir = normalize(field - uMouse + 0.0001);

          p.xy += dir * pointer * 0.28;
          p.y += uHero * 0.85;
          p.z += wave + uHero * 1.2;
          p.xy *= mix(1.0, 0.22 + aRandom * 0.32, uContact);

          vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
          gl_PointSize = (1.0 + aRandom * 2.7) * 12.0 / -mvPosition.z;
          gl_Position = projectionMatrix * mvPosition;
          vAlpha = 0.24 + pointer * 0.55 + uContact * 0.35;
        }
      `,
      fragmentShader: `
        uniform float uOpacity;
        varying float vAlpha;

        void main() {
          float d = distance(gl_PointCoord, vec2(0.5));
          if (d > 0.5) discard;
          float alpha = (1.0 - smoothstep(0.08, 0.5, d)) * vAlpha * uOpacity;
          gl_FragColor = vec4(vec3(0.94), alpha);
        }
      `
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    const wireGroup = new THREE.Group();
    const sphereMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0
    });
    const abstractMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0
    });

    const sphere = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.9, 3),
      sphereMaterial
    );
    const knot = new THREE.Mesh(
      new THREE.TorusKnotGeometry(1.18, 0.22, 160, 16, 2, 5),
      abstractMaterial
    );
    wireGroup.add(sphere, knot);
    wireGroup.position.set(2.35, -0.15, -0.4);
    scene.add(wireGroup);

    const mouse = new THREE.Vector2(0, 0);
    const gyro = new THREE.Vector2(0, 0);
    const input = new THREE.Vector2(0, 0);
    const state: SceneState = {
      hero: 0,
      about: 0,
      contact: 0
    };
    const smoothState: SceneState = {
      hero: 0,
      about: 0,
      contact: 0
    };
    const clock = new THREE.Clock();
    let frame = 0;

    gsap.to(particleMaterial.uniforms.uOpacity, {
      value: 1,
      duration: 2.2,
      ease: "power2.out",
      delay: 0.22
    });
    gsap.to(sphereMaterial, {
      opacity: 0.13,
      duration: 2.4,
      ease: "power2.out",
      delay: 0.52
    });

    const handlePointerMove = (event: PointerEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const handleOrientation = (event: DeviceOrientationEvent) => {
      const gamma = event.gamma ?? 0;
      const beta = event.beta ?? 0;

      gyro.x = THREE.MathUtils.clamp(gamma / 35, -1, 1);
      gyro.y = THREE.MathUtils.clamp(-beta / 45, -1, 1);
    };

    let orientationEnabled = false;
    let orientationRequested = false;

    const addOrientationListener = () => {
      if (orientationEnabled) {
        return;
      }

      window.addEventListener("deviceorientation", handleOrientation, true);
      orientationEnabled = true;
    };

    const requestOrientation = async () => {
      if (orientationRequested) {
        return;
      }

      orientationRequested = true;
      const OrientationEvent =
        window.DeviceOrientationEvent as DeviceOrientationEventWithPermission | undefined;

      if (!OrientationEvent) {
        return;
      }

      if (typeof OrientationEvent.requestPermission === "function") {
        try {
          const permission = await OrientationEvent.requestPermission();

          if (permission === "granted") {
            addOrientationListener();
          }
        } catch {
          orientationRequested = false;
        }
        return;
      }

      addOrientationListener();
    };

    const OrientationEvent =
      window.DeviceOrientationEvent as DeviceOrientationEventWithPermission | undefined;

    if (OrientationEvent) {
      if (typeof OrientationEvent.requestPermission === "function") {
        window.addEventListener("pointerdown", requestOrientation, {
          once: true,
          passive: true
        });
        window.addEventListener("touchstart", requestOrientation, {
          once: true,
          passive: true
        });
      } else {
        addOrientationListener();
      }
    }

    const handleHero = (event: Event) => {
      state.hero = (event as SceneEvent).detail.progress;
    };

    const handleAbout = (event: Event) => {
      state.about = (event as SceneEvent).detail.progress;
    };

    const handleContact = (event: Event) => {
      state.contact = (event as SceneEvent).detail.progress;
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const render = () => {
      frame = window.requestAnimationFrame(render);
      const elapsed = clock.getElapsedTime();

      smoothState.hero = THREE.MathUtils.lerp(smoothState.hero, state.hero, 0.08);
      smoothState.about = THREE.MathUtils.lerp(
        smoothState.about,
        state.about,
        0.08
      );
      smoothState.contact = THREE.MathUtils.lerp(
        smoothState.contact,
        state.contact,
        0.08
      );

      const gyroInfluence = window.innerWidth < 768 ? 0.72 : 0.28;
      const mouseInfluence = 0.22;
      input.set(
        THREE.MathUtils.clamp(mouse.x + gyro.x * gyroInfluence, -1, 1),
        THREE.MathUtils.clamp(mouse.y + gyro.y * gyroInfluence, -1, 1)
      );
      particleMaterial.uniforms.uTime.value = elapsed;
      particleMaterial.uniforms.uMouse.value.lerp(input, 0.06);
      particleMaterial.uniforms.uHero.value = smoothState.hero;
      particleMaterial.uniforms.uContact.value = smoothState.contact;

      particles.rotation.y = elapsed * 0.018 + smoothState.hero * 0.34;
      particles.rotation.x = smoothState.hero * 0.1 - smoothState.contact * 0.18;

      wireGroup.position.x =
        THREE.MathUtils.lerp(2.35, 0.1, smoothState.hero) +
        input.x * mouseInfluence;
      wireGroup.position.y =
        THREE.MathUtils.lerp(-0.15, 0.08, smoothState.hero) +
        input.y * mouseInfluence * 0.62;
      wireGroup.position.z = THREE.MathUtils.lerp(-0.4, 0.15, smoothState.hero);
      wireGroup.scale.setScalar(
        1 + smoothState.hero * 0.62 + smoothState.about * 0.34
      );
      wireGroup.rotation.x = elapsed * 0.11 + smoothState.hero * 1.2;
      wireGroup.rotation.y = elapsed * 0.16 + smoothState.hero * 1.6;
      wireGroup.rotation.z = smoothState.about * 0.92;

      sphereMaterial.opacity =
        0.13 * (1 - smoothState.about * 0.62) + smoothState.contact * 0.04;
      abstractMaterial.opacity = smoothState.about * 0.13;
      knot.rotation.x = -elapsed * 0.08 + smoothState.about * 1.8;
      knot.rotation.y = elapsed * 0.1;

      renderer.render(scene, camera);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("resize", handleResize);
    window.addEventListener("webgl:hero", handleHero);
    window.addEventListener("webgl:about", handleAbout);
    window.addEventListener("webgl:contact", handleContact);
    render();

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("deviceorientation", handleOrientation, true);
      window.removeEventListener("pointerdown", requestOrientation);
      window.removeEventListener("touchstart", requestOrientation);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("webgl:hero", handleHero);
      window.removeEventListener("webgl:about", handleAbout);
      window.removeEventListener("webgl:contact", handleContact);
      particleGeometry.dispose();
      particleMaterial.dispose();
      sphere.geometry.dispose();
      sphereMaterial.dispose();
      knot.geometry.dispose();
      abstractMaterial.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    />
  );
}
