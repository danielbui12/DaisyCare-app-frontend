import axios from '../axios'

export const handleLogin = (userEmail, userPassword) => { 
    return axios.post('/api/login', {
        email: userEmail,
        password: userPassword
    })
} 

export const getAllUser = (userId) => {
    return axios.get(`/api/get-all-users?id=${userId}`)
}

export const createUserService = (data) => {
    return axios.post("/api/create-new-user", data);
}

export const deleteUser = (userId) =>{ 
    return axios.delete('/api/delete-user', {
        // headers: {
        //     Authorization: au
        // },
        data: {
            id: userId 
        }
    })
}

export const editUser = (userInfo) => {
    return axios.put('/api/edit-user', userInfo)
}
