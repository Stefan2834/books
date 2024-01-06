import React from 'react'
import axios from 'axios'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { signOut } from 'next-auth/react'

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
	const session = await getSession(context);


	try {
		const req = await axios.get('http://localhost:9000/data', { headers: { authorization: `Bearer ${session?.user?.accessToken}` } })
		if (req.data.success) {
			return { props: { data: req.data.data } }
		} else {
			return { props: { data: [] } }
		}
	} catch (err: any) {
		console.log('Error message', err?.response?.status)
		if (err?.response?.status === 401) {
			try {
				const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/login/refresh`, {
					refreshToken: session?.user.refreshToken,
				});
				if (session && res?.data?.success) {
					console.log('REFRESHING ACCESS TOKEN')
					session.user.accessToken = ""
					const req = await axios.get('http://localhost:9000/data', { headers: { authorization: `Bearer ${res?.data?.accessToken}` } })
					if (req.data.success) {
						return { props: { data: req.data.data } }
					} else {
						return { props: { data: [] } }
					}
				}
				else {
					console.log('THE REFRESH TOKEN HAS EXPIRED')
					signOut();
					return { props: { data: [] } }
				}
			} catch (err: any) {
				console.log(err?.message)
				return { props: { data: [] } }
			}
		} else {
			return { props: { data: [] } }
		}
	}
}
