'use strict';

/**
 * @ngdoc service
 * @name eltiempoApp.tiempo_service
 * @description
 * # tiempo_service
 * Service in the eltiempoApp.
 */
 angular.module('eltiempoApp')
 .factory('tiempoService',['tiempoModel','$http','$q',function(tiempoModel,$http,$q){
 	return{
 		//escribir toledo,es . si no se pone el pais lo rellena con es. ej: london,uk 
 		getTiempoActual: function(mimunicipio){
 			var def = $q.defer();
 			tiempoModel.getTiempoActualm(mimunicipio).success(function(datos) {
 				def.resolve(datos);
 			}).error(function(datos, status) {
 				console.log('errata getTiempoActual')
 			});
 			return def.promise;
 		},
 		getTiempoActualGeo: function(lat,lon){
 			var def = $q.defer();
 			tiempoModel.getTiempoActualGeom (lat,lon).success(function(datos) {
 				def.resolve(datos);
 			}).error(function(datos, status) {
 				console.log('errata getTiempoActualGeo')
 			});
 			return def.promise;
 			
 		},
 		getTiempoDias: function(mimunicipio){
 			var def = $q.defer();
 			tiempoModel.getTiempoDiasm (mimunicipio).success(function(datos) {
 				def.resolve(datos);
 			}).error(function(datos, status) {
 				console.log('errata getTiempoDias')
 			});
 			return def.promise;
 		},
 		getTiempoGeoDias: function(lat,lon){
 			var def = $q.defer();
 			tiempoModel.getTiempoGeoDiasm (lat,lon).success(function(datos) {
 				console.log('houston ', datos)
 				def.resolve(datos);
 			}).error(function(datos, status) {
 				console.log('errata getTiempoGeoDias')
 			});
 			return def.promise; 
 		}
 	}


//*******************  genericas  //////////////////
function MayusPrimera(string){ 
	return string.charAt(0).toUpperCase() + string.slice(1); 
}

}]);
