import { Link } from "react-router-dom"
import ParticleCanvas from "../components/ParticleCanvas"

function MainPage() {
  return (
    <div className="deep-space-gradient text-on-surface font-body-md overflow-x-hidden relative">
      <ParticleCanvas count={100} />

      {/* Hero Section */}
      <section className="relative h-[90vh] w-full overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover float-anim"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjXcXJsTfUJEtvcN8YLbdYuyxOalcrOC_ku9uoDEBYNvAXDkQADrNeSxRZSxulUz7w-a71_aBCn2J7afHwuk_DOyVmkQzSYfPDkXGCYavd7jccSPiSJ2HKgp1K9BkDf7HO_VSXlhlXkvDXkFXr_gDy0gUuT9KClWUBO4VJ3c-2T9KsMIBzAEtmNbHXtWSBpCtasiOrL9YOCjtb67Lk4zieIfEa28i_CR7C_iq2fJtSA37I3citGV2ZryP-5tClhwPp16mNrZuH9ns"
            alt="Hero"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
        </div>
        <div className="relative z-10 px-margin-mobile md:px-margin-desktop w-full max-w-container-max mx-auto">
          <div className="max-w-2xl space-y-stack-md">
            <p className="font-label-caps text-label-caps text-primary-container tracking-[0.3em] uppercase opacity-80">
              Temporada 2024
            </p>
            <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg leading-tight text-white uppercase italic">
              Elite <br /> <span className="text-gradient-volt not-italic font-black">Performance</span>
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg">
              Diseño quirúrgico para la vanguardia urbana. La sofisticación del negro absoluto se encuentra con la energía del pulso digital.
            </p>
            <div className="flex flex-wrap gap-stack-md pt-4">
              <Link
                to="/productos"
                className="glass-btn bg-primary-container/80 text-on-primary px-8 py-4 font-label-caps text-label-caps uppercase font-bold tracking-widest hover:scale-105 glow-hover"
              >
                Explorar Catálogo
              </Link>
              <button className="glass-btn border-white/20 text-white px-8 py-4 font-label-caps text-label-caps uppercase tracking-widest hover:border-primary-container hover:text-primary-container">
                Nueva Colección
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collections Bento Grid */}
      <section className="py-24 px-margin-mobile md:px-margin-desktop w-full max-w-container-max mx-auto relative z-10">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="font-headline-md text-headline-md uppercase tracking-tight">Featured Collections</h2>
            <div className="h-1 w-12 bg-primary-container mt-2 shadow-[0_0_8px_rgba(0,240,255,0.6)]" />
          </div>
          <Link to="/productos" className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary-container transition-all hover:scale-110 uppercase">
            Ver todo
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-[800px] md:h-[600px]">
          <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden cursor-pointer border border-white/10 glass-btn rounded-sm">
            <img
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDah0U6K3zU1UIVMiQHrMismlb2mF41o3vO42ooxmB1EinEfTPnreyMu-1KaGaoyvZzon9hX7OzOnUgH7WJrXZcnveaQNE09ZvHhkY8JWCrLV5H9yWPQTErNRMpzoHK3GJ9lPsWL0X22BfMicougxV5jedJWVoG2Idt2S4kFjfrq1EQawYWaP2x_3d6m0LwGrv3KdTOGqfwtMU-hhemsWo6PXNMZ_E8YMvq9Xz2-c92sdA1JIaxelJJELOYLnK9upk-A9ILXwHeRoU"
              alt="Tech-Tailoring"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500" />
            <div className="absolute bottom-0 left-0 p-stack-md transition-transform group-hover:translate-x-2">
              <p className="font-label-caps text-label-caps text-primary-container mb-1">COLECCIÓN ALPHA</p>
              <h3 className="font-headline-md text-headline-md uppercase">Tech-Tailoring</h3>
            </div>
          </div>
          <div className="md:col-span-2 relative group overflow-hidden cursor-pointer border border-white/10 glass-btn rounded-sm">
            <img
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBk3w5Y0eefkZRMTh1SnGJBydnuW_MuSBMNy_NPLoJrFgugssKzhVeGoOmQnJXbms5PE8iJeJGY4FoQAPt4gNCagPPdDRK6g6GTv02xAde1q3f8BLUFXMvZKPy1-hDzXdoxZ0qVNYRH2Xb363bRcmsw2hmy6YIB0usszvxavQjvfd9Y5TbwGcbiKwVd56OFECT8dFgM9c4A-b1wI7MnsOrY5fmT6SpYAPinuyNcPYhltq3m1TZS3ZBYwZi5XUoERzevOAxIQ2_GqRU"
              alt="Footwear Core"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500" />
            <div className="absolute bottom-0 left-0 p-stack-md transition-transform group-hover:translate-x-2">
              <p className="font-label-caps text-label-caps text-primary-container mb-1">ACCESORIOS</p>
              <h3 className="font-headline-md text-headline-md uppercase">Footwear Core</h3>
            </div>
          </div>
          <div className="md:col-span-1 relative group overflow-hidden cursor-pointer border border-white/10 glass-btn rounded-sm">
            <img
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZH3qBRnRFsSQzFoz5v_yYCN9XcUFHmn4qkgK0gli-yZGx8oqV4BHPlaKeZ62swFa2xgWI76Psqe4VYEgXvqyt-b-XoZqtSpZA0KHXmWKMvZAF9hvGjt16a1-i5Z0nu-GzbW782jT3wwfrYhr3Eh1u-bcIPX-XjOO9pF6cxfS3jVfsjM3AJRYvFBocw6I7i8o-NwsOXkVv0BW6tmxOges5s2Zjf40oY-u6XrowtUzYlHa9kvEimpM1v5ZPC_FwjQ_3QJDvzMJtjcU"
              alt="Carry Systems"
            />
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-all duration-500" />
            <div className="absolute bottom-0 left-0 p-stack-md transition-transform group-hover:translate-x-1">
              <h3 className="font-body-md font-bold uppercase">Carry Systems</h3>
            </div>
          </div>
          <div className="md:col-span-1 relative group overflow-hidden cursor-pointer border border-white/10 glass-btn rounded-sm">
            <img
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBx9XaEar5PyHwegCN3eUswaP3KtxojAy-evFdir57PH5cOXhs0As_cguueHNEasVXLLIG7q5d1EugtBJZPWxoLbCvOL-ohV1BPZz5ux7h4NUOnZUJ-oEUMWBdM0u57fzlUPL6tXNpWsWRAwFEe86Y1IlqV4_084bkM2rzRYkHsDM54Xh2BDZHj2SJC-4J2pnx1SqFVBCjO8mfDpuJbla7r-oEepftTIPgkJUAxioGx8dezK79TT8Wi_fnhhQxu1c_HerCmeEdxhKg"
              alt="Archive Series"
            />
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-all duration-500" />
            <div className="absolute bottom-0 left-0 p-stack-md transition-transform group-hover:translate-x-1">
              <h3 className="font-body-md font-bold uppercase">Archive Series</h3>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="bg-surface-container/30 backdrop-blur-md py-24 relative overflow-hidden z-10">
        <div className="px-margin-mobile md:px-margin-desktop w-full max-w-container-max mx-auto overflow-hidden relative z-10">
          <div className="flex justify-between items-center mb-12">
            <h2 className="font-headline-md text-headline-md uppercase italic">
              <span className="text-primary-container not-italic">New</span> Arrivals
            </h2>
          </div>
          <div className="flex gap-gutter overflow-x-auto pb-8 snap-x no-scrollbar">
            {[
              { name: "V-1 Sentinel Shell", category: "Outerwear / Tech", price: "$450.00", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDtY6a40JhYTABjDQfahXj1j_-I7U2kpMarjxT1DBkJ01NEgeDX7jO0j-rnipxflsBxjUutHKjD_1riSvVVlzLOpCWVPDfQSfeSloJzdyztx7YOdEcvlAYnh4791f4ZTJbC5zHNuc9pI3B8rdoVjHVInT8KvemJxpH1nRKw5QWkd8W4dSCLwcLSBF64OzxsFmfAKKdRnwX46Xc4RSZ7GclSAgbcjKVLJ-zQ5qVnRemWcMT_ChPR8kIGgNpJS8H3ab6jjDSFgQlXVrM" },
              { name: "Apex Cargo Pant", category: "Bottoms / Mobility", price: "$290.00", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDuyjwRFgeH6SyXBklCRdbVaYeyHLzB5IJ7cgP3fkSCtVA8n9RlG0Z4ofgFLhQfGZwYBmEVOtIS3ypIgBLL_NKqYI720JnrI0IbUFRVpqxI-NC8XQj-k_dPmN58T7mm46h8zK1nV_OExV4UXPTIwA7z8jjE3wzUphklyFj9cfrCIzr3XIBEJmlNh2e_CQ-zkELxXC2r-8OC0t2P4j9i_FeG5nvdkNMYEnaIx7G4HPQyHj6c99SNmrm_v27Ctb-N6ETApZEkb6Pjnx4" },
              { name: "Volt Mid-Layer", category: "Essentials / Mid", price: "$185.00", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAtlVb8jcUx53k8tqHhd_fq-EcQhOLoFCHYruwKpz2nOvaiukGZKAeuMknr-jSRiCpWr_jqDuSz-U4niDPPlHj5wUmht2t0ToPb0pfoQhJyMUqKfDWka1OptqNi2H_HeTnNVyT9wh7-NnZGMqGEtuXw6wMJl0qDSYVaxmaxgdeldG0RGGZ0ABzPJQVCdyLcZWFysYZSGvBazPM3zcACo5NXT7LLXY-F80wk-LT2QoYFqjHAkjqJpkRPLSrp-g52wv-VavVoU65PZm8" },
            ].map((item) => (
              <div key={item.name} className="min-w-[300px] md:min-w-[380px] snap-start group cursor-pointer">
                <div className="relative aspect-[3/4] overflow-hidden bg-background mb-stack-md border border-white/5 glass-btn">
                  <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={item.img} alt={item.name} />
                  <div className="absolute top-4 left-4 bg-primary-container text-on-primary px-3 py-1 font-label-caps text-label-caps font-bold shadow-[0_0_10px_rgba(0,240,255,0.6)]">NEW</div>
                  <Link
                    to="/productos"
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[90%] glass-btn bg-white/90 text-black py-3 font-label-caps text-label-caps font-bold translate-y-20 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-primary-container text-center"
                  >
                    VER PRODUCTO
                  </Link>
                </div>
                <div className="flex justify-between items-start transition-transform group-hover:translate-y-[-4px]">
                  <div>
                    <h4 className="font-body-md font-semibold text-on-surface uppercase group-hover:text-primary-container transition-colors">{item.name}</h4>
                    <p className="text-on-surface-variant font-label-caps text-[10px] uppercase mt-1">{item.category}</p>
                  </div>
                  <p className="font-body-md font-bold text-primary-container">{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 border-t border-white/10 relative overflow-hidden z-10">
        <div className="px-margin-mobile md:px-margin-desktop w-full max-w-container-max mx-auto text-center relative z-10">
          <div className="max-w-2xl mx-auto space-y-stack-md">
            <span className="material-symbols-outlined text-primary-container text-5xl float-anim" style={{ fontVariationSettings: "'FILL' 1", animationDuration: "4s" }}>
              bolt
            </span>
            <h2 className="font-headline-md text-headline-md uppercase">Velvora Elite</h2>
            <p className="text-on-surface-variant font-body-lg">
              Únete a la vanguardia. Recibe acceso prioritario a lanzamientos limitados y contenido exclusivo de la marca.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto pt-6">
              <input
                className="flex-1 glass-btn bg-white/5 border border-white/10 px-6 py-4 text-white focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all outline-none"
                placeholder="Email Address"
                type="email"
              />
              <button className="glass-btn bg-white text-black px-8 py-4 font-label-caps text-label-caps font-bold uppercase hover:bg-primary-container hover:text-on-primary shadow-lg">
                Suscribirse
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default MainPage
