'use client'

import { useCallback, useEffect, useState, useRef } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Loader2 } from 'lucide-react'

// 端点列表
const dataCenters = [
  { name: 'US East (N. Virginia)', url: 'https://ec2.us-east-1.amazonaws.com/ping', geography: 'North America', region: 'US East', provider: 'AWS' },
  { name: 'US East (Ohio)', url: 'https://ec2.us-east-2.amazonaws.com/ping', geography: 'North America', region: 'US East', provider: 'AWS' },
  { name: 'US West (N. California)', url: 'https://ec2.us-west-1.amazonaws.com/ping', geography: 'North America', region: 'US West', provider: 'AWS' },
  { name: 'US West (Oregon)', url: 'https://ec2.us-west-2.amazonaws.com/ping', geography: 'North America', region: 'US West', provider: 'AWS' },
  { name: 'Africa (Cape Town)', url: 'https://ec2.af-south-1.amazonaws.com/ping', geography: 'Africa', region: 'South Africa', provider: 'AWS' },
  { name: 'Asia Pacific (Hong Kong)', url: 'https://ec2.ap-east-1.amazonaws.com/ping', geography: 'China', region: 'Hong Kong', provider: 'AWS' },
  { name: 'Asia Pacific (Hyderabad)', url: 'https://ec2.ap-south-2.amazonaws.com/ping', geography: 'Asia Pacific', region: 'India', provider: 'AWS' },
  { name: 'Asia Pacific (Jakarta)', url: 'https://ec2.ap-southeast-3.amazonaws.com/ping', geography: 'Asia Pacific', region: 'Indonesia', provider: 'AWS' },
  { name: 'Asia Pacific (Melbourne)', url: 'https://ec2.ap-southeast-4.amazonaws.com/ping', geography: 'Asia Pacific', region: 'Australia', provider: 'AWS' },
  { name: 'Asia Pacific (Mumbai)', url: 'https://ec2.ap-south-1.amazonaws.com/ping', geography: 'Asia Pacific', region: 'India', provider: 'AWS' },
  { name: 'Asia Pacific (Osaka)', url: 'https://ec2.ap-northeast-3.amazonaws.com/ping', geography: 'Asia Pacific', region: 'Japan', provider: 'AWS' },
  { name: 'Asia Pacific (Seoul)', url: 'https://ec2.ap-northeast-2.amazonaws.com/ping', geography: 'Asia Pacific', region: 'Korea', provider: 'AWS' },
  { name: 'Asia Pacific (Singapore)', url: 'https://ec2.ap-southeast-1.amazonaws.com/ping', geography: 'Asia Pacific', region: 'Singapore', provider: 'AWS' },
  { name: 'Asia Pacific (Sydney)', url: 'https://ec2.ap-southeast-2.amazonaws.com/ping', geography: 'Asia Pacific', region: 'Australia', provider: 'AWS' },
  { name: 'Asia Pacific (Tokyo)', url: 'https://ec2.ap-northeast-1.amazonaws.com/ping', geography: 'Asia Pacific', region: 'Japan', provider: 'AWS' },
  { name: 'Canada (Central)', url: 'https://ec2.ca-central-1.amazonaws.com/ping', geography: 'North America', region: 'Canada', provider: 'AWS' },
  { name: 'Canada (Calgary)', url: 'https://ec2.ca-west-1.amazonaws.com/ping', geography: 'North America', region: 'Canada', provider: 'AWS' },
  { name: 'Europe (Frankfurt)', url: 'https://ec2.eu-central-1.amazonaws.com/ping', geography: 'Europe', region: 'Germany', provider: 'AWS' },
  { name: 'Europe (Ireland)', url: 'https://ec2.eu-west-1.amazonaws.com/ping', geography: 'Europe', region: 'Ireland', provider: 'AWS' },
  { name: 'Europe (London)', url: 'https://ec2.eu-west-2.amazonaws.com/ping', geography: 'Europe', region: 'UK', provider: 'AWS' },
  { name: 'Europe (Milan)', url: 'https://ec2.eu-south-1.amazonaws.com/ping', geography: 'Europe', region: 'Italy', provider: 'AWS' },
  { name: 'Europe (Paris)', url: 'https://ec2.eu-west-3.amazonaws.com/ping', geography: 'Europe', region: 'France', provider: 'AWS' },
  { name: 'Europe (Spain)', url: 'https://ec2.eu-south-2.amazonaws.com/ping', geography: 'Europe', region: 'Spain', provider: 'AWS' },
  { name: 'Europe (Stockholm)', url: 'https://ec2.eu-north-1.amazonaws.com/ping', geography: 'Europe', region: 'Sweden', provider: 'AWS' },
  { name: 'Europe (Zurich)', url: 'https://ec2.eu-central-2.amazonaws.com/ping', geography: 'Europe', region: 'Switzerland', provider: 'AWS' },
  { name: 'Middle East (Bahrain)', url: 'https://ec2.me-south-1.amazonaws.com/ping', geography: 'Middle East', region: 'Bahrain', provider: 'AWS' },
  { name: 'Middle East (UAE)', url: 'https://ec2.me-central-1.amazonaws.com/ping', geography: 'Middle East', region: 'UAE', provider: 'AWS' },
  { name: 'South America (São Paulo)', url: 'https://ec2.sa-east-1.amazonaws.com/ping', geography: 'South America', region: 'Brazil', provider: 'AWS' },
  { name: 'Israel (Tel Aviv)', url: 'https://ec2.il-central-1.amazonaws.com/ping', geography: 'Middle East', region: 'Israel', provider: 'AWS' },
  { name: 'AWS GovCloud (US-East)', url: 'https://ec2.us-gov-east-1.amazonaws.com/ping', geography: 'North America', region: 'US GovCloud', provider: 'AWS' },
  { name: 'AWS GovCloud (US-West)', url: 'https://ec2.us-gov-west-1.amazonaws.com/ping', geography: 'North America', region: 'US GovCloud', provider: 'AWS' },

   // Azure 数据中心信息
   { name: 'Australia Central', url: 'https://s3australiacentral.blob.core.windows.net/public/latency-test.json', geography: 'Asia Pacific', region: 'Australia', provider: 'Azure' },
   { name: 'Australia East', url: 'https://s3australiaeast.blob.core.windows.net/public/latency-test.json', geography: 'Asia Pacific', region: 'Australia', provider: 'Azure' },
   { name: 'Australia Southeast', url: 'https://s3australiasoutheast.blob.core.windows.net/public/latency-test.json', geography: 'Asia Pacific', region: 'Australia', provider: 'Azure' },
   { name: 'Central India', url: 'https://s3centralindia.blob.core.windows.net/public/latency-test.json', geography: 'Asia Pacific', region: 'India', provider: 'Azure' },
   { name: 'East Asia', url: 'https://s3eastasia.blob.core.windows.net/public/latency-test.json', geography: 'Asia Pacific', region: 'East Asia', provider: 'Azure' },
   { name: 'Japan East', url: 'https://s3japaneast.blob.core.windows.net/public/latency-test.json', geography: 'Asia Pacific', region: 'Japan', provider: 'Azure' },
   { name: 'Japan West', url: 'https://s3japanwest.blob.core.windows.net/public/latency-test.json', geography: 'Asia Pacific', region: 'Japan', provider: 'Azure' },
   { name: 'Korea Central', url: 'https://s3koreacentral.blob.core.windows.net/public/latency-test.json', geography: 'Asia Pacific', region: 'Korea', provider: 'Azure' },
   { name: 'Korea South', url: 'https://s3koreasouth.blob.core.windows.net/public/latency-test.json', geography: 'Asia Pacific', region: 'Korea', provider: 'Azure' },
   { name: 'Southeast Asia', url: 'https://s3southeastasia.blob.core.windows.net/public/latency-test.json', geography: 'Asia Pacific', region: 'Southeast Asia', provider: 'Azure' },
   { name: 'South India', url: 'https://s3southindia.blob.core.windows.net/public/latency-test.json', geography: 'Asia Pacific', region: 'India', provider: 'Azure' },
   { name: 'West India', url: 'https://s3westindia.blob.core.windows.net/public/latency-test.json', geography: 'Asia Pacific', region: 'India', provider: 'Azure' },
   { name: 'France Central', url: 'https://s3francecentral.blob.core.windows.net/public/latency-test.json', geography: 'Europe', region: 'France', provider: 'Azure' },
   { name: 'Germany West Central', url: 'https://s3germanywestcentral.blob.core.windows.net/public/latency-test.json', geography: 'Europe', region: 'Germany', provider: 'Azure' },
   { name: 'Italy North', url: 'https://s3italynorth.blob.core.windows.net/public/latency-test.json', geography: 'Europe', region: 'Italy', provider: 'Azure' },
   { name: 'North Europe', url: 'https://s3northeurope.blob.core.windows.net/public/latency-test.json', geography: 'Europe', region: 'North Europe', provider: 'Azure' },
   { name: 'Norway East', url: 'https://s3norwayeast.blob.core.windows.net/public/latency-test.json', geography: 'Europe', region: 'Norway', provider: 'Azure' },
   { name: 'Poland Central', url: 'https://s3polandcentral.blob.core.windows.net/public/latency-test.json', geography: 'Europe', region: 'Poland', provider: 'Azure' },
   { name: 'Sweden Central', url: 'https://s3swedencentral.blob.core.windows.net/public/latency-test.json', geography: 'Europe', region: 'Sweden', provider: 'Azure' },
   { name: 'Switzerland North', url: 'https://s3switzerlandnorth.blob.core.windows.net/public/latency-test.json', geography: 'Europe', region: 'Switzerland', provider: 'Azure' },
   { name: 'UK South', url: 'https://s3uksouth.blob.core.windows.net/public/latency-test.json', geography: 'Europe', region: 'United Kingdom', provider: 'Azure' },
   { name: 'UK West', url: 'https://s3ukwest.blob.core.windows.net/public/latency-test.json', geography: 'Europe', region: 'United Kingdom', provider: 'Azure' },
   { name: 'West Europe', url: 'https://s3westeurope.blob.core.windows.net/public/latency-test.json', geography: 'Europe', region: 'West Europe', provider: 'Azure' },
   { name: 'Central US', url: 'https://s3centralus.blob.core.windows.net/public/latency-test.json', geography: 'North America', region: 'United States', provider: 'Azure' },
   { name: 'East US', url: 'https://s3eastus.blob.core.windows.net/public/latency-test.json', geography: 'North America', region: 'United States', provider: 'Azure' },
   { name: 'East US 2', url: 'https://s3eastus2.blob.core.windows.net/public/latency-test.json', geography: 'North America', region: 'United States', provider: 'Azure' },
   { name: 'North Central US', url: 'https://s3northcentralus.blob.core.windows.net/public/latency-test.json', geography: 'North America', region: 'United States', provider: 'Azure' },
   { name: 'South Central US', url: 'https://s3southcentralus.blob.core.windows.net/public/latency-test.json', geography: 'North America', region: 'United States', provider: 'Azure' },
   { name: 'West Central US', url: 'https://s3westcentralus.blob.core.windows.net/public/latency-test.json', geography: 'North America', region: 'United States', provider: 'Azure' },
   { name: 'West US', url: 'https://s3westus.blob.core.windows.net/public/latency-test.json', geography: 'North America', region: 'United States', provider: 'Azure' },
   { name: 'West US 2', url: 'https://s3westus2.blob.core.windows.net/public/latency-test.json', geography: 'North America', region: 'United States', provider: 'Azure' },
   { name: 'West US 3', url: 'https://s3westus3.blob.core.windows.net/public/latency-test.json', geography: 'North America', region: 'United States', provider: 'Azure' },
   { name: 'Israel Central', url: 'https://s3israelcentral.blob.core.windows.net/public/latency-test.json', geography: 'Middle East', region: 'Israel', provider: 'Azure' },
   { name: 'Qatar Central', url: 'https://s3qatarcentral.blob.core.windows.net/public/latency-test.json', geography: 'Middle East', region: 'Qatar', provider: 'Azure' },
   { name: 'UAE North', url: 'https://s3uaenorth.blob.core.windows.net/public/latency-test.json', geography: 'Middle East', region: 'United Arab Emirates', provider: 'Azure' },
   { name: 'Canada Central', url: 'https://s3canadacentral.blob.core.windows.net/public/latency-test.json', geography: 'North America', region: 'Canada', provider: 'Azure' },
   { name: 'Canada East', url: 'https://s3canadaeast.blob.core.windows.net/public/latency-test.json', geography: 'North America', region: 'Canada', provider: 'Azure' },
   { name: 'Brazil South', url: 'https://s3brazilsouth.blob.core.windows.net/public/latency-test.json', geography: 'South America', region: 'Brazil', provider: 'Azure' },
   { name: 'South Africa North', url: 'https://s3southafricanorth.blob.core.windows.net/public/latency-test.json', geography: 'Africa', region: 'South Africa', provider: 'Azure' },

    // GCP 数据中心信息
  { name: 'South Africa (Johannesburg)', url: 'https://africa-south1-5tkroniexa-bq.a.run.app/api/ping', geography: 'Africa', region: 'South Africa', provider: 'GCP' },
  { name: 'Taiwan (Changhua County)', url: 'https://asia-east1-5tkroniexa-de.a.run.app/api/ping', geography: 'Asia Pacific', region: 'Taiwan', provider: 'GCP' },
  { name: 'Hong Kong', url: 'https://asia-east2-5tkroniexa-df.a.run.app/api/ping', geography: 'China', region: 'Hong Kong', provider: 'GCP' },
  { name: 'Japan (Tokyo)', url: 'https://asia-northeast1-5tkroniexa-an.a.run.app/api/ping', geography: 'Asia Pacific', region: 'Japan', provider: 'GCP' },
  { name: 'Japan (Osaka)', url: 'https://asia-northeast2-5tkroniexa-dt.a.run.app/api/ping', geography: 'Asia Pacific', region: 'Japan', provider: 'GCP' },
  { name: 'South Korea (Seoul)', url: 'https://asia-northeast3-5tkroniexa-du.a.run.app/api/ping', geography: 'Asia Pacific', region: 'South Korea', provider: 'GCP' },
  { name: 'India (Mumbai)', url: 'https://asia-south1-5tkroniexa-el.a.run.app/api/ping', geography: 'Asia Pacific', region: 'India', provider: 'GCP' },
  { name: 'India (Delhi)', url: 'https://asia-south2-5tkroniexa-em.a.run.app/api/ping', geography: 'Asia Pacific', region: 'India', provider: 'GCP' },
  { name: 'Singapore (Jurong West)', url: 'https://asia-southeast1-5tkroniexa-as.a.run.app/api/ping', geography: 'Asia Pacific', region: 'Singapore', provider: 'GCP' },
  { name: 'Indonesia (Jakarta)', url: 'https://asia-southeast2-5tkroniexa-et.a.run.app/api/ping', geography: 'Asia Pacific', region: 'Indonesia', provider: 'GCP' },
  { name: 'Australia (Sydney)', url: 'https://australia-southeast1-5tkroniexa-ts.a.run.app/api/ping', geography: 'Asia Pacific', region: 'Australia', provider: 'GCP' },
  { name: 'Australia (Melbourne)', url: 'https://australia-southeast2-5tkroniexa-km.a.run.app/api/ping', geography: 'Asia Pacific', region: 'Australia', provider: 'GCP' },
  { name: 'Poland (Warsaw)', url: 'https://europe-central2-5tkroniexa-lm.a.run.app/api/ping', geography: 'Europe', region: 'Poland', provider: 'GCP' },
  { name: 'Finland (Hamina)', url: 'https://europe-north1-5tkroniexa-lz.a.run.app/api/ping', geography: 'Europe', region: 'Finland', provider: 'GCP' },
  { name: 'Spain (Madrid)', url: 'https://europe-southwest1-5tkroniexa-no.a.run.app/api/ping', geography: 'Europe', region: 'Spain', provider: 'GCP' },
  { name: 'Belgium (St. Ghislain)', url: 'https://europe-west1-5tkroniexa-ew.a.run.app/api/ping', geography: 'Europe', region: 'Belgium', provider: 'GCP' },
  { name: 'Germany (Berlin)', url: 'https://europe-west10-5tkroniexa-oe.a.run.app/api/ping', geography: 'Europe', region: 'Germany', provider: 'GCP' },
  { name: 'Italy (Turin)', url: 'https://europe-west12-5tkroniexa-og.a.run.app/api/ping', geography: 'Europe', region: 'Italy', provider: 'GCP' },
  { name: 'UK (London)', url: 'https://europe-west2-5tkroniexa-nw.a.run.app/api/ping', geography: 'Europe', region: 'United Kingdom', provider: 'GCP' },
  { name: 'Germany (Frankfurt)', url: 'https://europe-west3-5tkroniexa-ey.a.run.app/api/ping', geography: 'Europe', region: 'Germany', provider: 'GCP' },
  { name: 'Netherlands (Eemshaven)', url: 'https://europe-west4-5tkroniexa-ez.a.run.app/api/ping', geography: 'Europe', region: 'Netherlands', provider: 'GCP' },
  { name: 'Switzerland (Zürich)', url: 'https://europe-west6-5tkroniexa-oa.a.run.app/api/ping', geography: 'Europe', region: 'Switzerland', provider: 'GCP' },
  { name: 'Italy (Milan)', url: 'https://europe-west8-5tkroniexa-oc.a.run.app/api/ping', geography: 'Europe', region: 'Italy', provider: 'GCP' },
  { name: 'France (Paris)', url: 'https://europe-west9-5tkroniexa-od.a.run.app/api/ping', geography: 'Europe', region: 'France', provider: 'GCP' },
  { name: 'Qatar (Doha)', url: 'https://me-central1-5tkroniexa-ww.a.run.app/api/ping', geography: 'Middle East', region: 'Qatar', provider: 'GCP' },
  { name: 'Saudi Arabia (Dammam)', url: 'https://me-central2-5tkroniexa-wx.a.run.app/api/ping', geography: 'Middle East', region: 'Saudi Arabia', provider: 'GCP' },
  { name: 'Israel (Tel Aviv)', url: 'https://me-west1-5tkroniexa-zf.a.run.app/api/ping', geography: 'Middle East', region: 'Israel', provider: 'GCP' },
  { name: 'Canada (Montreal)', url: 'https://northamerica-northeast1-5tkroniexa-nn.a.run.app/api/ping', geography: 'North America', region: 'Canada', provider: 'GCP' },
  { name: 'Canada (Toronto)', url: 'https://northamerica-northeast2-5tkroniexa-pd.a.run.app/api/ping', geography: 'North America', region: 'Canada', provider: 'GCP' },
  { name: 'Brazil (São Paulo)', url: 'https://southamerica-east1-5tkroniexa-rj.a.run.app/api/ping', geography: 'South America', region: 'Brazil', provider: 'GCP' },
  { name: 'Chile (Santiago)', url: 'https://southamerica-west1-5tkroniexa-rj.a.run.app/api/ping', geography: 'South America', region: 'Chile', provider: 'GCP' },
  { name: 'USA (Iowa)', url: 'https://us-central1-5tkroniexa-uc.a.run.app/api/ping', geography: 'North America', region: 'United States', provider: 'GCP' },
  { name: 'USA (South Carolina)', url: 'https://us-east1-5tkroniexa-ue.a.run.app/api/ping', geography: 'North America', region: 'United States', provider: 'GCP' },
  { name: 'USA (Northern Virginia)', url: 'https://us-east4-5tkroniexa-uk.a.run.app/api/ping', geography: 'North America', region: 'United States', provider: 'GCP' },
  { name: 'USA (Ohio)', url: 'https://us-east5-5tkroniexa-ul.a.run.app/api/ping', geography: 'North America', region: 'United States', provider: 'GCP' },
  { name: 'USA (Texas)', url: 'https://us-south1-5tkroniexa-vp.a.run.app/api/ping', geography: 'North America', region: 'United States', provider: 'GCP' },
  { name: 'USA (Oregon)', url: 'https://us-west1-5tkroniexa-uw.a.run.app/api/ping', geography: 'North America', region: 'United States', provider: 'GCP' },
  { name: 'USA (California)', url: 'https://us-west2-5tkroniexa-wl.a.run.app/api/ping', geography: 'North America', region: 'United States', provider: 'GCP' },
  { name: 'USA (Utah)', url: 'https://us-west3-5tkroniexa-wm.a.run.app/api/ping', geography: 'North America', region: 'United States', provider: 'GCP' },
  { name: 'USA (Nevada)', url: 'https://us-west4-5tkroniexa-wn.a.run.app/api/ping', geography: 'North America', region: 'United States', provider: 'GCP' },
];

// MeasurementResult 用于表示一次延迟测量的结果
interface MeasurementResult {
  latency: number
}

// 根据geography进行渲染
interface LatencyMeasureProps {
  region: string;
  provider: string;
  onRefresh: () => void;
  className?: string; // 添加这行以接受 className prop
}

// DataCenterStatus 用于表示数据中心的状态，包括其 name、url、geography、region、measurements、medianLatency、status 和可选的 errorMessage。
interface DataCenterStatus {
  name: string
  url: string
  geography: string
  region: string
  measurements: MeasurementResult[]
  medianLatency: number | null
  status: 'idle' | 'measuring' | 'complete' | 'error'
  errorMessage?: string
}

// 常量定义
const MEASUREMENT_COUNT = 5 // 增加到5次测量
const TIMEOUT_MS = 5000
const BATCH_SIZE = 5
const DELAY_BETWEEN_BATCHES = 1000 // 1 second
const DELAY_BETWEEN_MEASUREMENTS = 200 // 200ms between each measurement

// 添加一个新的函数来决定延迟的颜色
const getLatencyColor = (latency: number | null) => {
  if (latency === null) return 'text-gray-500';
  if (latency < 300) return 'text-green-500';
  if (latency < 500) return 'text-yellow-500';
  return 'text-red-500';
};

export default function LatencyMeasure({ region, provider, onRefresh, className }: LatencyMeasureProps){
  const [dataCenterStatuses, setDataCenterStatuses] = useState<DataCenterStatus[]>([])
  const [isMeasuring, setIsMeasuring] = useState(false)
  const measurementCompleted = useRef(false)

  const initializeDataCenters = useCallback(() => {
    // 首先根据 provider 过滤数据中心
    let filteredDataCenters = dataCenters.filter(dc => dc.provider === provider);

    // 然后根据 region 进一步过滤
    if (region !== 'All') {
      filteredDataCenters = filteredDataCenters.filter(dc => dc.geography === region);
    }

    setDataCenterStatuses(filteredDataCenters.map(dc => ({ 
      ...dc, 
      measurements: [],
      medianLatency: null,
      status: 'idle' 
    })))
    setIsMeasuring(false)
    measurementCompleted.current = false
  }, [region, provider])

  useEffect(() => {
    initializeDataCenters()
  }, [initializeDataCenters, region, provider])

  const measureLatency = useCallback(async (dataCenter: DataCenterStatus) => {
    console.log(`开始测量 ${dataCenter.name}`)
    setDataCenterStatuses(prev => 
      prev.map(dc => dc.name === dataCenter.name ? { ...dc, status: 'measuring' } : dc)
    )

    const measurements: MeasurementResult[] = []

    for (let i = 0; i < MEASUREMENT_COUNT; i++) {
      const start = performance.now()
      try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS)

        const response = await fetch(dataCenter.url, { 
          method: 'GET',
          signal: controller.signal
        })

        clearTimeout(timeoutId)

        if (response.ok) {
          const end = performance.now()
          const latency = end - start
          measurements.push({ latency })
        } else {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
      } catch (error) {
        console.error(`Error measuring ${dataCenter.name}:`, error)
      }

      await new Promise(resolve => setTimeout(resolve, DELAY_BETWEEN_MEASUREMENTS))
    }

    if (measurements.length > 0) {
      // 去除异常值
      const sortedLatencies = measurements.map(m => m.latency).sort((a, b) => a - b)
      const q1 = sortedLatencies[Math.floor(sortedLatencies.length / 4)]
      const q3 = sortedLatencies[Math.floor(sortedLatencies.length * 3 / 4)]
      const iqr = q3 - q1
      const validLatencies = sortedLatencies.filter(l => l >= q1 - 1.5 * iqr && l <= q3 + 1.5 * iqr)

      // 使用中位数
      const medianLatency = validLatencies[Math.floor(validLatencies.length / 2)]

      setDataCenterStatuses(prev => 
        prev.map(dc => dc.name === dataCenter.name ? { 
          ...dc, 
          measurements: validLatencies.map(l => ({ latency: l })),
          medianLatency,
          status: 'complete' 
        } : dc)
      )
    } else {
      setDataCenterStatuses(prev => 
        prev.map(dc => dc.name === dataCenter.name ? { 
          ...dc, 
          status: 'error',
          errorMessage: 'All measurements failed' 
        } : dc)
      )
    }
    console.log(`完成测量 ${dataCenter.name}，中位数延迟: ${measurements.length > 0 ? measurements[Math.floor(measurements.length / 2)].latency.toFixed(0) : 'N/A'} ms`)
  }, [])

  const measureLatencyInBatches = useCallback(async (dataCenters: DataCenterStatus[]) => {
    if (isMeasuring) return; // 防止重复测量
    setIsMeasuring(true)
    for (let i = 0; i < dataCenters.length; i += BATCH_SIZE) {
      const batch = dataCenters.slice(i, i + BATCH_SIZE);
      console.log(`开始测量批次 ${Math.floor(i / BATCH_SIZE) + 1}，包含 ${batch.length} 个数据中心`)
      await Promise.all(batch.map(dc => measureLatency(dc)));
      if (i + BATCH_SIZE < dataCenters.length) {
        console.log(`批次 ${Math.floor(i / BATCH_SIZE) + 1} 完成，等待 ${DELAY_BETWEEN_BATCHES}ms 后开始下一批次`)
        await new Promise(resolve => setTimeout(resolve, DELAY_BETWEEN_BATCHES));
      }
    }
    setIsMeasuring(false)
    measurementCompleted.current = true
    console.log('所有测量完成')
  }, [measureLatency, isMeasuring])

  useEffect(() => {
    if (dataCenterStatuses.length > 0 && !isMeasuring && !measurementCompleted.current) {
      console.log(`开始测量 ${region} 区域的 ${dataCenterStatuses.length} 个数据中心`)
      measureLatencyInBatches(dataCenterStatuses);
    }
  }, [dataCenterStatuses, measureLatencyInBatches, region, isMeasuring]);

  const sortedDataCenters = [...dataCenterStatuses].sort((a, b) => {
    if (a.medianLatency === null && b.medianLatency === null) return 0;
    if (a.medianLatency === null) return 1;
    if (b.medianLatency === null) return -1;
    return a.medianLatency - b.medianLatency;
  });

  return (
    <div className="container mx-auto p-4 mt-4 w-full rounded-[8px] border border-solid">
      <h2 className="text-2xl font-bold mb-4">
        {provider} - {region} Latency Test Results
      </h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold text-black hidden md:table-cell">Geography</TableHead>
            <TableHead className="font-bold text-black hidden md:table-cell">Region</TableHead>
            <TableHead className="font-bold text-black">Location</TableHead>
            <TableHead className="font-bold text-black">Median Latency</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedDataCenters.map((dc) => (
            <TableRow key={dc.name}>
              <TableCell className="hidden md:table-cell">{dc.geography}</TableCell>
              <TableCell className="hidden md:table-cell">{dc.region}</TableCell>
              <TableCell>{dc.name}</TableCell>
              <TableCell>
                {dc.status === 'complete' && (
                  <span className={getLatencyColor(dc.medianLatency)}>
                    {dc.medianLatency?.toFixed(0)} ms
                  </span>
                )}
                {dc.status === 'measuring' && <Loader2 className="h-4 w-4 animate-spin" />}
                {dc.status === 'error' && <span className="text-red-500">Error</span>}
                {dc.status === 'idle' && <span>-</span>}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}




