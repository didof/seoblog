import Router from 'next/router'

import UI_contextProvider from '../context/UI/context.ui'

import Layout from '../components/Layout'
import Snackbar from '../components/reusables/Snackbar'

import NProgress from 'nprogress'
NProgress.configure({ showSpinner: false })

Router.onRouteChangeStart = () => {
	NProgress.start()
}

Router.onRouteChangeComplete = () => {
	NProgress.done()
}

Router.onRouteChangeError = () => {
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
