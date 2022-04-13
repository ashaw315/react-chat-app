import React, { useRef } from "react";
import { Canvas, useFrame } from '@react-three/fiber'

const SpinningMesh = ({ position, args, color }) => {
    const mesh = useRef(null)
    useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));
    return (
    <mesh ref={mesh} position={position}>
        <boxBufferGeometry attach="geometry" args={args}/>
        <meshStandardMaterial attach="material" color={color}/>
    </mesh>
    )
}

export default SpinningMesh;