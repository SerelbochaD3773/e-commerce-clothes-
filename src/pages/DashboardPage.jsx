import { useState, useEffect, useMemo } from "react"
import { end_points } from "../services/api"
import { getLocalStorage } from "../helpers/local-storage"
import { questionAlert, successAlert, errorAlert } from "../helpers/alerts"
import DashboardHeader from "../components/DashboardHeader"
import DashboardKpiCard from "../components/DashboardKpiCard"
import SalesChart from "../components/SalesChart"
import CategoryBars from "../components/CategoryBars"
import ProductTable from "../components/ProductTable"
import ProductFormModal from "../components/ProductFormModal"
import OrderTable from "../components/OrderTable"
import OrderFormModal from "../components/OrderFormModal"

function DashboardPage() {
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const session = getLocalStorage("session")

  useEffect(() => {
    Promise.all([
      fetch(end_points.products).then((r) => r.json()),
      fetch(end_points.orders).then((r) => r.json()),
    ])
      .then(([productsData, ordersData]) => {
        setProducts(Array.isArray(productsData) ? productsData : [])
        setOrders(Array.isArray(ordersData) ? ordersData : [])
      })
      .catch(() => {
        setProducts([])
        setOrders([])
      })
      .finally(() => setLoading(false))
  }, [])

  const totalProducts = products.length
  const lowStock = products.filter((p) => p.stock > 0 && p.stock <= 10).length
  const outOfStock = products.filter((p) => p.stock === 0).length
  const totalSales = orders.reduce((s, o) => s + ((o.sale || 0) - (o.offer || 0)), 0)
  const onlineVisitors = 432
  const pendingOrders = orders.filter((o) => !o.paid).length

  const categoryMap = useMemo(() => {
    const map = {}
    products.forEach((p) => {
      const cat = p.categoria || "Sin categoría"
      map[cat] = (map[cat] || 0) + 1
    })
    const total = Object.values(map).reduce((s, v) => s + v, 0)
    return Object.entries(map)
      .map(([name, count]) => ({ name, percentage: Math.round((count / total) * 100) }))
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 3)
  }, [products])

  const salesChartData = useMemo(() => {
    const months = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"]
    const now = new Date()
    const monthly = Array.from({ length: 12 }, (_, i) => {
      const m = (now.getMonth() - 11 + i + 12) % 12
      return {
        label: months[m],
        value: 0,
        month: m,
        year: now.getFullYear() - (m > now.getMonth() ? 1 : 0),
      }
    })
    orders.forEach((o) => {
      if (!o.saledate) return
      const d = new Date(o.saledate)
      const idx = monthly.findIndex((m) => m.month === d.getMonth() && m.year === d.getFullYear())
      if (idx !== -1) monthly[idx].value += (o.sale || 0) - (o.offer || 0)
    })
    return monthly
  }, [orders])

  const [productModal, setProductModal] = useState({ show: false, product: null })
  const [orderModal, setOrderModal] = useState({ show: false, order: null })

  function openCreateProduct() {
    setProductModal({ show: true, product: null })
  }

  function openEditProduct(product) {
    setProductModal({ show: true, product })
  }

  function closeProductModal() {
    setProductModal({ show: false, product: null })
  }

  function handleSaveProduct(saved, isEdit) {
    if (isEdit) {
      setProducts((prev) => prev.map((p) => (p.id === saved.id ? saved : p)))
      successAlert("Actualizado", "Producto actualizado correctamente")
    } else {
      setProducts((prev) => [...prev, saved])
      successAlert("Creado", "Producto creado correctamente")
    }
  }

  async function handleDeleteProduct(product) {
    const confirmed = await questionAlert(
      "Eliminar producto",
      `¿Eliminar "${product.nombre}" del catálogo?`
    )
    if (!confirmed) return
    try {
      const res = await fetch(`${end_points.products}/${product.id}`, { method: "DELETE" })
      if (!res.ok) throw new Error()
      successAlert("Eliminado", "Producto eliminado correctamente")
      setProducts((prev) => prev.filter((p) => p.id !== product.id))
    } catch {
      errorAlert("Error", "No se pudo eliminar el producto")
    }
  }

  function openCreateOrder() {
    setOrderModal({ show: true, order: null })
  }

  function openEditOrder(order) {
    setOrderModal({ show: true, order })
  }

  function closeOrderModal() {
    setOrderModal({ show: false, order: null })
  }

  function handleSaveOrder(saved, isEdit) {
    if (isEdit) {
      setOrders((prev) => prev.map((o) => (o.id === saved.id ? saved : o)))
      successAlert("Actualizada", "Orden actualizada correctamente")
    } else {
      setOrders((prev) => [...prev, saved])
      successAlert("Creada", "Orden creada correctamente")
    }
  }

  async function handleDeleteOrder(order) {
    const confirmed = await questionAlert(
      "Eliminar orden",
      `¿Eliminar la orden #${order.id} de "${order.username}"?`
    )
    if (!confirmed) return
    try {
      const res = await fetch(`${end_points.orders}/${order.id}`, { method: "DELETE" })
      if (!res.ok) throw new Error()
      successAlert("Eliminada", "Orden eliminada correctamente")
      setOrders((prev) => prev.filter((o) => o.id !== order.id))
    } catch {
      errorAlert("Error", "No se pudo eliminar la orden")
    }
  }

  return (
    <div className="space-y-stack-lg">
      <DashboardHeader username={session?.username} />

      <section className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        <DashboardKpiCard
          label="VENTAS TOTALES"
          value={`$${totalSales.toLocaleString("es-MX", { minimumFractionDigits: 2 })}`}
          icon={() => (
            <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
              <polyline points="17 6 23 6 23 12" />
            </svg>
          )}
          trendLabel="Basado en órdenes reales"
          loading={loading}
        />
        <DashboardKpiCard
          label="PEDIDOS NUEVOS"
          value={loading ? "" : orders.length.toLocaleString()}
          icon={() => <span className="material-symbols-outlined text-[18px]">shopping_cart</span>}
          trendLabel={`${pendingOrders} En Proceso`}
          loading={loading}
        />
        <DashboardKpiCard
          label="VISITANTES ONLINE"
          value={onlineVisitors.toLocaleString()}
          icon={() => <span className="material-symbols-outlined text-[18px]">groups</span>}
          trendLabel={`Pico: ${(onlineVisitors * 2).toFixed(0)} (Hoy)`}
          loading={loading}
        />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        <SalesChart data={salesChartData} loading={loading} />
        <CategoryBars categories={categoryMap} loading={loading} />
      </section>

      <ProductTable
        products={products}
        loading={loading}
        onCreate={openCreateProduct}
        onEdit={openEditProduct}
        onDelete={handleDeleteProduct}
      />

      <OrderTable
        orders={orders}
        products={products}
        loading={loading}
        onCreate={openCreateOrder}
        onEdit={openEditOrder}
        onDelete={handleDeleteOrder}
      />

      <ProductFormModal
        show={productModal.show}
        product={productModal.product}
        onSave={handleSaveProduct}
        onClose={closeProductModal}
      />

      <OrderFormModal
        show={orderModal.show}
        order={orderModal.order}
        products={products}
        onSave={handleSaveOrder}
        onClose={closeOrderModal}
      />
    </div>
  )
}

export default DashboardPage
