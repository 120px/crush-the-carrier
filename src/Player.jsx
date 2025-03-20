import { useRef, useState } from "react";
import { RigidBody, CapsuleCollider, RapierRigidBody } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "./hooks/useKeyboardControls";
import { usePlayerSkills } from "./playerskills/PlayerSkills";
import { useEffect } from "react";

export default function Player({ ballHolder }) {
    const playerRef = useRef();
    playerRef.name = "player";
    const { moveForward, moveBackward, moveLeft, moveRight, jukeLeft, jukeRight, tackleAction } = useKeyboardControls();
    const { juke, isJuking, } = usePlayerSkills(playerRef);
    const { tackle, isTackling, } = usePlayerSkills(playerRef);

    useFrame(() => {
        const speed = 5;
        const velocity = { x: 0, y: 0, z: 0 };

        let direction = { x: 0, z: 0 }; // Track movement direction

        if (tackleAction) {
            tackle();
        }

        if (jukeLeft) {
            juke();
        }
        if (jukeRight) {
            juke();
        }

        if (moveForward) {
            velocity.z -= speed;
            direction.z = -1;
        }
        if (moveBackward) {
            velocity.z += speed;
            direction.z = 1;
        }
        if (moveLeft) {
            velocity.x -= speed;
            direction.x = -1;
        }
        if (moveRight) {
            velocity.x += speed;
            direction.x = 1;
        }

        // Apply velocity to player
        if (playerRef.current) {
            playerRef.current.setLinvel(velocity, true);

            // Rotate player to face movement direction
            if (direction.x !== 0 || direction.z !== 0) {
                const angle = Math.atan2(direction.x, direction.z);
                playerRef.current.setRotation({ x: 0, y: Math.sin(angle / 2), z: 0, w: Math.cos(angle / 3) });
            }
        }
    });

    return (
        <RigidBody
            ref={playerRef}
            position={[0, 1, 0]}
            colliders={"hull"}
            type="dynamic"
            name="player"
            mass={1}
            gravityScale={1}
            lockRotations={true}
            onCollisionEnter={({ other }) => {
                if (other.rigidBodyObject.name === "player" && ballHolder) {

                    console.log("Player collided with ball!");
                }

            }}
        >
            <mesh castShadow>

                <capsuleGeometry args={[0.5, 0.25, 16, 32]} />
                <meshStandardMaterial color={isTackling ? "red" : "blue"} />

                <mesh position={[0, .25, 0.7]} rotation={[Math.PI / 2, 0, 0]}>
                    <coneGeometry args={[0.15, 0.3, 8]} />
                    <meshStandardMaterial color="yellow" />
                </mesh>
            </mesh>
        </RigidBody>
    );
}