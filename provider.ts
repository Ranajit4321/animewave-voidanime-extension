interface SearchResult {
  id: string
  title: string
  image: string
  url: string
}

const baseUrl = "https://animewave.to"

async function fetchHTML(url: string) {
  const res = await fetch(url)
  return await res.text()
}

export default {

  async search(query: string): Promise<SearchResult[]> {

    const url = `${baseUrl}/search?keyword=${encodeURIComponent(query)}`
    const html = await fetchHTML(url)

    const parser = new DOMParser()
    const doc = parser.parseFromString(html, "text/html")

    const results: SearchResult[] = []

    doc.querySelectorAll(".film_list-wrap .flw-item").forEach(el => {

      const link = el.querySelector("a")?.getAttribute("href") || ""
      const title = el.querySelector(".film-name")?.textContent || ""
      const image = el.querySelector("img")?.getAttribute("data-src") || ""

      results.push({
        id: link,
        title,
        image,
        url: baseUrl + link
      })

    })

    return results
  },

  async getEpisodes(animeId: string) {

    const html = await fetchHTML(baseUrl + animeId)

    const parser = new DOMParser()
    const doc = parser.parseFromString(html, "text/html")

    const episodes: any[] = []

    doc.querySelectorAll(".ep-item").forEach(ep => {

      const id = ep.getAttribute("data-id") || ""
      const number = ep.textContent?.trim() || ""

      episodes.push({
        id,
        number
      })

    })

    return episodes
  },

  async getStream(episodeId: string) {

    const url = `${baseUrl}/ajax/episode/servers?id=${episodeId}`
    const res = await fetch(url)
    const data = await res.json()

    return data
  }

}