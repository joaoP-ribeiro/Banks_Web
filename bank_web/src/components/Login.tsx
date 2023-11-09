"use cliente"
import { useState } from 'react';
import { Informacoes, LoginApi } from '@/app/service/api';
import LineView from './LineView';

interface User {
  name: string
  account: string
  typee: string
  
}

interface Account{
  saldo: string
  credit_limit: string

}

export default function Login() {

  const [CPF, setCPF] = useState('')
  const [password, setPassword] = useState('')
  const [response, setResponse] = useState<User | null>(null)
  const [account, setAccount] = useState<Account | null>(null)

  const login = async (e: any) =>{
    e.preventDefault();
    try {
      const token = await  LoginApi({ identificationNumber: CPF, password: password })
      infos(token)
    } catch (error) {
      console.error(error);
    }
  }

  const infos = async (token: string) => {
    try{
      console.log(token)
      const infos = await Informacoes({token: token, identificationNumber: CPF})
      const accountView = infos[0].account_view
      setAccount(accountView[0])
      setResponse(infos[0])
      
    }catch (error) {
      console.error(error);
    }
  }


  return (
    <div className="flex items-center justify-center flex-col">
      <form className="p-4" onSubmit={login}>
        <div className="mb-4">
          <div  className="text-[#1FF2FF]">CPF</div>
          <input
            type="number"
            id="CPF"
            name="CPF"
            value={CPF}
            onChange={(e) => setCPF(e.target.value)}
            className="w-full text-[#F4F4F4] p-2 border border-[#F4F4F4] bg-transparent rounded focus:outline-none focus:border-[#1FF2FF]"
            required
          />
        </div>
        <div className="mb-4">
          <div className="text-[#1FF2FF] font-semibold">Password</div>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full text-[#F4F4F4] p-2 border border-[#F4F4F4] bg-transparent rounded focus:outline-none  focus:border-[#1FF2FF]"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-transparent border border-[#FF1577] text-[#F4F4F4] rounded hover:bg-[#FF1577] focus:outline-none"
        >
          Login
        </button>
      </form>
      {response !== null && account !== null &&  (
        <div className="mt-10">
          <LineView title="Name" text={response.name} />
          <LineView title="Number Account" text={response.account} /> 
          <LineView title="Credit Limit" text={account.credit_limit} /> 
          <LineView title="Balance" text={account.saldo} />
          <LineView title="Type Account" text={response.typee} />
        </div>
      )}
    </div>
  );
}
//<LineView title="Balance" text={response.account_view.saldo} />