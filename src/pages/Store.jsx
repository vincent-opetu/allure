import Header from "../components/Header"
import Footer from "../components/Footer"
import Announcements from "../components/Announcements"
import Hero from "../components/Hero"
import VendorSection from "../components/sections/VendorSection"
import { getStore } from '../redux/apis/storeApiCalls'
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router-dom" 
import ProductCardHome from "../components/cards/ProductCardHome"

const Store = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const storeId = location.pathname.split('/')[2]
  const store = useSelector((state) => state.stores?.store)
  const storeProduct = useSelector(state => state.stores?.store?.products)

  useEffect(() => {
    getStore(dispatch, storeId)
  }, [dispatch, storeId]);

  return (
    <main>
      <Announcements />
      <Header />
      <Hero store={store}/>
      <VendorSection store={store}/>
      <section className="max-w-7xl mx-auto pt-20">
          <div>
            <h2 className="text-4xl font-light text-center">Store Products</h2>
          </div>
          <section className="grid grid-cols-4 gap-6 pt-10">
            {
              storeProduct !== null ?
              storeProduct.map((product) => (
                <ProductCardHome product={product}/>
              )) :
              <p className="text-3xl font-light text-center">No Products found in this store</p>
            }
          </section>
      </section>
      <Footer />
    </main>
  )
}

export default Store