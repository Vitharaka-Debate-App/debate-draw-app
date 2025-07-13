// src/components/ThreeLogoScreensaver.jsx
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import logoTexture from '../assets/vwi.png';

const LogoScreensaver = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(logoTexture, (texture) => {
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
      });
      const geometry = new THREE.PlaneGeometry(3, 3);
      const logo = new THREE.Mesh(geometry, material);
      scene.add(logo);

      camera.position.z = 5;

      const animate = () => {
        requestAnimationFrame(animate);
        logo.rotation.y += 0.01;
        renderer.render(scene, camera);
      };

      animate();
    });

    // Cleanup on unmount
    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} />;
};

export default LogoScreensaver;
