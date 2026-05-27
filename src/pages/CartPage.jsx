import { useState } from "react"
import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { end_points } from "../services/api"
import Swal from "sweetalert2"

function CartPage() {
  const { items, totalPrice, totalItems, dispatch } = useCart()
  const [checkingOut, setCheckingOut] = useState(false)

  async function handleCheckout() {
    setCheckingOut(true)
    const session = getSession()
    const body = {
      saledate: new Date().toISOString(),
      username: session?.username || "invitado",
      products: items.map((i) => i.id),
      sale: totalPrice,
      offer: 0,
      paid: true,
    }
    try {
      const res = await fetch(end_points.orders, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      if (!res.ok) throw new Error()
      dispatch({ type: "CLEAR" })
      Swal.fire({
        title: "¡Pedido Confirmado!",
        text: "Tu orden ha sido registrada exitosamente.",
        icon: "success",
        background: "#201f1f",
        color: "#e5e2e1",
        confirmButtonColor: "#00f0ff",
      })
    } catch {
      Swal.fire({
        title: "Error",
        text: "No se pudo procesar tu orden. Intenta de nuevo.",
        icon: "error",
        background: "#201f1f",
        color: "#e5e2e1",
        confirmButtonColor: "#00f0ff",
      })
    } finally {
      setCheckingOut(false)
    }
  }

  if (items.length === 0) {
    return (
      <main className="flex flex-col items-center justify-center px-margin-mobile md:px-margin-desktop">
        <div className="w-full max-w-4xl glass-panel p-stack-lg md:p-12 rounded-xl flex flex-col items-center text-center">
          <div className="mb-stack-lg relative">
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150" />
            <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full border border-primary/20 flex items-center justify-center bg-surface-container-lowest/50">
              <span className="material-symbols-outlined text-[64px] md:text-[80px] text-primary-fixed-dim" style={{ fontVariationSettings: "'wght' 200" }}>
                shopping_bag
              </span>
            </div>
          </div>
          <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg mb-stack-md text-primary tracking-tight">
            Tu Carrito de Ahorro
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mb-stack-lg leading-relaxed">
            Es el momento de Explorar y equiparte con la ropa que siempre quisiste <span className="text-primary-fixed-dim font-bold">Velvora Edition</span>.
          </p>
          <Link
            to="/productos"
            className="btn-volt inline-flex items-center gap-stack-sm px-10 py-4 rounded-full font-label-caps text-label-caps uppercase tracking-widest group"
          >
            Ver Catálogo
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </Link>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-gutter w-full opacity-60">
            <div className="p-stack-md border-t border-outline-variant/30">
              <span className="material-symbols-outlined text-primary mb-2">speed</span>
              <p className="font-label-caps text-label-caps text-on-surface">Envío Express</p>
            </div>
            <div className="p-stack-md border-t border-outline-variant/30">
              <span className="material-symbols-outlined text-primary mb-2">security</span>
              <p className="font-label-caps text-label-caps text-on-surface">Pago Seguro</p>
            </div>
            <div className="p-stack-md border-t border-outline-variant/30">
              <span className="material-symbols-outlined text-primary mb-2">workspace_premium</span>
              <p className="font-label-caps text-label-caps text-on-surface">Calidad Elite</p>
            </div>
          </div>
        </div>
        <div className="mt-stack-lg flex gap-stack-lg opacity-40">
          <span className="font-label-caps text-[10px] tracking-widest text-on-surface-variant">VELVORA AG-24</span>
          <span className="font-label-caps text-[10px] tracking-widest text-on-surface-variant">CORE REPOSITORY</span>
          <span className="font-label-caps text-[10px] tracking-widest text-on-surface-variant">V.4.0.2</span>
        </div>
      </main>
    )
  }

  return (
    <main className="flex flex-col items-center px-margin-mobile md:px-margin-desktop">
      <div className="w-full max-w-4xl space-y-stack-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary tracking-tight">
              Tu Carrito
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant mt-1">
              {totalItems} {totalItems === 1 ? "producto" : "productos"} en tu carrito
            </p>
          </div>
          <Link
            to="/productos"
            className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Seguir comprando
          </Link>
        </div>

        <div className="grid gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="glass-panel rounded-xl p-4 flex items-center gap-4"
            >
              <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-surface-container-highest/50 border border-outline-variant/30">
                {item.imagen ? (
                  <img src={item.imagen} alt={item.nombre} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <span className="material-symbols-outlined text-on-surface-variant">inventory_2</span>
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-body-md text-body-md text-on-surface truncate">{item.nombre}</p>
                <p className="font-label-caps text-label-caps text-on-surface-variant mt-0.5">{item.categoria}</p>
                <p className="font-headline-md text-headline-md text-primary mt-1">
                  ${(item.precio * item.quantity).toFixed(2)}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center rounded-lg border border-outline-variant/50 bg-surface-container-lowest/50">
                  <button
                    type="button"
                    onClick={() =>
                      dispatch({
                        type: "UPDATE_QUANTITY",
                        id: item.id,
                        quantity: item.quantity - 1,
                      })
                    }
                    disabled={item.quantity <= 1}
                    className="flex h-8 w-8 items-center justify-center text-sm text-on-surface-variant hover:text-primary transition-colors disabled:opacity-40"
                    aria-label="Reducir cantidad"
                  >
                    <span className="material-symbols-outlined text-sm">remove</span>
                  </button>
                  <span className="flex h-8 w-8 items-center justify-center text-sm font-medium text-on-surface">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      dispatch({
                        type: "UPDATE_QUANTITY",
                        id: item.id,
                        quantity: item.quantity + 1,
                      })
                    }
                    className="flex h-8 w-8 items-center justify-center text-sm text-on-surface-variant hover:text-primary transition-colors"
                    aria-label="Aumentar cantidad"
                  >
                    <span className="material-symbols-outlined text-sm">add</span>
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => dispatch({ type: "REMOVE_ITEM", id: item.id })}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-on-surface-variant hover:text-error transition-colors"
                  aria-label={`Eliminar ${item.nombre}`}
                >
                  <span className="material-symbols-outlined text-sm">delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="glass-panel rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="font-body-lg text-body-lg text-on-surface-variant">Total</p>
            <p className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary">
              ${totalPrice.toFixed(2)}
            </p>
          </div>
          <button
            onClick={handleCheckout}
            disabled={checkingOut}
            className="btn-volt w-full py-4 rounded-full font-label-caps text-label-caps uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            {checkingOut ? (
              "PROCESANDO..."
            ) : (
              <>
                CONFIRMAR PEDIDO
                <span className="material-symbols-outlined ml-2 group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </>
            )}
          </button>
        </div>
      </div>
    </main>
  )
}

function getSession() {
  try {
    const raw = localStorage.getItem("session")
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export default CartPage
