"use cliente"
import { useState } from 'react';
import { Login } from '@/app/service/api';


export default function Login() {

  const [CPF, setCPF] = useState('')
  const [password, setPassword] = useState('')

  const login = (e: any) => {
    e.preventDefault();
    console.log(CPF)
    console.log(password)

    const token: string = Login()

  }


  return (
    <div className="flex items-center justify-center">
      <form className="p-4" onSubmit={login}>
        <div className="mb-4">
          <label htmlFor="cpf" className="text-[#1FF2FF]">CPF</label>
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
          <label htmlFor="password" className="text-[#1FF2FF] font-semibold">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full  p-2 border border-[#F4F4F4] bg-transparent rounded focus:outline-none  focus:border-[#1FF2FF]"
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
    </div>
  );
}
