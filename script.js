// namespacing object to contain the variables and methods used in the app
retro = {
	url: `https://retroapi.hackeryou.com/api/years/year`,
	key: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWQ0YzZmMWIwYWQ3NDg2Mzk4OGZhMDg4In0sImlhdCI6MTU2NTI5MDI2NywiZXhwIjoxNTk2ODI2MjY3fQ.nKdKg1Uq1Au0X2U3EDewhjq5onrcbw0CkMMPMOLxKnE`,
	// using jQuery best practices to name our variables with a dollar sign at the start of each variable name
	$yearSelect: $(`.year`),
	$categorySelect: $(`.category`),
	$mainContent: $(`.main-content ul`),
	$headerContent: $(`.header-container`),
	$h2: $(`h2`),
	$form: $(`form`)
};
// method to contain your ajax api call
retro.getInfo = (year) => {
	$.ajax({
		url: retro.url,
		method: 'GET',
		dataType: 'json',
		data: {
			apiKey: retro.key,
			// the year the user selected is passed in to the getInfo() method as an argument and used as a parameter in the call to the api
			year: year
		}
		// once the results are returned from the api, they are passed into the then() method which is chained to the ajax call
	}).then((results) => {
		// pointing a variable to the desired api
		const result = results[0][retro.categoryValue]
		// calling the displayResults() method and passing the result variable into it as an argument
		retro.displayResults(result);
	});
};
// method containing the event listener, which points a new variable at the value of the year input
retro.getYear = () => {
	retro.$yearSelect.change(() => {
		retro.yearValue = retro.$yearSelect.val();
	});
};
// method containing the event listener, which points a new variable at the value of the category input
retro.getCategory = () => {
	retro.$categorySelect.change(() => {
		retro.categoryValue = retro.$categorySelect.val();
	});
};
// method containing the event listener for the submit input
retro.onSubmit = () => {
	retro.$form.on(`submit`, (e) => {
		// preventing the default behaviour of the submit input
		e.preventDefault();
		// if the user has selected both a year and a category
		if ((retro.yearValue && retro.categoryValue) !== undefined) {
			// calling the getInfo() method which contains the ajax method to call the api
			retro.getInfo(retro.yearValue);
		} else {
			// call the displayErrorMessage() method
			retro.displayErrorMessage();
		};
	});
};
// method which instructs the user to select a year and category
retro.displayErrorMessage = () => {
	// the empty and append methods chained to the header content to ensure that header is emptied before displaying new information 
	retro.$headerContent.empty().append(`<h3>Please choose a Year and Category to search.</h3>`);
};
// method which displays the results of the user's selection
retro.displayResults = (results) => {
	// empty the content of the header display before displaying new information based on user's selection
	retro.$headerContent.empty().append(`<h3>The most popular ${retro.categoryValue} of ${retro.yearValue} were...</h3>`);;
	// empty the content of the main display before displaying new information
	retro.$mainContent.empty();
	// map over the results array and append each result's title to the <ul> in a new <li>
	results.map((result) => {
		retro.$mainContent.append(`<li class="search-results">${result.title}</li>`);
	});
};
// init method containing event listener methods
retro.init = () => {
	retro.getYear();
	retro.getCategory();
	retro.onSubmit();
};
// document ready function
$(() => {
	retro.init();
});