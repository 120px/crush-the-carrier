import { useState } from "react";
import * as THREE from "three";

export function usePlayerSkills(playerRef) {
    const [isJuking, setIsJuking] = useState(false);
    const [isSprinting, setIsSprinting] = useState(false);
    const [isTackling, setIsTackling] = useState(false);

    const juke = () => {
        if (!playerRef.current || isJuking) return;
        setIsJuking(true);
        console.log("Juke activated!");

        playerRef.current.wakeUp();

        console.log("Player mass:", playerRef.current.rigidBodyObject);
        console.log("Velocity before:", playerRef.current.linvel());

        console.log(playerRef.current.mass())

        setTimeout(() => {
            setIsJuking(false);
        }, 500); // Reset juke after 0.5s
    };

    const sprint = (isHoldingSprint) => {
        if (!playerRef.current) return;
        if (isHoldingSprint) {
            setIsSprinting(true);
            playerRef.current.velocity.x *= 1.2; // Sprint boost
        } else {
            setIsSprinting(false);
            playerRef.current.velocity.x /= 1.2; // Reset speed
        }
    };

    const tackle = () => {
        if (!playerRef.current || isTackling) return;
        setIsTackling(true);
        console.log("Diving tackle!");

        // Ensure the player is awake
        playerRef.current.wakeUp();

        playerRef.current.applyImpulse({x:0, y:1, z:1}, true);

        setTimeout(() => {
            setIsTackling(false);
        }, 300); 
    };

    const stiffArm = () => {
        console.log("Stiff Arm activated! (Implement collision logic)");
    };

    return { juke, sprint, stiffArm, isJuking, isSprinting, tackle, isTackling };
}