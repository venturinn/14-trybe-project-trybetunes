const setFavorite = async ({ target }) => {
  const { name } = target;
  const value = target.checked;
  const { musics } = this.state;
  let favoriteSongsAPI = [];

  const trackId = parseInt(name, 10);
  const trackFavorite = musics.find((music) => music.trackId === trackId);

  this.setState({
    loading: true,
  });

  if (value === true) {
    await addSong(trackFavorite);
    favoriteSongsAPI = await getFavoriteSongs();
  } else {
    await removeSong(trackFavorite);
    favoriteSongsAPI = await getFavoriteSongs();
  }
  this.setState({
    loading: false,
    favoriteSongs: favoriteSongsAPI,
  });
};

export default setFavorite;
