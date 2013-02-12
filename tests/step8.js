/*
  In Step 8, you will add a total duration for an album.

  If you look at the listing for an album, you'll see that each song
  has a duration in seconds. We'd like to automatically compute the
  duration of an album by summing the duration of each of its songs.

  You'll do this using a computed property on the AlbumController.

  The first step is to define the AlbumController. Because it
  represents a single album, create a subclass of Ember.ObjectController.

  To make sure that the computed property updates appropriately,
  you'll need to define its dependent key. Make sure you understand the
  @each dependent key.
*/

step(8, "Total Duration");

function makeSong(options) {
  return Ember.Object.create(options);
}

test("The AlbumController is defined", function() {
  ok(App.AlbumController, "The AlbumController is defined");
  ok(Ember.ObjectController.detect(App.AlbumController), "The AlbumController is a subclass of Ember.ObjectController");
});

test("The AlbumController correctly calculates totalDuration", function() {
  var controller = createController('album');

  var songs = [
    makeSong({ duration: 10 }),
    makeSong({ duration: 120 }),
    makeSong({ duration: 234 })
  ];

  controller.set('model', { songs: songs });
  equal(controller.get('totalDuration'), 364, "total duration is the sum of the songs' durations");

  songs.pushObject(makeSong({
    duration: 25
  }));
  equal(controller.get('totalDuration'), 389, "total duration is updated when a new song is added");

  songs[0].set('duration', 20);
  equal(controller.get('totalDuration'), 399, "total duration is updated when a song's duration is changed");

  songs.popObject();
  equal(controller.get('totalDuration'), 374, "total duration is updated when a song is removed");
});

test("The total duration is displayed", function() {
  click('.album:first a');

  shouldHaveElement('.album-listing .total-duration', "24:53");
});
