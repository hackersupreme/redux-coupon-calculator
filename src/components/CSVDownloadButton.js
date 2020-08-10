import React from 'react';
import { connect } from 'react-redux';
import { CSVLink, CSVDownload } from 'react-csv';
import { generateCSVArray } from '../redux/utilities.js';

const CSVDownloadButton = (props) => (

	<CSVLink 
	data={generateCSVArray(props.byIds)}
	className="csv-download__button" 
	target="__blank"
	>Download CSV</CSVLink>

);

const mapStateToProps = state => {''
	
	return {

		byIds: state.coupons.byIds

	}

}


export default connect(mapStateToProps)(CSVDownloadButton);