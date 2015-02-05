var agora = window.agora || {};

(function() {
	agora.vizfuncs = {

		reportUrl: '',
		h1: '',
		h2: '',
		pages: '',
		url: '',
		mainViz: '',
		routeParams: '',
		vizParams: {},
		mainVizDiv: $("#mainViz"),

		renderViz: function(routeParams) {

			this.routeParams = routeParams;
			this.getReportUrl(routeParams);
			var mainVizDiv = $("#mainViz");
			// var mainVizDiv = this.mainVizDiv; 
			var mainWorkbookUrl = this.url;
			var vizOpts = {
				hideTabs: true,
				hideToolbar: true,
				width: mainVizDiv.parent().innerWidth() + "px",
				height: mainVizDiv.parent().innerHeight() + "px",
				onFirstInteractive: function() {
					mainWorkbook = agora.vizfuncs.mainViz.getWorkbook();
				}
			};

			this.setVizParams('Show by', 'Nationality');

			var mainVizOptions = $.extend({}, vizOpts, this.getVizOptions());

			this.mainViz = new tableauSoftware.Viz(mainVizDiv[0], mainWorkbookUrl, mainVizOptions);
		},

		onResize: function() {

		},

		getVizOptions: function() {

			return this.vizParams;
		},

		setVizParams: function(key, value) {
			this.vizParams[key] = value;
		},

		getReportUrl: function(routeParams) {
			var group = routeParams.report,
				cName = routeParams.id;

			var result = $.grep(pagesObj.repGroup, function(e) {
				return e.groupName == cName;
			});

			if (typeof result[0] == "undefined") {
				console.log('not found');
				return false;
			} else {
				this.pages = result;
				this.h2 = result[0].pages[group][0].pageSubheading;
				this.url = pagesObj.reportsBaseUrl + result[0].pages[group][0].url;
			}
		},

		setReportTitle: function(reportName) {
			console.log(reportName);
			this.getReportUrl(this.routeParams);

			var reports = [];
			$.each(this.pages[0].pages, function(index, value) {
				reports.push(value);
			});

			$.each(reports, function(index, value) {
				$.each(value, function(index, value) {
					if (value.pageId == reportName) {
						console.log('match of tab and model');

						agora.vizfuncs.h1 = value.pageHeading;

						agora.vizfuncs.h2 = value.pageSubheading;
					}
				});

			});
		},

		addEventListeners: function() {
			this.mainViz.addEventListener("tabswitch", this._ventOnTabSwitch);
			this.mainViz.addEventListener("parametervaluechange", this._ventOnParameterChanged);
			this.mainViz.addEventListener("filterchange", this._ventOnFilterChanged);
		},



		_ventOnTabSwitch: function() {
			var tabName = agora.vizfuncs.mainViz.getWorkbook().getActiveSheet().getName();
			agora.vizfuncs.setReportTitle(tabName);
		},

		_ventOnParameterChanged: function() {
			console.log('parameter changed');
			agora.vizfuncs._getParametersAsync();
		},

		_getParametersAsync: function() {
			mainWorkbook = agora.vizfuncs.mainViz.getWorkbook();

			var onSuccess = function(params) {


				var paramNames = [];
				$.each(params, function(index, value) {
					// console.log(value._impl.$1); 
					// console.log(params.get(value._impl.$1).getCurrentValue()); 
					var key = value._impl.$1;
					var value = params.get(value._impl.$1).getCurrentValue();
					agora.vizfuncs.setVizParams(key, value.value);

				});

				// console.log(agora.vizfuncs.getVizOptions());

			};

			var onError = function(err) {
				console.log('error!!!');
			};

			mainWorkbook.getParametersAsync().then(onSuccess, onError);
		},

		counter: 0, 

		_ventOnFilterChanged: function() {
			// To stop Tableau iterating over each listener event, we implement a
			// counter with a timeout. With the first iteration we set the counter to 1 
			// and subsequently return if greater than 0. The timeout resets the counter; 
			if(agora.vizfuncs.counter > 0) {
				return; 
			}

			agora.vizfuncs._getFiltersAsync();
			agora.vizfuncs.counter++; 

			setTimeout(function(){ 
				agora.vizfuncs.counter--; 
			}, 3000);


		},

		history: [], 

		filters: {},

		_getFiltersAsync: function() {
			delete agora.vizfuncs.filters;
			agora.vizfuncs.filters = {};
			mainWorkbook = agora.vizfuncs.mainViz.getWorkbook();
			// get dashboard			
			var activeSheet = mainWorkbook.getActiveSheet();
			// get worksheets
			var worksheets = activeSheet.getWorksheets();

			var worksheet = worksheets[1];

			var onSuccess = function(filters) {
				var filterName = filters[0].$2;

				$.each(filters, function(value, key) {
					if (!agora.vizfuncs.filters.hasOwnProperty(key.$2)) {
						agora.vizfuncs.filters[key.$2] = [];
						$.each(key.getAppliedValues(), function(v, k) {							
							agora.vizfuncs.filters[key.$2].push(k.formattedValue);
						});
					}

				});

				agora.vizfuncs.history.push(agora.vizfuncs.filters); 
			};

			var onError = function(err) {
				console.log('error!!!');
			}

			worksheet.getFiltersAsync().then(onSuccess, onError);
		},


		applyFilterAsync: function() {

			// newSheet.applyFilterAsync("Gender", ["Woman"], "REPLACE"); 
			mainWorkbook = agora.vizfuncs.mainViz.getWorkbook();
			// get dashboard			
			var activeSheet = mainWorkbook.getActiveSheet();
			// get worksheets
			var worksheets = activeSheet.getWorksheets();

			var worksheet = worksheets[1];

			
			werk = worksheet; 

			worksheet.applyFilterAsync("Gender", ["Female"], "REPLACE"); 
			worksheet.applyFilterAsync("Ethnicity", ["Asian or Asian British"], "REPLACE"); 

			
		}, 

		test: function() {

		}



	}
})();