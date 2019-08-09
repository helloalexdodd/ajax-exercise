retro = {
	key: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWQ0YzZmMWIwYWQ3NDg2Mzk4OGZhMDg4In0sImlhdCI6MTU2NTI5MDI2NywiZXhwIjoxNTk2ODI2MjY3fQ.nKdKg1Uq1Au0X2U3EDewhjq5onrcbw0CkMMPMOLxKnE",
	yearSelect: $(`.year`),
	categorySelect: $(`.category`),
	mainContent: $(`.main-content`),
	form: $(`form`)
};

retro.getInfo = (year) => {
	$.ajax({
		url: `https://retroapi.hackeryou.com/api/years/year`,
		method: 'GET',
		dataType: 'json',
		data: {
			apiKey: retro.key,
			year: year
		}
	}).then((result) => {
		retro.results = result;
		retro.displayResults();
	});
};

retro.getYear = () => {
	retro.yearSelect.change(() => {
		retro.yearValue = retro.yearSelect.val();
	});
};

retro.getCategory = () => {
	retro.categorySelect.change(() => {
		retro.categoryValue = retro.categorySelect.val();
	});
};

retro.onSubmit = () => {
	retro.form.on(`submit`, (e) => {
		e.preventDefault();
		if ((retro.yearValue && retro.categoryValue) !== undefined) {
			retro.getInfo(retro.yearValue);
		} else {
			retro.displayErrorMessage();
		};
	});
};

retro.displayErrorMessage = () => {
	retro.mainContent.empty().append(`<p>Please choose a Year and Category to search.</p>`)
};

retro.displayResults = () => {
	retro.mainContent.empty().append(retro.results)
};

retro.init = () => {
	retro.getYear();
	retro.getCategory();
	retro.onSubmit();
};

$(() => {
	retro.init();
});