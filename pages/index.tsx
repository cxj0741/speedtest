// pages/index.js
import LatencyMeasure from '../components/LatencyMeasure'; // 导入组件
import IpInfoDisplay from '../components/IpInfoDisplay'
export default function Home() {
  return (
    <div>
      {/* <h1>Network Latency Measurement</h1> */}
      <LatencyMeasure /> {/* 使用组件 */}
      <IpInfoDisplay />
    </div>
  );
}
