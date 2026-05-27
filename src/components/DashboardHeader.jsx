function DashboardHeader({ username }) {
  return (
    <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <h1 className="font-headline-lg text-3xl lg:text-4xl tracking-tighter text-on-surface">Dashboard</h1>
        <p className="text-on-surface-variant font-body-md">
          Bienvenido, {username || "admin"} — Resumen de operaciones en tiempo real.
        </p>
      </div>
      <div className="flex items-center gap-stack-md">
        <div className="hidden md:flex flex-col items-end">
          <span className="font-label-caps text-label-caps text-primary-container">Estado del Sistema</span>
          <span className="font-body-md text-on-surface flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary-container animate-pulse" />
            Operativo: Online
          </span>
        </div>
      </div>
    </header>
  )
}

export default DashboardHeader
