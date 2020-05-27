import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { UI_context } from '../../context/UI/context.ui'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { signin, authenticate, isAuth } from '../../actions/auth'

import generateForm from '../../utils/form/generateForm'

import Alert from '../reusables/Alert'

const initialValues = {
	email: '',
	password: '',
}

const validationSchema = Yup.object({
	email: Yup.string().email('Invalid e-mail format').required('Required'),
	password: Yup.string().required('Required'),
})

const SignupComponent = () => {
	const router = useRouter()

	const { dispatch } = useContext(UI_context)

	const [loading, setLoading] = useState(false)

	useEffect(() => {
		isAuth() && router.push('/')
	}, [])

	function handleSubmit(user, actions) {
		
		setLoading(true)

		signin(user).then((data) => {
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
					payload: {
						color: 'success',
						message: data.message,
						link: data.link,
						timeout: 3000,
					},
				})

				authenticate(data, () => {
					router.push(data.user.role === 1 ? '/admin' : '/user')
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
			{ id: 'email', type: 'email' },
			{ id: 'password', type: 'password' },
		],
		actions: [
			{
				type: 'submit',
				label: 'join',
				color: 'primary',
			},
		],
	}

	return <div>{generateForm(formConfig, formik, loading)}</div>
}

export default SignupComponent
