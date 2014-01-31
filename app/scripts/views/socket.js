/*global gembird, Backbone, JST*/

gembird.Views = gembird.Views || {};

(function () {
    'use strict';

    gembird.Views.SocketView = Backbone.View.extend({

        template: JST['app/scripts/templates/socket.ejs']

    });

})();
