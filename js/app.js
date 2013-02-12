(function() {
"use strict";

window.App = Ember.Application.create();

App.Store = DS.Store.extend({
  revision: 11,
  adapter: 'DS.FixtureAdapter'
});

App.Router.map(function() {
  this.resource('album', { path: '/album/:album_id' });
});

App.AlbumController = Ember.ObjectController.extend({
  totalDuration: function() {
    var songs = this.get('songs'),
        total = 0;

    songs.forEach(function(song) {
      total += song.get('duration');
    });

    return total;
  }.property('songs.@each.duration')
});

Ember.Handlebars.registerBoundHelper('format-duration', function(seconds) {
  var formattedMinutes = Math.floor(seconds / 60);
  var formattedSeconds = seconds % 60;
  formattedSeconds = formattedSeconds < 10 ? "0" + formattedSeconds : formattedSeconds;
  return formattedMinutes + ":" + formattedSeconds;
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return App.Album.find();
  }
});

})();
