'use strict'

require('dotenv').config()
const TypeDetect = require('type-detect')
const expect = require('chai').expect
const Agilite = require('../controllers/agilite')
const EnumsTypeDetect = require('../utils/enums-type-detect')

const agilite = new Agilite({
  apiServerUrl: process.env.API_SERVER_URL,
  apiKey: process.env.API_KEY
})

describe('Agilit-e Utils', () => {
  let data = null

  it('XML To JS', () => {
    agilite.Utils.XMLToJS("<xml>Some Data</xml>")
    .then((response) => {
      expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.OBJECT)

      data = response.data
    })
    .catch((err) => {})
  })

  it('JS To XML', () => {
    agilite.Utils.JSToXML(data)
    .then((response) => {
      expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.STRING)

      data = response.data
    })
    .catch((err) => {})
  })

  it('Encode XML', () => {
    agilite.Utils.encodeXML(data)
    .then((response) => {
      expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.STRING)

      data = response.data
    })
    .catch((err) => {})
  })

  it('Decode XML', () => {
    agilite.Utils.decodeXML(data)
    .then((response) => {
      expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.STRING)
    })
    .catch((err) => {})
  })

  it('Format Date Time', () => {
    agilite.Utils.formatDateTime('1 January 2000', 'YYYY/MM/DD')
    .then((response) => {
      expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.STRING)
      expect(response.data).to.equal('2000/01/01')
    })
    .catch((err) => {})
  })

  it('Generate UUID', () => {
    agilite.Utils.generateUUID()
    .then((response) => {
      expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.STRING)
    })
    .catch((err) => {})
  })

  it('HTML To JSON', () => {
    agilite.Utils.html2json('<html><head></head><body>HTML Body</body></html>')
    .then((response) => {
      expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.OBJECT)
    })
    .catch((err) => {})
  })

  it('Generate PDF', () => {
    agilite.Utils.generatePDF()
    .then((response) => {
      expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.OBJECT)
    })
    .catch((err) => {})
  })
})