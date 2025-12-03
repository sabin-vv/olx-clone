const cloudName = "dd6kgmdfn"
const uploadPreset = "dbuqfvxl"

export const uploadClodinary = async (file) => {
    const data = new FormData()
    data.append("file", file)
    data.append("upload_preset", uploadPreset)
    data.append("cloud_name", cloudName)

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
            method: "POST",
            body: data,
        })
    const result = await res.json()
    return result.secure_url;
} 