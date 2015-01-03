'use strict';

/**
 * @ngdoc function
 * @name eltiempoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the eltiempoApp
 */
 angular.module('eltiempoApp')
 .controller('MainCtrl', ['$scope','$timeout','miservicio', function ($scope,$timeout,miservicio) {
 	$scope.Math=Math; //así puedo usar math en la vista
 	$scope.posicion={};
 	$scope.posicion.latitud=0;
 	$scope.posicion.longitud=0;
 	$scope.posicion.lugar='';
 	$scope.posicion.lugar2='';
 	$scope.posicion.precision=0;

 	$scope.prediccionActual={};
 	$scope.prediccionActual.estadoCielo='';
 	$scope.prediccionActual.humedad='';
 	$scope.prediccionActual.viento='';
 	$scope.prediccionActual.nubes=0;
 	$scope.prediccionActual.lluvia='';
 	$scope.prediccionActual.nieve='';
 	$scope.prediccionActual.imagen=null;
 	$scope.prediccionActual.temperatura='';

 	$scope.datosDias=[];
 	$scope.ocultar=true;
 	$scope.buscador='';

 	var _timeout;


 	inicio();


 	/**
 	 * Recoge la información del json para las funciones muestraPorzona y muestraPorGeo
 	 * @param  {[type]} response [description]
 	 * @return {[type]}          [description]
 	 */
 	 function recogeInfo(response){
 	 	$scope.posicion.lugar=response.data.name + ' - ' + response.data.sys.country;
 	 	$scope.prediccionActual.estadoCielo=response.data.weather[0].description;
 	 	$scope.prediccionActual.viento=response.data.weather[0].description;
 		$scope.prediccionActual.temperatura=Math.round(response.data.main.temp)+'ºC';  //-273.15
 		$scope.prediccionActual.humedad=response.data.main.humidity + '%';
 		$scope.prediccionActual.viento= Math.round(response.data.wind.speed * 3.6) + 'km/h';
 		$scope.prediccionActual.nubes =  response.data.clouds.all + '%';
 		if(response.data.rain){
 			$scope.prediccionActual.lluvia = response.data.rain["3h"] + 'mm';
 		} else {
 			$scope.prediccionActual.lluvia = '-'
 		}
 		if(response.data.snow){
 			$scope.prediccionActual.nieve = response.data.snow["3h"] +'mm';
 		}else{
 			$scope.prediccionActual.nieve ='-'
 		}
 		$scope.prediccionActual.imagen=response.data.weather[0].icon;
 		if($scope.posicion.lugar.length>0){
 			$scope.ocultar=false;
 		}else{
 			$scope.ocultar=true;
 		}
 	}

 	/**
 	 * Segun lo que se escriba en el buscador
 	 * @param  {[type]} municipio [description]
 	 * @return {[type]}           [description]
 	 */
 	 $scope.muestraPorZona=function(municipio){
 	 	if($scope.buscador.length>3){
 	 		console.log('por zona');
 	 	    if(_timeout){ //if there is already a timeout in process cancel it
 	 	    	$timeout.cancel(_timeout);
 	 	    }
 	 	    _timeout = $timeout(function(){
 	 	    	console.log('filtering');
 	 	    	_timeout = null;

 	 	    	miservicio.getTiempoActual(municipio).then(function(response) {
 	 	    		try{
					$scope.tiempo=response.data.weather[0];  //main  clouds description broken clouds
		 			$scope.viento=response.wind; //speed 233  speed 2.52
		 			//console.log(response.data);
		 			recogeInfo(response);

		 		}catch(e){
		 			console.log(e)
		 		}
		 	});
 	 	    	

 	 	    	miservicio.getTiempoActualDias(municipio).then(function(response) {
 	 	    		try{
 	 	    			//console.log('dias',response.data.list);
 	 	    			//console.log('oyea',response.data);
 	 	    			$scope.datosDias=response.data.list;
 	 	    			$scope.posicion.lugar2=response.data.city.name + ' - ' + response.data.city.country + ' - Predicción por horas' ;
 	 	    			
 	 	    		}catch(e){
 	 	    			console.log(e)
 	 	    		}
 	 	    	});
 	 	    },800);
 	 	 }


 	 	}

 	/**
 	 * muestra segun el gps. si es desde pc o no encuentra bien la señal, saldrá un lugar que no es.
 	 * @return {[type]} [description]
 	 */
 	 $scope.muestraPorGeo=function(){
 	 	console.log('por Geo');
 	 	miservicio.getTiempoActualGeo($scope.posicion.latitud,$scope.posicion.longitud).then(function(response){
 	 		//console.log('geo',response.data);
 	 		recogeInfo(response);
 	 		$scope.posicion.lugar=$scope.posicion.lugar+ '<br> lat ' + ($scope.posicion.latitud).toFixed(3) + ' - long: ' + ($scope.posicion.longitud).toFixed(3) + ' - precisión: ' + ($scope.posicion.precision/1000).toFixed(2) + 'km';
 	 	});
 	 	$scope.ocultar=false;

 	 	miservicio.getTiempoActualGeoDias($scope.posicion.latitud,$scope.posicion.longitud).then(function(response){
 	 		try{
 	 			//console.log('diasGeo',response.data.list);
 	 			//console.log('oyea',response.data);
 	 			$scope.datosDias=response.data.list;
 	 			$scope.posicion.lugar2=response.data.city.name + ' - ' + response.data.city.country + ' - Predicción por horas' ;
 	 		}catch(e){
 	 			console.log(e)
 	 		}
 	 	});
 	 }





//CONFIG E INCICIO ********************************************

$scope.reinicio=function() {
	$scope.ocultar=true;
	$scope.buscador='';
	// $scope.posicion={};
	// $scope.prediccionActual={};
	// $scope.prediccionActual.temperatura='';
}

function inicio(){
	$timeout(function(){
		$scope.mostrar=true; //muestra las etiquetas con ng-show=mostrar
	},500);
	
	$scope.ocultar=true;
	navigator.geolocation.getCurrentPosition(function(miposicion){
		$scope.posicion.latitud =  miposicion.coords.latitude;
		$scope.posicion.longitud = miposicion.coords.longitude;	
		$scope.posicion.precision = miposicion.coords.accuracy;

		$scope.muestraPorGeo();
		//$scope.muestraPorZona('Toledo,es');
 		if($scope.posicion.precision<1000){ //hay pocos metros, por lo tanto mucha precisión. 

 		}else{ //no es preciso. se tiene que hacer manualmente
 			// $scope.muestraPorZona($scope.buscador,'es');
 		}

 	},function geoError(error) {
 		alert('Lo siento, no hay localización disponible.');
 	}, geoOptions);
}


 	//para aumentar la precisión. se pasa como 3er parámetro en navegation.geolocation
 	var geoOptions = {
 		enableHighAccuracy: true, 
 		maximumAge        : 30000, 
 		timeout           : 27000
 	};



 }]);
