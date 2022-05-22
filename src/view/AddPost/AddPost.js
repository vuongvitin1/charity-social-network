import React from 'react'

const AddPost = () => {
    const [newPost  , setNewPost] = useState({
        "first_name": '',
        "last_name": '',
        "username": "",
        "password": "",
        "email": ""
    })
    const avatar = useRef()
    const nav = useNavigate()

    const change = (obj) => {
        setNewUser({
            ...newUser, 
            ...obj
        })
    }

    const register = async (event) => {
        event.preventDefault()

        let data = new FormData()
        data.append('first_name', newUser.first_name)
        data.append('last_name', newUser.last_name)
        data.append('username', newUser.username)
        data.append('password', newUser.password)
        data.append('avatar', avatar.current.files[0])
        data.append('email', newUser.email)

        try {
            const res = await Api.post(endpoints['register'], data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            if (res.status === 201)
                nav("/login")
        } catch (error) {
            console.error(error)
        }
        
    }
  return (
    <div>AddPost</div>
  )
}

export default AddPost