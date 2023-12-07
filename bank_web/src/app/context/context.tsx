// Importa createContext e useState do React
"use client"
import  { createContext, useState } from 'react'

// Define o tipo de dados para o contexto de autenticação
type AuthContextData = {
    token: string | null
    setToken: (token: string | null) => void
};

// Define o tipo para as propriedades do componente Children
type Children = {
    children: React.ReactNode;
};

// Cria um contexto de autenticação com valor inicial
export const AuthContext = createContext<AuthContextData>({
    token: null,
    setToken: () => {},
});

// Cria um provedor de autenticação que utiliza o contexto
export const AuthProvider = ({ children }: Children) => {
    // Define o estado para o token de autenticação
    const [token, setToken] = useState<string | null>(null)

    // Retorna o provedor de autenticação com o valor do contexto atualizado
    return (
        <AuthContext.Provider value={{ token, setToken}}>
          {children}
        </AuthContext.Provider>
    );
}
