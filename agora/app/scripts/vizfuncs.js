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
		vizParams: [],
		mainVizDiv: $("#mainViz"),
		history: [],
		filters: {},
		customViewName: 0,
		counter: 0,
		filterCounter: 0,
		customUrl: '',
		historyCounter: 0,
		pageId: 'report',
		filterHistory: [],
		parameterHistory: [],
		tabHistory: [], 

		renderViz: function(routeParams) {

			this.customViewName = 0;
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

			// this.setVizParams('Show by', 'Nationality');

			var mainVizOptions = $.extend({}, vizOpts, this.getVizOptions());

			this.mainViz = new tableauSoftware.Viz(mainVizDiv[0], mainWorkbookUrl, mainVizOptions);



		},

		/**
		 * TO DO
		 * @return {[type]} [description]
		 */
		onResize: function() {

		},


		getVizOptions: function() {

			return this.vizParams;
		},

		setVizParams: function(key, value) {
			// this.vizParams[key] = value;
			var histObj = {};
			histObj[key] = value;
			agora.vizfuncs.vizParams.push(histObj);
		},

		/**
		 * Looks up the report details based on the url parameters
		 * and sets the page's h1 and h2 attributes
		 * @param  {[object]} routeParams [description]
		 */
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

		/**
		 * Sets the report title
		 * @param {[string]} reportName [description]
		 */
		setReportTitle: function(reportName) {
			this.getReportUrl(this.routeParams);

			var reports = [];
			$.each(this.pages[0].pages, function(index, value) {
				reports.push(value);
			});

			$.each(reports, function(index, value) {
				$.each(value, function(index, value) {
					if (value.pageId == reportName) {
						agora.vizfuncs.pageId = value.pageId;
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


		/**
		 * What to do when the tabs switch
		 */
		_ventOnTabSwitch: function(e) {
			
			var oldSheetName = e.getOldSheetName(); 
			agora.vizfuncs.recordLastTab(oldSheetName); 
			
			var tabName = agora.vizfuncs.mainViz.getWorkbook().getActiveSheet().getName();
			agora.vizfuncs.setReportTitle(tabName);
			// agora.vizfuncs.recordHistory(); 
			// var oldName = agora.v
			agora.vizfuncs.onChange();
		},

		recordLastTab: function(tabName) {
			var that = agora.vizfuncs; 
			// Do the real history store here
			

			var lastObj = that.history[that.historyCounter - 1];
			lastObj['tabName'] = tabName; 


			that.tabHistory.push(lastObj);

			console.log(that.tabHistory);  
		}, 

		/**
		 * What to do when the parameters change
		 */
		_ventOnParameterChanged: function() {
			// Save the current state to history
			// agora.vizfuncs.recordHistory(); 
			// return; 
			// agora.vizfuncs._getParametersAsync();
			agora.vizfuncs.onChange();
		},



		/**
		 * What to do when the filters change
		 * @return {[type]} [description]
		 */
		_ventOnFilterChanged: function() {
			// To stop Tableau iterating over each listener event, we implement a
			// counter with a timeout. With the first iteration we set the counter to 1 
			// and subsequently return if greater than 0. The timeout resets the counter; 
			if (agora.vizfuncs.filterCounter > 0) {
				return;
			}

			// Save the current state to history
			// agora.vizfuncs.recordHistory(); 
			agora.vizfuncs.onChange();

			// agora.vizfuncs._getFiltersAsync();
			agora.vizfuncs.filterCounter++;

			setTimeout(function() {
				agora.vizfuncs.filterCounter--;
			}, 3000);
		},

		// Called on param or filter change, or tab change maybe??
		recordHistory: function() {
			var that = agora.vizfuncs;

			// var customName = that.createCustomViewName().toString(); 

			var customName = that.customViewName.toString();
			that.saveCustomView(customName);
			// increment the value
			that.customViewName++;
		},

		onBackOld: function() {
			var that = agora.vizfuncs;
			// var viewName = that.getCustomViewName(); 
			// Decrement viewname
			that.customViewName--;

			if (that.customViewName <= -0) {
				console.log('no more history');
				return;
			}
			console.log('View Name: ' + that.customViewName);

			that.showCustomView(that.customViewName.toString());
			// Remove previous custom view from server
			that.removeCustomView(that.customViewName);

		},



		applyParams: function(params) {
			mainWorkbook = agora.vizfuncs.mainViz.getWorkbook();

			$.each(params[0], function(k, v) {
				// console.log(v.name); 
				// console.log(v.values[1]); 
				mainWorkbook.changeParameterValueAsync(v.name, v.values[1]);
			});

		},

		applyFilters: function(filters) {
			mainWorkbook = agora.vizfuncs.mainViz.getWorkbook();
			var activeSheet = mainWorkbook.getActiveSheet(); 
			var worksheets = activeSheet.getWorksheets(); 
			var worksheet = worksheets[1]; 			

			var activeSheet = mainWorkbook.getActiveSheet();

			$.each(filters[0], function(k, v){
				// console.log(v.name);
				// console.log(v.values); 
				worksheet.applyFilterAsync(v.name, v.values, "REPLACE"); 
			});


					
    


		},


		getLastHistoryState: function() {
			var that = agora.vizfuncs;

			// Decrement the history counter
			that.historyCounter--;

			// var lastObj = that.history[Object.keys(that.history)[Object.keys(that.history).length - 2]]; 
			var lastObj = that.history[that.historyCounter - 1];

			return lastObj;
		},

		locked: false,

		onBackAll: function() {

			console.log('going back');
			var that = agora.vizfuncs;
			that.locked = true;
			var lastStateObj = agora.vizfuncs.getLastHistoryState();

			that.applyParams(lastStateObj.params);
			that.applyFilters(lastStateObj.filters);
		},

		onBack: function() {
			var that = agora.vizfuncs; 
			that.locked = true; 			
			var lastTabHistory =  that.tabHistory[Object.keys(that.tabHistory)[Object.keys(that.tabHistory).length - 1]];

			 

			that.changeTab(lastTabHistory); 

		}, 

		changeTab: function(lastTabHistory) {
			var that = agora.vizfuncs; 


			mainWorkbook = that.mainViz.getWorkbook();

			// that.mainViz.pauseAutomaticUpdatesAsync(); 

			var lastTabName = lastTabHistory.tabName; 
			var filters = lastTabHistory.filters; 
			var params = lastTabHistory.params; 

			

			mainWorkbook.activateSheetAsync(lastTabName); 
			that.applyParams(params); 
			that.applyFilters(filters); 

			// that.mainViz.resumeAutomaticUpdatesAsync(); 
		}, 

		onChange: function() {

			if (agora.vizfuncs.locked) {
				// var tabName = agora.vizfuncs.mainViz.getWorkbook().getActiveSheet().getName();
				// agora.vizfuncs.setReportTitle(tabName);
				console.log('locked');
				agora.vizfuncs.locked = false;
				return;
			} else {
				console.log('not locked');
			}

			if (agora.vizfuncs.counter <= 0) {
				// doing the onchange first time to get the tab title
				console.log('setting report title');
				var tabName = agora.vizfuncs.mainViz.getWorkbook().getActiveSheet().getName();
				agora.vizfuncs.setReportTitle(tabName);
				agora.vizfuncs.counter++;
			}



			// Clear old filter and param arrays			
			agora.vizfuncs.filterHistory = [];
			agora.vizfuncs.parameterHistory = [];

			// Store the filters and parameters to history		

			agora.vizfuncs.getFilters();
			agora.vizfuncs.getParameters();
			var histObj = {
				report: agora.vizfuncs.pageId,
				filters: agora.vizfuncs.filterHistory,
				params: agora.vizfuncs.parameterHistory
			};
			// Push the entire filters and params to history obj
			agora.vizfuncs.history.push(histObj);
			// Increment history counter; 
			agora.vizfuncs.historyCounter++;
		},

		getParameters: function() {


			mainWorkbook = agora.vizfuncs.mainViz.getWorkbook();
			var arrParams = [];
			var paramValues = [];
			var onSuccess = function(params) {

				window.params = params;

				$.each(params, function(k, v) {

					// console.log(v.getName()); 
					$.each(v.getCurrentValue(), function(key, val) {

						// console.log(val); 
						paramValues.push(val);
					});

					var paramObj = {
						name: v.getName(),
						values: paramValues
					};

					// console.log(paramObj); 

					paramValues = [];
					arrParams.push(paramObj);
				});

				agora.vizfuncs.parameterHistory.push(arrParams);
			};

			var onError = function(err) {
				console.log('Error!!');
			};

			mainWorkbook.getParametersAsync().then(onSuccess, onError);
		},

		getFilters: function(currentKey, counter) {
			mainWorkbook = agora.vizfuncs.mainViz.getWorkbook();


			var arrFilters = [];
			var filterValues = [];
			var onSuccess = function(filters) {

				$.each(filters, function(k, v) {

					$.each(v.$C, function(key, val) {
						filterValues.push(val.formattedValue);
					});

					var filterObj = {
						name: v.$2,
						values: filterValues
					};

					filterValues = [];
					arrFilters.push(filterObj);
				});

				// console.log(arrFilters); 
				console.log('Pusihing to filterHistory');
				agora.vizfuncs.filterHistory.push(arrFilters);
			};
			var onError = function(err) {
				console.log('Error!!');
			};

			mainWorkbook.getActiveSheet().getWorksheets()[0].getFiltersAsync().then(onSuccess, onError);
		},



		// Should incorporate a guid but because I want to manually clean 
		// the custom views, not yet impletmented
		createCustomViewName: function() {
			var customName = this.customViewName;

			this.customViewName++;

			return customName;
		},

		// As this will be called on back button, 
		// we should decrement the view name
		getCustomViewName: function() {
			var that = agora.vizfuncs;

			// return that.customViewName -1; 
			return that.customViewName;
		},

		saveCustomView: function(name) {
			mainWorkbook = agora.vizfuncs.mainViz.getWorkbook();

			var onSuccess = function(view) {

				newCustomView = view;
			};

			var onError = function(err) {
				console.log('Error!!!');
			};

			// mainWorkbook.rememberCustomViewAsync(name).then(onSuccess, onError); 
		},

		showCustomView: function(name) {

			console.log('Showing: ' + name);
			mainWorkbook = agora.vizfuncs.mainViz.getWorkbook();

			mainWorkbook.showCustomViewAsync(name.toString()).then(onSuccess, onError);
		},

		generateLink: function() {
			newCustomView.saveAsync().then(function() {
				return newCustomView.getUrl();
			});
		},

		removeCustomView: function(name) {
			mainWorkbook = agora.vizfuncs.mainViz.getWorkbook();
			mainWorkbook.removeCustomViewAsync(name.toString());
		}
	}
})();