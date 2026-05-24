function MainPage() {
  return (
    <div>
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8 lg:py-32">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            ESTILO URBANO
            <span className="block text-blue-400">REDEFINIDO</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
            Descubre nuestra colección exclusiva de ropa urbana minimalista
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <a
              href="/productos"
              className="inline-flex items-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-700"
            >
              Explorar colección
            </a>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              { title: "DISEÑO ÚNICO", desc: "Piezas exclusivas con estética urbana y minimalista" },
              { title: "CALIDAD PREMIUM", desc: "Materiales de alta calidad para máxima durabilidad" },
              { title: "ENVÍO RÁPIDO", desc: "Entrega express en 24-48 horas" },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-xl bg-slate-100">
                  <div className="h-6 w-6 rounded bg-blue-600" />
                </div>
                <h3 className="text-sm font-bold tracking-tight text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default MainPage
