import Router from 'next/router'

import UI_contextProvider from '../context/UI/context.ui'
import Blog_contextProvider from '../context/blog/context.blog'

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
				<Blog_contextProvider>
					<Component {...pageProps} />
				</Blog_contextProvider>
				<Snackbar />
			</Layout>
		</UI_contextProvider>
	)
}
