function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Contacto</h1>
        <p className="mt-2 text-sm text-slate-500">
          ¿Tienes alguna pregunta? Estamos aquí para ayudarte
        </p>
      </div>
      <div className="mx-auto mt-8 max-w-lg">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <form className="grid gap-4">
            <input
              type="text"
              placeholder="Nombre"
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-700/20"
            />
            <input
              type="email"
              placeholder="Email"
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-700/20"
            />
            <textarea
              rows={4}
              placeholder="Mensaje"
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-700/20"
            />
            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Enviar mensaje
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ContactPage
