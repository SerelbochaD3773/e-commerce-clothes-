import { useEffect, useRef } from "react"

function AmbientParticles({ count = 15 }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const particles = []

    for (let i = 0; i < count; i++) {
      const p = document.createElement("div")
      p.className = "ambient-particle"
      const size = Math.random() * 4 + 2
      p.style.width = `${size}px`
      p.style.height = `${size}px`
      resetParticle(p)
      container.appendChild(p)
      particles.push(p)
      animateParticle(p)
    }

    return () => {
      particles.forEach((p) => p.remove())
    }
  }, [count])

  function resetParticle(p) {
    p.style.left = `${Math.random() * 100}vw`
    p.style.top = `${Math.random() * 100}vh`
    p.style.opacity = Math.random() * 0.2
  }

  function animateParticle(p) {
    const duration = Math.random() * 20000 + 10000
    const x = (Math.random() - 0.5) * 200
    const y = (Math.random() - 0.5) * 200

    p.animate(
      [{ transform: "translate(0, 0)" }, { transform: `translate(${x}px, ${y}px)` }],
      {
        duration,
        iterations: Infinity,
        direction: "alternate",
        easing: "ease-in-out",
      }
    )
  }

  return <div ref={containerRef} />
}

export default AmbientParticles
