import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { prefersReducedMotion, isLowPower, getLenis } from '../lib/motion'

const FRAG = /* glsl */ `
precision highp float;
uniform float uTime;
uniform vec2  uMouse;
uniform float uMouseForce;
uniform float uIntensity;
uniform vec2  uRes;
varying vec2  vUv;

vec3 mod289(vec3 x){return x - floor(x * (1.0/289.0)) * 289.0;}
vec2 mod289(vec2 x){return x - floor(x * (1.0/289.0)) * 289.0;}
vec3 permute(vec3 x){return mod289(((x*34.0)+1.0)*x);}

float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m; m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float fbm(vec2 p){
  float v = 0.0;
  float a = 0.55;
  for (int i = 0; i < 4; i++) {
    v += a * snoise(p);
    p = p * 2.05 + 17.3;
    a *= 0.5;
  }
  return v;
}

void main(){
  float aspect = uRes.x / uRes.y;
  vec2 uv = vUv;
  vec2 p = (uv - 0.5) * vec2(aspect, 1.0) * 1.5;

  vec2 m = (uMouse - 0.5) * vec2(aspect, 1.0) * 1.5;
  float md = length(p - m);
  p -= normalize(p - m + 0.0001) * exp(-md * md * 4.0) * 0.28 * uMouseForce;

  float t = uTime * 0.045;
  vec2 q = vec2(fbm(p + vec2(t, -t * 0.7)), fbm(p + vec2(5.2, 1.3) - t));
  float n = fbm(p + 1.8 * q + vec2(t * 0.5, 0.0));

  vec3 base   = vec3(0.028, 0.038, 0.045);
  vec3 deep   = vec3(0.010, 0.110, 0.165);
  vec3 neon   = vec3(0.000, 0.898, 1.000);
  vec3 soft   = vec3(0.060, 0.380, 0.520);

  vec3 col = base;
  col = mix(col, deep, smoothstep(-0.2, 0.9, n) * 0.90 * uIntensity);
  col = mix(col, neon, smoothstep(0.40, 1.15, n) * 0.40 * uIntensity);
  col = mix(col, soft, smoothstep(0.55, 1.0, q.y) * 0.24 * uIntensity);

  float vig = smoothstep(1.5, 0.35, length(uv - 0.5) * 1.7);
  col = mix(base, col, vig);

  // Strong local glow under the pointer/finger — applied after the vignette
  // so it stays bright anywhere on screen.
  float glow = exp(-md * md * 3.0) * uMouseForce;
  col *= 1.0 + glow * 1.2;
  col += neon * glow * 0.30;

  float g = fract(sin(dot(uv * 731.7 + uTime, vec2(12.9898, 78.233))) * 43758.5453);
  col += (g - 0.5) * 0.022;

  gl_FragColor = vec4(col, 1.0);
}
`

const VERT = /* glsl */ `
varying vec2 vUv;
void main(){
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`

export default function FluidBackground() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    const reduced = prefersReducedMotion()
    const lowPower = isLowPower()

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false, powerPreference: 'low-power' })
    const resScale = lowPower ? 0.45 : 0.7
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1) * resScale)
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.domElement.style.width = '100%'
    renderer.domElement.style.height = '100%'
    mount.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
    const uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uMouseForce: { value: 0 },
      uIntensity: { value: 0.95 },
      uRes: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    }
    const quad = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, uniforms })
    )
    scene.add(quad)

    // `forceTarget` is the *intent* (set to 1 on interaction, relaxes to 0);
    // `force` eases toward it each frame, so the glow ramps in/out smoothly
    // instead of snapping to full strength.
    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5, force: 0, forceTarget: 0 }
    // Desktop pointer only. Touch interaction was removed: phones have no hover,
    // so taps looked abrupt — the background just plays its ambient animation.
    const onMove = (e) => {
      if (e.pointerType === 'touch') return
      mouse.tx = e.clientX / window.innerWidth
      mouse.ty = 1 - e.clientY / window.innerHeight
      mouse.forceTarget = 1
    }
    window.addEventListener('pointermove', onMove, { passive: true })

    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight)
      uniforms.uRes.value.set(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', onResize)

    // Intensity curve over page scroll: strong in hero, calm in the middle,
    // crescendo at the contact section.
    const intensityAt = (progress) => {
      const heroFall = 1.1 * Math.exp(-progress * 9.0)
      const calm = 0.45
      const finale = 1.5 * Math.pow(Math.max(0, (progress - 0.82) / 0.18), 2)
      return Math.min(1.8, calm + heroFall + finale)
    }

    let raf
    let last = 0
    const frameInterval = (reduced || lowPower) ? 1000 / 30 : 0
    const loop = (now) => {
      raf = requestAnimationFrame(loop)
      if (frameInterval && now - last < frameInterval) return
      last = now
      uniforms.uTime.value = now / 1000
      mouse.x += (mouse.tx - mouse.x) * 0.08
      mouse.y += (mouse.ty - mouse.y) * 0.08
      // Intent relaxes back to 0 slowly; the glow eases toward it faster, so
      // it rises smoothly and fades out without a hard cutoff.
      mouse.forceTarget += (0 - mouse.forceTarget) * 0.02
      mouse.force += (mouse.forceTarget - mouse.force) * 0.09
      uniforms.uMouse.value.set(mouse.x, mouse.y)
      uniforms.uMouseForce.value = reduced ? 0 : mouse.force

      const lenis = getLenis()
      const doc = document.documentElement
      const max = doc.scrollHeight - window.innerHeight || 1
      const progress = (lenis ? lenis.scroll : window.scrollY) / max
      const target = intensityAt(Math.max(0, Math.min(1, progress)))
      uniforms.uIntensity.value += (target - uniforms.uIntensity.value) * 0.04

      renderer.render(scene, camera)
    }

    if (reduced) {
      // Single static frame — calm fallback.
      uniforms.uTime.value = 12
      uniforms.uIntensity.value = 0.9
      renderer.render(scene, camera)
    } else {
      raf = requestAnimationFrame(loop)
    }

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('resize', onResize)
      quad.geometry.dispose()
      quad.material.dispose()
      renderer.dispose()
      mount.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} className="fluid-bg" aria-hidden="true" />
}
