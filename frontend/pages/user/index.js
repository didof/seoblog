import React, { useState } from 'react'

const data = {
   properties: [
      {
         _id: '1',
         index: 0,
         price: 200000,
         city: 'Milano'
      },
      {
         _id: '2',
         index: 0,
         price: 100000,
         city: 'Roma'
      },
      {
         _id: '3',
         index: 0,
         price: 300000,
         city: 'Bari'
      },
   ]
}

const UserIndex = () => {

	return (
		<div>
         User Dashboard
		</div>
	)
}

export default UserIndex