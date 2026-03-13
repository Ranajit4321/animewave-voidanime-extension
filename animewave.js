export default {
  name: "AnimeWave",
  baseUrl: "https://animewave.to",

  async search(query) {
    return `${this.baseUrl}/search?keyword=${query}`;
  },

  async getAnime(id) {
    return `${this.baseUrl}/anime/${id}`;
  },

  async getEpisode(id) {
    return `${this.baseUrl}/watch/${id}`;
  }
};