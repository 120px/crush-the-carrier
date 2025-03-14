import { useRef, useState } from "react";
import { RigidBody, CapsuleCollider } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "./hooks/useKeyboardControls";

export default function Player({ }) {
    const playerRef = useRef();
    playerRef.name = "player";
    const { moveForward, moveBackward, moveLeft, moveRight } = useKeyboardControls();

    useFrame(() => {
        const speed = 5;
        const velocity = { x: 0, y: 0, z: 0 };

        if (moveForward) velocity.z -= speed;
        if (moveBackward) velocity.z += speed;
        if (moveLeft) velocity.x -= speed;
        if (moveRight) velocity.x += speed;

        if (playerRef.current)
            playerRef.current.setLinvel(velocity, true);
    });

    return (
        <RigidBody
            ref={playerRef}
            position={[0, 1, 0]}
            colliders={"hull"}
            type="dynamic"
            name="player"
            gravityScale={1}
            lockRotations={true}
            onCollisionEnter={({ other }) => {
            }}
        >
            <CapsuleCollider args={[0, 0]} />
            <mesh castShadow>
                <capsuleGeometry args={[0.5, 0.25, 16, 32]} />
                <meshStandardMaterial color={"blue"} /> { }
            </mesh>
        </RigidBody>
    );
}