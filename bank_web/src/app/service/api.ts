import axios from "axios"

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/'
});

interface Props{
    identificationNumber: string
    password: string
    token:string
}

const Login = async ({identificationNumber, password}: Props) => {
    try{
        const login = await axiosInstance.post('/bank/api/v1/auth/token/login/',{
            identification_number: identificationNumber,
            password: password,
        })

        const response = login.data.auth_token
    }
    catch(error){
        console.log(String(error))
    }
}

const informacoes =async ({token}:Props) => {
    try{
        const informacoes = await axiosInstance.get('')
    }
    catch(error){
        console.log(String(error))
    }
}

export {Login, informacoes}