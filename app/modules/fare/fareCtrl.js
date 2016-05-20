(function() {
	'use strict';

	/**
	* @ngdoc function
	* @name app.controller:fareCtrl
	* @description
	* # fareCtrl
	* Controller of the app
	*/

  	angular
		.module('fare')
		.controller('FareCtrl', Fare);

		Fare.$inject = ['lodash', 'FareService'];

		/*
		* recommend
		* Using function declarations
		* and bindable members up top.
		*/

		function Fare(lodash, FareService) {
			/*jshint validthis: true */
			var vm = this;

			vm.selectedZone;
			vm.selectedType;

			vm.getSelectedText = function(name) {
				if (vm['selected' + name] !== undefined) {
					return vm['selected' + name];
				} else {
					return "Please select a " + name;
				}
			};

			vm.selectZone = function() {
				// Get fares from selected zone
				var zone = _.find(vm.data.zones, { 'name': vm.selectedZone });

				vm.types = lodash.uniq(
						lodash.map(zone.fares, 'type')
					);
			};

			// Intial data load, setting vars only after promise resolves
			FareService.getData().then(function(data) {
				vm.data  = data;
				vm.zones = lodash.map(vm.data.zones, 'name');
				vm.info  = vm.data.info;
				vm.types = [];
			});
		}

})();
