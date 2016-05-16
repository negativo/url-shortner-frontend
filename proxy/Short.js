module.exports = function(querystring,https,Q){

    var api_url ='gymia-shorty.herokuapp.com';

    function getUrl(path){

        var requested_url = typeof path != 'undefined' ? path : '';

        return 'http://'+api_url+'/'+requested_url;

    }

    var request = require('request');

    return {

        shorten: function(data){
 
            var deferred = Q.defer();

            request({
                url: getUrl('shorten'),
                qs:  data,
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(data),
                }
            }, function(error, response){
                if(error) {
                    console.log(error);
                    deferred.reject(error);
                } else {
                    deferred.resolve(response);
                }
            });

            return deferred.promise;
        },

        getStats: function(shortcode){

            var deferred = Q.defer();

            request({
                url: getUrl(shortcode + '/stats'),
                method: 'GET',
                headers:{
                    'Content-Type': 'application/json',
                }
            }, function(error, response){
                if(error) {
                    console.log(error);
                    deferred.reject(error);
                } else {
                    deferred.resolve(response);
                }
            });

            return deferred.promise;
            
        },
        
        getUrl: function(shortcode){

            var deferred = Q.defer();

            request({
                url: getUrl(shortcode),
                method: 'GET',
                headers:{
                    'Content-Type': 'application/json',
                }
            }, function(error, response){
                if(error) {
                    console.log(error);
                    deferred.reject(error);
                } else {
                    deferred.resolve(response);
                }
            });

            return deferred.promise;
            
        }
    }
};