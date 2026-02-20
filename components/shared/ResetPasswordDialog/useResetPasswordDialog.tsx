'use client'

import { useEffect } from 'react'
import { useAuthContext } from '@/components/shared/context/AuthContext'
import { ButtonVariant } from '@/type/FormInputs'
import { useConfirmationStore } from '@/store'
import { useRouter } from 'next/navigation'
import { getCookie, setCookie } from '@/lib/cookies'

const useResetPasswordDialog = () => {
  const { authInfo } = useAuthContext()
  const { setConfirmation } = useConfirmationStore()
  const { push } = useRouter()

  useEffect(() => {
    if (authInfo && !authInfo?.reset_password) {
      const skipAllowed = getCookie('skip_change_password')

      if (!Number(skipAllowed)) {
        setConfirmation({
          isOpen: true,
          title: 'Protect your account',
          description:
            'For security reason, we recommend you to change your password. Or you can skip & hide this alert for 24 hours.',
          confirmButtonVariant: ButtonVariant.DEFAULT,
          confirmButtonText: 'Change Password',
          cancelButtonText: 'Skip for Today',
          onConfirm: () => push('/dashboard/profile/change-password'),
          onCancel: () => setCookie('skip_change_password', 1, { expires: 1 }),
        })
      }
    }
  }, [authInfo])

  return {}
}

export default useResetPasswordDialog
