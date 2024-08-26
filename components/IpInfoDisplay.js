'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function IpInfoDisplay() {
  const [ipInfo, setIpInfo] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchIpInfo = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/ipinfo/route')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      if (data.error) {
        throw new Error(data.error)
      }
      setIpInfo(data)
    } catch (error) {
      console.error('Error fetching IP info:', error)
      setError(`无法获取 IP 信息：${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchIpInfo()
  }, [])

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>IP 信息</CardTitle>
      </CardHeader>
      <CardContent>
        {loading && <p>加载中...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {ipInfo && (
          <div className="space-y-2">
            <p><strong>IP:</strong> {ipInfo.ip}</p>
            <p><strong>城市:</strong> {ipInfo.city}</p>
            <p><strong>地区:</strong> {ipInfo.region}</p>
            <p><strong>国家:</strong> {ipInfo.country}</p>
            <p><strong>位置:</strong> {ipInfo.loc}</p>
            <p><strong>组织:</strong> {ipInfo.org}</p>
            <p><strong>邮编:</strong> {ipInfo.postal}</p>
            <p><strong>时区:</strong> {ipInfo.timezone}</p>
            {ipInfo.asn && (
              <p><strong>ASN:</strong> {ipInfo.asn.asn} ({ipInfo.asn.name})</p>
            )}
            {ipInfo.company && (
              <p><strong>公司:</strong> {ipInfo.company.name}</p>
            )}
            {ipInfo.privacy && (
              <p><strong>隐私:</strong> 
                VPN: {ipInfo.privacy.vpn ? '是' : '否'}, 
                代理: {ipInfo.privacy.proxy ? '是' : '否'},
                托管: {ipInfo.privacy.hosting ? '是' : '否'}
              </p>
            )}
            {ipInfo.abuse && (
              <p><strong>滥用联系:</strong> {ipInfo.abuse.email}</p>
            )}
          </div>
        )}
        <Button onClick={fetchIpInfo} disabled={loading} className="mt-4">
          刷新 IP 信息
        </Button>
      </CardContent>
    </Card>
  )
}