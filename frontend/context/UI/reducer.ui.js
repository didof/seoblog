export const UI_reducer = (state, action) => {
	switch (action.type) {
		case 'snackbar_on':
			return {
				...state,
				snackbar: {
					...state.snackbar,
					isOpen: true,
					color: action.payload.color || 'secondary',
					text: action.payload.message || 'Something went wrong',
					link: action.payload.link || false,
               timeout: action.payload.timeout ? action.payload.timeout : false
				},
			}
      case 'snackbar_reset':
         return {
            ...state,
            snackbar: snackbarReset()
         }
		default:
			return state
	}
}

export const UI_initialState = {
	modal: null,
	snackbar: snackbarReset()
}

function snackbarReset() {
   return {
		isOpen: false,
		color: 'secondary',
		text: '',
		link: false,
      timeout: false
	}
}