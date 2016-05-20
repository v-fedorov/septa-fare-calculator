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

			FareService.getData().then(function(data) {
				vm.data = data;
				vm.zones = lodash.map(vm.data.zones, 'name');
				vm.info  = vm.data.info;
				vm.types = [];
			});
		}

})();
