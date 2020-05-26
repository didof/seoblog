import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

import { isAuth } from '../../actions/auth'

function AuthGuard({ children }) {
   console.log('private')

   const router = useRouter()

   useEffect(() => {
      if(!isAuth()) {
         router.push('/signin')
      }
   }, [])

   return (
      <React.Fragment>
         {children}
      </React.Fragment>
   )
}

export default AuthGuard
