/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../db/firebase";
import { userAuth } from "../../Components/Context/AuthContext";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer"
import { useNavigate } from "react-router-dom";

export default function MyADS() {
    const { user } = userAuth();
    const navigate = useNavigate();
    const [myAds, setMyAds] = useState([]);

    if (!user) {
        return (
            <>
                <Header />
                <div className="flex justify-center items-center h-[300px] text-xl font-semibold">
                    Please login to see your ads.
                </div>
            </>
        );
    }

    useEffect(() => {
        const fetchMyAds = async () => {
            const q = query(collection(db, "products"), where("sellerId", "==", user.uid));
            const snap = await getDocs(q);
            const list = snap.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setMyAds(list);
        };
        fetchMyAds();
    }, [user.uid]);

    return (
        <>
            <Header />
            <div className="max-w-5xl mx-auto mt-10 px-4 my-6">
                <h1 className="text-3xl font-bold mb-6">My Ads</h1>
                {myAds.length === 0 ? (
                    <div className="text-center text-lg text-gray-600 py-10">
                        You haven’t posted any ads yet.
                    </div>
                ) : (
                    <div className="grid grid-cols-4 gap-6 justify-items-center">
                        {myAds.map(item => (
                            <div key={item.id} className="w-[250px] h-[330px] border rounded-md shadow-sm hover:shadow-lg cursor-pointer bg-white transition relative" onClick={() => navigate(`/product/${item.id}`)} >
                                <div className="w-full h-40 bg-gray-100 overflow-hidden rounded-md">
                                    <img src={item.imageUrl} className="w-full h-full object-cover" alt={item.title} />
                                </div>
                                <div className="p-3">
                                    <div className="flex justify-between items-center mb-1">
                                        <h3 className="font-semibold text-lg truncate">{item.title}</h3>
                                        <span className="text-green-700 font-bold">
                                            ₹{Number(item.price).toLocaleString("en-IN")}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-500">{item.category}</p>
                                    <p className="text-gray-700 text-sm mt-1 line-clamp-2">
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
