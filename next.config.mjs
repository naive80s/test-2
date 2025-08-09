/** @type {import('next').NextConfig} */
const nextConfig = {
  // 启用严格模式以获得更好的性能
  reactStrictMode: true,
  
  // 启用SWC压缩器
  swcMinify: true,
  
  // 优化移动端性能
  compress: true,
  
  // 图片优化配置
  images: {
    // 响应式图片配置
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // PWA支持的headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          }
        ]
      }
    ]
  }
};

export default nextConfig;
