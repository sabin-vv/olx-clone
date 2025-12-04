import { useState } from "react"
import olx_logo from "../../assets/olx_logo_2025.svg"
import { userAuth } from "../Context/AuthContext"
import "./Header.css"
import { useNavigate } from "react-router-dom"

export default function Header({ modalToggle, updateWishlist }) {
    const { user, profile, logout } = userAuth()
    const [dropdown, setDropdown] = useState(false)
    const navigate = useNavigate()

    return (
        <div className="header-container">
            <img className="olx-logo" src={olx_logo} alt="logo" onClick={() => navigate("/")} />
            <div className="location-box">
                <svg width="25px" height="25px" viewBox="0 0 1024 1024" data-aut-id="icon" className="" fillRule="evenodd"><path className="rui-w4DG7" d="M448 725.333c-152.917 0-277.333-124.416-277.333-277.333s124.416-277.333 277.333-277.333c152.917 0 277.333 124.416 277.333 277.333s-124.416 277.333-277.333 277.333v0zM884.437 824.107v0.021l-151.915-151.936c48.768-61.781 78.144-139.541 78.144-224.192 0-199.979-162.688-362.667-362.667-362.667s-362.667 162.688-362.667 362.667c0 199.979 162.688 362.667 362.667 362.667 84.629 0 162.411-29.376 224.171-78.144l206.144 206.144h60.352v-60.331l-54.229-54.229z"></path></svg>
                <input type="text" placeholder="kerala" />
                <svg width="24px" height="24px" viewBox="0 0 1024 1024" data-aut-id="icon" className="" fillRule="evenodd"><path className="rui-w4DG7" d="M85.392 277.333h60.331l366.336 366.336 366.336-366.336h60.331v60.331l-408.981 409.003h-35.307l-409.045-409.003z"></path></svg>
            </div>
            <div className="search-box">
                <input type="text" placeholder="Search Products" />
                <svg width="24px" height="24px" viewBox="0 0 1024 1024" data-aut-id="icon" className="" fillRule="evenodd"><path className="rui-o3KKi" d="M448 725.333c-152.917 0-277.333-124.416-277.333-277.333s124.416-277.333 277.333-277.333c152.917 0 277.333 124.416 277.333 277.333s-124.416 277.333-277.333 277.333v0zM884.437 824.107v0.021l-151.915-151.936c48.768-61.781 78.144-139.541 78.144-224.192 0-199.979-162.688-362.667-362.667-362.667s-362.667 162.688-362.667 362.667c0 199.979 162.688 362.667 362.667 362.667 84.629 0 162.411-29.376 224.171-78.144l206.144 206.144h60.352v-60.331l-54.229-54.229z"></path></svg>
            </div>
            <div className="lang-select-box">
                <select name="english" id="">
                    <option value="english">ENGLISH</option>
                    <option value="hindi">हिंदी</option>
                </select>
            </div>
            <div className="action-box">
                <svg onClick={() => navigate("/wishlist")} width="24px" height="24px" viewBox="0 0 1024 1024" data-aut-id="icon" className="" fillRule="evenodd"><path className="rui-w4DG7" d="M830.798 448.659l-318.798 389.915-317.828-388.693c-20.461-27.171-31.263-59.345-31.263-93.033 0-85.566 69.605-155.152 155.152-155.152 72.126 0 132.752 49.552 150.051 116.364h87.777c17.299-66.812 77.905-116.364 150.051-116.364 85.547 0 155.152 69.585 155.152 155.152 0 33.687-10.802 65.862-30.293 91.811zM705.939 124.121c-80.853 0-152.204 41.425-193.939 104.204-41.736-62.778-113.086-104.204-193.939-104.204-128.33 0-232.727 104.378-232.727 232.727 0 50.657 16.194 98.948 47.806 140.897l328.766 402.133h100.189l329.716-403.355c30.662-40.727 46.856-89.018 46.856-139.675 0-128.349-104.398-232.727-232.727-232.727z"></path></svg>
                {user ? (
                    <div className="relative flex flex-row items-center" >
                        <span className="font-semibold text-xl text-green-800 mx-1">
                            {profile?.name || user.displayName || "User"}
                        </span>
                        <div onBlur={() => setDropdown(false)}>
                            <svg onClick={() => setDropdown(!dropdown)} width="20px" height="20px" viewBox="0 0 1024 1024" data-aut-id="icon" className="" fillRule="evenodd"><path className="rui-w4DG7" d="M85.392 277.333h60.331l366.336 366.336 366.336-366.336h60.331v60.331l-408.981 409.003h-35.307l-409.045-409.003z"></path></svg>
                            {dropdown && (<div className="absolute w-40 right-0 top-6 bg-white z-50 rounded-md p-2 shadow-md my-dropwown">
                                <p onClick={() => navigate("/myads")} ><svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M10.5 11.25H16.5V12.75H10.5V11.25Z" fill="#080341"></path> <path fillRule="evenodd" clipRule="evenodd" d="M10.5 7.5H16.5V9H10.5V7.5Z" fill="#080341"></path> <path fillRule="evenodd" clipRule="evenodd" d="M10.5 15H16.5V16.5H10.5V15Z" fill="#080341"></path> <path fillRule="evenodd" clipRule="evenodd" d="M7.5 7.5H9V9H7.5V7.5Z" fill="#080341"></path> <path fillRule="evenodd" clipRule="evenodd" d="M7.5 11.25H9V12.75H7.5V11.25Z" fill="#080341"></path> <path fillRule="evenodd" clipRule="evenodd" d="M7.5 15H9V16.5H7.5V15Z" fill="#080341"></path> <path fillRule="evenodd" clipRule="evenodd" d="M3.75 4.5L4.5 3.75H19.5L20.25 4.5V19.5L19.5 20.25H4.5L3.75 19.5V4.5ZM5.25 5.25V18.75H18.75V5.25H5.25Z" fill="#080341"></path> </g></svg>My ADS</p>
                                <p onClick={() => navigate("/wishlist")}><svg width="30px" height="30px" viewBox="-6.4 -6.4 76.80 76.80" xmlns="http://www.w3.org/2000/svg" strokeWidth="3" stroke="#000000" fill="black"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="0.128"></g><g id="SVGRepo_iconCarrier"><path d="M9.06,25C7.68,17.3,12.78,10.63,20.73,10c7-.55,10.47,7.93,11.17,9.55a.13.13,0,0,0,.25,0c3.25-8.91,9.17-9.29,11.25-9.5C49,9.45,56.51,13.78,55,23.87c-2.16,14-23.12,29.81-23.12,29.81S11.79,40.05,9.06,25Z"></path></g></svg>Wishlist</p>
                                <p onClick={() => {
                                    logout()
                                    navigate("/")
                                    updateWishlist([])
                                }} ><svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M8.25 5.25L9 4.5H18L18.75 5.25V18.75L18 19.5H9L8.25 18.75V16.5H9.75V18H17.25V6H9.75V7.5H8.25V5.25Z" fill="#080341"></path> <path fillRule="evenodd" clipRule="evenodd" d="M7.06068 12.7499L14.25 12.7499L14.25 11.2499L7.06068 11.2499L8.78035 9.53027L7.71969 8.46961L4.18936 11.9999L7.71969 15.5303L8.78035 14.4696L7.06068 12.7499Z" fill="#080341"></path> </g></svg>logout</p>

                            </div>)}
                        </div>
                    </div>
                ) :
                    <span className="font-semibold text-lg underline" onClick={() => {
                        modalToggle()
                        setDropdown(false)
                    }}>Login</span>
                }
                <svg onClick={() => user ? navigate("/sell") : modalToggle()} width="104" height="48" viewBox="0 0 1603 768" xmlns="http://www.w3.org/2000/svg" className="relative">
                    <g>
                        <path fill="white" d="M434.442 16.944h718.82c202.72 0 367.057 164.337 367.057 367.058s-164.337 367.057-367.057 367.057h-718.82c-202.721 0-367.058-164.337-367.058-367.058s164.337-367.058 367.058-367.058z"></path>
                        <path fill="#3A77FF" d="M427.241 669.489c-80.917 0-158.59-25.926-218.705-73.004l-0.016-0.014c-69.113-54.119-108.754-131.557-108.754-212.474 0-41.070 9.776-80.712 29.081-117.797 25.058-48.139 64.933-89.278 115.333-118.966l-52.379-67.581c-64.73 38.122-115.955 90.98-148.159 152.845-24.842 47.745-37.441 98.726-37.441 151.499 0 104.027 50.962 203.61 139.799 273.175h0.016c77.312 60.535 177.193 93.887 281.22 93.887h299.699l25.138-40.783-25.138-40.783h-299.698z"></path>
                        <path fill="#FFCE32" d="M1318.522 38.596c-45.72-14.369-93.752-21.658-142.762-21.658h-748.511c-84.346 0-165.764 21.683-235.441 62.713l3.118 51.726 49.245 15.865c54.16-31.895 117.452-48.739 183.073-48.739h748.511c38.159 0 75.52 5.657 111.029 16.829 44.91 14.111 86.594 37.205 120.526 66.792l66.163-57.68c-43.616-38.010-97.197-67.703-154.957-85.852z"></path>
                        <path fill="#F86300" d="M1473.479 124.453l-55.855 9.91-10.307 47.76c61.844 53.929 95.92 125.617 95.92 201.88 0 25.235-3.772 50.26-11.214 74.363-38.348 124.311-168.398 211.129-316.262 211.129h-448.812l25.121 40.783-25.121 40.783h448.812c190.107 0 357.303-111.638 406.613-271.498 9.572-31.009 14.423-63.162 14.423-95.559 0-98.044-43.805-190.216-123.317-259.551z"></path>
                    </g>
                    <g transform="translate(801, 380)" textAnchor="middle" dominantBaseline="middle"></g>
                    <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fontSize="250" fontWeight="bold" fill="black"  > + SELL
                    </text>
                </svg>
            </div>
        </div >
    )
};
