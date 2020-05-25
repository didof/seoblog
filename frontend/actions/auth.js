import fetch from 'isomorphic-unfetch'

import { API } from '../config'

export function signup(user) {
	return fetch(`${API}/api/auth/signup`, {
		method: 'POST',
		headers: {
			Accept: 'appliction/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(user),
	})
		.then((response) => {
			return response.json()
		})
		.catch((error) => console.error(error))
}
