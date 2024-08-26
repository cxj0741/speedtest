'use client'

import { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

// ... (保留之前的 dataCenters 数组)
const dataCenters = [
  { name: 'South Africa (Johannesburg)', url: 'https://africa-south1-5tkroniexa-bq.a.run.app/api/ping' },
  { name: 'Taiwan (Changhua County)', url: 'https://asia-east1-5tkroniexa-de.a.run.app/api/ping' },
  { name: 'Hong Kong (Hong Kong)', url: 'https://asia-east2-5tkroniexa-df.a.run.app/api/ping' },
  { name: 'Japan (Tokyo)', url: 'https://asia-northeast1-5tkroniexa-an.a.run.app/api/ping' },
  { name: 'Japan (Osaka)', url: 'https://asia-northeast2-5tkroniexa-dt.a.run.app/api/ping' },
  { name: 'South Korea (Seoul)', url: 'https://asia-northeast3-5tkroniexa-du.a.run.app/api/ping' },
  { name: 'India (Mumbai)', url: 'https://asia-south1-5tkroniexa-el.a.run.app/api/ping' },
  { name: 'India (Delhi)', url: 'https://asia-south2-5tkroniexa-em.a.run.app/api/ping' },
  { name: 'Singapore (Jurong West)', url: 'https://asia-southeast1-5tkroniexa-as.a.run.app/api/ping' },
  { name: 'Indonesia (Jakarta)', url: 'https://asia-southeast2-5tkroniexa-et.a.run.app/api/ping' },
  { name: 'Australia (Sydney)', url: 'https://australia-southeast1-5tkroniexa-ts.a.run.app/api/ping' },
  { name: 'Australia (Melbourne)', url: 'https://australia-southeast2-5tkroniexa-km.a.run.app/api/ping' },
  { name: 'Poland (Warsaw)', url: 'https://europe-central2-5tkroniexa-lm.a.run.app/api/ping' },
  { name: 'Finland (Hamina)', url: 'https://europe-north1-5tkroniexa-lz.a.run.app/api/ping' },
  { name: 'Spain (Madrid)', url: 'https://europe-southwest1-5tkroniexa-no.a.run.app/api/ping' },
  { name: 'Belgium (St. Ghislain)', url: 'https://europe-west1-5tkroniexa-ew.a.run.app/api/ping' },
  { name: 'Germany (Berlin)', url: 'https://europe-west10-5tkroniexa-oe.a.run.app/api/ping' },
  { name: 'Italy (Turin)', url: 'https://europe-west12-5tkroniexa-og.a.run.app/api/ping' },
  { name: 'UK (London)', url: 'https://europe-west2-5tkroniexa-nw.a.run.app/api/ping' },
  { name: 'Germany (Frankfurt)', url: 'https://europe-west3-5tkroniexa-ey.a.run.app/api/ping' },
  { name: 'Netherlands (Eemshaven)', url: 'https://europe-west4-5tkroniexa-ez.a.run.app/api/ping' },
  { name: 'Switzerland (Zürich)', url: 'https://europe-west6-5tkroniexa-oa.a.run.app/api/ping' },
  { name: 'Italy (Milan)', url: 'https://europe-west8-5tkroniexa-oc.a.run.app/api/ping' },
  { name: 'France (Paris)', url: 'https://europe-west9-5tkroniexa-od.a.run.app/api/ping' },
  { name: 'Qatar (Doha)', url: 'https://me-central1-5tkroniexa-ww.a.run.app/api/ping' },
  { name: 'Saudi Arabia (Dammam)', url: 'https://me-central2-5tkroniexa-wx.a.run.app/api/ping' },
  { name: 'Israel (Tel Aviv)', url: 'https://me-west1-5tkroniexa-zf.a.run.app/api/ping' },
  { name: 'Canada (Montreal)', url: 'https://northamerica-northeast1-5tkroniexa-nn.a.run.app/api/ping' },
  { name: 'Canada (Toronto)', url: 'https://northamerica-northeast2-5tkroniexa-pd.a.run.app/api/ping' },
  { name: 'Brazil (São Paulo)', url: 'https://southamerica-east1-5tkroniexa-rj.a.run.app/api/ping' },
  { name: 'USA (Iowa)', url: 'https://us-central1-5tkroniexa-uc.a.run.app/api/ping' },
  { name: 'USA (South Carolina)', url: 'https://us-east1-5tkroniexa-ue.a.run.app/api/ping' },
  { name: 'USA (Northern Virginia)', url: 'https://us-east4-5tkroniexa-uk.a.run.app/api/ping' },
  { name: 'USA (Ohio)', url: 'https://us-east5-5tkroniexa-ul.a.run.app/api/ping' },
  { name: 'USA (Texas)', url: 'https://us-south1-5tkroniexa-vp.a.run.app/api/ping' },
  { name: 'USA (Oregon)', url: 'https://us-west1-5tkroniexa-uw.a.run.app/api/ping' },
  { name: 'USA (California)', url: 'https://us-west2-5tkroniexa-wl.a.run.app/api/ping' },
  { name: 'USA (Utah)', url: 'https://us-west3-5tkroniexa-wm.a.run.app/api/ping' },
  { name: 'USA (Nevada)', url: 'https://us-west4-5tkroniexa-wn.a.run.app/api/ping' },
];

interface MeasurementResult {
  latency: number
  jitter: number
}

interface DataCenterStatus {
  name: string
  url: string
  measurements: MeasurementResult[]
  avgLatency: number | null
  avgJitter: number | null
  status: 'idle' | 'measuring' | 'complete' | 'error'
  errorMessage?: string
}

const MEASUREMENT_COUNT = 5
const TIMEOUT_MS = 5000

export default function LatencyMeasure() {
  const [dataCenterStatuses, setDataCenterStatuses] = useState<DataCenterStatus[]>(
    dataCenters.map(dc => ({ 
      ...dc, 
      measurements: [],
      avgLatency: null,
      avgJitter: null,
      status: 'idle' 
    }))
  )

  const measureLatency = async (dataCenter: DataCenterStatus) => {
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
          measurements.push({ 
            latency,
            jitter: measurements.length > 0 ? Math.abs(latency - measurements[measurements.length - 1].latency) : 0
          })
        } else {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
      } catch (error) {
        console.error(`Error measuring ${dataCenter.name}:`, error)
        // Continue with other measurements
      }

      // Add a small delay between measurements
      await new Promise(resolve => setTimeout(resolve, 200))
    }

    if (measurements.length > 0) {
      const avgLatency = measurements.reduce((sum, m) => sum + m.latency, 0) / measurements.length
      const avgJitter = measurements.reduce((sum, m) => sum + m.jitter, 0) / measurements.length

      setDataCenterStatuses(prev => 
        prev.map(dc => dc.name === dataCenter.name ? { 
          ...dc, 
          measurements,
          avgLatency,
          avgJitter,
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
  }

  useEffect(() => {
    dataCenterStatuses.forEach(dataCenter => {
      if (dataCenter.status === 'idle') {
        measureLatency(dataCenter)
      }
    })
  }, [])

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Latency to Data Centers</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Data Center</TableHead>
            <TableHead>Avg Latency (ms)</TableHead>
            <TableHead>Avg Jitter (ms)</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dataCenterStatuses.map((dc) => (
            <TableRow key={dc.name}>
              <TableCell>{dc.name}</TableCell>
              <TableCell>
                {dc.status === 'complete' && dc.avgLatency?.toFixed(2)}
                {dc.status === 'measuring' && <Loader2 className="h-4 w-4 animate-spin" />}
                {dc.status === 'error' && <span className="text-red-500">Error</span>}
              </TableCell>
              <TableCell>
                {dc.status === 'complete' && dc.avgJitter?.toFixed(2)}
                {dc.status === 'measuring' && <Loader2 className="h-4 w-4 animate-spin" />}
                {dc.status === 'error' && <span className="text-red-500">Error</span>}
              </TableCell>
              <TableCell>
                {dc.status === 'complete' && 'Complete'}
                {dc.status === 'measuring' && 'Measuring'}
                {dc.status === 'error' && <span className="text-red-500">{dc.errorMessage}</span>}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button 
        onClick={() => dataCenterStatuses.forEach(measureLatency)} 
        className="mt-4"
      >
        Remeasure All
      </Button>
    </div>
  )
}