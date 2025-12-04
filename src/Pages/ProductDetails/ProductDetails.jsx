/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../db/firebase";
import Header from "../../Components/Header/Header";
import { userAuth } from "../../Components/Context/AuthContext";
import toast from "react-hot-toast";
import Footer from "../../Components/Footer/Footer";

export default function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = userAuth();
    const [product, setProduct] = useState(null);
    const [wishlisted, setWishlisted] = useState(false);
    const [loadingWishlist, setLoadingWishlist] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            const ref = doc(db, "products", id);
            const snap = await getDoc(ref);

            if (snap.exists()) {
                setProduct({ id: snap.id, ...snap.data() });
            }
        };
        fetchProduct();
    }, [id]);

    useEffect(() => {
        const checkWishlist = async () => {
            if (!user || !id) {
                setWishlisted(false);
                return;
            }
            const userRef = doc(db, "users", user.uid);
            const userSnap = await getDoc(userRef);
            const data = userSnap.data() || {};
            const list = data.wishlist || [];
            setWishlisted(list.includes(id));
        };
        checkWishlist();
    }, [user, id]);

    const toggleWishlist = async () => {
        if (!user) {
            toast.error("Please login to manage wishlist");
            return;
        }
        try {
            setLoadingWishlist(true);
            const userRef = doc(db, "users", user.uid);
            const snap = await getDoc(userRef);
            const data = snap.exists() ? snap.data() : {};
            const current = data.wishlist || [];
            let updated;
            if (current.includes(id)) {
                updated = current.filter((pid) => pid !== id);
                setWishlisted(false);
                toast.success("Removed from wishlist");
            } else {
                updated = [...current, id];
                setWishlisted(true);
                toast.success("Added to wishlist");
            }
            await setDoc(userRef, { wishlist: updated }, { merge: true });
        } catch (e) {
            toast.error("Failed to update wishlist");
            setWishlisted((prev) => !prev);
        } finally {
            setLoadingWishlist(false);
        }
    };

    if (!product) {
        return (
            <>
                <Header />
                <div className="flex justify-center items-center h-[300px] text-lg font-semibold">
                    Loading...
                </div>
            </>
        );
    }

    return (
        <>
            <Header />
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-md p-6 mt-6">
                <div className="grid grid-cols-2 gap-8">
                    <div className="relative bg-gray-100 rounded-md overflow-hidden flex justify-center">
                        <img src={product.imageUrl} alt={product.title} className="w-full h-auto max-h-[500px] object-contain" />
                    </div>
                    <div className="flex flex-col justify-start">
                        <button type="button" aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"} className="ml-auto bg-white p-2 rounded-full shadow cursor-pointer disabled:opacity-60" onClick={toggleWishlist} disabled={loadingWishlist} >
                            <svg width="28" height="28" viewBox="0 0 24 24" fill={wishlisted ? "red" : "none"} stroke={wishlisted ? "red" : "black"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1
                                a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5
                                0 0 0 0-7.8z" />
                            </svg>
                        </button>
                        <h1 className="text-3xl font-bold text-green-700"> ₹{Number(product.price).toLocaleString("en-IN")}</h1>
                        <p className="text-lg text-gray-900 mt-2">{product.title}</p>
                        <p className="text-gray-500 text-sm mt-1"> Posted on:{" "} {new Date(product.createdAt.seconds * 1000).toLocaleDateString()}
                        </p>
                        <div className="border-t my-4"></div>
                        <h2 className="font-semibold text-gray-800 text-sm">Category</h2>
                        <p className="text-gray-900">{product.category}</p>
                        <div className="border-t my-4"></div>
                        <h2 className="font-semibold text-lg">Description</h2>
                        <p className="mt-1 text-gray-700">{product.desc}</p>
                        <div className="border-t my-4"></div>
                        <h2 className="font-semibold text-gray-800 text-sm">Seller</h2>
                        <p className="text-gray-900">{product.sellerName || "Unknown Seller"}</p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
