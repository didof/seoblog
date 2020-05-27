import React, { useState, useEffect, useContext } from 'react'
import Router from 'next/router'

import AuthGuard from '../../components/auth/AuthGuard'

import { Blog_context } from '../../context/blog/context.blog'

import { getCookie, isAuth } from '../../actions/auth'
import { create } from '../../actions/blog'
import { getAll } from '../../actions/category-tag'

function createBlog({ categories, tags }) {
	
	const generateForm = () => {
		
	}

	return (
		<AuthGuard>
			<div className='container'>
				<div className='row'>
					<div className='col-md-12'>
						<h1 className='display-3'>Create Blog</h1>
					</div>
				</div>
				<div className='row'>
					<div className='col-md-12'>{generateForm()}</div>
				</div>
			</div>
		</AuthGuard>
	)
}

export async function getServerSideProps(context) {
	const categories = await getAll('categories')
	const tags = await getAll('tags')

	return {
		props: { categories, tags },
	}
}

export default createBlog

function isBrowser() {
	return typeof windowd !== 'undefined'
}
