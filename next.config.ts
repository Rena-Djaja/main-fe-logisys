import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    dirs: ['app', 'components', 'constant', 'lib', 'validations'],
  },
}

export default nextConfig
