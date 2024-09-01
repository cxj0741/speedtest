// src/components/speed-meter/index.ts
export { SpeedMeter } from './SpeedMeter'

export {SpeedTest} from './downAndUp'

// 使用这种结构，您可以在其他组件中这样导入和使用 SpeedMeter：
// import { SpeedMeter } from '@/components/speed-meter'
// <SpeedMeter value={50} max={100} unit="Mbps" label="下载速度" />