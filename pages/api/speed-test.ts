// import { NextApiRequest, NextApiResponse } from 'next'
// import speedTest from 'speedtest-net'

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'GET') {
//     try {
//       const test = await speedTest({acceptLicense: true, acceptGdpr: true})
//       res.status(200).json({
//         downloadSpeed: test.download.bandwidth / 125000, // Convert to Mbps
//         uploadSpeed: test.upload.bandwidth / 125000 // Convert to Mbps
//       })
//     } catch (error) {
//       console.error('Speed test failed:', error)
//       res.status(500).json({ error: 'Failed to perform speed test' })
//     }
//   } else {
//     res.setHeader('Allow', ['GET'])
//     res.status(405).end(`Method ${req.method} Not Allowed`)
//   }
// }