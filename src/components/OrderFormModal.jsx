import { useState, useEffect } from "react"
import { end_points } from "../services/api"
import { errorAlert } from "../helpers/alerts"

const emptyForm = {
  saledate: new Date().toISOString().split("T")[0],
  username: "",
  products: "",
  sale: "",
  offer: "0",
  paid: "true",
}

function OrderFormModal({ show, order, products, onSave, onClose }) {
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const isEdit = !!order?.id

  useEffect(() => {
    if (order?.id) {
      setForm({
        saledate: order.saledate ? order.saledate.split("T")[0] : new Date().toISOString().split("T")[0],
        username: order.username || "",
        products: Array.isArray(order.products) ? order.products.join(",") : "",
        sale: order.sale ?? "",
        offer: order.offer ?? "0",
        paid: order.paid != null ? String(order.paid) : "true",
      })
    } else {
      setForm(emptyForm)
    }
  }, [order, show])

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.username.trim() || !form.sale) return
    setSaving(true)
    const body = {
      saledate: form.saledate,
      username: form.username,
      products: form.products
        ? form.products.split(",").map((s) => s.trim()).filter(Boolean)
        : [],
      sale: Number(form.sale),
      offer: Number(form.offer),
      paid: form.paid === "true",
    }
    try {
      const res = isEdit
        ? await fetch(`${end_points.orders}/${order.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          })
        : await fetch(end_points.orders, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          })
      if (!res.ok) throw new Error()
      const saved = await res.json()
      onSave(saved, isEdit)
      onClose()
    } catch {
      errorAlert("Error", `No se pudo ${isEdit ? "actualizar" : "crear"} la orden`)
    } finally {
      setSaving(false)
    }
  }

  if (!show) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={onClose}>
      <div className="bg-surface-container-low border border-outline-variant w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="p-6 border-b border-outline-variant flex justify-between items-center">
          <h3 className="font-headline-md text-headline-md text-on-surface">
            {isEdit ? "Editar Orden" : "Nueva Orden"}
          </h3>
          <button onClick={onClose} className="text-on-surface-variant hover:text-on-surface">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-on-surface-variant mb-1">Usuario *</label>
              <input name="username" value={form.username} onChange={handleChange} required className="w-full bg-surface-container-highest border border-outline-variant text-on-surface px-3 py-2 text-sm focus:ring-1 focus:ring-primary-container outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-on-surface-variant mb-1">Fecha</label>
              <input name="saledate" type="date" value={form.saledate} onChange={handleChange} className="w-full bg-surface-container-highest border border-outline-variant text-on-surface px-3 py-2 text-sm focus:ring-1 focus:ring-primary-container outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-on-surface-variant mb-1">Pagado</label>
              <select name="paid" value={form.paid} onChange={handleChange} className="w-full bg-surface-container-highest border border-outline-variant text-on-surface px-3 py-2 text-sm focus:ring-1 focus:ring-primary-container outline-none">
                <option value="true">Sí</option>
                <option value="false">No</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-on-surface-variant mb-1">IDs de Productos (separados por coma)</label>
              <input name="products" value={form.products} onChange={handleChange} placeholder="ej: 1, 3, 7" className="w-full bg-surface-container-highest border border-outline-variant text-on-surface px-3 py-2 text-sm focus:ring-1 focus:ring-primary-container outline-none" />
              {products.length > 0 && (
                <div className="mt-1 flex flex-wrap gap-1">
                  {products.map((p) => (
                    <span key={p.id} className="text-[11px] bg-surface-container-highest px-2 py-0.5 text-on-surface-variant">
                      #{p.id} {p.nombre}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-on-surface-variant mb-1">Total Venta *</label>
              <input name="sale" type="number" step="0.01" min="0" value={form.sale} onChange={handleChange} required className="w-full bg-surface-container-highest border border-outline-variant text-on-surface px-3 py-2 text-sm focus:ring-1 focus:ring-primary-container outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-on-surface-variant mb-1">Descuento</label>
              <input name="offer" type="number" step="0.01" min="0" value={form.offer} onChange={handleChange} className="w-full bg-surface-container-highest border border-outline-variant text-on-surface px-3 py-2 text-sm focus:ring-1 focus:ring-primary-container outline-none" />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-outline-variant">
            <button type="button" onClick={onClose} className="px-4 py-2 border border-outline-variant text-on-surface font-label-caps text-label-caps hover:bg-surface-container-highest transition-colors">
              Cancelar
            </button>
            <button type="submit" disabled={saving} className="px-4 py-2 bg-primary-container text-on-primary-container font-bold font-label-caps text-label-caps flex items-center gap-2 active:scale-95 transition-transform disabled:opacity-50">
              {saving ? "Guardando..." : isEdit ? "Actualizar" : "Crear"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default OrderFormModal
