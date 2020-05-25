import { useState, useContext } from 'react'
import { UI_context } from '../../context/UI/context.ui'

import { useFormik } from 'formik'

import * as Yup from 'yup'

import { signup } from '../../actions/auth'

import generateForm from '../../utils/form/generateForm'

import Alert from '../reusables/Alert'

const initialValues = {
	name: '',
	email: '',
	password: '',
}

const validationSchema = Yup.object({
	name: Yup.string().required('Required'),
	email: Yup.string().email('Invalid e-mail format').required('Required'),
	password: Yup.string().required('Required'),
})

const SignupComponent = () => {
	const { dispatch } = useContext(UI_context)

	const [loading, setLoading] = useState(false)

	function handleSubmit(user, actions) {
		setLoading(true)

		signup(user).then((data) => {
			setLoading(false)
			if (data.error) {
				dispatch({
					type: 'snackbar_on',
					payload: { color: 'warning', message: data.error, timeout: 5000 },
				})
				actions.resetForm()
			} else {
				dispatch({
					type: 'snackbar_on',
					payload: { color: 'success', message: data.message, link: data.link },
				})
			}
		})
	}

	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit: handleSubmit,
	})

	const formConfig = {
		fields: [
			[{ id: 'name' }, { id: 'email', type: 'email' }],
			{
				id: 'password',
				type: 'password',
			},
		],
		actions: [
			{
				type: 'submit',
				label: 'submit',
				color: 'primary',
			},
		],
	}

	return <div>{generateForm(formConfig, formik, loading)}</div>
}

export default SignupComponent
