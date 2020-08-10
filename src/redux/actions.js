export const ADD_CUOPON = "ADD_CUOPON";
export const REMOVE_CUOPON = "REMOVE_CUOPON";
export const UPDATE_CUOPON = "UPDATE_CUOPON";


let nextCuoponId = 0;


export const addCuopon = cuopon => ({
	type: ADD_CUOPON,
	payload: {
		id: ++nextCuoponId,
		content: cuopon
	}
})


export const removeCuopon = id => ({
	type: REMOVE_CUOPON,
	payload: id
})


export const updateCuopon = cuopon => ({
	type: UPDATE_CUOPON,
	payload: cuopon
})