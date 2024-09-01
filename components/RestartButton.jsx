import { Button } from "@/components/ui/button"
import Image from 'next/image';

const buttonStyle = {
    width: '124px', 
    height: '36px',
    borderRadius: '4px',
    border: '2px solid rgba(87, 186, 250, 1)', // 设置边框为蓝色
  };

export default function RestartButton({ onRestart }) {
  return (
    <Button 
      variant="outline" 
      className=" p-0 border-primary text-primary hover:bg-primary/10"
      style={buttonStyle}
      onClick={onRestart}  // 确保这里使用传入的 onRestart 函数
    >
      <div className="flex items-center justify-between w-full h-full"
       
      >

        <div className="flex items-center justify-center h-full px-2 "
             style={{ width: '32px',borderRight: '2px solid rgba(87, 186, 250, 1)',}}
        >
          <Image
            src="/webImage/restart.png"
            width={16}
            height={16}
            alt="Restart icon"
          />
        </div>

        <div className="flex-grow text-center ">
          <span 
            style={{ color:"rgba(87, 186, 250, 1)",fontWeight: "550"}}
          >RESTART</span>
        </div>
      </div>
    </Button>
  )
}