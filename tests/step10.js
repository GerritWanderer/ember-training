/*
  In Step 10, you'll lay the foundation for our upcoming App.AudioView.

  First, you'll want to create a new subclass of Ember.View called
  App.AudioView. It should use the audioControl template, which you
  should also create.

  The view should have the class "audio-control". Use the {{view}} helper
  to put an instance of App.AudioView in the nowPlaying template, inside
  the "now-playing-player" <div> that we had previously left empty.

  For now, just put a placeholder <audio> tag inside the audioControl
  template. We'll make it work in the next step.
*/

step(10, "Add an Audio View");

test("App.AudioView is defined", function() {
  ok(App.AudioView, "App.AudioView is defined");
  ok(Ember.View.detect(App.AudioView), "App.AudioView is a subclass of Ember.View");
});

test("The audio view is rendered into the now playing template", function() {
  click('.album:first a');
  click('td.song-track:first .play');

  shouldHaveElement('.now-playing-player .ember-view', undefined, "App.AudioView is added to the now playing template in correct location");
  shouldHaveElement('.now-playing-player .ember-view.audio-control', undefined, "App.AudioView has the audio-control class name");

  shouldBeView('.now-playing-player .ember-view.audio-control');
});

test("App.AudioView uses the audioControl template", function() {
  click('.album:first a');
  click('td.song-track:first .play');

  shouldHaveTemplate('audioControl');
  shouldHaveElement('.audio-control audio');
});
