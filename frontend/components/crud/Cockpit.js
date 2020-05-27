import React, { useState, useContext } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import generateForm from '../../utils/form/generateForm'
import { create } from '../../actions/category-tag'
import { getCookie } from '../../actions/auth'

import { UI_context } from '../../context/UI/context.ui'

function Cockpit({ feature }) {
	const { dispatch } = useContext(UI_context)

	const [loading, setLoading] = useState(false)

	const initialValues = {
		name: '',
	}

	const validationSchema = Yup.object({
		name: Yup.string().required('Required'),
	})
	function handleSubmit(value, actions) {
		setLoading(true)
		const cookie = getCookie('token')

		create(value, cookie, feature).then((data) => {
			setLoading(false)
			if (data.error) {
				dispatch({
					type: 'snackbar_on',
					payload: { color: 'warning', message: data.error, timeout: 5000 },
				})
			} else {
				dispatch({ type: 'reload_on' })
				dispatch({
					type: 'snackbar_on',
					payload: {
						color: 'success',
						message: data.message,
						link: data.link,
						timeout: 3000,
					},
				})
			}
			actions.resetForm()
		})
	}

	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit: handleSubmit,
	})

	const formConfig = {
		fields: [{ id: 'name' }],
		actions: [
			{
				type: 'submit',
				label: 'create',
				color: 'primary',
			},
		],
	}

	return <div>{generateForm(formConfig, formik, loading)}</div>
}

export default Cockpit
