/*
  In Step 11, you will flesh out the audio control that you
  stubbed out in Step 10.

  Your App.AudioView will wrap the HTML5 <audio> element,
  and propagate any changes to it to the view. This allows
  it to participate in Ember's bindings and observers, and
  makes it super easy to make UIs that stay up-to-date.

  The first step is to use jQuery to add event listeners to
  the audio tag that you added to the audioControl template.
  You can do so in your view's didInsertElement hook, which
  is called once the template has been rendered and put
  into the DOM. For a reference of the audio tag's events,
  see: https://developer.mozilla.org/en-US/docs/DOM/Media_events

  When the audio has loaded, it should set the view's
  duration property to the length of the currently loaded
  song. Use Math.floor() to round to the nearest second.

  You should also set the isLoaded property to true.

  As the audio file plays, you should update the view's
  currentTime property to the current position in the
  audio track. Again, you should use Math.floor() to
  round to the nearest second.

  Finally, when the audio tag starts playing, the view's
  isPlaying property should be set to true.
*/

step(11, "The Audio Tag Goes to 11");

testView(App.AudioView, "currentTime has an initial value", function(view) {
  equal(view.get('currentTime'), 0, "The view's currentTime starts at 0");
});

testView(App.AudioView, "once the <audio> tag has loaded, the view's duration and isLoaded properties are set", function(view) {
  Ember.run(function() {
    view.set('src', "audio/Southern_Nights_-_07_-_All_My_Sorrows.mp3");
  });

  propertyShouldBecome(view, 'duration', 219);
  propertyShouldBecome(view, 'isLoaded', true);
});

testView(App.AudioView, "when the time has updated, the currentTime property is updated", function(view) {
  Ember.run(function() {
    view.set('src', "audio/Southern_Nights_-_07_-_All_My_Sorrows.mp3");
  });

  propertyShouldBecome(view, 'currentTime', function(value) {
    // the value is a non-zero integer
    return typeof value === 'number' && value !== 0 && value % 1 === 0;
  });
});

testView(App.AudioView, "when the audio tag starts playing, the view's isPlaying property becomes true", function(view) {
  Ember.run(function() {
    view.set('src', "audio/Southern_Nights_-_07_-_All_My_Sorrows.mp3");
  });

  propertyShouldBecome(view, 'isPlaying', true);
});
