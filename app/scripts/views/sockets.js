/*global gembird, Backbone, JST*/

gembird.Views = gembird.Views || {};

(function () {
    'use strict';

    gembird.Views.SocketsView = Backbone.View.extend({

        template: JST['app/scripts/templates/sockets.ejs']

    });

})();
