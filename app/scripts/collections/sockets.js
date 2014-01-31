/*global gembird, Backbone*/

gembird.Collections = gembird.Collections || {};

(function () {
    'use strict';

    gembird.Collections.SocketsCollection = Backbone.Collection.extend({

        model: gembird.Models.SocketsModel

    });

})();
