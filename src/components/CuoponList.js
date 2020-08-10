import React from 'react';
import Cuopon from './Cuopon.js';
import AddCuopon from './AddCuopon.js';
import { connect } from 'react-redux';
import { updateCuopon, removeCuopon } from '../redux/actions.js';
import './css/cuopon.css';
import { Transition } from 'react-spring/renderprops';


const test = {
	id: 0,
	name: 'Product Name',
	price: 20,
	cost: 10,
	discount: 20,
	discount_price: 16,
	expiration: '01-20-2020'
}

const CuoponList = (props) => {

	const { removeCuopon, updateCuopon, byIds, allIds } = props;

	let cuopons = [];

	for (let i = 0; i < allIds.length; i++) {

		let cuopon = byIds[allIds[i]];

		cuopons.push(cuopon);

	}

	return(
		<main className="cuopon-main__container">

			<AddCuopon />

			<ul className="cuopon-list__container">

				<Transition
					items={cuopons}
					keys={cuopon => cuopon.id}
					from={{opacity: 0, height: 0}}
					enter={{opacity: 1, height: 'auto'}}
					leave={{opacity:0, height: 0, margin: 0}}
				>

				{item => props => <Cuopon style={props} cuopon={item} updateCuopon={updateCuopon} removeCuopon={removeCuopon} />}

				</Transition>
				
			</ul>

		</main>

	);

};

const mapStateToProps = state => {

	return {

		byIds: state.cuopons.byIds, 
		allIds: state.cuopons.allIds

	};

};


export default connect(mapStateToProps, { updateCuopon, removeCuopon })(CuoponList);