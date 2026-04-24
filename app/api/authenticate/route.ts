import { AuthAPI } from '@/constant/APIUrls'
import { NextResponse } from 'next/server'
import { AuthContextProps, PostAuthInfoResponse } from '@/type/Auth'
import { apiStatusChecker } from '@/lib/utils'

export async function POST(req: Request) {
  const authHeader = req.headers.get('authorization')

  if (!authHeader) {
    return NextResponse.json({
      success: false,
      error: 'Missing authorization header',
    })
  }

  try {
    const authInfoRes = await fetch(AuthAPI.POST_AUTH_INFO, {
      method: 'GET',
      headers: {
        Authorization: authHeader,
      },
      cache: 'no-cache',
    })

    if (!authInfoRes.ok) {
      return NextResponse.json({
        success: false,
        error: 'Unable to fetch auth info',
      })
    }

    const authInfoData: PostAuthInfoResponse = await authInfoRes.json()

    if (!apiStatusChecker(authInfoData.status) && !authInfoData.data) {
      return NextResponse.json({ success: false, error: authInfoData.error })
    }

    const permissionRes = await fetch(AuthAPI.GET_PERMISSION_LIST, {
      method: 'GET',
      headers: {
        Authorization: authHeader,
      },
      cache: 'no-cache',
    })

    if (!permissionRes.ok) {
      return NextResponse.json({
        success: false,
        error: 'Unable to fetch permission list',
      })
    }

    const permissionListData = await permissionRes.json()

    if (
      !apiStatusChecker(permissionListData.status) &&
      !permissionListData.data
    ) {
      return NextResponse.json({
        success: false,
        error: permissionListData?.error,
      })
    }

    const result: AuthContextProps = {
      authInfo: authInfoData.data,
      permissions: permissionListData.data,
    }

    return NextResponse.json({
      data: result,
      success: true,
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({
      success: false,
      error: 'Internal Server Error',
    })
  }
}
