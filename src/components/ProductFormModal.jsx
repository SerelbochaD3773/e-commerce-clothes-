import { useState, useEffect } from "react"
import { end_points } from "../services/api"
import { errorAlert } from "../helpers/alerts"

const categoriaOptions = ["Busos", "Tenis", "Camisetas", "Pantalones", "Shorts", "bluejeans", "Gorras", "camisas", "chaquetas", "Blusas"]
const genderOptions = ["unisex", "hombre", "mujer"]
const tallaOptions = ["S", "M", "L", "XL"]
const ajusteOptions = ["regular", "slim", "holgado"]

const colorOptions = ["gris", "blanco", "negro", "azul", "rojo", "cafe", "verde"]
const colorHexMap = {
  gris: "#6B7280",
  blanco: "#FFFFFF",
  negro: "#1F2937",
  azul: "#2563EB",
  rojo: "#DC2626",
  cafe: "#8B4513",
  verde: "#16A34A",
}

const emptyForm = {
  nombre: "",
  precio: "",
  categoria: "Busos",
  stock: "",
  imagen: "",
  sku: "",
  gender: "unisex",
  talla: "M",
  color: [],
  ajuste: "regular",
}

function ProductFormModal({ show, product, onSave, onClose }) {
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const isEdit = !!product

  useEffect(() => {
    if (product) {
      setForm({
        nombre: product.nombre || "",
        precio: product.precio ?? "",
        categoria: product.categoria || "Busos",
        stock: product.stock ?? "",
        imagen: product.imagen || "",
        sku: product.sku || "",
        gender: product.gender || "unisex",
        talla: product.talla || "M",
        color: Array.isArray(product.color) ? [...product.color] : [],
        ajuste: product.ajuste || "regular",
      })
    } else {
      setForm(emptyForm)
    }
  }, [product, show])

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function toggleColor(color) {
    setForm((prev) => ({
      ...prev,
      color: prev.color.includes(color)
        ? prev.color.filter((c) => c !== color)
        : [...prev.color, color],
    }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.nombre.trim() || !form.precio || !form.stock) return
    setSaving(true)
    const body = {
      ...form,
      precio: Number(form.precio),
      stock: Number(form.stock),
    }
    try {
      const res = product
        ? await fetch(`${end_points.products}/${product.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          })
        : await fetch(end_points.products, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          })
      if (!res.ok) throw new Error()
      const saved = await res.json()
      onSave(saved, !!product)
      onClose()
    } catch {
      errorAlert("Error", `No se pudo ${isEdit ? "actualizar" : "crear"} el producto`)
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
            {isEdit ? "Editar Producto" : "Crear Producto"}
          </h3>
          <button onClick={onClose} className="text-on-surface-variant hover:text-on-surface">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-on-surface-variant mb-1">Nombre *</label>
              <input name="nombre" value={form.nombre} onChange={handleChange} required className="w-full bg-surface-container-highest border border-outline-variant text-on-surface px-3 py-2 text-sm focus:ring-1 focus:ring-primary-container outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-on-surface-variant mb-1">Precio *</label>
              <input name="precio" type="number" step="0.01" min="0" value={form.precio} onChange={handleChange} required className="w-full bg-surface-container-highest border border-outline-variant text-on-surface px-3 py-2 text-sm focus:ring-1 focus:ring-primary-container outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-on-surface-variant mb-1">Stock *</label>
              <input name="stock" type="number" min="0" value={form.stock} onChange={handleChange} required className="w-full bg-surface-container-highest border border-outline-variant text-on-surface px-3 py-2 text-sm focus:ring-1 focus:ring-primary-container outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-on-surface-variant mb-1">Categoría</label>
              <select name="categoria" value={form.categoria} onChange={handleChange} className="w-full bg-surface-container-highest border border-outline-variant text-on-surface px-3 py-2 text-sm focus:ring-1 focus:ring-primary-container outline-none">
                {categoriaOptions.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-on-surface-variant mb-1">SKU</label>
              <input name="sku" value={form.sku} onChange={handleChange} className="w-full bg-surface-container-highest border border-outline-variant text-on-surface px-3 py-2 text-sm focus:ring-1 focus:ring-primary-container outline-none" />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-on-surface-variant mb-1">URL Imagen</label>
              <input name="imagen" value={form.imagen} onChange={handleChange} className="w-full bg-surface-container-highest border border-outline-variant text-on-surface px-3 py-2 text-sm focus:ring-1 focus:ring-primary-container outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-on-surface-variant mb-1">Género</label>
              <select name="gender" value={form.gender} onChange={handleChange} className="w-full bg-surface-container-highest border border-outline-variant text-on-surface px-3 py-2 text-sm focus:ring-1 focus:ring-primary-container outline-none">
                {genderOptions.map((g) => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-on-surface-variant mb-1">Talla</label>
              <select name="talla" value={form.talla} onChange={handleChange} className="w-full bg-surface-container-highest border border-outline-variant text-on-surface px-3 py-2 text-sm focus:ring-1 focus:ring-primary-container outline-none">
                {tallaOptions.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-on-surface-variant mb-2">Colores</label>
              <div className="flex flex-wrap gap-2">
                {colorOptions.map((c) => {
                  const selected = form.color.includes(c)
                  return (
                    <button
                      key={c}
                      type="button"
                      onClick={() => toggleColor(c)}
                      className={`flex items-center gap-1.5 px-2.5 py-1.5 border text-xs font-medium transition-colors ${
                        selected
                          ? "border-primary-container bg-primary-container/20 text-primary-container"
                          : "border-outline-variant text-on-surface-variant hover:border-primary-container"
                      }`}
                    >
                      <span
                        className="inline-block h-4 w-4 rounded-full border border-outline-variant"
                        style={{ backgroundColor: colorHexMap[c] }}
                      />
                      {c}
                    </button>
                  )
                })}
              </div>
              <input type="hidden" name="color" value={form.color.join(",")} />
            </div>
            <div>
              <label className="block text-sm font-medium text-on-surface-variant mb-1">Ajuste</label>
              <select name="ajuste" value={form.ajuste} onChange={handleChange} className="w-full bg-surface-container-highest border border-outline-variant text-on-surface px-3 py-2 text-sm focus:ring-1 focus:ring-primary-container outline-none">
                {ajusteOptions.map((a) => <option key={a} value={a}>{a}</option>)}
              </select>
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

export default ProductFormModal
