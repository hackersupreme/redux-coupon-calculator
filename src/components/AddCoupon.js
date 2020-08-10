import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addCoupon } from '../redux/actions.js';
import './css/addcoupon.css';

class AddCoupon extends Component {

	constructor() {

		super();

		this.state = {
			name: "",
			price: null,
			quantity: null,
			discount: null,
			expiration: null
		}

		this.handleSubmit = this.handleSubmit.bind(this);

	}

	handleSubmit(e) {

		e.preventDefault();

		const { name, price, quantity, discount, expiration } = this.state;

		const discount_price = price - ( ( discount / 100 ) * price );

		let coupon = {
			name: name,
			price: price,
			quantity: quantity,
			discount: discount,
			expiration: expiration,
			discount_price: discount_price.toFixed(2)
		}

		this.props.addCoupon(coupon)

	}

	render() {

		return(

			<form className="add-coupon__form color-dark" onSubmit={this.handleSubmit}>

	          	<label for="name" className="add-coupon__form-label">Product Name</label>
	          	
	          	<label for="price" className="add-coupon__form-label">Product Price ($)</label>

	          	<label for="quantity" className="add-coupon__form-label">Quantity</label>

	          	<label for="discount" className="add-coupon__form-label">Discount (0-100)</label>

	          	<label for="expiration" className="add-coupon__form-label">Expiration Date</label>

	          	<input 
	          		name="name"
	          		type="text" 
	          		placeholder="Product Name eg. Waffles"
	          		minlength="1" 
	          		maxlength="40" 
	          		className="add-coupon__form-input"
	          		onChange={e => this.setState({name: e.target.value})}
	          		required
	          	/>
	                    	
	          	<input
	          		name="price"  
		          	type="number"
		          	placeholder="29.99" 
		          	min="0" 
		          	max="100000000"
		          	className="add-coupon__form-input"
		          	onChange={e => this.setState({price: e.target.value})}
	          		required
	          	/>
	          	
	          	<input
	          		name="quantity" 
		          	type="number" 
		          	min="0" 
		          	max="100000000" 
		          	defaultValue={1} 
		          	className="add-coupon__form-input"
		          	onChange={e => this.setState({quantity: e.target.value})}
	          		required
	          	/>	

				<input
					name="discount"
					type="number"
					placeholder="20"
					min="0"
					max="100"
					required
					className="add-coupon__form-input"
					onChange={e => this.setState({discount: e.target.value})}
					required
				/>

				<input
					name="expiration"
					type="date"
					placeholder="2020-07-02"
					required
					className="add-coupon__form-input"
					onChange={e => this.setState({expiration: e.target.value})}
				/>

	          	<input type="submit" value="Create Coupon" className="add-coupon__form-submit" />
	        
	        </form>

		)
	}

};


export default connect(
	null,
	{ addCoupon }
)(AddCoupon)