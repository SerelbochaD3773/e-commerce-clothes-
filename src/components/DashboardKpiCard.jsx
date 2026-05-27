function DashboardKpiCard({ label, value, icon: Icon, trend, trendLabel, loading }) {
  return (
    <div className="bg-surface-container p-6 border border-outline-variant relative overflow-hidden group hover:border-primary-container transition-colors">
      <div className="relative z-10 flex flex-col h-full justify-between">
        <div>
          <p className="font-label-caps text-label-caps text-on-surface-variant mb-2">{label}</p>
          {loading ? (
            <div className="h-9 w-24 animate-pulse bg-surface-container-highest" />
          ) : (
            <h3 className="font-stat-display text-3xl lg:text-4xl text-on-surface">{value}</h3>
          )}
        </div>
        {(trend || trendLabel) && (
          <div className="mt-4 flex items-center gap-2 text-primary-container">
            {Icon && <Icon className="text-[18px]" />}
            {trendLabel && <span className="font-label-caps text-label-caps">{trendLabel}</span>}
          </div>
        )}
      </div>
    </div>
  )
}

export default DashboardKpiCard
