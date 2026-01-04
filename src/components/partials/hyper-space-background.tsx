"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HyperSpaceBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000000, 50, 400);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Stars
    const starCount = 6000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 600;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 600;
      positions[i * 3 + 2] = -Math.random() * 800;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.6,
      transparent: true,
      opacity: 0.9,
    });

    const stars = new THREE.Points(geometry, material);
    scene.add(stars);

    let speed = 0.6;
    let phase: "slow" | "accelerate" | "warp" | "cooldown" = "slow";
    let phaseTime = 0;

    const animate = () => {
      requestAnimationFrame(animate);

      phaseTime += 0.016;

      if (phase === "slow" && phaseTime > 4) {
        phase = "accelerate";
        phaseTime = 0;
      } else if (phase === "accelerate" && phaseTime > 3) {
        phase = "warp";
        phaseTime = 0;
      } else if (phase === "warp" && phaseTime > 2) {
        phase = "cooldown";
        phaseTime = 0;
      } else if (phase === "cooldown" && phaseTime > 3) {
        phase = "slow";
        phaseTime = 0;
      }

      if (phase === "slow") speed = THREE.MathUtils.lerp(speed, 0.6, 0.02);
      if (phase === "accelerate") speed = THREE.MathUtils.lerp(speed, 6, 0.03);
      if (phase === "warp") speed = THREE.MathUtils.lerp(speed, 18, 0.08);
      if (phase === "cooldown") speed = THREE.MathUtils.lerp(speed, 0.6, 0.05);

      const pos = geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < starCount; i++) {
        pos[i * 3 + 2] += speed;
        if (pos[i * 3 + 2] > 10) {
          pos[i * 3 + 2] = -800;
        }
      }
      geometry.attributes.position.needsUpdate = true;

      if (phase === "warp") {
        camera.position.x = (Math.random() - 0.5) * 0.15;
        camera.position.y = (Math.random() - 0.5) * 0.15;
      } else {
        camera.position.x = THREE.MathUtils.lerp(camera.position.x, 0, 0.1);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0, 0.1);
      }

      renderer.render(scene, camera);
    };

    animate();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="fixed inset-0 z-0" />;
}
