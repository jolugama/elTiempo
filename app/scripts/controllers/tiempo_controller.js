'use strict';

/**
 * @ngdoc function
 * @name eltiempoApp.controller:tiempoCtrl
 * @description
 * # tiempoCtrl
 * Controller of the eltiempoApp
 */
 angular.module('eltiempoApp')
 .controller('tiempoCtrl', ['tiempoService','$scope','$timeout','$animate',function (tiempoService,$scope,$timeout,$animate) {
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
 	
 	$scope.buscador='';

 	var _timeout;

 	$scope.mostrar=false;
 	$scope.mostrarPrediccion=false;
 	$scope.mostrarPrediccionDias=false;

 	// $scope.animacion=true;
 	// $scope.animacion2=true;




 	/**
 	 * Recoge la información del json para las funciones muestraPorzona muestraPorGeo
 	 * @param  {[type]} response [description]
 	 * @return {[type]}          [description]
 	 */
 	 function recogeInfox(response){
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
 			$scope.mostrarPrediccion=true;
 			$scope.mostrarPrediccionDias=true;
 		}else{
 			$scope.mostrarPrediccion=false;
 			$scope.mostrarPrediccionDias=false;
 		}
 	}

 	function recogeInfo(response){
 		$scope.posicion.lugar=response.name + ' - ' + response.sys.country;
 		$scope.prediccionActual.estadoCielo=response.weather[0].description;
 		$scope.prediccionActual.viento=response.weather[0].description;
 		$scope.prediccionActual.temperatura=Math.round(response.main.temp)+'ºC';  //-273.15
 		$scope.prediccionActual.humedad=response.main.humidity + '%';
 		$scope.prediccionActual.viento= Math.round(response.wind.speed * 3.6) + 'km/h';
 		$scope.prediccionActual.nubes =  response.clouds.all + '%';
 		if(response.rain){
 			$scope.prediccionActual.lluvia = response.rain["3h"] + 'mm';
 		} else {
 			$scope.prediccionActual.lluvia = '-'
 		}
 		if(response.snow){
 			$scope.prediccionActual.nieve = response.snow["3h"] +'mm';
 		}else{
 			$scope.prediccionActual.nieve ='-'
 		}
 		$scope.prediccionActual.imagen=response.weather[0].icon;
 		if($scope.posicion.lugar.length>0){
 			$scope.mostrarPrediccion=true;
 			$scope.mostrarPrediccionDias=true;
 		}else{
 			$scope.mostrarPrediccion=false;
 			$scope.mostrarPrediccionDias=false;
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

 	 	    	tiempoService.getTiempoActual(municipio).then(function(response) {
 	 	    		try{
 	 	    			console.log('controller',response)
 	 	    			recogeInfo(response);	 	    			
 	 	    		}catch(e){
 	 	    			console.log(e)
 	 	    		}
 	 	    	});
 	 	    	

 	 	    	tiempoService.getTiempoDias(municipio).then(function(response) {
 	 	    		$scope.datosDias=response.list;
 	 	    		$scope.posicion.lugar2=response.city.name + ' - ' + response.city.country + ' - Predicción por horas' ;
 	 	    		$scope.refresco();
 	 	    	}, function(error) {
 	 	    		console.log('ERROR CONTROLLER')
 	 	    	});
 	 	    },1800);
 	 	 }


 	 	}


 	/**
 	 * muestra segun el gps. si es desde pc o no encuentra bien la señal, saldrá un lugar que no es.
 	 * @return {[type]} [description]
 	 */
 	 $scope.muestraPorGeo=function(){
 	 	console.log('por Geo');
 	 	
 	 	navigator.geolocation.getCurrentPosition(function(miposicion){
 	 		$scope.posicion.latitud =  miposicion.coords.latitude;
 	 		$scope.posicion.longitud = miposicion.coords.longitude;	
 	 		$scope.posicion.precision = miposicion.coords.accuracy;

 	 		
 	 		tiempoService.getTiempoActualGeo($scope.posicion.latitud,$scope.posicion.longitud).then(function(response){
 	 			console.log('geo',response);
 	 			recogeInfo(response);
 	 			$scope.posicion.lugar=$scope.posicion.lugar+ '<br> lat ' + ($scope.posicion.latitud).toFixed(3) + ' - long: ' + ($scope.posicion.longitud).toFixed(3) + ' - precisión: ' + ($scope.posicion.precision/1000).toFixed(2) + 'km';
 	 			$scope.cargandoDatos=''

 	 		});



 	 		tiempoService.getTiempoGeoDias($scope.posicion.latitud,$scope.posicion.longitud).then(function(response){
 	 			$scope.datosDias=response.list;
 	 			$scope.posicion.lugar2=response.city.name + ' - ' + response.city.country + ' - Predicción por horas' ;
 	 			if(response){
 	 				$scope.refresco();
 	 			}
 	 			
 	 			
 	 		});

 	 	},function geoError(error) {
 	 		$scope.cargandoDatos=''
 	 		alert('Verifique que tiene el GPS activado. Realice la búsqueda manualmente.');
 	 	}, geoOptions);
}




//CONFIG E INICIO ********************************************
$scope.limpiaryRefrescar=function(){
	$scope.buscador='';
	$scope.refresco();
}

$scope.limpiar=function(){
	$scope.buscador='';
	$scope.animacion=true;
	$scope.animacion2=true;
}

$scope.refresco=function() {
	$scope.animacion=false;
	$scope.animacion2=false;
}


$scope.inicio=function() {
	$scope.cargandoDatos='Cargando datos... Espere, por favor.'
	$scope.muestraPorGeo();
	// $timeout(function(){
	// 	$scope.cargandoDatos=''
	// },2000);


}



 	//para aumentar la precisión. se pasa como 3er parámetro en navegation.geolocation
 	var geoOptions = {
 		enableHighAccuracy: true, 
 		maximumAge        : 30000, 
 		timeout           : 27000
 	};



 }]);
