import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Stars, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { assetUrl } from '../lib/assets'

type Scene3DProps = {
  scrollProgress: number
}

function MosqueBackdrop({ scrollProgress }: { scrollProgress: number }) {
  const mesh = useRef<THREE.Mesh>(null)
  const { camera, size } = useThree()
  const texture = useTexture(assetUrl('sheikh-zayed.jpg'))

  useMemo(() => {
    texture.colorSpace = THREE.SRGBColorSpace
    texture.anisotropy = 8
    texture.wrapS = THREE.ClampToEdgeWrapping
    texture.wrapT = THREE.ClampToEdgeWrapping
  }, [texture])

  // Cover the view without stretching — keep the photo's native aspect ratio.
  const planeSize = useMemo(() => {
    const image = texture.image as { width?: number; height?: number } | undefined
    const imgAspect =
      image?.width && image?.height ? image.width / image.height : 3 / 4

    const distance = 11 // camera ~z5 looking at plane ~z-6
    const fov = (camera as THREE.PerspectiveCamera).fov ?? 48
    const viewHeight = 2 * Math.tan(THREE.MathUtils.degToRad(fov / 2)) * distance
    const viewWidth = viewHeight * (size.width / Math.max(size.height, 1))

    // object-fit: cover
    let width = viewWidth
    let height = width / imgAspect
    if (height < viewHeight) {
      height = viewHeight
      width = height * imgAspect
    }

    // Slight overscan so edges never show during parallax
    const overscan = 1.12
    return { width: width * overscan, height: height * overscan }
  }, [texture, camera, size.width, size.height])

  useFrame((_, delta) => {
    if (!mesh.current) return
    const targetX = scrollProgress * 0.2
    const targetY = -scrollProgress * 0.08
    const targetZ = -6 - scrollProgress * 0.9
    mesh.current.position.x = THREE.MathUtils.damp(mesh.current.position.x, targetX, 2.2, delta)
    mesh.current.position.y = THREE.MathUtils.damp(mesh.current.position.y, targetY, 2.2, delta)
    mesh.current.position.z = THREE.MathUtils.damp(mesh.current.position.z, targetZ, 2, delta)
  })

  return (
    <mesh ref={mesh} position={[0, 0, -6]}>
      <planeGeometry args={[planeSize.width, planeSize.height, 1, 1]} />
      <meshStandardMaterial map={texture} roughness={0.85} metalness={0.05} />
    </mesh>
  )
}

function GoldParticles({ scrollProgress }: { scrollProgress: number }) {
  const points = useRef<THREE.Points>(null)
  const count = 420

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 18
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10
      arr[i * 3 + 2] = -2 - Math.random() * 8
    }
    return arr
  }, [])

  useFrame((state) => {
    if (!points.current) return
    points.current.rotation.y = state.clock.elapsedTime * 0.018 + scrollProgress * 0.4
    points.current.position.y = Math.sin(state.clock.elapsedTime * 0.25) * 0.15
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#edd078"
        transparent
        opacity={0.55}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  )
}

function GeometricRing({ scrollProgress }: { scrollProgress: number }) {
  const group = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!group.current) return
    group.current.rotation.z = state.clock.elapsedTime * 0.04
    group.current.rotation.x = 0.4 + scrollProgress * 0.35
    group.current.position.y = 1.2 - scrollProgress * 0.8
    group.current.scale.setScalar(1 + scrollProgress * 0.25)
  })

  return (
    <group ref={group} position={[3.2, 1.2, -3.5]}>
      <mesh>
        <torusGeometry args={[1.35, 0.012, 16, 100]} />
        <meshBasicMaterial color="#d4af37" transparent opacity={0.45} />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 4]}>
        <torusGeometry args={[1.05, 0.008, 12, 80]} />
        <meshBasicMaterial color="#edd078" transparent opacity={0.3} />
      </mesh>
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <mesh key={i} rotation={[0, 0, (i * Math.PI) / 4]} position={[0, 0, 0]}>
          <boxGeometry args={[0.01, 2.4, 0.01]} />
          <meshBasicMaterial color="#b8892a" transparent opacity={0.22} />
        </mesh>
      ))}
    </group>
  )
}

function CameraRig({ scrollProgress }: { scrollProgress: number }) {
  const { camera } = useThree()

  useFrame((_, delta) => {
    const targetZ = 5 - scrollProgress * 0.8
    const targetY = scrollProgress * 0.2
    const targetX = Math.sin(scrollProgress * Math.PI) * 0.12
    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetZ, 2, delta)
    camera.position.y = THREE.MathUtils.damp(camera.position.y, targetY, 2, delta)
    camera.position.x = THREE.MathUtils.damp(camera.position.x, targetX, 2, delta)
    camera.lookAt(0, 0.1, -4)
  })

  return null
}

function SceneContent({ scrollProgress }: { scrollProgress: number }) {
  return (
    <>
      <color attach="background" args={['#071b3a']} />
      <fog attach="fog" args={['#071b3a', 6, 18]} />
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 6, 5]} intensity={1.15} color="#fff4d6" />
      <directionalLight position={[-5, 2, 2]} intensity={0.35} color="#4a90d9" />
      <pointLight position={[0, 2, 1]} intensity={0.6} color="#d4af37" distance={12} />
      <MosqueBackdrop scrollProgress={scrollProgress} />
      <GoldParticles scrollProgress={scrollProgress} />
      <GeometricRing scrollProgress={scrollProgress} />
      <Stars radius={40} depth={30} count={1200} factor={2.2} saturation={0} fade speed={0.4} />
      <CameraRig scrollProgress={scrollProgress} />
    </>
  )
}

export function Scene3D({ scrollProgress }: Scene3DProps) {
  return (
    <div className="canvas-root" aria-hidden>
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 5], fov: 48, near: 0.1, far: 40 }}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <SceneContent scrollProgress={scrollProgress} />
        </Suspense>
      </Canvas>
    </div>
  )
}
