const util = require('./util')

let total = 0

function init() {

  let countries = util.parsePlaylist('index.m3u')
  countries = countries.slice(0, 1)

  let channels = []

  for(let country of countries) {

    const playlist = util.parsePlaylist(country.file)

    for(let item of playlist) {

      let channel = util.parseChannelData(item)

      channels.push(channel)

    }

    channels = util.sortByTitle(channels)

    util.createFile(country.file)

    channels.forEach(channel => {
      const info = `-1 tvg-id="${channel.id}" tvg-name="${channel.name}" tvg-logo="${channel.logo}" group-title="${channel.group}",${channel.title}`

      util.writeToFile(country.file, info, channel.file)
    })

    total += channels.length

    channels = []
  }
}

init()

console.log(`Total: ${total}.`)
