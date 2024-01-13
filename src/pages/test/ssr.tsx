import React from 'react'
import axios from 'axios'
import { GetServerSideProps } from 'next'

interface DataProps {
	data: [username: String]
}

export default function Test({ data }: DataProps) {



	return (
		<>
			<div>Ssr data fetching</div>
			<div>
				{data?.map((user: any, index: number) => (
					<div key={index}>{user.username}</div>
				))}
			</div>
		</>
	)
}



export const getServerSideProps: GetServerSideProps<DataProps> = async (context) => {
	try {
		const req = await axios.get('http://localhost:9000/data')
		if (req.data.success) {
			return { props: { data: req.data.data } }
		} else {
			return { props: { data: [] } }
		}
	} catch (err: any) {
		console.log(err)
		return {
			props: { data: [] }
		}
	}
}
