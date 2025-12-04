/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../../db/firebase";
import Header from "../../Components/Header/Header";
import { userAuth } from "../../Components/Context/AuthContext";
import toast from "react-hot-toast";
import Footer from "../../Components/Footer/Footer";

export default function Wishlist() {
    const [wishlist, setWishlist] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const { user } = userAuth()
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            toast.error("Please login");
            navigate("/");
        }
    }, [user, navigate]);
    useEffect(() => {
        const fetchWishlist = async () => {
            if (!user?.uid) return;
            const docRef = doc(db, "users", user.uid);
            const snapshot = await getDoc(docRef);
            if (snapshot.exists()) {
                const data = snapshot.data() || {};
                setWishlist(data.wishlist || []);
            } else {
                setWishlist([]);
            }
        };
        fetchWishlist();
    }, [user?.uid]);

    useEffect(() => {
        const loadProducts = async () => {
            const snap = await getDocs(collection(db, "products"));
            const list = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setAllProducts(list);
        };

        loadProducts();
    }, []);

    useEffect(() => {
        const result = allProducts.filter((p) => wishlist.includes(p.id));
        setFiltered(result);
    }, [wishlist, allProducts]);

    const removeItem = async (id) => {
        const updated = wishlist.filter((item) => item !== id);
        setWishlist(updated);
        await setDoc(doc(db, "users", user.uid),
            { wishlist: updated },
            { merge: true })
    };

    return (
        <>
            <Header />
            <div className="container mx-auto px-4 py-6 overflow-x-clip">
                <h1 className="text-3xl font-bold mb-6">My Wishlist ❤️</h1>
                {filtered.length === 0 ? (
                    <div className="text-center py-10">
                        <p className="text-xl font-semibold text-gray-600">
                            No items in your wishlist yet.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-4">
                        {filtered.map((item) => (
                            <div key={item.id} className="relative w-full h-[330px] border rounded-md shadow-sm hover:shadow-lg cursor-pointer bg-white transition box-border min-w-0 overflow-hidden" >
                                <div className="absolute top-2 right-2 z-20 bg-white p-1 rounded-full shadow cursor-pointer" onClick={(e) => {
                                    e.stopPropagation();
                                    removeItem(item.id);
                                }} >
                                    <svg width="20" height="20" fill="red" viewBox="0 0 24 24" stroke="none" >
                                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5  c0-3.04 2.46-5.5 5.5-5.5c1.74 0 3.41 0.81 4.5  2.09c1.09-1.28 2.76-2.09 4.5-2.09c3.04 0  5.5 2.46 5.5 5.5c0 3.78-3.4 6.86-8.55  11.54L12 21.35z" />
                                    </svg>
                                </div>

                                <div className="w-full h-40 overflow-hidden rounded-md bg-gray-100">
                                    <img src={item.imageUrl} className="w-full h-full object-cover" alt={item.title} onClick={() => navigate(`/product/${item.id}`)} />
                                </div>

                                <div className="p-3">
                                    <div className="flex justify-between items-center mb-1 min-w-0">
                                        <h3 className="font-semibold text-lg truncate min-w-0">
                                            {item.title}
                                        </h3>
                                        <span className="text-green-700 font-bold">
                                            ₹{Number(item.price).toLocaleString("en-IN")}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-500">{item.category}</p>
                                    <p className="text-gray-700 text-sm mt-1 line-clamp-2 break-words">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}
