import React, { useState, useEffect } from 'react'
import Router, { withRouter } from 'next/router'
import dynamic from 'next/dynamic'

import AuthGuard from '../../components/auth/AuthGuard'

import { Blog_context } from '../../context/blog/context.blog'

import { getCookie, isAuth } from '../../actions/auth'
import { create } from '../../actions/blog'
import { getAll } from '../../actions/category-tag'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

function createBlog({ router, fetchedCategories, fetchedTags }) {
	const blogFromLS = () => {
		if (typeof window === 'undefined') return {}
		const draft = localStorage.getItem('blog')
		if (draft) return JSON.parse(draft)
	}

	const selected = {
		categories: [],
		tags: [],
	}
	const handleToggle = (e) => {
		const { label } = e.target.dataset
		const { id } = e.target
		const index = selected[label].indexOf(id)
		if (index === -1) {
			selected[label].push(id)
		} else {
			selected[label].splice(index, 1)
		}
	}

	const [categories, setCategories] = useState(fetchedCategories)
	const [tags, setTags] = useState(fetchedTags)
	const [body, setBody] = useState(blogFromLS())
	const [values, setValues] = useState({
		error: '',
		sizeError: '',
		success: '',
		formData: '',
		title: '',
		hidePublishBtn: false,
	})
	const { error, sizeError, success, formData, title, hidePublishBtn } = values
	useEffect(() => {
		setValues({ ...values, formData: new FormData() })
	}, [router])

	const publishBlog = (e) => {
		e.preventDefault()
		formData.set('title', values.title)
		formData.set('body', body)
		formData.set('categories', selected.categories)
		formData.set('tags', selected.tags)
		create(formData, getCookie('token')).then((result) => console.log(result))
	}

	const handleChange = (name) => (e) => {
		console.log(name)
		const value = name === 'photo' ? e.target.files[0] : e.target.value
		console.log(value)
		formData.set(name, value)
		setValues({ ...values, [name]: value, formData, error: '' })
	}

	const handlePhoto = (e) => {
		const photo = e.target.files[0]
		formData.set('photo', photo)
	}

	const handleBody = (e) => {
		setBody(e)
		if (typeof window !== 'undefined') {
			localStorage.setItem('blog', JSON.stringify(e))
		}
	}

	const generateForm = () => (
		<form onSubmit={publishBlog}>
			<div className='form-group'>
				<label className='text-muted'>Title</label>
				<input
					type='text'
					className='form-control'
					value={title}
					onChange={handleChange('title')}
				/>
			</div>

			<div className='form-group'>
				<ReactQuill
					value={body}
					placeholder='placeholder'
					onChange={handleBody}
					formats={createBlog.formats}
					modules={createBlog.modules}
				/>
			</div>

			<div className='form-group'>
				<button className='btn btn-primary'>Submit</button>
			</div>
		</form>
	)

	const generateCheckList = (data, label) => (
		<React.Fragment>
			<h6 className='header'>{label}</h6>
			<hr />
			<ul
				className='list-group list-group-flush'
				style={{ maxHeight: 200, overflowY: 'scroll' }}
			>
				{data.map(({ _id, name, slug }) => (
					<li
						key={`list-group-item-${_id}`}
						className='list-group-item'
						style={{ padding: 5 }}
					>
						<input
							type='checkbox'
							id={_id}
							data-label={label}
							onChange={handleToggle}
						/>
						<label htmlFor={`checkbox-${_id}`}>{name}</label>
					</li>
				))}
			</ul>
		</React.Fragment>
	)

	return (
		<AuthGuard>
			<div className='container'>
				<div className='row'>
					<div className='col-md-12'>
						<h1 className='display-3'>Create Blog</h1>
					</div>
				</div>
				<div className='row'>
					<div className='col-md-12'>
						<h6 className='title'>Featured image</h6>
						<small className='text-muted'>Max size: 1Mb</small>
						<br />
						<label className='btn btn-outline-info'>Upload
						<input
							onChange={handlePhoto}
							type='file'
							accept='image/png, image/jpg, image/jpeg'
							hidden
						/>
						</label>
					</div>
				</div>
				<div className='row'>
					<div className='col-md-10'>{generateForm()}</div>
					<div className='col-md-2'>
						{generateCheckList(categories, 'categories')}
						{generateCheckList(tags, 'tags')}
					</div>
				</div>
			</div>
		</AuthGuard>
	)
}

export async function getServerSideProps(context) {
	const fetchedCategories = await getAll('categories')
	const fetchedTags = await getAll('tags')

	return {
		props: { fetchedCategories, fetchedTags },
	}
}

export default withRouter(createBlog)

function isBrowser() {
	return typeof windowd !== 'undefined'
}

createBlog.modules = {
	toolbar: [
		[{ header: '1' }, { header: '2' }, { header: [3, 4, 5, 6] }, { font: [] }],
		[{ size: [] }],
		['bold', 'italic', 'underline', 'strike', 'blockquote'],
		[{ list: 'ordered' }, { list: 'bullet' }],
		['link', 'image', 'video'],
		['clean'],
		['code-block'],
	],
}

createBlog.formats = [
	'header',
	'font',
	'size',
	'bold',
	'italic',
	'underline',
	'strike',
	'blockquote',
	'list',
	'bullet',
	'link',
	'image',
	'video',
	'code-block',
]
