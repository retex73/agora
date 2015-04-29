var agora = window.agora || {};

(function() {
/**
 * @ngdoc service
 * @name ng.service:vizfuncs
 * @description
 * Contains methods to implement api calls to Tableau
 */
	'use strict';
	agora.vizfuncs = {

		reportUrl: '',
		h1: '',
		h2: '',
		help: '',
		pages: '',
		url: '',
		mainViz: '',
		routeParams: '',
		vizParams: [],
		mainVizDiv: "#mainViz",
		div: '',
		history: [],
		filters: {},
		// customViewName: 0,
		counter: 0,
		filterCounter: 0,
		customUrl: '',
		historyCounter: 0,
		pageId: 'report',
		filterHistory: [],
		parameterHistory: [],
		tabHistory: [],
		locked: false,
		goingBack: false,
		tabName: '',
		newCustomView: '',



		// Render the Viz
/**
 * @ngdoc method
 * @name ng.service:vizfuncs#renderViz
 * @methodOf ng.service:vizfuncs
 * @description
 * Grabs the pages belonging to a given group based on the 
 * route parameters. This links the url to the viz being displayed on the page. 
 * @param {object} object route parameters
 <pre>
 	renderViz(routeParams); 
 </pre>
 */
		renderViz: function(routeParams) {
			this.routeParams = routeParams;
			this.dispose();

		},
/**
 * @ngdoc method
 * @name ng.service:reportsl#render
 * @methodOf ng.service:vizfuncs
 * @description
 * Creates a container div calles mainViz and inserts the 
 * Tableau viz as an iframe
 <pre>
 	render();  
 </pre>
 */
		render: function() {

			var browserHeight = $(window).height();

			browserHeight = browserHeight - 125;

			$("#mainViz").css("min-height", browserHeight);

			var routeParams = agora.vizfuncs.routeParams;
			var placeholderDiv = document.getElementById("mainViz");

			agora.vizfuncs.customViewName = 0;
			agora.vizfuncs.routeParams = routeParams;
			agora.vizfuncs.getReportUrl(routeParams);

			// html structure to paint viz into
			agora.vizfuncs.div = $(agora.vizfuncs.mainVizDiv);

			var mainWorkbookUrl = agora.vizfuncs.url;


			var vizOpts = {
				hideTabs: true,
				hideToolbar: true,
				width: agora.vizfuncs.div.parent().innerWidth() + "px",
				height: agora.vizfuncs.div.parent().innerHeight() + "px",
				onFirstInteractive: function() {
					var mainWorkbook = agora.vizfuncs.mainViz.getWorkbook();

					agora.vizfuncs.hasUrlParams();
				}
			};

			var mainVizOptions = $.extend({}, vizOpts, agora.vizfuncs.getVizOptions());


			agora.vizfuncs.mainViz = new tableauSoftware.Viz(placeholderDiv, mainWorkbookUrl, mainVizOptions);


		},
/**
 * @ngdoc method
 * @name ng.service:reportsl#dispose
 * @methodOf ng.service:vizfuncs
 * @description
 * removes the currently displayed viz to make room for a new viz to be
 * displayed. 
 <pre>
 	dispose();  
 </pre>
 */
		dispose: function() {
			if (typeof agora.vizfuncs.mainViz == 'object') {
				this.mainViz.dispose();
				this.tabName = "";
				delete agora.vizfuncs.mainViz;
				setTimeout(function() {
					agora.vizfuncs.renderViz(agora.vizfuncs.routeParams);
					// agora.vizfuncs.addEventListeners();	
					// agora.vizfuncs.getReportUrl(agora.vizfuncs.routeParams); 
					agora.vizfuncs.vizEnhancement();
				}, 500);


			} else {
				this.render();
				agora.vizfuncs.vizEnhancement();
				// agora.vizfuncs.addEventListeners();	
				// agora.vizfuncs.getReportUrl(agora.vizfuncs.routeParams); 
			}



		},

/**
 * @ngdoc method
 * @name ng.service:reportsl#vizEnhancement
 * @methodOf ng.service:vizfuncs
 * @description
 * Adds event listeners to the viz to look out for tab, filter and parameter changes. 
 <pre>
 	vizEnhancement();  
 </pre>
 */
		vizEnhancement: function() {
			agora.vizfuncs.addEventListeners();
			agora.vizfuncs.getReportUrl(agora.vizfuncs.routeParams);
		},

/**
 * @ngdoc method
 * @name ng.service:reportsl#hasUrlParams
 * @methodOf ng.service:vizfuncs
 * @description
 * Detects if there is a query parameter on the url and assumes this is a viz custom name. 
 * It then calls the viz and applies the custom name via Tableau's API
 <pre>
 	hasUrlParams();  
 </pre>
 */
		hasUrlParams: function() {
			var urlParams = window.location.href.split('?')[1];

			if (typeof urlParams !== 'undefined') {
				console.log('has url params');
				var view = urlParams.replace('view=', '', urlParams);
				console.log('custom name: ' + view);

				agora.vizfuncs.showCustomView(view);
			}
		},


/**
 * @ngdoc method
 * @name ng.service:reportsl#resizeViewButton
 * @methodOf ng.service:vizfuncs
 * @description
 * Increases the view button width
 <pre>
 	resizeViewButton();  
 </pre>
 */
		resizeViewButton: function() {
			if ($(".panel-body").length > 0) {
				// Set view button width
				var buttonWidth = $(".panel-body").width();
				buttonWidth = buttonWidth + 30;
				$(".get-started-bottom").width(buttonWidth);
			} else {
				return;
			}

		},

		/**
		 * TO DO
		 * @return {[type]} [description]
		 */
		resizeViz: function() {
			// If we have the mainViz defined we don't need to 
			// resize the 'view' button on the reports page :) 
			if (typeof mainViz == "undefined") {
				this.resizeViewButton();
				// No need to do any other resizing magic here
				return;
			}


			// Calculate height based on if fullscreen or not as we 
			// take into account the headers
			var gap,
				fullSize,
				height,
				width,
				browserHeight = $(window).height();
			if ($("#fullScreen").hasClass("fullScreenButtonActive")) {

				gap = 20;
			}
			// When exiting fullscreen
			else {

				gap = 125;
				fullSize = 1;
			}


			browserHeight = (browserHeight - gap);


			$("#mainViz").css("height", browserHeight);

			height = $("#mainViz").height();
			width = $("#mainViz").width();

			// Compensate for scrollbars appearing
			if (fullSize) {
				// commented out this line as original problem seems to have resolved
				// width = (width+16); 
			}

			agora.vizfuncs.mainViz.setFrameSize(width, height);
		},

/**
 * @ngdoc method
 * @name ng.service:reportsl#showDownloadWorkbookDialog
 * @methodOf ng.service:vizfuncs
 * @description
 * Invokes the Tableau download API
 <pre>
 	showDownloadWorkbookDialog(); 
 </pre>
 */
		showDownloadWorkbookDialog: function() {
			agora.vizfuncs.mainViz.showDownloadWorkbookDialog();
		},
/**
 * @ngdoc method
 * @name ng.service:reportsl#showDownloadWorkbookDialog()
 * @methodOf ng.service:vizfuncs
 * @description
 * Invokes the Tableau pdf download API
 <pre>
 	showExportPDFDialog(); 
 </pre>
 */
		showExportPDFDialog: function() {
			agora.vizfuncs.mainViz.showExportPDFDialog();
		},
/**
 * @ngdoc method
 * @name ng.service:reportsl#showShareDialog()
 * @methodOf ng.service:vizfuncs
 * @description
 * Invokes a modal dialogue box to show the 'share link'
 <pre>
 	showShareDialog(); 
 </pre>
 */
		showShareDialog: function() {
			agora.vizfuncs.mainViz.showShareDialog();
		},
/**
 * @ngdoc method
 * @name ng.service:reportsl#showExportDataDialog()
 * @methodOf ng.service:vizfuncs
 * @description
 * Invokes the Tableau API to show the export data dialogue box
 <pre>
 	showExportDataDialog(); 
 </pre>
 */
		showExportDataDialog: function() {
			agora.vizfuncs.mainViz.showExportDataDialog();
		},

/**
 * @ngdoc method
 * @name ng.service:reportsl#showExportImageDialog()
 * @methodOf ng.service:vizfuncs
 * @description
 * Invokes the Tableau API export image functionality
 <pre>
 	showExportImageDialog(); 
 </pre>
 */
		showExportImageDialog: function() {
			agora.vizfuncs.mainViz.showExportImageDialog();
		},

/**
 * @ngdoc method
 * @name ng.service:reportsl#showExportCrossTabDialog()
 * @methodOf ng.service:vizfuncs
 * @description
 * Invokes the Tableau API invoke export cross tab functionality
 <pre>
 	showExportCrossTabDialog(); 
 </pre>
 */
		showExportCrossTabDialog: function() {
			agora.vizfuncs.mainViz.showExportCrossTabDialog();
		},

		revertAll: function() {
			agora.vizfuncs.mainViz.revertAllAsync();
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
				console.log(this.url);
				// Dynamically look up the help link if the tab has changed. 
				if (this.tabName.length === 0) { // Invoked if no tab change 					
					this.help = result[0].pages[group][0].help;
				} else { // If tab change, get the link based on the tab name. 					
					if (this.tabName.length === 0) {
						this.help = result[0].pages[group][0].help;
					} else {
						this.help = Mapper.getHelp(this.tabName);
					}

				}
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
			var that = agora.vizfuncs;

			that.mainViz.addEventListener("tabswitch", that._ventOnTabSwitch);
			that.mainViz.addEventListener("parametervaluechange", that._ventOnParameterChanged);
			that.mainViz.addEventListener("filterchange", that._ventOnFilterChanged);
		},


		/**
		 * What to do when the tabs switch
		 */
		_ventOnTabSwitch: function(e) {
			// Get the previous tabname to record into history			
			// and write the old sheet name to history model
			agora.vizfuncs.recordLastTab(e.getOldSheetName());
			// Get the current tabname			
			agora.vizfuncs.tabName = agora.vizfuncs.mainViz.getWorkbook().getActiveSheet().getName();
			// Update the report titles with the new tab name
			agora.vizfuncs.setReportTitle(agora.vizfuncs.tabName);
			// Update the viz wrapper			
			agora.vizfuncs.onChange();
			// Update the help link based on the tab name
			agora.vizfuncs.help = Mapper.getHelp(agora.vizfuncs.tabName);

		},

		recordLastTab: function(tabName) {
			var that = agora.vizfuncs;

			// If the user clicked on back, don't record the tab
			if (that.goingBack) {
				that.goingBack = false;
				return;
			}


			if (that.history.length === 0) {
				var histObj = {
					report: agora.vizfuncs.pageId,
					filters: agora.vizfuncs.filterHistory,
					params: agora.vizfuncs.parameterHistory
				};
				// Push the entire filters and params to history obj
				agora.vizfuncs.history.push(histObj);
				// Increment history counter; 
				agora.vizfuncs.historyCounter++;
			}

			var lastObj = that.history[that.historyCounter - 1];

			lastObj.tabName = tabName;
			that.tabHistory.push(lastObj);
			that.goingBack = false;
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
			var mainWorkbook = agora.vizfuncs.mainViz.getWorkbook();

			if (!params.length) {
				return;
			}

			$.each(params[0], function(k, v) {
				mainWorkbook.changeParameterValueAsync(v.name, v.values[1]);
			});

		},

		applyFilters: function(filters) {
			var mainWorkbook = agora.vizfuncs.mainViz.getWorkbook();
			var activeSheet = mainWorkbook.getActiveSheet();
			var worksheets = activeSheet.getWorksheets();
			var worksheet = worksheets[1];



			$.each(filters[0], function(k, v) {
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
			that.goingBack = true;

			var lastTabHistory = that.tabHistory[Object.keys(that.tabHistory)[Object.keys(that.tabHistory).length - 1]];

			that.tabHistory.pop();

			that.changeTab(lastTabHistory);

		},

		changeTab: function(lastTabHistory) {
			var that = agora.vizfuncs;


			var mainWorkbook = that.mainViz.getWorkbook();

			// that.mainViz.pauseAutomaticUpdatesAsync(); 

			var lastTabName = lastTabHistory.tabName;
			var filters = lastTabHistory.filters;
			var params = lastTabHistory.params;



			mainWorkbook.activateSheetAsync(lastTabName);
			that.applyParams(params);
			that.applyFilters(filters);

			// Remove the newly created entry after tab change 
			// as we're not interested in this one. 
			that.tabHistory.pop();
			// that.mainViz.resumeAutomaticUpdatesAsync(); 
		},

		onChange: function() {
			var that = agora.vizfuncs;

			function waitForElement() {
				if (typeof agora.vizfuncs.mainViz.getWorkbook() !== "undefined") {
					var tabName = agora.vizfuncs.mainViz.getWorkbook().getActiveSheet().getName();
					agora.vizfuncs.setReportTitle(tabName);
					agora.vizfuncs.counter++;
					agora.vizfuncs.tabName = tabName;
				} else {
					setTimeout(function() {
						waitForElement();
					}, 250);
				}
			}

			if (agora.vizfuncs.locked) {

				agora.vizfuncs.locked = false;
				return;
			} else {
				// console.log('not locked');
			}

			if (agora.vizfuncs.counter <= 0) {


				waitForElement();
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


			var mainWorkbook = agora.vizfuncs.mainViz.getWorkbook();

			if (typeof mainWorkbook == "undefined") {
				return;
			}

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
			var mainWorkbook = agora.vizfuncs.mainViz.getWorkbook();


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
				// console.log('Pusihing to filterHistory');
				agora.vizfuncs.filterHistory.push(arrFilters);
			};
			var onError = function(err) {
				console.log('Error!!');
			};



			// setTimeout(function(){

			// 	mainWorkbook.getActiveSheet().getWorksheets()[0].getFiltersAsync().then(onSuccess, onError);

			// }, 1200); 


			function waitForElement() {
				if (typeof agora.vizfuncs.mainViz.getWorkbook() !== "undefined") {
					var mainWorkbook = agora.vizfuncs.mainViz.getWorkbook();
					mainWorkbook.getActiveSheet().getWorksheets()[0].getFiltersAsync().then(onSuccess, onError);
				} else {
					setTimeout(function() {
						waitForElement();
					}, 250);
				}
			}

			waitForElement();
		},


		// As this will be called on back button, 
		// we should decrement the view name
		getCustomViewName: function() {
			var that = agora.vizfuncs;

			// return that.customViewName -1; 
			return that.customViewName;
		},

		getRandomName: function() {
			return 'xxxxxxxx'.replace(/[xy]/g, function(c) {
				var r = Math.random() * 16 | 0,
					v = c == 'x' ? r : (r & 0x3 | 0x8);
				return v.toString(16);
			});
		},


		saveCustomView: function() {
			var that = agora.vizfuncs;
			var mainWorkbook = agora.vizfuncs.mainViz.getWorkbook();
			// Get the current url without any parameters
			var baseUrl = window.location.href.split('?')[0];
			var name = that.getRandomName();
			var linkUrl = baseUrl + '?view=' + name;



			mainWorkbook.rememberCustomViewAsync(name).then(
				function(view) {
					console.log('success');
					that.newCustomView = view;
					that.newCustomView.setAdvertised(true);


					$("#spinner, #basic-addon1").hide();

					$(".label-info").text("Copy and paste the link below");
					$("#modal-url").val(linkUrl).prop("disabled", false).css("font-size", "13px").focus().select();


				},
				function() {
					console.log('error');
				});
		},

		showCustomView: function(name) {

			setTimeout(function(){
				var mainWorkbook = agora.vizfuncs.mainViz.getWorkbook();

				mainWorkbook.showCustomViewAsync(name.toString()).then(
						function(msg) {
							console.log('succeeded loading the custom view');
						},

						function(err) {
							waitForElement(); 
							console.log('failed');
							console.log(err);
						}
					);

			}, 500); 

			return; 

			var mainWorkbook = agora.vizfuncs.mainViz.getWorkbook();

			function waitForElement() {
				if (typeof agora.vizfuncs.mainViz.getWorkbook() !== "undefined") {
					mainWorkbook.showCustomViewAsync(name.toString()).then(
						function(msg) {
							console.log('succeeded loading the custom view');
						},

						function(err) {
							waitForElement(); 
							console.log('failed');
							console.log(err);
						}
					);
				} else {
					setTimeout(function() {
						waitForElement();
					}, 250);
				}
			}

			waitForElement();

			return; 

			var mainWorkbook = agora.vizfuncs.mainViz.getWorkbook();
			console.log('Showing: ' + name);


			mainWorkbook.showCustomViewAsync(name.toString()).then(
				function(msg) {
					console.log('succeeded');
				},

				function(err) {
					console.log('failed');
					console.log(err);
				}
			);
		}
	};

})();