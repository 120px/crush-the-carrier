import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Physics, RigidBody, CuboidCollider } from "@react-three/rapier";
import Player from "./Player";
import Ball from "./Ball";

const Game = () => {

    const [ballHolder, setBallHolder] = useState(null);
    const [isBallPickedUp, setIsBallPickedUp] = useState(true);
    

    return (
        <div style={{ width: "100vw", height: "100vh" }}>
            <Canvas shadows camera={{ position: [0, 10, 10], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 10, 5]} castShadow intensity={1} />

                <Physics>
                    {/* Ground */}
                    <CuboidCollider position={[0, 0, 0]} args={[20, 0, 20]}>
                        <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
                            <planeGeometry args={[20, 20]} />
                            <meshStandardMaterial color="green" />
                        </mesh>
                    </CuboidCollider>

                    {/* Player */}
                    <Player />

                    {/* Ball */}
                    <Ball isBallPickedUp={isBallPickedUp} setBallHolder={setBallHolder} ballHolder={ballHolder} setIsBallPickedUp={setIsBallPickedUp} />
                </Physics>

                <OrbitControls />
            </Canvas>
        </div>
    );
}

export default Game;