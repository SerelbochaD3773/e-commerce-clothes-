import { useEffect, useRef } from "react"

function ParticleCanvas({ count = 100 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    let particles = []
    let animId

    function resize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    class Particle {
      constructor() {
        this.reset()
      }
      reset() {
        this.x = Math.random() * canvas.width
        this.y = canvas.height + Math.random() * 100
        this.size = Math.random() * 2 + 0.5
        this.speedY = Math.random() * 0.5 + 0.2
        this.speedX = Math.random() * 0.4 - 0.2
        this.opacity = Math.random() * 0.5 + 0.1
      }
      update() {
        this.y -= this.speedY
        this.x += this.speedX
        if (this.y < -10) this.reset()
      }
      draw() {
        ctx.fillStyle = `rgba(0, 240, 255, ${this.opacity})`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 5
        ctx.shadowColor = "#00f0ff"
      }
    }

    function init() {
      particles = []
      for (let i = 0; i < count; i++) {
        particles.push(new Particle())
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        p.update()
        p.draw()
      })
      animId = requestAnimationFrame(animate)
    }

    window.addEventListener("resize", resize)
    resize()
    init()
    animate()

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animId)
    }
  }, [count])

  return (
    <canvas
      ref={canvasRef}
      id="particle-canvas"
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}

export default ParticleCanvas
