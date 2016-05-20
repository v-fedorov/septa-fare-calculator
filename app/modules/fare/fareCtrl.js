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
			vm.selectedPurchase;
			vm.trips;

			vm.currentZone = function() {
				return _.find(vm.data.zones, { 'name': vm.selectedZone });
			};

			vm.getPrice = function() {
				if (vm.selectedZone && vm.selectedPurchase && vm.trips) {
					var zone = vm.currentZone();

					// Update purchase type since 'Anytime' has only one option
					vm.purchases = lodash.uniq(
						_.map(_.filter(zone.fares, { 'type': vm.selectedType }), 'purchase')
					);

					console.log(vm.purchases)

					vm.fare = _.find(zone.fares, { 'type': vm.selectedType, 'purchase': vm.selectedPurchase });
					vm.price = vm.fare.price * vm.trips;
					console.log(vm.price)
				}
			};

			vm.getSelectedText = function(name) {
				if (vm['selected' + name] !== undefined) {
					return vm['selected' + name];
				} else {
					return "Please select a " + name;
				}
			};

			vm.selectZone = function() {
				// Get fares from selected zone
				var zone = vm.currentZone();

				vm.types = lodash.uniq(
						_.map(zone.fares, 'type')
					);

				vm.purchases = lodash.uniq(
						_.map(zone.fares, 'purchase')
					);

				vm.trips = 1;
			};

			// Intial data load, setting vars only after promise resolves
			FareService.getData().then(function(data) {
				vm.data  = data;
				vm.zones = _.map(vm.data.zones, 'name');
				vm.info  = vm.data.info;
				vm.types = [];
			});
		}

})();
