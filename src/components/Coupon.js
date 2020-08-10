import React, { Component } from 'react';
import { animated } from 'react-spring';
import { Spring } from 'react-spring/renderprops';
import { formatDate } from '../redux/utilities.js';

class Coupon extends Component {

	constructor(props) {
		super(props);
		this.state = {
			name: null,
			price: null,
			quantity: null,
			discount: null,
			expiration: null,
			submitted: false
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.endSubmission = this.endSubmission.bind(this);
	}

	componentDidMount() {

		let coupon = this.props.coupon;

		this.setState({
			name: coupon.name,
			price: coupon.price,
			quantity: coupon.quantity,
			discount: coupon.discount,
			expiration: coupon.expiration
		});

	}


	endSubmission() {
		this.setState({
			submitted: false
		})
	}


	handleSubmit(e) {

		e.preventDefault();

		const { name, price, quantity, discount, expiration } = this.state;

		const discount_price = price - ( ( discount / 100 ) * price );

		let coupon = {
			id: this.props.coupon.id,
			name: name,
			price: price,
			quantity: quantity,
			discount: discount,
			expiration: expiration,
			discount_price: discount_price.toFixed(2)
		};

		this.props.updateCoupon(coupon);

		this.setState({
			submitted: true
		})

		setTimeout(() => this.endSubmission(), 200);
		
	}

	render() {

		let coupon = this.props.coupon;

		return(

		<li className="coupon__container" style={this.props.style}>

			<Spring
				from={{background: 'white'}}
				to={{background: this.state.submitted ? '#2c99d0': 'white'}}
				config={{
					tension: 22,
					friction: 10
				}}
			>

			{styles => (

				<section className="coupon__top-section" style={styles}>

					<h4 className="coupon__discount color-dark">{coupon.discount}<span>%OFF</span></h4>

					<h5 className="coupon__name color-dark">{coupon.name}</h5>

					<p className="coupon__expiration color-dark">{'expires by ' + formatDate(coupon.expiration)}</p>

					<p className="coupon__price color-dark">{'$' + coupon.discount_price + ' for ' + coupon.quantity}</p>

				</section>

			)}
			

			</Spring>

			<section className="coupon__bottom-section">

				<form className="coupon__form color-dark" onSubmit={e => this.handleSubmit(e)}>

		          	<label 
		          		for="name" 
		          		className="coupon__form-label"
		          	>Product Name</label>

		          	<label 
		          		for="price" 
		          		className="coupon__form-label"
		          	>Product Price ($)</label>

		          	<label 
		          		for="quantity" 
		          		className="coupon__form-label"
		          	>Quantity</label>

		          	<label 
		          		for="discount" 
		          		className="coupon__form-label"
		          	>Discount (0-100)</label>

		          	<label 
		          		for="expiration" 
		          		className="coupon__form-label"
		          	>Expiration Date</label>

		          	<input 
		          		name="name"
		          		type="text" 
		          		defaultValue={coupon.name}
		          		minlength="1" 
		          		maxlength="30" 
		          		className="coupon__form-input color-dark"
		          		onChange={e => this.setState({name: e.target.value})}
		          		required
		          	/>
		          
		          	<input 
		          		name="price"
			          	type="number"
			          	defaultValue={coupon.price}
			          	min="0" 
			          	max="1000000"
			          	className="coupon__form-input color-dark"
			          	onChange={e => this.setState({price: e.target.value})}
		          		required
		          	/>
		          	
		          	<input 
		          		name="quantity"
			          	type="number" 
			          	defaultValue={coupon.quantity}
			          	min="0" 
			          	max="100000000"   
			          	className="coupon__form-input color-dark"
			          	onChange={e => this.setState({quantity: e.target.value})}
		          		required
		          	/>	

					<input
						name="discount"
						type="number"
						placeholder="20"
						min="0"
						max="100"
						className="coupon__form-input color-dark"
						defaultValue={coupon.discount}
						onChange={e => this.setState({discount: e.target.value})}
						required
					/>

					<input
						name="expiration"
						type="date"
						placeholder="20"
						className="coupon__form-input"
						defaultValue={coupon.expiration}
						onChange={e => this.setState({expiration: e.target.value})}
						required
					/>

					<button 
						type="button" 
						className="coupon__form-remove" 
						onClick={() => this.props.removeCoupon(coupon.id)}
					>Remove</button>

		          	<input 
		          		className="coupon__form-submit" 
		          		type="submit" 
		          		value="Save Changes" />
	        
	        	</form>

			</section>

		</li>

		);
	};
};


export default Coupon;