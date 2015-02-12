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
		customUrl: '', 		
		

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


		/**
		 * What to do when the tabs switch		 
		 */
		_ventOnTabSwitch: function() {
			var tabName = agora.vizfuncs.mainViz.getWorkbook().getActiveSheet().getName();
			agora.vizfuncs.setReportTitle(tabName);
			agora.vizfuncs.recordHistory(); 
		},

		/**
		 * What to do when the parameters change		 
		 */
		_ventOnParameterChanged: function() {
			// Save the current state to history
			agora.vizfuncs.recordHistory(); 
			return; 
			agora.vizfuncs._getParametersAsync();
		},


		
		/**
		 * What to do when the filters change
		 * @return {[type]} [description]
		 */
		_ventOnFilterChanged: function() {
			// To stop Tableau iterating over each listener event, we implement a
			// counter with a timeout. With the first iteration we set the counter to 1 
			// and subsequently return if greater than 0. The timeout resets the counter; 
			if(agora.vizfuncs.counter > 0) {
				return; 
			}
			// Save the current state to history
			agora.vizfuncs.recordHistory(); 
			
			// agora.vizfuncs._getFiltersAsync();
			agora.vizfuncs.counter++; 

			setTimeout(function(){ 
				agora.vizfuncs.counter--; 
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

		onBack: function() {			
			var that = agora.vizfuncs;
			// var viewName = that.getCustomViewName(); 
			// Decrement viewname
			that.customViewName--; 

			if(that.customViewName <= -0) {
				console.log('no more history'); 
				return; 
			}
			console.log('View Name: ' + that.customViewName); 
			
			that.showCustomView(that.customViewName.toString()); 
			// Remove previous custom view from server
			that.removeCustomView(that.customViewName); 
			
		}, 

		// Should incorporate a guid but because I want to manually clean 
		// the custom views, not yet impletmented
		createCustomViewName: function() {
			var customName = this.customViewName; 
			console.log('current name: ' + customName); 
			this.customViewName++; 
			console.log('after update name: ' + customName); 
			console.log('updated global name: ' + this.customViewName); 
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

			mainWorkbook.rememberCustomViewAsync(name).then(onSuccess, onError); 
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