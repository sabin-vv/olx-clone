import { Carousel, Modal, ModalBody } from "flowbite-react"
import close from "../../assets/close.svg"
import post from "../../assets/loginEntryPointPost.webp"
import chat from "../../assets/loginEntryPointChat.webp"
import favourite from "../../assets/loginEntryPointFavorite.webp"
import { userAuth } from "../Context/AuthContext"
import { auth, provider } from "../../db/firebase"
import { useState } from "react"
import { signInWithPopup } from "firebase/auth"
import toast from "react-hot-toast"

export default function LoginModal({ modalToggle, status }) {
    const { login, signup } = userAuth()
    const [showLogin, setShowLogin] = useState(true)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleClick = async () => {
        try {
            await signInWithPopup(auth, provider)
            modalToggle()
            toast.success("Login success")
        } catch (error) {
            toast.error(error.messsage)
        }
    }
    const handleLogin = async () => {
        try {
            await login(email, password)
            modalToggle()
            toast.success("Login success")
            setEmail("")
            setPassword("")
        } catch (error) {
            toast.error(error.message)
        }
    }
    const handleSignup = async () => {
        try {
            await signup(name, email, password)
            modalToggle()
            toast.success("Login success")
            setName("")
            setEmail("")
            setPassword("")
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div>
            <Modal theme={{
                "content": {
                    "base": "relative w-full p-4 md:h-auto",
                    "inner": "relative flex max-h-[900vh] flex-col rounded-lg bg-white shadow dark:bg-gray-700"
                }
            }} onClick={modalToggle} show={status} size="md">
                <div onClick={(event) => event.stopPropagation()} className="relative p-6 pl-2 pr-2 bg-white">
                    <img onClick={modalToggle} className="w-6 absolute z-10 top-4 right-4 cursor-pointer" src={close} alt="" />
                    <Carousel slide={false} theme={{
                        "indicators": {
                            "active": {
                                "off": "bg-gray-300",
                                "on": "bg-teal-300"
                            },
                            "base": "h-2 w-2 rounded-full",
                            "wrapper": "absolute bottom-2 left-1/2 flex -translate-x-1/2 space-x-3"
                        },
                        "scrollContainer": {
                            "base": "flex h-full snap-mandatory overflow-y-hidden overflow-x-scroll scroll-smooth",
                            "snap": "snap-x"
                        }, "control": {
                            "base": "inline-flex items-center justify-center bg-transparent",
                            "icon": "w-8 text-black dark:text-black"
                        },
                    }} onClick={(event) => { event.stopPropagation() }} className="w-full h-56 pb-5 rounded-none">
                        <div className="flex flex-col items-center justify-center">
                            <img className="w-24 pb-5" src={post} alt="Car Image 1" />
                            <p style={{ color: '#002f34' }} className=" w-60 sm:w-72 text-center pb-5 font-semibold">Help us become one of the safest place to buy and sell.</p>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <img className="w-24 pb-5" src={chat} alt="Car Image 2" />
                            <p style={{ color: '#002f34' }} className=" w-60 sm:w-72 text-center pb-5 font-semibold">Close deals from the comfort of your home.</p>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <img className="w-24 pb-5" src={favourite} alt="Car Image 3" />
                            <p style={{ color: '#002f34' }} className=" w-60 sm:w-72 text-center pb-5 font-semibold">Keep all your favorites in one place.</p>
                        </div>
                    </Carousel>
                </div>
                <ModalBody className="bg-white h-96 p-0 rounded-none" onClick={(event) => { event.stopPropagation() }} >

                    <div className="p-6 pt-0">
                        {showLogin ? (
                            <>
                                <div >
                                    <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-md border-2 border-solid border-black p-5 pl-4  h-8 mb-4 flex items-center justify-start w-full" />
                                </div>
                                <div>
                                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="rounded-md border-2 border-solid border-black p-5 pl-4  h-8 mb-4 flex items-center justify-start w-full" />
                                </div>
                                <div>
                                    <button className="rounded-md p-5 pl-4 h-8 mb-1 flex items-center justify-center w-full bg-green-700 text-white cursor-pointer" onClick={handleLogin}>Sign In</button>
                                </div>
                                <div className="pt-3 mb-3 flex flex-col items-center justify-center">
                                    <p className="font-semibold text-sm">OR</p>
                                </div>
                                <div className="flex items-center justify-center gap-3 rounded-md mb-3 border-2 border-solid border-gray-300 p-5 relative h-8 cursor-pointer active:bg-teal-100" onClick={handleClick} >
                                    <svg width="22px" height="22px" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="LgbsSe-Bz112c"><g><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path><path fill="none" d="M0 0h48v48H0z"></path></g></svg>
                                    <p className="text-sm text-gray-500" >Continue with Google</p>
                                </div>
                                <div className="flex items-center justify-center">
                                    <p className="font-bold text-sm pt-3 underline underline-offset-4 cursor-pointer" onClick={() => setShowLogin(false)}>SignUp with Email</p>
                                </div>
                            </>
                        )
                            : <>
                                <div>
                                    <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="rounded-md border-2 border-solid border-black p-5 pl-4  h-8 mb-4 flex items-center justify-start w-full" />
                                </div>
                                <div>
                                    <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-md border-2 border-solid border-black p-5 pl-4  h-8 mb-4 flex items-center justify-start w-full" />
                                </div>
                                <div>
                                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="rounded-md border-2 border-solid border-black p-5 pl-4  h-8 mb-4 flex items-center justify-start w-full" />
                                </div>
                                <div>
                                    <button className="rounded-md p-5 pl-4 h-8 mb-1 flex items-center justify-center w-full bg-green-700 text-white cursor-pointer" onClick={handleSignup}>Sign Up</button>
                                </div>
                                <div className="flex items-center justify-center">
                                    <p className="font-bold text-sm pt-3 underline underline-offset-4 cursor-pointer" onClick={() => setShowLogin(true)}>Login Now</p>
                                </div>
                            </>
                        }
                        <div className="pt-8 sm:pt-20 flex flex-col items-center justify-center">
                            <p className="text-xs">All your personal details are safe with us.</p>
                            <p className="text-xs pt-2 text-center">If you continue, you are accepting <span className="text-blue-600">OLX Terms and Conditions and Privacy Policy</span></p>
                        </div>
                    </div>

                </ModalBody>
            </Modal>

        </div>
    )
};
