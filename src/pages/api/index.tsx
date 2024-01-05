import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') {
        res.status(200).json({ success: true, message: 'Hello from Next.js!' })
    } else if (req.method === 'POST') {
        res.status(200).json({ success: true })
    }
}

