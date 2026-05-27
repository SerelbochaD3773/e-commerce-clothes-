import { useState } from "react"

const periods = [
  { label: "7D", value: "7d" },
  { label: "1M", value: "1m" },
  { label: "3M", value: "3m" },
  { label: "1A", value: "1y" },
]

function SalesChart({ data = [], loading }) {
  const [activePeriod, setActivePeriod] = useState("1m")

  const topValue = Math.max(...data.map((d) => d.value), 1)
  const pathPoints = data.map((d, i) => ({
    x: (i / Math.max(data.length - 1, 1)) * 100,
    y: 100 - (d.value / topValue) * 80,
  }))

  const linePath = pathPoints.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ")
  const areaPath = `${linePath} L100,100 L0,100 Z`

  return (
    <div className="lg:col-span-8 bg-surface-container-low border border-outline-variant p-6">
      <div className="flex justify-between items-center mb-8">
        <h4 className="font-headline-md text-headline-md text-on-surface">Rendimiento de Ventas</h4>
        <div className="flex gap-2">
          {periods.map((p) => (
            <button
              key={p.value}
              onClick={() => setActivePeriod(p.value)}
              className={`px-3 py-1 font-label-caps text-[10px] border transition-colors ${
                activePeriod === p.value
                  ? "bg-primary-container text-on-primary-container font-bold border-primary-container"
                  : "bg-surface-container-highest text-on-surface border-outline-variant hover:border-primary-container"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="h-64 lg:h-80 w-full animate-pulse bg-surface-container-highest" />
      ) : (
        <div className="relative h-64 lg:h-80 w-full chart-gradient border-b border-l border-outline-variant/30 flex items-end">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="lineGrad" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#00f0ff" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={areaPath} fill="url(#lineGrad)" />
            <path d={linePath} fill="none" stroke="#00f0ff" strokeWidth="2" />
            {pathPoints.length > 0 && (
              <>
                <circle cx={pathPoints[pathPoints.length - 1].x} cy={pathPoints[pathPoints.length - 1].y} fill="#00f0ff" r="3" />
                <circle cx={pathPoints[pathPoints.length - 1].x} cy={pathPoints[pathPoints.length - 1].y} fill="#00f0ff" fillOpacity="0.2" r="6" />
              </>
            )}
          </svg>
        </div>
      )}

      <div className="flex justify-between mt-4 text-on-surface-variant font-label-caps text-[11px]">
        {data.map((d, i) => (
          <span key={i}>{d.label}</span>
        ))}
      </div>
    </div>
  )
}

export default SalesChart
