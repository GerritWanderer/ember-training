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

App.ApplicationRoute = Ember.Route.extend({
  setupController: function() {
    this.controllerFor('nowPlaying');
  }
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return App.Album.find();
  }
});

App.AlbumController = Ember.ObjectController.extend({
  needs: ['nowPlaying'],
  totalDuration: function() {
    var songs = this.get('songs'),
        total = 0;

    songs.forEach(function(song) {
      total += song.get('duration');
    });

    return total;
  }.property('songs.@each.duration'),

  play: function(controller) {
    this.set('controllers.nowPlaying.model', controller.get('model'));
  }
});

App.NowPlayingController = Ember.ObjectController.extend();

App.SongController = Ember.ObjectController.extend({
  needs: 'nowPlaying',

  isPlaying: function() {
    return this.get('controllers.nowPlaying.model') === this.get('model');
  }.property('controllers.nowPlaying.model')
});

Ember.Handlebars.registerBoundHelper('format-duration', function(seconds) {
  var formattedMinutes = Math.floor(seconds / 60);
  var formattedSeconds = seconds % 60;
  formattedSeconds = formattedSeconds < 10 ? "0" + formattedSeconds : formattedSeconds;
  return formattedMinutes + ":" + formattedSeconds;
});

App.AudioView = Ember.View.extend({
  templateName: 'audioControl',
  classNames: ['audio-control'],

  currentTime: 0,

  didInsertElement: function() {
    var view = this;

    this.$('audio').on('loadeddata', function() {
      view.set('duration', Math.floor(this.duration));
      view.set('isLoaded', true);
    });

    this.$('audio').on('timeupdate', function() {
      view.set('currentTime', Math.floor(this.currentTime));
    });

    this.$('audio').on('play', function() {
      view.set('isPlaying', true);
    });
  },

  playSong: function() {
    this.set('isPlaying', true);
    this.$('audio')[0].play();
  },

  pauseSong: function() {
    this.set('isPlaying', false);
    this.$('audio')[0].pause();
  }
});

})();
