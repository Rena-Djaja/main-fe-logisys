'use client'

import { createContext, useContext, ComponentType, useEffect } from 'react'
import { AuthContextProps, PermissionTypes } from '@/type/Auth'
import { useRouter } from 'next/navigation'

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
)

export const useAuthContext = () => useContext(AuthContext)

export const useHasPermission = () => {
  const { permissions } = useAuthContext()
  return (permission: PermissionTypes): boolean =>
    (permissions || []).some((p) => p.name === permission)
}

interface WithAuthPageOptions {
  permission?: PermissionTypes
}

interface WithAuthPageProps {
  <P extends object>(WrappedComponent: ComponentType<P>): ComponentType<P>
  (
    options: WithAuthPageOptions
  ): <P extends object>(WrappedComponent: ComponentType<P>) => ComponentType<P>
}

export const withAuthPage: WithAuthPageProps = ((
  optionsOrComponent: WithAuthPageOptions | ComponentType<any>
) => {
  if (typeof optionsOrComponent === 'function') {
    const WrappedComponent = optionsOrComponent
    return function WithAuthPageComponent(props: any) {
      const router = useRouter()
      const hasPermission = useHasPermission()

      useEffect(() => {
        router.push('/dashboard')
      }, [])

      if (!hasPermission(PermissionTypes.PUBLIC)) {
        return null
      }

      return <WrappedComponent {...props} />
    }
  }

  const { permission } = optionsOrComponent as WithAuthPageOptions
  return function <P extends object>(WrappedComponent: ComponentType<P>) {
    return function WithAuthPageComponent(props: P) {
      const router = useRouter()
      const hasPermission = useHasPermission()

      useEffect(() => {
        if (permission && !hasPermission(permission)) {
          router.push('/dashboard')
        }
      }, [permission, hasPermission, router])

      if (permission && !hasPermission(permission)) {
        return null
      }

      return <WrappedComponent {...props} />
    }
  }
}) as WithAuthPageProps
