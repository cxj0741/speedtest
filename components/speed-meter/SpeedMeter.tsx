// src/components/speed-meter/SpeedMeter.tsx
'use client'

import React from 'react'
import { Progress } from "@/components/ui/progress"

interface SpeedMeterProps {
  value: number
  max: number
  unit: string
  label: string
}

export const SpeedMeter: React.FC<SpeedMeterProps> = ({ value, max, unit, label }) => {
  const percentage = (value / max) * 100

  return (
    <div className="w-full max-w-xs mx-auto text-center">
      <h3 className="text-lg font-semibold mb-2">{label}</h3>
      <div className="relative pt-1">
        <Progress value={percentage} className="h-4" />
      </div>
      <p className="mt-2 text-2xl font-bold">{value.toFixed(2)} <span className="text-sm font-normal">{unit}</span></p>
    </div>
  )
}