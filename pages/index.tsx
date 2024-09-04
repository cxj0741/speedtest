'use client'
import { useCallback, useState } from 'react'
import Image from 'next/image'
import RestartButton from 'components/RestartButton'
import LatencyMeasure from '@/components/LatencyMeasure'

const regions = ['All', 'Asia Pacific', 'North America', 'Europe', 'South America', 'Africa', 'China']
const cloudProviders = [ 'AWS', 'Azure', 'GCP']
export default function Home() {
  const [selectedRegion, setSelectedRegion] = useState('All')
  const [selectedProvider, setSelectedProvider] = useState('AWS')
  const [refreshKey, setRefreshKey] = useState(0)
  
  const handleRestart = useCallback(() => {
    console.log('Restart clicked')
    setRefreshKey(prevKey => prevKey + 1)
  }, [])

  const handleRegionChange = useCallback((region: string) => {
    setSelectedRegion(region)
    setRefreshKey(prevKey => prevKey + 1)
  }, [])

  const handleProviderChange = useCallback((provider: string) => {
    setSelectedProvider(provider)
    setRefreshKey(prevKey => prevKey + 1)
  }, [])

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white w-full">
        {/* 顶部导航栏 */}
        <div className="mx-auto">
          <div className="h-[64px] px-4 flex items-center  justify-between md:px-6 lg:px-8">
            <Image
              src="/webImage/header1.png"
              width={96}
              height={40}
              className="mr-2"
              alt="Header Image"
            />
            {/* 响应式设计，在小屏幕上显示 Restart 按钮 */}
            <div className="md:hidden">
              <RestartButton onRestart={handleRestart}/>
            </div>
          </div>

          <div
            className="h-[72px] flex items-center px-4 md:px-6 lg:px-8 justify-between"
            style={{
              background: "linear-gradient(270deg, #000000 0%, #2C84F3 100%)",
            }}
          >
            <div className="text-white">
              Discover Your Fastest Cloud Connection
            </div>

            {/* 响应式 */}
            <div className="ml-4 hidden sm:hidden md:ml-10 md:block lg:block xl:block 2xl:block">
              <button
                className="px-4 md:px-6 py-2 rounded-md font-medium text-white text-center bg-blue-500"
                style={{
                  fontFamily: "PingFangSC, PingFang SC",
                  fontSize: "14px",
                  lineHeight: "14px",
                  fontStyle: "normal",
                }}
              >
                Start experiencing
              </button>
            </div>

            <div className="ml-auto">
              <Image
                src="/webImage/header2.png"
                width={94}
                height={57}
                className="mr-2"
                alt="Header Image2"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto px-4 py-8 w-full">
        <div className="mx-auto rounded-lg overflow-hidden w-11/12">
          <div className="p-4 overflow-x-auto">

 {/* 云服务提供商选择组件 */}
 <div className="flex items-center justify-between pl-2 py-2 bg-white rounded-[8px] border border-solid mb-4 w-full">
              {cloudProviders.map((provider) => (
                <button
                  key={provider}
                  className={`flex-1 px-3 py-2 mx-1 rounded-md text-sm font-medium transition-colors duration-200 ${
                    selectedProvider === provider
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-600 hover:bg-gray-100"
                  } sm:text-base`}
                  onClick={() => handleProviderChange(provider)}
                >
                  {provider}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-start pl-2 h-[64px] bg-white rounded-[8px] border border-solid">
              {/* Show 2 buttons on small screens, 4 on medium screens, and 6 on large screens */}
              {regions.slice(0, 4).map((region) => (
                <button
                  key={region}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    selectedRegion === region
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                  onClick={() => handleRegionChange(region)}
                >
                  {region}
                </button>
              ))}

              <div className="hidden md:flex items-center justify-start">
                {regions.slice(4, 5).map((region) => (
                  <button
                    key={region}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      selectedRegion === region
                        ? "bg-blue-100 text-blue-600"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                    onClick={() => handleRegionChange(region)}
                  >
                    {region}
                  </button>
                ))}
              </div>

              <div className="hidden lg:flex items-center justify-start">
                {regions.slice(5).map((region) => (
                  <button
                    key={region}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      selectedRegion === region
                        ? "bg-blue-100 text-blue-600"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                    onClick={() => handleRegionChange(region)}
                  >
                    {region}
                  </button>
                ))}
              </div>

              <div className="pr-3.5 hidden md:flex flex-grow justify-end">
                <RestartButton onRestart={handleRestart}/>
              </div>
            </div>

            <LatencyMeasure 
            className='flex flex-grow'
              key={refreshKey} 
              region={selectedRegion}
              provider={selectedProvider}
              onRefresh={handleRestart}
            />
          </div>
        </div>
      </main>
    </div>
  );
}