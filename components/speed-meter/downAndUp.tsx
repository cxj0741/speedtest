'use client'
// 这个组件会在加载时自动运行速度测试，并允许用户手动重新测试。它显示下载和上传速度，并使用进度条来可视化速度。
import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface SpeedTestResult {
  downloadSpeed: number
  uploadSpeed: number
}

export const SpeedTest: React.FC = () => {
  const [result, setResult] = useState<SpeedTestResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const runSpeedTest = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/speed-test')
      if (!response.ok) {
        throw new Error('Speed test failed')
      }
      const data = await response.json()
      setResult(data)
    } catch (err) {
      setError('Failed to run speed test. Please try again.')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    runSpeedTest()
  }, [])

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>网络速度测试</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="text-center">
            <p>测试中，请稍候...</p>
            <Progress value={33} className="w-full mt-2" />
          </div>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : result ? (
          <div className="space-y-4">
            <div>
              <p className="font-semibold">下载速度</p>
              <p className="text-2xl font-bold">{result.downloadSpeed.toFixed(2)} Mbps</p>
              <Progress value={(result.downloadSpeed / 100) * 100} className="w-full mt-2" />
            </div>
            <div>
              <p className="font-semibold">上传速度</p>
              <p className="text-2xl font-bold">{result.uploadSpeed.toFixed(2)} Mbps</p>
              <Progress value={(result.uploadSpeed / 100) * 100} className="w-full mt-2" />
            </div>
          </div>
        ) : null}
        <Button onClick={runSpeedTest} disabled={isLoading} className="w-full mt-4">
          {isLoading ? '测试中...' : '重新测试'}
        </Button>
      </CardContent>
    </Card>
  )
}