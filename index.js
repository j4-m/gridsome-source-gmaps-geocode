class GmapGeocodeSource {
  static defaultOptions () {
    return {
      apiKey: undefined,
      sourceTypeName: undefined,
      sourceTypeField: undefined,
      index: ['index'],
      typeName: 'GmapGeocode',
      geocodeField: 'geocode'
    }
  }

  constructor (api, options) {
    this.api = api
    this.options = options
    this.gmaps = require('@google/maps').createClient({
      key: this.options.apiKey,
      Promise: Promise
    })
    api.loadSource(async actions => {
      await this.createNodes(actions)
    })
  }

  async createNodes(actions) {
    let geocodeCollection
    if (!(geocodeCollection = actions.getCollection('GmapGeocode'))) {
      geocodeCollection = actions.addCollection('GmapGeocode')
    }
    const sourceCollection = actions.getCollection(this.options.sourceTypeName)
    const sourceNodes = sourceCollection.data()
    await Promise.all(sourceNodes.map(async sourceNode => {
      try {
        const response = await this.gmaps.geocode({address: sourceNode[this.options.sourceTypeField]}).asPromise()
        const results = response.json.results
        if (results.length > 0) {
          const result = results[0]
          const geo = result.geometry.location
          const geoNode = geocodeCollection.addNode({id: result.place_id, lat: geo.lat, lng: geo.lng})
          sourceNode[this.options.geocodeField] = actions.store.createReference(geoNode)
          sourceCollection.updateNode(sourceNode)
        }
      }
      catch (e) {
        console.log(e)
      }
    }))
  }
}

module.exports = GmapGeocodeSource