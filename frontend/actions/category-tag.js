import fetch from 'isomorphic-unfetch'

import { API } from '../config'

export function create(name, token, feature) {
	return fetch(`${API}/api/${feature}/create`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(name),
	})
		.then((response) => {
			return response.json()
		})
		.catch((err) => console.error(err))
}

export function remove(slug, token, feature) {
	return fetch(`${API}/api/${feature}/${slug}`, {
		method: 'DELETE',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		}
	})
		.then((response) => {
			return response.json()
		})
		.catch((err) => console.error(err))
}

export function getAll() {
	return fetch(`${API}/api/categories/`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		}
	})
		.then((response) => {
			return response.json()
		})
		.catch((err) => console.error(err))
}

export function getOne(slug) {
	return fetch(`${API}/api/categories/${slug}`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		}
	})
		.then((response) => {
			return response.json()
		})
		.catch((err) => console.error(err))
}

