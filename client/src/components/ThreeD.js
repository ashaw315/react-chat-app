import React, { useRef } from "react";
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshWobbleMaterial, softShadows } from '@react-three/drei'
// import SpinningMesh from "./SpinningMesh";

softShadows();

const SpinningMesh = ({ position, args, color, speed }) => {
    const mesh = useRef(null)
    useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));
    return (
    <mesh ref={mesh} position={position} castShadow>
        <boxBufferGeometry attach="geometry" args={args}/>
        {/* <meshStandardMaterial attach="material" color={color}/> */}
        <MeshWobbleMaterial attach="material" color={color} speed={speed} factor={0.6}/>
    </mesh>
    )
}

function ThreeD() {
    // const mesh = useRef(null)
    // useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));
    return (
        <div className='three-d'>
            <p>stuff here</p>
            <Canvas 
            shadows
            colorMangement
            camera={{position: [-5, 2, 10], fov: 60}}>
                <ambientLight intensity={0.3}/>
                <directionalLight
                castShadow 
                position={[0, 10, 0]} 
                intensity={1.5} 
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
                shadow-camera-far={50}
                shadow-camera-left={-10}
                shadow-camera-right={10}
                shadow-camera-top={10}
                shadow-camera-bottom={-10}
                />
                <pointLight position={[-10, 0, -20]} intensity={0.5}/>
                <pointLight position={[0, -10, 0]} intensity={1.5}/>

                <group>
                    <mesh 
                    receiveShadow
                    rotation={[-Math.PI / 2, 0, 0]} 
                    position={[0, -3, 0]}>
                        <planeBufferGeometry attach="geometry" args={[100, 100]}/>
                        {/* This casts a shadow */}
                        <shadowMaterial attach='material' opacity={0.3} />
                        {/* <meshStandardMaterial attach="material" color={'yellow'}/> */}
                    </mesh>
                

                <SpinningMesh position={[0, 1, 0]} args={[3, 2, 1]} color="lightblue" speed={2}/>
                <SpinningMesh position={[-2, 1, -5]} color="red" speed={6}/>
                <SpinningMesh position={[5, 1, -2]} color="red" speed={6}/>
                </group>
            </Canvas>
        </div>
    )
}

export default ThreeD;