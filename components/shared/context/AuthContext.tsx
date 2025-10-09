'use client'

import { createContext, useContext } from 'react'
import { AuthContextProps } from '@/type/Auth'

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
)

export const useAuthContext = () => useContext(AuthContext)
