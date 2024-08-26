import type { NextApiRequest, NextApiResponse } from 'next'

const IPINFO_TOKEN = '7d556492a5f937'; // 确保这个是有效的 API 令牌

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // 尝试获取客户端 IP
  let ip = Array.isArray(req.headers['x-forwarded-for']) 
    ? req.headers['x-forwarded-for'][0] 
    : req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  // 如果没有找到有效 IP 地址，使用一个测试 IP（仅用于开发和调试）
  if (!ip || ip === '::1' || ip === '127.0.0.1') {
    ip = '8.8.8.8'; // 仅用于测试目的，生产环境请删除
  }

  console.log('Client IP:', ip); // 检查 IP 是否正确

  try {
    const response = await fetch(`https://ipinfo.io/${ip}?token=${IPINFO_TOKEN}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching IP info:', error);
    res.status(500).json({ error: 'Failed to fetch IP info' });
  }
}

// 生产环境下的代码

// import type { NextApiRequest, NextApiResponse } from 'next';

// const IPINFO_TOKEN = '7d556492a5f937'; // 确保这个是有效的 API 令牌

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   // 获取客户端 IP
//   let ip = req.headers['x-forwarded-for']?.toString().split(',')[0].trim() || req.socket.remoteAddress;

//   // 检查 IP 地址的有效性
//   if (!ip || ip === '::1' || ip === '127.0.0.1') {
//     ip = ''; // 清除本地开发的 IP
//   }

//   console.log('Client IP:', ip); // 调试输出（生产环境中可以移除）

//   try {
//     // 确保 IP 不为空，才进行 fetch 请求
//     if (ip) {
//       const response = await fetch(`https://ipinfo.io/${ip}?token=${IPINFO_TOKEN}`);
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const data = await response.json();
//       res.status(200).json(data);
//     } else {
//       res.status(400).json({ error: 'Invalid IP address' });
//     }
//   } catch (error) {
//     console.error('Error fetching IP info:', error);
//     res.status(500).json({ error: 'Failed to fetch IP info' });
//   }
// }
