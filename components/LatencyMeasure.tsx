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
  { name: 'Johannesburg (South Africa)', url: 'https://africa-south1-5tkroniexa-bq.a.run.app/api/ping', geography: 'Africa', region: 'South Africa' },
  { name: 'Cape Town (Africa)', url: 'https://ec2.af-south-1.amazonaws.com/ping', geography: 'Africa', region: 'South Africa' },
  { name: 'Cairo (Egypt)', url: 'https://teg-speedtest.tools.gcore.com/speedtest-backend/empty.php?cors=true', geography: 'Africa', region: 'Egypt' },
  { name: 'Lagos (Nigeria)', url: 'https://lgs-speedtest.tools.gcore.com/speedtest-backend/empty.php?cors=true', geography: 'Africa', region: 'Nigeria' },
  { name: 'Changhua County (Taiwan)', url: 'https://asia-east1-5tkroniexa-de.a.run.app/api/ping', geography: 'Asia Pacific', region: 'Taiwan' },
  { name: 'Hong Kong', url: 'https://asia-east2-5tkroniexa-df.a.run.app/api/ping', geography: 'China', region: 'Hong Kong' },
  { name: 'Tokyo', url: 'https://asia-northeast1-5tkroniexa-an.a.run.app/api/ping', geography: 'Asia Pacific', region: 'Japan' },
  { name: 'Osaka', url: 'https://asia-northeast2-5tkroniexa-dt.a.run.app/api/ping', geography: 'Asia Pacific', region: 'Japan' },
  { name: 'Seoul', url: 'https://asia-northeast3-5tkroniexa-du.a.run.app/api/ping', geography: 'Asia Pacific', region: 'Korea Central' },
  { name: 'Mumbai', url: 'https://asia-south1-5tkroniexa-el.a.run.app/api/ping', geography: 'Asia Pacific', region: 'India West' },
  { name: 'Delhi', url: 'https://asia-south2-5tkroniexa-em.a.run.app/api/ping', geography: 'Asia Pacific', region: 'India North' },
  { name: 'Singapore', url: 'https://asia-southeast1-5tkroniexa-as.a.run.app/api/ping', geography: 'Asia Pacific', region: 'Southeast Asia' },
  { name: 'Jakarta', url: 'https://asia-southeast2-5tkroniexa-et.a.run.app/api/ping', geography: 'Asia Pacific', region: 'Indonesia' },
  { name: 'Sydney', url: 'https://australia-southeast1-5tkroniexa-ts.a.run.app/api/ping', geography: 'Asia Pacific', region: 'Australia East' },
  { name: 'Melbourne', url: 'https://australia-southeast2-5tkroniexa-km.a.run.app/api/ping', geography: 'Asia Pacific', region: 'Australia Central' },
  { name: 'Warsaw', url: 'https://europe-central2-5tkroniexa-lm.a.run.app/api/ping', geography: 'Europe', region: 'Poland Central' },
  { name: 'Finland', url: 'https://europe-north1-5tkroniexa-lz.a.run.app/api/ping', geography: 'Europe', region: 'Finland' },
  { name: 'Madrid', url: 'https://europe-southwest1-5tkroniexa-no.a.run.app/api/ping', geography: 'Europe', region: 'Spain Central' },
  { name: 'Belgium', url: 'https://europe-west1-5tkroniexa-ew.a.run.app/api/ping', geography: 'Europe', region: 'Belgium Central' },
  { name: 'Berlin', url: 'https://europe-west10-5tkroniexa-oe.a.run.app/api/ping', geography: 'Europe', region: 'Germany Central' },
  { name: 'Turin', url: 'https://europe-west12-5tkroniexa-og.a.run.app/api/ping', geography: 'Europe', region: 'Italy Northwest' },
  { name: 'London', url: 'https://europe-west2-5tkroniexa-nw.a.run.app/api/ping', geography: 'Europe', region: 'UK South' },
  { name: 'Frankfurt', url: 'https://europe-west3-5tkroniexa-ey.a.run.app/api/ping', geography: 'Europe', region: 'Germany West Central' },
  { name: 'Netherlands', url: 'https://europe-west4-5tkroniexa-ez.a.run.app/api/ping', geography: 'Europe', region: 'Netherlands' },
  { name: 'Zürich', url: 'https://europe-west6-5tkroniexa-oa.a.run.app/api/ping', geography: 'Europe', region: 'Switzerland North' },
  { name: 'Milan', url: 'https://europe-west8-5tkroniexa-oc.a.run.app/api/ping', geography: 'Europe', region: 'Italy North' },
  { name: 'Paris', url: 'https://europe-west9-5tkroniexa-od.a.run.app/api/ping', geography: 'Europe', region: 'France Central' },
  { name: 'Doha', url: 'https://me-central1-5tkroniexa-ww.a.run.app/api/ping', geography: 'Middle East', region: 'Qatar' },
  { name: 'Dammam', url: 'https://me-central2-5tkroniexa-wx.a.run.app/api/ping', geography: 'Middle East', region: 'Saudi Arabia' },
  { name: 'Tel Aviv', url: 'https://me-west1-5tkroniexa-zf.a.run.app/api/ping', geography: 'Middle East', region: 'Israel' },
  { name: 'Montreal', url: 'https://northamerica-northeast1-5tkroniexa-nn.a.run.app/api/ping', geography: 'North America', region: 'Canada East' },
  { name: 'Toronto', url: 'https://northamerica-northeast2-5tkroniexa-pd.a.run.app/api/ping', geography: 'North America', region: 'Canada Central' },
  { name: 'São Paulo', url: 'https://southamerica-east1-5tkroniexa-rj.a.run.app/api/ping', geography: 'South America', region: 'Brazil South' },
  { name: 'Iowa', url: 'https://us-central1-5tkroniexa-uc.a.run.app/api/ping', geography: 'North America', region: 'Central US' },
  { name: 'South Carolina', url: 'https://us-east1-5tkroniexa-ue.a.run.app/api/ping', geography: 'North America', region: 'East US' },
  { name: 'Virginia', url: 'https://us-east4-5tkroniexa-uk.a.run.app/api/ping', geography: 'North America', region: 'East US' },
  { name: 'Ohio', url: 'https://us-east5-5tkroniexa-ul.a.run.app/api/ping', geography: 'North America', region: 'East US 2' },
  { name: 'Texas', url: 'https://us-south1-5tkroniexa-vp.a.run.app/api/ping', geography: 'North America', region: 'South Central US' },
  { name: 'Oregon', url: 'https://us-west1-5tkroniexa-uw.a.run.app/api/ping', geography: 'North America', region: 'West US' },
  { name: 'California', url: 'https://us-west2-5tkroniexa-wl.a.run.app/api/ping', geography: 'North America', region: 'West US 2' },
  { name: 'Utah', url: 'https://us-west3-5tkroniexa-wm.a.run.app/api/ping', geography: 'North America', region: 'West US 3' },
  { name: 'Nevada', url: 'https://us-west4-5tkroniexa-wn.a.run.app/api/ping', geography: 'North America', region: 'West US' },
  { name: 'Buenos Aires (Argentina)', url: 'https://syt-speedtest.tools.gcore.com/speedtest-backend/empty.php?cors=true', geography: 'South America', region: 'Argentina' },
  { name: 'AWS China Beijing', url: 'https://ec2.cn-north-1.amazonaws.com.cn/ping', geography: 'China', region: 'Beijing' },
  { name: 'AWS China Ningxia', url: 'https://ec2.cn-northwest-1.amazonaws.com.cn/ping', geography: 'China', region: 'Ningxia' },
];

// MeasurementResult 用于表示一次延迟测量的结果
interface MeasurementResult {
  latency: number
}

// 根据geography进行渲染
interface LatencyMeasureProps {
  region: string
  onRefresh: () => void
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

export default function LatencyMeasure({ region, onRefresh }: LatencyMeasureProps) {
  const [dataCenterStatuses, setDataCenterStatuses] = useState<DataCenterStatus[]>([])
  const [isMeasuring, setIsMeasuring] = useState(false)
  const measurementCompleted = useRef(false)

  const initializeDataCenters = useCallback(() => {
    const filteredDataCenters = region === 'All' 
      ? dataCenters 
      : dataCenters.filter(dc => dc.geography === region);

    setDataCenterStatuses(filteredDataCenters.map(dc => ({ 
      ...dc, 
      measurements: [],
      medianLatency: null,
      status: 'idle' 
    })))
    setIsMeasuring(false)
    measurementCompleted.current = false
  }, [region])

  useEffect(() => {
    initializeDataCenters()
  }, [initializeDataCenters, region])

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
      <h2 className="text-2xl font-bold mb-4">{region} 区域测速结果</h2>
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
                {dc.status === 'complete' && `${dc.medianLatency?.toFixed(0)} ms`}
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




