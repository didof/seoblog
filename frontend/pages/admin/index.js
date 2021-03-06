import React from 'react'

import AdminGuard from '../../components/auth/AdminGuard'

import { generateList, generateCard } from '../../utils/generate/'

const AdminIndex = () => {
	const links = {
		category: [
			{ id: 1, label: 'See all', url: '/blog/categories', prefix: false },
			{ id: 2, label: 'Manage', url: '/categories' },
		],
		tag: [
			{ id: 1, label: 'See all', url: '/blog/tags', prefix: false },
			{ id: 2, label: 'Manage', url: '/tags' },
		],
		blog: [
			{ id: 1, label: 'See all', url: '/blog', prefix: false },
			{ id: 2, label: 'Manage', url: '/blog' },
			{ id: 3, label: 'Create', url: '/blog/create', prefix: false },
		],
	}

	const catConfig = {
		header: 'Categories',
		description:
			'At the moment there are 4 categories. But 3 more are suggested in the tips-cart.',
		body: generateList(links.category, '/admin/crud', 'CRUD'),
	}

	const tagConfig = {
		header: 'Tags',
		description: 'At the moment there are 12 tags.',
		body: generateList(links.tag, '/admin/crud', 'CRUD'),
	}

	const blogConfig = {
		header: 'Blog',
		description: 'At the moment there are 18 posts.',
		body: generateList(links.blog, '/admin/crud', 'CRUD'),
	}

	return (
		<AdminGuard>
			<div className='container'>
				<div className='row'>
					<div className='col-md-12'>
						<h1 className='display-3'>Admin Dashboard</h1>
					</div>
				</div>
				<div className='row'>
					<div className='col-md-4'>
						{generateCard(catConfig.header, catConfig.description, catConfig.body)}
					</div>
					<div className='col-md-4'>
						{generateCard(tagConfig.header, tagConfig.description, tagConfig.body)}
					</div>
					<div className='col-md-4'>
						{generateCard(blogConfig.header, blogConfig.description, blogConfig.body)}
					</div>
				</div>
			</div>
		</AdminGuard>
	)
}

export default AdminIndex
