function ProductCardSkeleton() {
  return (
    <div className="flex animate-pulse flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="aspect-square bg-slate-200" />
      <div className="flex flex-col gap-3 p-4">
        <div className="h-3 w-16 rounded-full bg-slate-200" />
        <div className="h-4 w-full rounded bg-slate-200" />
        <div className="h-4 w-3/4 rounded bg-slate-200" />
        <div className="h-7 w-20 rounded bg-slate-200" />
        <div className="mt-2 h-10 w-full rounded-xl bg-slate-200" />
      </div>
    </div>
  )
}

export default ProductCardSkeleton
