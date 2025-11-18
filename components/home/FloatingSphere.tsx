'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export function FloatingSphere() {
  const containerRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    )
    camera.position.z = 5

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    containerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Create sphere with eco-friendly gradient
    const geometry = new THREE.SphereGeometry(1.5, 32, 32)
    const material = new THREE.MeshPhongMaterial({
      color: 0x36763d, // Moss green
      emissive: 0x357777, // Ocean teal glow
      emissiveIntensity: 0.2,
      shininess: 100,
      transparent: true,
      opacity: 0.9,
    })
    const sphere = new THREE.Mesh(geometry, material)
    scene.add(sphere)

    // Add wireframe overlay for tech aesthetic
    const wireframeGeometry = new THREE.SphereGeometry(1.52, 16, 16)
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x9ccba0,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    })
    const wireframe = new THREE.Mesh(wireframeGeometry, wireframeMaterial)
    scene.add(wireframe)

    // Lighting
    const light1 = new THREE.DirectionalLight(0xffffff, 1)
    light1.position.set(5, 5, 5)
    scene.add(light1)

    const light2 = new THREE.DirectionalLight(0x36763d, 0.5)
    light2.position.set(-5, -5, -5)
    scene.add(light2)

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
    scene.add(ambientLight)

    // Animation
    let animationFrameId: number
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      // Rotate sphere slowly
      sphere.rotation.y += 0.005
      sphere.rotation.x += 0.003
      wireframe.rotation.y -= 0.003
      wireframe.rotation.x -= 0.002

      // Gentle floating animation
      sphere.position.y = Math.sin(Date.now() * 0.001) * 0.2
      wireframe.position.y = Math.sin(Date.now() * 0.001) * 0.2

      renderer.render(scene, camera)
    }
    animate()

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    }
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
      if (containerRef.current && rendererRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement)
      }
      geometry.dispose()
      material.dispose()
      wireframeGeometry.dispose()
      wireframeMaterial.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="w-full h-full min-h-[400px] flex items-center justify-center"
      style={{ background: 'transparent' }}
    />
  )
}
