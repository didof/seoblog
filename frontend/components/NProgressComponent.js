import React from 'react'
import Router from 'next/router'

import NProgress from 'nprogress'

NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false})

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

import '../static/css/nprogress.css'

function NProgressComponent() {
	return <NProgress />
}

export default NProgressComponent
