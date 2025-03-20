import React, { Suspense, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Physics, RigidBody, useRapier } from "@react-three/rapier";
import Ball from "./Ball";
import Player from "./Player";
import Dummy from "./Dummy";

const Game = () => {
  const [ballHolder, setBallHolder] = useState(null);
  const [isBallPickedUp, setIsBallPickedUp] = useState(null);
  const ballRef = useRef();

  const handlePickup = (playerId) => {
    setBallCarrier(playerId);
  };

  return (
    <Canvas>
      <Suspense>
        <Physics gravity={[0, 0, 0]}>
            <RigidBody type="static">
              <mesh position={[0, -0.5, 0]}>
                <boxGeometry args={[20, 1, 20]} />
                <meshStandardMaterial color="green" />
              </mesh>
            </RigidBody>
            <Dummy />
          </Physics>
      </Suspense>
    </Canvas>
    
    // <Canvas camera={{ position: [0, 7, 10], fov: 55 }}>
    //   <ambientLight intensity={0.5} />
    //   <directionalLight position={[5, 10, 5]} intensity={1} />
    //   <Suspense>
    //     <Physics gravity={[0, 0, 0]}>
    //       <RigidBody type="static">
    //         <mesh position={[0, -0.5, 0]}>
    //           <boxGeometry args={[20, 1, 20]} />
    //           <meshStandardMaterial color="green" />
    //         </mesh>
    //       </RigidBody>

    //       <Ball ballHolder={ballHolder} setBallHolder={setBallHolder} setIsBallPickedUp={setIsBallPickedUp} isBallPickedUp={isBallPickedUp} />

    //       <Player id="player" onPickup={handlePickup} ballHolder={ballHolder} />
    //     </Physics>
    //   </Suspense>
    // </Canvas>
  );
};

export default Game;
