'use strict';

/**
 * @ngdoc service
 * @name eltiempoApp.tiempoModel
 * @description
 * # tiempoModel
 * Service in the eltiempoApp.
 */
 angular.module('eltiempoApp')
 .value('version', '2.5')
 .constant('API_KEY','98c3990cdbba527e99d7f28a8875ddfe')  
 .constant('WEB','http://api.openweathermap.org/data/2.5/') 
 .factory('tiempoModel', ['$http','API_KEY','WEB', function ($http,API_KEY,WEB) {
 	//*******************  genericas  //////////////////
 	function MayusPrimera(string){ 
 		return string.charAt(0).toUpperCase() + string.slice(1); 
 	}
 	
 	var mifactory = {};
 	mifactory.getTiempoActualm = function(mimunicipio) {
 		console.log('getTiempoActualm',mimunicipio)
 		var temp=mimunicipio.split(",");
 		var municipio=temp[0];
 		var siglasPais=temp[1];
 		if(temp[1]===undefined){
 			siglasPais='es';
 		}
 		return $http.post(WEB+'weather?q='+ MayusPrimera(municipio) +',' + siglasPais +'&lang=es&units=metric&APPID='+API_KEY);
 	};

 	mifactory.getTiempoActualGeom = function(lat,lon){
 		return $http.post(WEB+'weather?lat=' + lat + '&lon=' + lon + '&lang=es&units=metric&APPID='+API_KEY); 
 	};

 	mifactory.getTiempoDiasm = function(mimunicipio){
 		var temp=mimunicipio.split(",");
 		var municipio=temp[0];
 		var siglasPais=temp[1];
 		if(temp[1]===undefined){
 			siglasPais='es';
 		}
 		return $http.post(WEB+'forecast?q='+ MayusPrimera(municipio) +',' + siglasPais +'&lang=es&units=metric&APPID='+API_KEY); 
 	},
 	mifactory.getTiempoGeoDiasm = function(lat,lon){
 		return $http.post(WEB+'forecast?lat=' + lat + '&lon=' + lon + '&lang=es&units=metric&APPID='+API_KEY); 
 	}


 	return mifactory;

 	

 }]);
