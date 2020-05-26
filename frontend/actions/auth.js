import fetch from 'isomorphic-unfetch'
import cookie from 'js-cookie'

import { API } from '../config'

export function signup(credentials) {
	return fetch(`${API}/api/auth/signup`, {
		method: 'POST',
		headers: {
			Accept: 'appliction/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(credentials),
	})
		.then((response) => {
			return response.json()
		})
		.catch((error) => console.error(error))
}

export function signin(credentials) {
	return fetch(`${API}/api/auth/signin`, {
		method: 'POST',
		headers: {
			Accept: 'appliction/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(credentials),
	})
		.then((response) => {
			return response.json()
		})
		.catch((error) => console.error(error))
}

export const signout = (next) => {
	removeCookie('token')
	removeLocalStorage('user')
	next()

	return fetch(`${API}/api/auth/signout`, {
		method: 'GET',
	})
		.then((response) => {
			return response.json()
		})
		.catch((err) => console.error(err))
}

// cookie
export const setCookie = (key, value) => {
	// make sure it's running in client side
	if (process.browser) {
		cookie.set(key, value, {
			expires: 1,
		})
	}
}

export const removeCookie = (key) => {
	if (process.browser) {
		cookie.remove(key)
	}
}

export const getCookie = (key) => {
	if (process.browser) {
		return cookie.get(key)
	}
}

// localStorage
export const setLocalStorage = (key, value) => {
	if (process.browser) {
		localStorage.setItem(key, JSON.stringify(value))
	}
}

export const removeLocalStorage = (key, value) => {
	if (process.browser) {
		localStorage.removeItem(key)
	}
}

export const getLocalStorage = (key) => {
	if (process.browser) {
		return JSON.parse(localStorage.getItem(key))
	}
}

// authenticate user
export const authenticate = (data, next) => {
	setCookie('token', data.token)
	setLocalStorage('user', data.user)
	next()
}

export const isAuth = () => {
	if (!process.browser) return
	const cookieChecked = getCookie('token')
	if (cookieChecked) {
		let userChecked = localStorage.getItem('user')
		if (userChecked) {
			return userChecked
		} else {
			return false
		}
	}
}
