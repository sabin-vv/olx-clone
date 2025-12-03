import { useRef, useState } from "react";
import { db } from "../../db/firebase";
import { addDoc, collection } from "firebase/firestore";
import toast from "react-hot-toast";
import { uploadClodinary } from "../../Cloudinary/cloudinary";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/Header/Header";
import { userAuth } from "../../Components/Context/AuthContext";

export default function Sell() {
    const [category, setCategory] = useState("");
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [desc, setDesc] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const imageRef = useRef(null)
    const { user } = userAuth()

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return

        if (!file.type.startsWith("image/")) {
            toast.error("Please choose a valid image file")
            imageRef.current = null
            return
        }
        imageRef.current = file
    };

    const handleSubmit = async () => {
        if (!user) {
            toast.error("Please Login")
            navigate("/")
            return
        }
        if (!category || !title || !price || !desc) {
            toast.error("Please fill all fields");
            return;
        }
        if (!imageRef.current) {
            toast.error("Please choose an image")
            return
        }

        setLoading(true);
        const uploadedUrl = await uploadClodinary(imageRef.current);
        setLoading(false);
        imageRef.current = null

        await addDoc(collection(db, "products"), {
            category,
            title,
            price: parseInt(price),
            desc,
            imageUrl: uploadedUrl,
            createdAt: new Date(),
            sellerId: user.uid,
            sellerName: user.displayName,
        });

        toast.success("Product posted successfully!");
        navigate("/")
    };

    return (
        <>
            <Header />
            <div className="max-w-xl mx-auto mt-10 bg-white shadow-md p-6 rounded-md">
                <h1 className="text-2xl font-bold mb-4">Post Your Ad</h1>

                <label className="block font-semibold">Select Category</label>
                <select className="border w-full p-2 rounded mb-3" onChange={(e) => setCategory(e.target.value)} >
                    <option value="">Select</option>
                    <option value="Mobiles">Mobiles</option>
                    <option value="Vehicles">Vehicles</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Books">Books</option>
                    <option value="Home">Home</option>
                </select>

                <label className="block font-semibold">Product Name</label>
                <input type="text" className="border w-full p-2 rounded mb-3" placeholder="Enter product name" onChange={(e) => setTitle(e.target.value)} />
                <label className="block font-semibold">Price</label>
                <input type="number" className="border w-full p-2 rounded mb-3" placeholder="Enter price" onChange={(e) => setPrice(e.target.value)} />

                <label className="block font-semibold">Description</label>
                <textarea className="border w-full p-2 rounded mb-3" rows="3" placeholder="About the product..." onChange={(e) => setDesc(e.target.value)} ></textarea>

                <label className="block font-semibold">Upload Photo</label>
                <input ref={imageRef} type="file" className="border w-full p-2 rounded mb-3" onChange={handleImageUpload} />

                {loading && <p className="text-blue-600 mb-2">Uploading image...</p>}

                <button className="w-full p-3 bg-green-700 text-white rounded font-bold" onClick={handleSubmit} >
                    Post Ad
                </button>
            </div>
        </>
    );
}
