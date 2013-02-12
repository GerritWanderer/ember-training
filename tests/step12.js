/*
  In Step 12, you will add some user interface to the App.AudioView.

  First, create two buttons in the audioControl template. One should
  play, and the other should pause. Tell the action helper to send the
  event to the view instead of the current controller.

  The play button should only be visible when the view's isPlaying
  property is false. The pause button should be visible when it is
  true. Use a conditional to show only one at a time.

  When the pause button is clicked, the audio should be paused. If
  the play button is clicked, the audio should start playing.
*/

step(12, "Play and Pause Buttons");

testView(App.AudioView, "the view starts off with a play button", function(view) {
  viewShouldHaveElement(view, 'button.play', undefined, "The view should contain a play button");
  viewShouldHaveElements(view, 'button', 1, "The view should only have a single button at a time");
});

testView(App.AudioView, "once the view's src is set, the play button changes to a pause button", function(view) {
  Ember.run(function() {
    view.set('src', "audio/Southern_Nights_-_07_-_All_My_Sorrows.mp3");
  });

  waitFor(view, 'isPlaying', function() {
    viewShouldHaveElement(view, 'button.pause', undefined, "The view should contain a pause button");
    viewShouldHaveElements(view, 'button', 1, "The view should only have a single button at a time");

    equal(view.$('audio').prop('paused'), false, "The <audio> tag automatically starts playing when a src is set");
  });
});

testView(App.AudioView, "if the pause button is clicked, the control pauses the audio", function(view) {
  Ember.run(function() {
    view.set('src', "audio/Southern_Nights_-_07_-_All_My_Sorrows.mp3");
  });

  waitFor(view, 'isPlaying', function() {
    click('button.pause', view);

    equal(view.get('isPlaying'), false, "The view's isPlaying property becomes false");
    equal(view.$('audio').prop('paused'), true, "When the pause button is pressed, the <audio> tag pauses");
  });
});

testView(App.AudioView, "if the pause button is clicked, and then the play button is clicked, the control plays the audio", function(view) {
  Ember.run(function() {
    view.set('src', "audio/Southern_Nights_-_07_-_All_My_Sorrows.mp3");
  });

  waitFor(view, 'isPlaying', function() {
    click('button.pause', view);
    click('button.play', view);

    equal(view.get('isPlaying'), true, "The view's isPlaying property becomes true again");
    equal(view.$('audio').prop('paused'), false, "When the pause button is pressed, the <audio> tag plays");
  });
});
