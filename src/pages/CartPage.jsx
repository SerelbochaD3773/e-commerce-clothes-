import { Link } from "react-router-dom"
import { Trash2, ShoppingBag, ArrowLeft } from "lucide-react"
import { useCart } from "../context/CartContext"

function CartPage() {
  const { items, totalPrice, totalItems, dispatch } = useCart()

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Carrito de compras
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {totalItems} {totalItems === 1 ? "producto" : "productos"} en tu carrito
          </p>
        </div>
        <Link
          to="/productos"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Seguir comprando
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white py-16">
          <ShoppingBag className="mb-4 h-12 w-12 text-slate-300" />
          <p className="text-sm font-medium text-slate-500">Tu carrito está vacío</p>
          <Link
            to="/productos"
            className="mt-4 inline-flex items-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Ver productos
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
                {item.imagen ? (
                  <img src={item.imagen} alt={item.nombre} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-slate-300">
                    <ShoppingBag className="h-6 w-6" />
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-slate-900 truncate">{item.nombre}</p>
                <p className="text-xs text-slate-400">{item.categoria}</p>
                <p className="mt-0.5 text-sm font-semibold text-slate-900">
                  ${(item.precio * item.quantity).toFixed(2)}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center rounded-lg border border-slate-200">
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
                    className="flex h-8 w-8 cursor-pointer items-center justify-center text-sm text-slate-600 hover:bg-slate-50 disabled:opacity-40"
                    aria-label="Reducir cantidad"
                  >
                    -
                  </button>
                  <span className="flex h-8 w-8 items-center justify-center text-sm font-medium text-slate-900">
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
                    className="flex h-8 w-8 cursor-pointer items-center justify-center text-sm text-slate-600 hover:bg-slate-50"
                    aria-label="Aumentar cantidad"
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => dispatch({ type: "REMOVE_ITEM", id: item.id })}
                  className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500"
                  aria-label={`Eliminar ${item.nombre}`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">Total</p>
              <p className="text-xl font-bold text-slate-900">${totalPrice.toFixed(2)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CartPage
