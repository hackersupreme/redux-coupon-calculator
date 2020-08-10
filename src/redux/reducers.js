import { ADD_CUOPON, REMOVE_CUOPON, UPDATE_CUOPON } from './actions.js';
import { combineReducers } from 'redux';


const initialState = {
	byIds: {},
	allIds: []
}


let cuopons = function(state = initialState, action) {

	switch(action.type) {

		case ADD_CUOPON:

			let { content, id } = action.payload;

			const { name, price, quantity, expiration, discount, discount_price } = content;

			let updated_state = {
				
				...state,

				byIds: {

					...state.byIds,

					[id]: {
						id: id,
						name: name,
						price: price,
						quantity: quantity,
						discount: discount,
						discount_price: discount_price,
						expiration: expiration,	
					}
				},

				allIds: [

					id,
					
					...state.allIds

				]

			}

			return updated_state;

		case UPDATE_CUOPON:

			let updated_cuopon = action.payload;

			return {

				...state,

				byIds: {

					...state.byIds,

					[updated_cuopon.id]: {

						id: updated_cuopon.id,
						name: updated_cuopon.name,
						price: updated_cuopon.price,
						quantity: updated_cuopon.quantity,
						discount: updated_cuopon.discount,
						discount_price: updated_cuopon.discount_price,
						expiration: updated_cuopon.expiration
					}

				}

			}

		case REMOVE_CUOPON: 

			let removed_id = action.payload;

			let allIds = state.allIds;

			let updated_allIds = [];

			for (var i = 0; i < allIds.length; i++) {

				if (removed_id != allIds[i]) {

					updated_allIds.push(allIds[i]);

				};

			};

			let byIds = state.byIds;

			const { [removed_id]: value, ...updated_byIds } = byIds;

			return {

				...state,

				allIds: updated_allIds,

				byIds: updated_byIds

			}

	 	default:

	 		return state;

	 }
}


export default combineReducers({ cuopons });