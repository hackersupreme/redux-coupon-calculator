import { ADD_COUPON, REMOVE_COUPON, UPDATE_COUPON } from './actions.js';
import { combineReducers } from 'redux';


const initialState = {
	byIds: {},
	allIds: []
}


let coupons = function(state = initialState, action) {

	switch(action.type) {

		case ADD_COUPON:

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

		case UPDATE_COUPON:

			let updated_coupon = action.payload;

			return {

				...state,

				byIds: {

					...state.byIds,

					[updated_coupon.id]: {

						id: updated_coupon.id,
						name: updated_coupon.name,
						price: updated_coupon.price,
						quantity: updated_coupon.quantity,
						discount: updated_coupon.discount,
						discount_price: updated_coupon.discount_price,
						expiration: updated_coupon.expiration
					}

				}

			}

		case REMOVE_COUPON: 

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


export default combineReducers({ coupons });