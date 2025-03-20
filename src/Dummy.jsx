import { React, Suspense, useRef } from 'react'
import { Physics, RigidBody } from '@react-three/rapier'
import { Canvas, useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "./hooks/useKeyboardControls";
import { usePlayerSkills } from "./playerskills/PlayerSkills";

const Dummy = () => {
    const dummyRef = useRef();
    const { tackleAction } = useKeyboardControls();
    const { tackle, isTackling, } = usePlayerSkills(dummyRef);


    useFrame(() => {
        if (tackleAction) {
            tackle();
        }
    })

    return (
        <RigidBody ref={dummyRef}>
            <mesh castShadow>
                <capsuleGeometry args={[0.5, 0.25, 16, 32]} />
                <meshStandardMaterial />

                <mesh position={[0, .25, 0.7]} rotation={[Math.PI / 2, 0, 0]}>
                    <coneGeometry args={[0.15, 0.3, 8]} />
                    <meshStandardMaterial color="yellow" />
                </mesh>
            </mesh>
        </RigidBody>

    )
}

export default Dummy