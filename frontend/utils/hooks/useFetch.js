import fetch from 'isomorphic-unfetch'
import { useState, useEffect } from 'react'

function useFetch(url, options) {
	const [response, setResponse] = useState(null)
	const [loading, setLoading] = useState(null)
	const [error, setError] = useState(null)

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true)
			try {
				const res = await fetch(url, options)
				const json = await res.json()
				setResponse(json)
				setLoading(false)
			} catch (error) {
				setError(error)
			}
		}
		fetchData()
	}, [])

	return { response, loading, error }
}

export default useFetch
