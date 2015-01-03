'use strict';

/**
 * @ngdoc service
 * @name eltiempoApp.miservicio
 * @description
 * # miservicio
 * Service in the eltiempoApp.
 */
 angular.module('eltiempoApp')
 .value('version', '2.5')
 .constant('API_KEY','98c3990cdbba527e99d7f28a8875ddfe')  
 .constant('WEB','http://api.openweathermap.org/data/2.5/') 
 .factory('miservicio',['$http','API_KEY','WEB',function($http,API_KEY,WEB){
 	return{
 		//escribir toledo,es . si no se pone el pais lo rellena con es. ej: london,uk 
 		getTiempoActual: function(mimunicipio){
 			var temp=mimunicipio.split(",");
 			var municipio=temp[0];
 			var siglasPais=temp[1];
 			if(temp[1]===undefined){
 				siglasPais='es';
 			}
 			return $http.post(WEB+'weather?q='+ MayusPrimera(municipio) +',' + siglasPais +'&lang=es&units=metric&APPID='+API_KEY); 
 		},
 		getTiempoActualGeo: function(lat,lon){
 			return $http.post(WEB+'weather?lat=' + lat + '&lon=' + lon + '&lang=es&units=metric&APPID='+API_KEY); 
 		},
 		getTiempoActualDias: function(mimunicipio){
 			var temp=mimunicipio.split(",");
 			var municipio=temp[0];
 			var siglasPais=temp[1];
 			if(temp[1]===undefined){
 				siglasPais='es';
 			}
 			return $http.post(WEB+'forecast?q='+ MayusPrimera(municipio) +',' + siglasPais +'&lang=es&units=metric&APPID='+API_KEY); 
 		},
 		getTiempoActualGeoDias: function(lat,lon){
 			return $http.post(WEB+'forecast?lat=' + lat + '&lon=' + lon + '&lang=es&units=metric&APPID='+API_KEY); 
 		}
 	}


//*******************  genericas  //////////////////
 	function MayusPrimera(string){ 
 		return string.charAt(0).toUpperCase() + string.slice(1); 
 	}


 }]);
