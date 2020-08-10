export const ADD_COUPON = "ADD_COUPON";
export const REMOVE_COUPON = "REMOVE_COUPON";
export const UPDATE_COUPON = "UPDATE_COUPON";


let nextCouponId = 0;


export const addCoupon = coupon => ({
	type: ADD_COUPON,
	payload: {
		id: ++nextCouponId,
		content: coupon
	}
})


export const removeCoupon = id => ({
	type: REMOVE_COUPON,
	payload: id
})


export const updateCoupon = coupon => ({
	type: UPDATE_COUPON,
	payload: coupon
})