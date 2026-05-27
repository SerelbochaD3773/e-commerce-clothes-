import { Link } from "react-router-dom"

function StoreFooter() {
  return (
    <footer className="w-full py-8 px-margin-desktop mt-auto border-t border-outline-variant/10">
      <div className="max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-center gap-stack-md">
        <div className="flex items-center gap-stack-sm opacity-50">
          <span className="font-label-caps text-label-caps">© 2026 Velvora Technical Gear</span>
        </div>
        <div className="flex gap-gutter">
          <span className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors cursor-default">
            Términos de Servicio
          </span>
          <span className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors cursor-default">
            Política de Privacidad
          </span>
          <span className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors cursor-default">
            Garantía Elite
          </span>
        </div>
      </div>
    </footer>
  )
}

export default StoreFooter
