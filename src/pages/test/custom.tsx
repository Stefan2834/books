import React, { useEffect, useState } from 'react'
import axios from 'axios';


export default function Custom() {


    const [data, setData] = useState<{ username: string }[]>([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const req = await axios.get('http://localhost:9000/data')
                if (req.data.success) {
                    setData(req.data.data)
                } else {
                    console.log(req)
                }
            } catch(err) {
                console.log(err)
            }
        }

        getData()

    }, [])

    return (
        <>
            <div>data from the server using axios custom hook</div>
            <div>
                {data?.map((user: any, index: number) => (
                    <div key={index}>{user.username}</div>
                ))}
            </div>
        </>
    )
}
