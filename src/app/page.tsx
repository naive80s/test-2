import { PasswordGenerator } from "@/components/password-generator"
import { Toaster } from "@/components/ui/toaster"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            安全密码生成器
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            创建强密码保护您的账户安全
          </p>
        </div>
        <PasswordGenerator />
      </div>
      <Toaster />
    </div>
  )
}
