# React Redux Coupon Calculator SPA

Contents

- Overview
- Live Example
- Installation
- Documentation
- Resources / Contact Info

## Overview

This is a single page app that provides an interface for creating coupons and exporting them as csv data. 

It has two main parts: an input form for creating new coupons and a list of coupons where you can edit or remove individual coupons.

After you create the coupons you want, you can download the csv data and import it into Excel, Google Sheets, or use it any way you'd like.

It's built using React. It uses [Redux](https://redux.js.org/) to handle the data in the app, uses the animation library [React Spring](https://www.react-spring.io/) for animations, and uses the library [React-CSV](https://www.npmjs.com/package/react-csv) to create the csv data. See the Documentation section for more information on how it's built.

Right now it only works on desktop. Plans are in place to make it responsive soon!

![screenshot](/screenshot.PNG)

![cuopon](/cuopon.PNG)

## Live Example

http://cuoponcalculator.hackersupreme.com

## Installation

This assumes you have the following installed:
  - node.js 
  - node package manager (npm)

Get both here: https://nodejs.org/

###### Instructions

1. Create file directory on your local device
2. Download files to that directory

_note: PNG images are for this document, not needed for the project_

3. Using a command line software, enter the directory
```
cd directory-name
```
4. Use npm install to get the node modules
```
npm install
```
5. Use npm start to start the server
```
npm start
```

## Documentation

Contents

- Store
- Actions
- Reducers
- React Components

### Store

The store of the app consists of two parts under `coupons`: an array called `allIds` and an object called `byIds`. The `allIds` array contains all the ids of the coupons. The `byIds` object contains all the coupon objects. 

```
state = {
 	coupons: {
  		byIds: {},
  		allIds: []
  	}
}
```

The properties of the `byIds` object are the ids of each coupon with the values being the corresponding coupon object. The coupon object stored in the `byIds` object has the following structure:

```
byIds: {
	0: {
   		id: 0,
   		name: 'Product Name',
		price: 40,
		quantity: 1,
		discount: 20,
		discount_price: 32,
		expiration: '2020-06-20'
  	},
	...
}
```

### Actions

There are only 3 actions currently in the app. 

- `ADD_CUOPON`
- `UPDATE_CUOPON`
- `REMOVE_CUOPON`

While these actions are limited and pretty simple, the redux architecture allows for the easy addition of new actions if needed.

The actions are defined as constants in the file `actions.js` in the redux folder. In the same file are the action creators `addCuopon`, `updateCuopon`, and `removeCuopon`.

All action creators return an action object that has the action type and a payload.

The `addCuopon` function's payload is an object that contains the id of the cuopon and the content of the cuopon, an object with all of the cuopon's properties.


```
{
	type: ADD_CUOPON,
	payload: {
		id: 0,
		content: {
			id: 0,
			name: 'Product Name',
			...
		}
	}
}
```

The `removeCuopon` function's payload is the id of the object to be removed.

```
{
	type: REMOVE_CUOPON,
	payload: id
}
```

The `updateCuopon` functions's payload is just the cuopon object to be updated itself.

```
{
	type: UPDATE_CUOPON,
	payload: cuopon
}
```

### Reducers

There are three actions for the reducer function to account for: `ADD_CUOPON`, `UPDATE_CUOPON`, and `REMOVE_CUOPON`. The reducer is a switch statement with each case being the action type. 

The `ADD_CUOPON` action causes the reducer to add the coupon's id to the `allIds` array and adds the coupon object to the `byIds` object.

The `REMOVE_CUOPON` action removes the coupon's id from the `allIds` array and removes the coupon object from the `byIds` object.

The `UPDATE_CUOPON` action uses the id from the action to find the object being edited and updates the coupon's values in the `byIds` object.

If I add any more actions to the app I'll separate these out to their own files.

```
let coupons = function(state = initialState, action) {

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
```

### React Components

#### App

The top level component of the app is `App` and it's found in the file `App.js`. It contains the html of the header, the how-to section, and the footer. It also contains the components `CuoponList` and `CSVDownloadButton`, which are two of the three components in the app that connect to the store. 

```
<App>
	<header>
		...
		<CSVDownloadButton />
	</header>
	
	<CuoponList />
	
	<section title="how to">...</section>
	
	<footer>...</footer>
</App>
```

#### CuoponList

The `CuoponList` component connects to the store and uses the function `mapStateToProps` to recieve the `byIds` object and the `allIds` array as props. It gets the action creators `updateCuopon` and `removeCuopon` as dispatch props too.

The component is wrapped in the `<main>` tag and has the component `AddCuopon` and an un-ordered list of `Cuopon` components as children. The unordered list of coupons is wrapped in a `Transition` component which is from the animation library React Spring.

```
<main ... >
	<AddCuopon />
	
	<ul ... >
		<Transition ...>
		<Cuopon cuopon={cuopon} ... />
		<Cuopon cuopon={cuopon} ... />
		<Cuopon cuopon={cuopon} ... />
		...
		</Transition>
	</ul>
</main>
```

The un-ordered list of `Cuopon` components uses a `Transition` component from the animation library React Spring to animate the list of `Cuopons` when they enter or exit the list. See the library's [documentation](https://www.react-spring.io/) for more information on how this works.

The `Transition` component takes in an array of items to animate. The array used here is `coupons` and a for loop feeds it coupon objects from the `byIds` object. I should have used `Object.values()` but sometimes I forget it exists and how useful it is.

The function that's a child of the `Transition` component returns a `Cuopon` component for each item in the `cuopons` array. The `item` is the coupon object and the `props` are the animated styles. The `Cuopon` is passed the functions `updateCuopon` and `removeCuopon` as props.

```
const { removeCuopon, updateCuopon, byIds, allIds } = props;

let coupons = [];

for (let i = 0; i < allIds.length; i++) {

	let coupon = byIds[allIds[i]];

	coupons.push(coupon);

}	
...	
<Transition
	items={coupons}
	keys={coupon => coupon.id}
	from={{opacity: 0, height: 0}}
	enter={{opacity: 1, height: 'auto'}}
	leave={{opacity:0, height: 0, margin: 0}}>

	{item => props => <Cuopon style={props} cuopon={item} updateCuopon={updateCuopon} removeCuopon={removeCuopon} />}

</Transition>
```

#### Cuopon

The `Cuopon` components consist of a top section and a bottom section. The top section holds some data from the coupon object it recieves as props and the bottom section holds a form where a user can change the values of the cuopon as well as remove it from the list.

When the `updateCuopon` action is fired, the top half of the component goes through a brief animation where the background color flashes blue.


#### AddCuopon

The `AddCuopon` component is the third component other than `CuoponList` and `CSVDownloadButton` to connect to the store and recieves the `addCuopon` action creator as a prop. It holds the input values in its state and dispatches an `ADD_CUOPON` action when the form is submitted. I connected it to the store despite it being a child of the `CuoponList` component because I wanted the flexibility to be able to reuse it elsewhere in the app.


#### CSVDownloadButton

The `CSVDownloadButton` component connects to the store and recives the `byIds` object as props. It imports the component `CSVLink` from the library React-CSV which provides a button that will take in a multidemnsional array and turn it into a csv file to be downloaded.

The component uses a function called `generateCSVArray` from the file `utilities.js` to transform the `byIds` into a multidimensional array. Each array within the container array is a line of csv data.

```
const CSVDownloadButton = (props) => (

	<CSVLink 
	data={generateCSVArray(props.byIds)}
	className="csv-download__button" 
	target="__blank"
	>Download CSV</CSVLink>

);

...

export const generateCSVArray = (byIds) => {

    //csv headers
    let csvArray = [
      	[
      		"id", 
      		"name", 
      		"price", 
      		"quantity", 
      		"discount",
      		"discount_price",
      		"expiration"
       	]
    ]

    // csv rows
    for (let id in byIds) {
    	csvArray.push(Object.values(byIds[id]))
    }

    return csvArray
}
```

## Resources / Contact Info

#### Email

jeffgsch@gmail.com

#### Website

http://hackersupreme.com

#### Resources

- [react.js](https://reactjs.org/)
- [redux.js](https://redux.js.org/)
- [react-csv](https://www.npmjs.com/package/react-csv)
- [node.js](https://nodejs.org/en/)
