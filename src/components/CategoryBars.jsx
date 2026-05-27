function CategoryBars({ categories = [], loading }) {
  return (
    <div className="lg:col-span-4 bg-surface-container-low border border-outline-variant p-6">
      <h4 className="font-headline-md text-headline-md text-on-surface mb-6">Categorías Top</h4>

      {loading ? (
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 w-20 animate-pulse bg-surface-container-highest" />
              <div className="h-2 w-full animate-pulse bg-surface-container-highest" />
            </div>
          ))}
        </div>
      ) : categories.length === 0 ? (
        <p className="text-on-surface-variant font-body-md text-sm">No hay datos de categorías</p>
      ) : (
        <div className="space-y-6">
          {categories.map((cat) => (
            <div key={cat.name} className="space-y-2">
              <div className="flex justify-between font-label-caps text-label-caps">
                <span className="text-on-surface">{cat.name}</span>
                <span className="text-on-surface-variant">{cat.percentage}%</span>
              </div>
              <div className="h-2 bg-surface-container-highest w-full overflow-hidden">
                <div className="h-full bg-primary-container transition-all duration-500" style={{ width: `${cat.percentage}%` }} />
              </div>
            </div>
          ))}
        </div>
      )}

      <button className="mt-8 w-full border border-outline text-on-surface py-3 font-label-caps text-label-caps hover:bg-surface-container transition-colors uppercase">
        Ver Reporte Detallado
      </button>
    </div>
  )
}

export default CategoryBars
