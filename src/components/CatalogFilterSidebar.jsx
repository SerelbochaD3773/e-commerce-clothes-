function CatalogFilterSidebar({ filters, onChange, onReset, categories, sizes, colors, fits }) {
  function toggleCategory(cat) {
    const next = filters.categories.includes(cat)
      ? filters.categories.filter((c) => c !== cat)
      : [...filters.categories, cat]
    onChange({ ...filters, categories: next })
  }

  function setSize(s) {
    onChange({ ...filters, size: filters.size === s ? null : s })
  }

  function setColor(c) {
    onChange({ ...filters, color: filters.color === c ? null : c })
  }

  function setFit(f) {
    onChange({ ...filters, fit: filters.fit === f ? null : f })
  }

  function setPrice(e) {
    onChange({ ...filters, price: Number(e.target.value) })
  }

  return (
    <aside className="hidden lg:flex flex-col w-72 fixed left-0 top-20 bottom-0 bg-background border-r border-outline-variant overflow-y-auto px-margin-desktop py-stack-lg">
      <div className="flex flex-col gap-10">
        <h2 className="font-headline-md text-headline-md text-on-surface">Filtros</h2>

        <div>
          <h3 className="font-label-caps text-label-caps text-primary-container mb-4 uppercase">Categoría</h3>
          <div className="space-y-3">
            {categories.map((cat) => (
              <label key={cat} className="flex items-center group cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(cat)}
                  onChange={() => toggleCategory(cat)}
                  className="w-4 h-4 bg-surface-container border-outline-variant rounded focus:ring-primary-container text-primary-container transition-all"
                />
                <span className="ml-3 text-on-surface-variant group-hover:text-on-surface transition-colors">{cat}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-label-caps text-label-caps text-primary-container mb-4 uppercase">Talla</h3>
          <div className="grid grid-cols-3 gap-2">
            {sizes.map((s) => {
              const active = filters.size === s
              return (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`px-2 py-2 font-label-caps text-label-caps transition-all ${
                    active
                      ? "border border-primary-container bg-primary-container text-background"
                      : "border border-outline-variant hover:border-primary-container"
                  }`}
                >
                  {s}
                </button>
              )
            })}
          </div>
        </div>

        <div>
          <h3 className="font-label-caps text-label-caps text-primary-container mb-4 uppercase">Color</h3>
          <div className="flex flex-wrap gap-3">
            {colors.map((c) => {
              const active = filters.color === c.label
              return (
                <button
                  key={c.label}
                  onClick={() => setColor(c.label)}
                  className={`w-6 h-6 rounded-full ${c.class} border border-outline outline outline-offset-2 transition-all ${
                    active ? "outline-primary-container" : "outline-transparent hover:outline-primary-container"
                  }`}
                  title={c.label}
                />
              )
            })}
          </div>
        </div>

        <div>
          <h3 className="font-label-caps text-label-caps text-primary-container mb-4 uppercase">Ajuste</h3>
          <div className="space-y-3">
            {fits.map((f) => (
              <label key={f} className="flex items-center group cursor-pointer">
                <input
                  type="radio"
                  name="fit"
                  checked={filters.fit === f}
                  onChange={() => setFit(f)}
                  className="w-4 h-4 bg-surface-container border-outline-variant focus:ring-primary-container text-primary-container transition-all"
                />
                <span className="ml-3 text-on-surface-variant group-hover:text-on-surface transition-colors">{f}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-label-caps text-label-caps text-primary-container mb-4 uppercase">Precio Máximo</h3>
          <input
            type="range"
            min="0"
            max="300000"
            step="10000"
            value={filters.price}
            onChange={setPrice}
            className="w-full h-1 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-primary-container"
          />
          <div className="flex justify-between mt-2 font-label-caps text-label-caps text-on-secondary-container">
            <span>$0</span>
            <span>${Number(filters.price).toLocaleString('es-CO')}</span>
          </div>
        </div>

        <button
          onClick={onReset}
          className="mt-4 w-full py-4 bg-surface-container-highest text-on-surface font-label-caps text-label-caps hover:bg-outline-variant transition-all uppercase tracking-widest"
        >
          Reiniciar Filtros
        </button>
      </div>
    </aside>
  )
}

export default CatalogFilterSidebar
