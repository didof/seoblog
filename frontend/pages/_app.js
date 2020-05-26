import Router from 'next/router'

import '../static/css/nprogress.css'

import UI_contextProvider from '../context/UI/context.ui'

import Layout from '../components/Layout'
import Snackbar from '../components/reusables/Snackbar'

import NProgress from 'nprogress'

Router.onRouteChangeStart = () => {
	console.log('onRouteChangeStart triggered')
	NProgress.start()
}

Router.onRouteChangeComplete = () => {
	console.log('onRouteChangeComplete triggered')
	NProgress.done()
}

Router.onRouteChangeError = () => {
	console.log('onRouteChangeError triggered')
	NProgress.done()
}

export default function App({ Component, pageProps }) {
	return (
		<UI_contextProvider>
			<Layout>
				<Component {...pageProps} />
				<Snackbar />
			</Layout>
		</UI_contextProvider>
	)
}
