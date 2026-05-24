import React from 'react'
import Navbar from '../components/Navbar'
import ProductCard from '../components/ProductCard'
import Footer from '../components/Footer'

function Products() {
    return (
        <div className="bg-gray-50 text-gray-900">
            <Navbar />
            <div id="products-page" className="page">
                <section className="py-16 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">
                                NUESTRA COLECCIÓN
                            </h2>
                            <p className="text-xl text-gray-600">Estilo urbano para cada ocasión</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            <ProductCard
                             name="Camiseta Básica Urban"
                             description="Algodón 100% orgánico"
                             image="camisa"
                             price="29"
                             attribute="camiseta basica urbana"/>                       
                            <ProductCard
                             name="Jeans Slim Fit"
                             description="Denim Premium Stretch"
                             image="jean"
                             price="89"
                             attribute="jean slim fit"/>                       
                            <ProductCard
                             name="Sudadera oversize"
                             description="Algodón French Terry"
                             image="buso"  
                             price="65"
                             attribute="sudadera oversize"/>                       
                            <ProductCard
                             name="Chaqueta Bomber"
                             description="Nylon resistente al agua"
                             image="chaqueta"
                             price="120"
                             attribute="chaqueta bomber"/>                       
                            <ProductCard
                             name="Gorra Snapback"
                             description="Bordado premium"
                             image="gorra"
                             price="35"
                             attribute="gorra snapback"/>                       
                            <ProductCard
                             name="Zapatillas Urban"
                             description="Suela de goma antideslizante"
                             image="zapatillas"
                             price="95"
                             attribute="zapatillas urban"/>                   
                                                       
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    )
}
                           
export default Products