import fetch from 'isomorphic-unfetch'

import { API } from '../config'

export const create = (blog, token) => {
	for (var pair of blog.entries()) {
		console.log(pair[0] + ', ' + pair[1])
	}
	return fetch(`${API}/api/blog/create`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: blog,
	})
		.then((response) => {
			return response.json()
		})
		.catch((err) => console.error(err))
}
