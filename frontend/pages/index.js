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

const Index = () => {
   const [appearHome, setAppearHome] = useState(true)
   const [property, setproperty] = useState(data.properties[0])

   const toggleAppear = () => {

   }

	return (
		<div>
			<button onClick={() => toggleAppear()}>Appear: </button>
		</div>
	)
}

export default Index
