import { useRef, useEffect } from "react";
import { RigidBody, BallCollider, Physics } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";

const Ball = ({ setBallHolder, ballHolder, setIsBallPickedUp, isBallPickedUp }) => {
    const ballRef = useRef(null);
    console.log(ballHolder)

    function placeBallInPlayerHands() {
        // Get the position of the player's hand
        ballRef.current.setBodyType("kinematicPosition");
        const handPosition = ballHolder.position;
        ballRef.current.setTranslation({
            x: handPosition.x,
            y: handPosition.y + 1,
            z: handPosition.z
        });
    }

    function getRandomPosition() {
        return [
            (Math.random() - 0.5) * 18,
            1,
            (Math.random() - 0.5) * 18,
        ];
    }

    useEffect(() => {
        if (ballHolder !== null) {
            console.log("Placing ball in player hands");
            placeBallInPlayerHands();
            console.log(ballRef.current.type)
        }
    }, [ballHolder]);

    useFrame(() => {
        if (isBallPickedUp && ballHolder && ballRef.current) {
            const handPosition = ballHolder.position; // Get player position
            ballRef.current.setTranslation({
                x: handPosition.x,
                y: handPosition.y + 1,
                z: handPosition.z
            });
        }
    });

    return (
        <RigidBody
            ref={ballRef}
            colliders={"ball"}
            restitution={1.4}
            position={[3, 1, 0]}
            type="ball"
            name={"ball"}
            onCollisionEnter={({ other }) => {
                if (other.rigidBodyObject.name === "player" && ballRef.current) {
                    setIsBallPickedUp(true);
                    setBallHolder(other.rigidBodyObject);
                    // sets it to kinematicPosition
                    ballRef.current.setBodyType(2);

                }
            }}

        >
            <mesh castShadow >
                <sphereGeometry args={[0.3, 8, 8]} />
                <meshStandardMaterial color="orange" />
            </mesh>
        </RigidBody>
    );
}

export default Ball