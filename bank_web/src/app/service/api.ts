import axios from "axios"

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/'
});

interface Props{
    identificationNumber: string
    password: string
}

interface Props2{
    identificationNumber: string
    token: string
}

const LoginApi = async ({identificationNumber, password}: Props) => {
    try{
        const login = await axiosInstance.post('/bank/api/v1/auth/token/login/',{
            identification_number: identificationNumber,
            password: password,
        })

        const response = login.data.auth_token
        return response
    }
    catch(error){
        console.log(String(error))
    }
}

const Informacoes = async ({token, identificationNumber}:Props2) => {
    try{
        const informacoes = await axiosInstance.get(`/bank/api/v1/query/view/clients?search=${identificationNumber}`, {
            headers: {
                'Authorization': `Token ${token}`
            }
        });
        const response = informacoes.data
        return response.results
    }
    catch(error){
        console.log(String(error))
    }
}

export {LoginApi, Informacoes}