import React, { Component } from 'react';
import { animated } from 'react-spring';
import { Spring } from 'react-spring/renderprops';
import { formatDate } from '../redux/utilities.js';

class Cuopon extends Component {

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

		let cuopon = this.props.cuopon;

		this.setState({
			name: cuopon.name,
			price: cuopon.price,
			quantity: cuopon.quantity,
			discount: cuopon.discount,
			expiration: cuopon.expiration
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

		let cuopon = {
			id: this.props.cuopon.id,
			name: name,
			price: price,
			quantity: quantity,
			discount: discount,
			expiration: expiration,
			discount_price: discount_price.toFixed(2)
		};

		this.props.updateCuopon(cuopon);

		this.setState({
			submitted: true
		})

		setTimeout(() => this.endSubmission(), 200);
		
	}

	render() {

		let cuopon = this.props.cuopon;

		return(

		<li className="cuopon__container" style={this.props.style}>

			<Spring
				from={{background: 'white'}}
				to={{background: this.state.submitted ? '#2c99d0': 'white'}}
				config={{
					tension: 22,
					friction: 10
				}}
			>

			{styles => (

				<section className="cuopon__top-section" style={styles}>

					<h4 className="cuopon__discount color-dark">{cuopon.discount}<span>%OFF</span></h4>

					<h5 className="cuopon__name color-dark">{cuopon.name}</h5>

					<p className="cuopon__expiration color-dark">{'expires by ' + formatDate(cuopon.expiration)}</p>

					<p className="cuopon__price color-dark">{'$' + cuopon.discount_price + ' for ' + cuopon.quantity}</p>

				</section>

			)}
			

			</Spring>

			<section className="cuopon__bottom-section">

				<form className="cuopon__form color-dark" onSubmit={e => this.handleSubmit(e)}>

		          	<label 
		          		for="name" 
		          		className="cuopon__form-label"
		          	>Product Name</label>

		          	<label 
		          		for="price" 
		          		className="cuopon__form-label"
		          	>Product Price ($)</label>

		          	<label 
		          		for="quantity" 
		          		className="cuopon__form-label"
		          	>Quantity</label>

		          	<label 
		          		for="discount" 
		          		className="cuopon__form-label"
		          	>Discount (0-100)</label>

		          	<label 
		          		for="expiration" 
		          		className="cuopon__form-label"
		          	>Expiration Date</label>

		          	<input 
		          		name="name"
		          		type="text" 
		          		defaultValue={cuopon.name}
		          		minlength="1" 
		          		maxlength="30" 
		          		className="cuopon__form-input color-dark"
		          		onChange={e => this.setState({name: e.target.value})}
		          		required
		          	/>
		          
		          	<input 
		          		name="price"
			          	type="number"
			          	defaultValue={cuopon.price}
			          	min="0" 
			          	max="1000000"
			          	className="cuopon__form-input color-dark"
			          	onChange={e => this.setState({price: e.target.value})}
		          		required
		          	/>
		          	
		          	<input 
		          		name="quantity"
			          	type="number" 
			          	defaultValue={cuopon.quantity}
			          	min="0" 
			          	max="100000000"   
			          	className="cuopon__form-input color-dark"
			          	onChange={e => this.setState({quantity: e.target.value})}
		          		required
		          	/>	

					<input
						name="discount"
						type="number"
						placeholder="20"
						min="0"
						max="100"
						className="cuopon__form-input color-dark"
						defaultValue={cuopon.discount}
						onChange={e => this.setState({discount: e.target.value})}
						required
					/>

					<input
						name="expiration"
						type="date"
						placeholder="20"
						className="cuopon__form-input"
						defaultValue={cuopon.expiration}
						onChange={e => this.setState({expiration: e.target.value})}
						required
					/>

					<button 
						type="button" 
						className="cuopon__form-remove" 
						onClick={() => this.props.removeCuopon(cuopon.id)}
					>Remove</button>

		          	<input 
		          		className="cuopon__form-submit" 
		          		type="submit" 
		          		value="Save Changes" />
	        
	        	</form>

			</section>

		</li>

		);
	};
};


export default Cuopon;