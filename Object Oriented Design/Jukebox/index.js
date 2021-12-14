// The Jukebox class is central hub for interactions between components of the system, or between the
// system and user
class JukeBox {
  constructor(cdPlayer, user, cdCollection = new Set(), songSelector) {
    this.cdPlayer = cdPlayer;
    this.user = user;
    this.cdCollection = cdCollection;
    this.songSelector = songSelector;
  }
  getCurrentSong() {
    return this.songSelector.getCurrentSong();
  }
  setUser(u) {
    this.user = u;
  }
}

class CDPlayer {
  constructor(cd, playlist) {
    this.cd = cd;
    this.playlist = playlist;
  }
  getPlaylist() {
    return this.playlist;
  }
  setPlaylist(p) {
    this.playlist = p;
  }
  getCD() {
    return this.cd;
  }
  setCD(c) {
    this.cd = c;
  }
}

class Playlist {
  constructor(song, queue) {
    this.song = song;
    this.queue = queue;
  }
  getNextSongToPlay() {
    return this.queue.peek();
  }
  queueUpSong(s) {
    this.queue.add(s);
  }
}

class CD {
  // data for id, artist, songs, etc
}

class Song {
  // data for id, CD (could be null), title, length, etc
}

class User {
  constructor(name, id) {
    this.name = name;
    this.id = id;
  }
  getName() {
    return this.name;
  }
  setName(name) {
    this.name = name;
  }
  getID() {
    return this.id;
  }
  setID(iD) {
    this.id = iD;
  }
  getUser() {
    return this;
  }
  static addUser(name, id) {
    return new User(name, id);
  }
}

class SongSelector {
  constructor(s) {
    this.currentSong = s;
  }
  setSong(s) {
    this.currentSong = s;
  }
  getCurrentSong() {
    return this.currentSong;
  }
}
