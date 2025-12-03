
import { useEffect, useState } from "react"
import Category from "../Components/Category/Category"
import Header from "../Components/Header/Header"
import LoginModal from "../Components/Modal/LoginModal"
import { db, fetchFromFireStore } from "../db/firebase"
import { userAuth } from "../Components/Context/AuthContext"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { useNavigate } from "react-router-dom"

export default function Home() {
    const [openmodal, setOpenModal] = useState(null)
    const [products, setProducts] = useState([])
    const [wishlist, setWishlist] = useState([])
    const { user } = userAuth()
    const navigate = useNavigate()

    const toggleModal = () => {
        setOpenModal(!openmodal)
    }

    useEffect(() => {
        async function loadProduct() {
            const data = await fetchFromFireStore()
            setProducts(data)
        }
        loadProduct()
    }, [])

    useEffect(() => {
        const fetchWishList = async () => {
            const docRef = doc(db, "users", user.uid)
            const snapshot = await getDoc(docRef)

            if (snapshot.exists()) {
                const data = snapshot.data()
                setWishlist(data.wishlist || [])
            } else {
                setWishlist([])
            }
        }
        fetchWishList()
    }, [user])

    const handleWishlist = async (productId) => {
        if (!user) {
            toggleModal()
            return
        }
        let myList
        if (wishlist.includes(productId)) {
            myList = wishlist.filter(id => id !== productId)
        } else {
            myList = [...wishlist, productId]
        }
        setWishlist(myList)
        await setDoc(doc(db, "users", user.uid), { wishlist: myList }, { merge: true })
    }

    return (
        <>
            <Header modalToggle={toggleModal} updateWishlist={setWishlist} />
            <Category />
            <LoginModal modalToggle={toggleModal} status={openmodal} />
            {products.length > 0 ? (
                <div className="grid grid-cols-4 gap-6 px-6 mt-10 justify-items-center">
                    {products.map(item => (
                        <div onClick={() => navigate(`/product/${item.id}`)} key={item.id} className="w-[250px] h-[330px] border rounded-md shadow-sm hover:shadow-lg cursor-pointer bg-white transition relative flex flex-col" >
                            <div className="absolute top-2 right-5 z-20 bg-white p-1 rounded-full shadow cursor-pointer"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    handleWishlist(item.id)
                                }} >
                                {user && wishlist.includes(item.id) ? (
                                    <svg width="26" height="26" fill="red" viewBox="0 0 24 24">
                                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5c0-3.04 2.46-5.5 5.5-5.5c1.74 0 3.41 0.81  4.5 2.09c1.09-1.28 2.76-2.09 4.5-2.09c3.04 0  5.5 2.46 5.5 5.5c0 3.78-3.4 6.86-8.55  11.54L12 21.35z" />
                                    </svg>
                                ) : (
                                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" >
                                        <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
                                    </svg>
                                )}

                            </div>
                            <div className="w-full overflow-hidden rounded-md bg-gray-100 flex-none shrink-0" style={{ height: "180px" }}>
                                <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover object-center block" />
                            </div>
                            <div className="p-3">
                                <div className="flex justify-between items-center mb-1">
                                    <h3 className="font-semibold text-lg truncate">{item.title}</h3>
                                    <span className="text-green-700 font-bold">₹{item.price.toLocaleString("en-IN")}</span>
                                </div>

                                <p className="text-sm text-gray-500">{item.category}</p>
                                <p className="text-gray-700 text-sm mt-1 line-clamp-2">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div >
            ) : <div className="flex justify-center items-center p-8 m-4"><p className="text-xl font-bold">Product list is Empty</p></div>
            }
        </>
    )
};
