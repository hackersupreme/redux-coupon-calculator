export const formatDate = (date) => {

	const year = date.slice(0, 4);

	const month = date.slice(5, 7);

	const day = date.slice(8, 10);
		
	const formattedDate = month + '/' + day + '/' + year;

	return formattedDate;
	
}

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