import { Route, Router, Routes } from "react-router"
import Home from "./Pages/Home"
import { Toaster } from "react-hot-toast"
import Sell from "./Pages/Sell/Sell"
import Wishlist from "./Pages/Wishlist/Wishlist"
import ProductDetails from "./Pages/ProductDetails/ProductDetails"
import MyADS from "./Pages/MyADS/MyADS"

function App() {
  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} />
      <Routes >
        <Route path="/" element={<Home />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/myads" element={<MyADS />} />
      </Routes>
    </>
  )
}

export default App
