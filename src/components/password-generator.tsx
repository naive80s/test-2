"use client"

import React, { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Copy, RefreshCw, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function PasswordGenerator() {
  const [password, setPassword] = useState("")
  const [length, setLength] = useState([16])
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(true)
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const generatePassword = useCallback(() => {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const lowercase = "abcdefghijklmnopqrstuvwxyz"
    const numbers = "0123456789"
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?"

    let chars = ""
    if (includeUppercase) chars += uppercase
    if (includeLowercase) chars += lowercase
    if (includeNumbers) chars += numbers
    if (includeSymbols) chars += symbols

    if (chars === "") {
      setPassword("")
      return
    }

    let result = ""
    for (let i = 0; i < length[0]; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }

    setPassword(result)
    setCopied(false)
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols])

  const copyToClipboard = async () => {
    if (password) {
      try {
        await navigator.clipboard.writeText(password)
        setCopied(true)
        toast({
          title: "✅ 复制成功",
          description: "密码已复制到剪贴板",
          duration: 3000,
        })
        setTimeout(() => setCopied(false), 2000)
      } catch (err) {
        console.error("复制失败:", err)
        // 移动端备用复制方法
        try {
          const textArea = document.createElement('textarea')
          textArea.value = password
          textArea.style.position = 'fixed'
          textArea.style.left = '-999999px'
          textArea.style.top = '-999999px'
          document.body.appendChild(textArea)
          textArea.focus()
          textArea.select()
          document.execCommand('copy')
          document.body.removeChild(textArea)
          setCopied(true)
          toast({
            title: "✅ 复制成功",
            description: "密码已复制到剪贴板",
            duration: 3000,
          })
          setTimeout(() => setCopied(false), 2000)
        } catch (fallbackErr) {
          toast({
            title: "❌ 复制失败",
            description: "无法复制密码到剪贴板",
            variant: "destructive",
            duration: 3000,
          })
        }
      }
    }
  }

  const getPasswordStrength = () => {
    if (!password) return { strength: "无", color: "text-gray-500" }
    
    let score = 0
    if (includeUppercase && /[A-Z]/.test(password)) score++
    if (includeLowercase && /[a-z]/.test(password)) score++
    if (includeNumbers && /\d/.test(password)) score++
    if (includeSymbols && /[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password)) score++
    if (password.length >= 12) score++
    if (password.length >= 16) score++

    if (score <= 2) return { strength: "弱", color: "text-red-500" }
    if (score <= 4) return { strength: "中等", color: "text-yellow-500" }
    if (score <= 5) return { strength: "强", color: "text-green-500" }
    return { strength: "非常强", color: "text-emerald-500" }
  }

  const strength = getPasswordStrength()

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
          🔐 密码生成器
        </CardTitle>
        <CardDescription className="text-sm">
          生成安全、随机的密码
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 sm:space-y-6">
        {/* 密码显示区域 */}
        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm">生成的密码</Label>
          <div className="flex gap-2">
            <Input
              id="password"
              value={password}
              readOnly
              placeholder="点击生成按钮创建密码"
              className="font-mono text-xs sm:text-sm"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={copyToClipboard}
              disabled={!password}
              className="shrink-0"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
          {password && (
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span>强度: <span className={strength.color}>{strength.strength}</span></span>
              <span>长度: {password.length}</span>
            </div>
          )}
        </div>

        {/* 密码长度滑块 */}
        <div className="space-y-2">
          <Label className="text-sm">密码长度: {length[0]}</Label>
          <Slider
            value={length}
            onValueChange={setLength}
            max={50}
            min={4}
            step={1}
            className="w-full"
          />
        </div>

        {/* 字符类型选项 */}
        <div className="space-y-3">
          <Label className="text-sm">包含字符类型</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="uppercase"
                checked={includeUppercase}
                onCheckedChange={(checked) => setIncludeUppercase(checked as boolean)}
              />
              <Label htmlFor="uppercase" className="text-sm">大写字母 (A-Z)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="lowercase"
                checked={includeLowercase}
                onCheckedChange={(checked) => setIncludeLowercase(checked as boolean)}
              />
              <Label htmlFor="lowercase" className="text-sm">小写字母 (a-z)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="numbers"
                checked={includeNumbers}
                onCheckedChange={(checked) => setIncludeNumbers(checked as boolean)}
              />
              <Label htmlFor="numbers" className="text-sm">数字 (0-9)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="symbols"
                checked={includeSymbols}
                onCheckedChange={(checked) => setIncludeSymbols(checked as boolean)}
              />
              <Label htmlFor="symbols" className="text-sm">特殊字符 (!@#$%^&*)</Label>
            </div>
          </div>
        </div>

        {/* 生成按钮 */}
        <Button
          onClick={generatePassword}
          className="w-full"
          disabled={!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols}
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          生成密码
        </Button>
      </CardContent>
    </Card>
  )
} 