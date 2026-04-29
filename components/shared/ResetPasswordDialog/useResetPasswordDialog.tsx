'use client'

import { useEffect } from 'react'
import { useAuthContext } from '@/components/shared/context/AuthContext'
import { ButtonVariant } from '@/type/FormInputs'
import { useConfirmationStore } from '@/store'
import { usePathname, useRouter } from 'next/navigation'
import { getCookie, setCookie } from '@/lib/cookies'

const useResetPasswordDialog = () => {
  const { authInfo } = useAuthContext()
  const { setConfirmation, closeConfirmation } = useConfirmationStore()
  const { push } = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (authInfo && !authInfo?.reset_password) {
      const skipAllowed = getCookie('skip_change_password')
      const pathArr = pathname.split('/')

      if (Number(skipAllowed) < 1 && !pathArr.includes('change-password')) {
        setConfirmation({
          isOpen: true,
          title: 'Proteksi akun Anda',
          description:
            'Untuk alasan keamanan, kami rekomendasikan untuk merubah kata sandi Anda. Atau Anda dapat melewatkan pesan ini untuk 24 jam kedepan.',
          confirmButtonVariant: ButtonVariant.DEFAULT,
          confirmButtonText: 'Ubah Kata Sandi',
          cancelButtonText: 'Lewatkan',
          onConfirm: () => {
            push('/dashboard/settings/change-password')
            closeConfirmation()
          },
          onCancel: () => setCookie('skip_change_password', 1, { expires: 1 }),
        })
      }
    }
  }, [authInfo])

  return {}
}

export default useResetPasswordDialog
