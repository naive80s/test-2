import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '页面未找到 - 安全密码生成器',
  description: '您访问的页面不存在',
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">页面未找到</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">抱歉，您访问的页面不存在。</p>
        <a 
          href="/"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          返回首页
        </a>
      </div>
    </div>
  )
} 