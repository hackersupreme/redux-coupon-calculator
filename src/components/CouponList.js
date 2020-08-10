import React from 'react';
import Coupon from './Coupon.js';
import AddCoupon from './AddCoupon.js';
import { connect } from 'react-redux';
import { updateCoupon, removeCoupon } from '../redux/actions.js';
import './css/coupon.css';
import { Transition } from 'react-spring/renderprops';

const CouponList = (props) => {

	const { removeCoupon, updateCoupon, byIds, allIds } = props;

	let coupons = [];

	for (let i = 0; i < allIds.length; i++) {

		let coupon = byIds[allIds[i]];

		coupons.push(coupon);

	}

	return(
		<main className="coupon-main__container">

			<AddCoupon />

			<ul className="coupon-list__container">

				<Transition
					items={coupon}
					keys={coupon => coupon.id}
					from={{opacity: 0, height: 0}}
					enter={{opacity: 1, height: 'auto'}}
					leave={{opacity:0, height: 0, margin: 0}}
				>

				{item => props => <Coupon style={props} coupon={item} updateCoupon={updateCoupon} removeCoupon={removeCoupon} />}

				</Transition>
				
			</ul>

		</main>

	);

};

const mapStateToProps = state => {

	return {

		byIds: state.coupons.byIds, 
		allIds: state.coupons.allIds

	};

};


export default connect(mapStateToProps, { updateCoupon, removeCoupon })(CouponList);