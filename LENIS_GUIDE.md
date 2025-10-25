# Lenis Integration Guide

## ✅ What's Been Implemented

### 1. **Core Lenis Setup** (`src/components/smooth-scroll.tsx`)

- Smooth scrolling with custom easing
- Global instance for navigation
- Automatic cleanup

### 2. **Navigation Integration** (`src/components/navigation.tsx`)

- Smooth scroll to sections with Lenis
- Custom offset for fixed navbar
- Fallback to native scroll

### 3. **Custom Hooks** (`src/hooks/use-lenis.ts`)

#### `useLenisScroll()`

Returns scroll data in real-time:

```tsx
const { scrollProgress, scrollY, scrollVelocity } = useLenisScroll();
// scrollProgress: 0 to 1
// scrollY: absolute position
// scrollVelocity: scroll speed
```

#### `useScrollTrigger(threshold)`

Trigger animations when element enters viewport:

```tsx
const { isTriggered, elementRef } = useScrollTrigger(0.5);
<div ref={elementRef as any}>{isTriggered && <Animation />}</div>;
```

#### `useLenisControl()`

Control Lenis programmatically:

```tsx
const { scrollTo, start, stop } = useLenisControl();
scrollTo("#section", { offset: -100, duration: 2 });
```

### 4. **3D Scroll Effects** (`src/components/three/scroll-effects.tsx`)

#### `ScrollCamera`

Auto-moves camera based on scroll:

```tsx
<Canvas>
  <ScrollCamera />
  <YourScene />
</Canvas>
```

#### `ScrollParallax`

Parallax effect for 3D objects:

```tsx
<ScrollParallax speed={0.5}>
  <mesh>...</mesh>
</ScrollParallax>
```

#### `ScrollRotation`

Rotates based on scroll velocity:

```tsx
<ScrollRotation>
  <mesh>...</mesh>
</ScrollRotation>
```

### 5. **Scroll Progress Indicator** (`src/components/scroll-progress.tsx`)

- Top progress bar
- Circular progress indicator
- Auto-hides at bottom

## 🚀 Usage Examples

### Example 1: Scroll-Based 3D Animation

```tsx
import { useLenisScroll } from "@/hooks/use-lenis";
import { useFrame } from "@react-three/fiber";

function AnimatedCube() {
  const { scrollProgress } = useLenisScroll();
  const meshRef = useRef();

  useFrame(() => {
    meshRef.current.rotation.y = scrollProgress * Math.PI * 2;
    meshRef.current.position.y = scrollProgress * 10;
  });

  return <mesh ref={meshRef}>...</mesh>;
}
```

### Example 2: Scroll-Triggered Section Animations

```tsx
import { useScrollTrigger } from "@/hooks/use-lenis";
import { motion } from "framer-motion";

function AnimatedSection() {
  const { isTriggered, elementRef } = useScrollTrigger(0.6);

  return (
    <motion.div
      ref={elementRef as any}
      initial={{ opacity: 0, y: 100 }}
      animate={isTriggered ? { opacity: 1, y: 0 } : {}}
    >
      Content appears on scroll!
    </motion.div>
  );
}
```

### Example 3: Custom Scroll Button

```tsx
import { useLenisControl } from "@/hooks/use-lenis";

function ScrollToTop() {
  const { scrollTo } = useLenisControl();

  return (
    <button onClick={() => scrollTo(0, { duration: 2 })}>Back to Top</button>
  );
}
```

### Example 4: Parallax Layers

```tsx
function ParallaxSection() {
  const { scrollY } = useLenisScroll();

  return (
    <div>
      <div style={{ transform: `translateY(${scrollY * 0.5}px)` }}>
        Background Layer
      </div>
      <div style={{ transform: `translateY(${scrollY * 0.3}px)` }}>
        Middle Layer
      </div>
      <div style={{ transform: `translateY(${scrollY * 0.1}px)` }}>
        Foreground Layer
      </div>
    </div>
  );
}
```

## 🎨 Suggested Enhancements

### 1. Sync Hero Blob with Scroll

```tsx
// In floating-blob.tsx
import { useLenisScroll } from "@/hooks/use-lenis";

const { scrollProgress } = useLenisScroll();

useFrame(() => {
  meshRef.current.scale.setScalar(1 + scrollProgress * 0.5);
  meshRef.current.rotation.y = scrollProgress * Math.PI;
});
```

### 2. Tech Sphere Scroll Rotation

```tsx
// In tech-sphere.tsx
import { useLenisScroll } from "@/hooks/use-lenis";

const { scrollVelocity } = useLenisScroll();

useFrame(() => {
  groupRef.current.rotation.y += scrollVelocity * 0.01;
});
```

### 3. Contact Form Reveal

```tsx
// In contact-section.tsx
import { useScrollTrigger } from "@/hooks/use-lenis";

const { isTriggered, elementRef } = useScrollTrigger(0.5);

<motion.div
  ref={elementRef as any}
  initial={{ opacity: 0, scale: 0.8 }}
  animate={isTriggered ? { opacity: 1, scale: 1 } : {}}
  transition={{ duration: 1, ease: "easeOut" }}
>
  {/* Hologram form */}
</motion.div>;
```

## 🎯 Performance Tips

1. **Use RAF wisely** - Lenis already uses requestAnimationFrame
2. **Throttle scroll listeners** - Heavy calculations should be throttled
3. **Disable on mobile** - Consider disabling smooth scroll on touch devices
4. **GPU acceleration** - Use `transform` and `opacity` for animations

## 🔧 Troubleshooting

**Scroll not smooth?**

- Check browser console for errors
- Ensure `lenis` CSS is loaded
- Verify RAF loop is running

**Navigation not working?**

- Check section IDs match hrefs
- Ensure Lenis instance is available
- Try increasing offset value

**3D sync issues?**

- Verify hooks are inside Canvas or useFrame context
- Check scroll values are updating
- Ensure refs are properly connected

## 🎉 Features Now Available

✅ Buttery-smooth scrolling
✅ Momentum-based deceleration  
✅ Scroll progress tracking
✅ 3D camera sync with scroll
✅ Parallax effects
✅ Scroll-triggered animations
✅ Velocity-based rotations
✅ Progress indicators
✅ Custom easing functions
✅ Section anchors with smooth navigation

Your portfolio now has professional-grade smooth scrolling! 🚀
