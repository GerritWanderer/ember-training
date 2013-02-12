/*
  In Step 9, you'll create the bottom bar that displays the currently
  playing song. Later, it will hold the controls for pausing, playing
  and seeking through a song. For right now, you'll just display the
  name and artist of the song.

  To represent the currently playing song, you will need to define a
  NowPlayingController. Think about what kind of model it is representing
  to figure out what kind of controller it should be.

  If there is no song playing, the panel's HTML should look like this:

      <footer class="now-playing">
        <span class="now-playing-empty">Select a song to start playing.</span>
      </footer>

  If a song is playing, it should look like this:

      <footer class="now-playing">
        <img class="now-playing-artwork" src="<artwork-url>">
        <div class="now-playing-body">
          <p class="now-playing-details">
            <span class="now-playing-name">Rude Boy</span> -
            <span class="now-playing-artist">Rihanna</span>
          </p>
          <div class="now-playing-player">
            <!-- You will fill this in later -->
          </div>
        </div>
      </footer>

  To check if a model is currently set as the now playing song, you can
  use the `model` property with the {{#if}} helper.

  You will need to use the {{action}} helper to implement a "Play" button
  for each song. It should send an event to the AlbumController to tell
  it to update the NowPlaying controller's model, which will update the
  footer.

  You should update the HTML rendered for each song in the album template
  to include a span with class "play":

      <td class="song-track">
        <span class="track-number">1</span>
        <span class="play">▶</span>
      </td>

   The action helper should be added to this new span. Make sure you pass
   the song you want to play as an argument.
*/

step(9, "Render Current Song");

test("currentSong template should have a footer element", function() {
  shouldHaveElement('footer.now-playing');
});

test("Should display a message if there is no currently selected song", function() {
  shouldHaveElement('.now-playing span.now-playing-empty', "Select a song to start playing.");
});

test("Should enclose the track number in a span with the class track-number", function() {
  click('.album:first a');

  shouldHaveElements('td.song-track span.track-number', 4);
  shouldHaveElements('td.song-track span.play', 4);
});

test("Clicking a song's play button shows it in the now playing template", function() {
  click('.album:first a');
  click('td.song-track:first .play');

  shouldHaveElement('.now-playing div.now-playing-body span.now-playing-name', "A Walk");
  shouldHaveElement('.now-playing div.now-playing-body span.now-playing-artist', "GOLDHOUSE");
});
