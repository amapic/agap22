import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import React, { useRef, forwardRef, useEffect, useCallback } from "react";
import * as THREE from "three";
// import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { SphereGeometry } from "three";
gsap.registerPlugin(ScrollTrigger);

const Planete = (props, ref) => {
  const { nodes } = useLoader(GLTFLoader, "/low_poly_earth.gltf");

  const refLoc = useRef(null);
  // var cumulDelta = useRef(0);
  useFrame(({ clock }) => {
    if (refLoc.current) {
      refLoc.current.rotation.y += 0.005;
    }
    // cumulDelta += delta;
    // let measure = new THREE.Vector3();
    // let box = ref.children[0].getSize(measure);
    // if (Math.trunc(clock.getElapsedTime()) % 5 == 0) {
    // console.log(clock.getElapsedTime());
    // let measure = new THREE.Vector3();

    // let box = ref.children[0].getSize(measure);
    // refLoc.current.children[0].children[0].geometry.computeBoundingBox();

    // refLoc.current.children[0].children[0].geometry.boundingBox.getSize(
    //   measure
    // );

    // console.log(measure);
    // }
  });

  return (
    <group ref={refLoc}>
      <group ref={ref}>
        {/* <mesh scale={[0.01, 0.01, 0.01]} geometry={nodes.mesh_0.geometry}>
          <meshStandardMaterial color="#ff1" opacity={0.5} />
        </mesh> */}
        <mesh scale={[0.01, 0.01, 0.01]} geometry={nodes.mesh_0_1.geometry}>
          <meshStandardMaterial color="#ff0" opacity={1} />
        </mesh>
        <mesh scale={[0.01, 0.01, 0.01]}>
          <meshStandardMaterial color="#ff0" opacity={1} />
          <sphereGeometry args={[0.95, 32, 16]} />
        </mesh>
      </group>
      {/* <mesh>
        <meshStandardMaterial color="#ff0" opacity={1} />
        <sphereGeometry args={[15, 32, 16]} />
      </mesh> */}
    </group>
  );
};

const PlaneteBis = forwardRef(Planete); //erreur si forward ref mis directement au d??but de <Planete />

const CanvasPlanete = () => {
  const ref = useCallback((node) => {
    if (node === null) {
      // DOM node referenced by ref has been unmounted
    } else {
      // DOM node referenced by ref has changed and exists
      let ctx = gsap.context(() => {
        var scrollSunTl = gsap.timeline();
        console.log("color", node.children[0].material.color);
        ScrollTrigger.create({
          trigger: "#main",
          // endTrigger: ".screen6",
          start: "top top", // which means "when the top of the trigger hits 40px above the bottom of the viewport
          end: "bottom-=10% bottom",
          // end: "+=200",
          toggleActions: "play pause resume reset",
          markers: true,
          scrub: 3,
          animation: scrollSunTl,
          // pin: "#canvas",
        });

        scrollSunTl.to(node.scale, {
          x: 140,
          y: 140,
          z: 140,
        });

        scrollSunTl.to(node.rotation, {
          x: 0,
          y: (3 * Math.PI) / 4,
          z: 0,
        });
      });
      return () => ctx.revert();
    }
  }, []); // adjust deps

  return (
    <div
      id="main"
      style={{
        height: "300vh",
        overflow: "hidden",
        position: "relative",
        width: "100%",
      }}
    >
      <div
        id="canvas"
        style={{
          height: "100vh",
          overflow: "hidden",
          position: "absolute",
          left: "0vh",
          width: "30vw",
          zIndex: "50",
        }}
      >
        <Canvas>
          <ambientLight intensity={0.3} />
          <spotLight position={[10, 10, 10]} angle={45} penumbra={1} />
          <pointLight position={[-10, -10, -10]} />

          <PlaneteBis ref={ref} />

          {/* <OrbitControls /> */}
        </Canvas>
      </div>
    </div>
  );
};

export default CanvasPlanete;
