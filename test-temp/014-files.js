'use strict'

require('agilite-utils/dotenv').config()
const fs = require('fs')
const TypeDetect = require('agilite-utils/type-detect')
const expect = require('chai').expect
const Agilite = require('../controllers/agilite')
const EnumsTypeDetect = require('agilite-utils/enums-type-detect')
const Enums = require('../utils/enums')

const agilite = new Agilite({
  apiServerUrl: process.env.API_SERVER_URL,
  apiKey: process.env.API_KEY
})

describe('Agilit-e Files \n', function () {
  // this.bail(true)
  const invalidValue = 'invalid_value'

  let recordId = null
  let recordId2 = null
  let recordId3 = null
  let recordId4 = null
  let zippedFileRecordId = null
  let zippedFolderRecordId = null
  let publicToken = null

  let excelFile = null
  let pdfFile = null
  let zippedFile = null
  let zippedFolder = null

  excelFile = fs.readFileSync(`${__dirname}/../data-templates/files/excelFile.xlsx`)
  pdfFile = fs.readFileSync(`${__dirname}/../data-templates/files/pdfFile.pdf`)
  zippedFile = fs.readFileSync(`${__dirname}/../data-templates/files/zippedFile.zip`)
  zippedFolder = fs.readFileSync(`${__dirname}/../data-templates/files/zippedFolder.zip`)

  describe('Upload New File', () => {
    describe('Negative Tests', () => {
      it('No Params (NEGATIVE)', function (done) {
        agilite.Files.uploadFile()
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message

            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(err.response.data.errorMessage).to.equal('Please provide a File Name in the \'file-name\' header parameter')
          })
          .then(done, done)
      })

      it('Empty File Name (NEGATIVE)', (done) => {
        agilite.Files.uploadFile('')
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message

            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(err.response.data.errorMessage).to.equal('Please provide a File Name in the \'file-name\' header parameter')
          })
          .then(done, done)
      })

      it('Empty Content-Type (String) & Empty Data (String) (NEGATIVE)', (done) => { // TODO: Breaks in Node-RED
        agilite.Files.uploadFile('test', '', '', '', '')
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message

            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(err.response.data.errorMessage).to.equal('No file found to be uploaded. Please revise')
          })
          .then(done, done)
      })

      it('Empty Content-Type (String) & Empty Data (Null) (NEGATIVE)', (done) => {
        agilite.Files.uploadFile('test', '', null, '', '')
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message

            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(err.response.data.errorMessage).to.equal('No file found to be uploaded. Please revise')
          })
          .then(done, done)
      })

      it('Empty Content-Type (Null) & Empty Data (Null) (NEGATIVE)', (done) => { // TODO: Odd error message in Node-RED
        agilite.Files.uploadFile('test', null, null, '', '')
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message

            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(err.response.data.errorMessage).to.equal('No file found to be uploaded. Please revise')
          })
          .then(done, done)
      })

      it('Empty Data (NEGATIVE)', (done) => {
        agilite.Files.uploadFile('test', 'application/octet-stream', null, '', '')
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message

            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(err.response.data.errorMessage).to.equal('No file found to be uploaded. Please revise')
          })
          .then(done, done)
      })

      it('Only Valid Data (NEGATIVE)', (done) => {
        agilite.Files.uploadFile('', '', excelFile, '', '')
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message

            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(err.response.data.errorMessage).to.equal('Please provide a File Name in the \'file-name\' header parameter')
          })
          .then(done, done)
      })

      it('No File Name, Valid Data & Content-Type (NEGATIVE)', (done) => {
        agilite.Files.uploadFile('', 'application/octet-stream', excelFile, '', '')
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message

            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(err.response.data.errorMessage).to.equal('Please provide a File Name in the \'file-name\' header parameter')
          })
          .then(done, done)
      })

      it('Array of Files (NEGATIVE)', (done) => {
        agilite.Files.uploadFile('test', '', [excelFile, pdfFile], '', '')
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message

            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(err.response.data.errorMessage).to.equal('Array of files found. Only 1 file can be uploaded at a time and should not be wrapped in an Array.')
          })
          .then(done, done)
      })
    })

    describe('Positive Tests', () => {
      it('Successful File (POSITIVE)', (done) => {
        agilite.Files.uploadFile('test', '', excelFile, '', '')
          .then((response) => {
            expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if File Name provided matches
            expect(response.data).to.haveOwnProperty('filename')
            expect(response.data.filename).to.equal('test')
            expect(response.data.metadata).to.haveOwnProperty('persistFile')
            expect(response.data.metadata.persistFile).to.equal(false)
            expect(response.data.metadata).to.haveOwnProperty('isPublic')
            expect(response.data.metadata.isPublic).to.equal(false)

            // Check if unprovided values exist and have defaults
            expect(response.data).to.haveOwnProperty('_id')
            expect(response.data._id).to.not.equal(Enums.STRING_EMPTY)
            // expect(response.data).to.haveOwnProperty('createdAt')
            // expect(response.data.createdAt).to.not.equal(Enums.STRING_EMPTY)
            // expect(response.data).to.haveOwnProperty('updatedAt')
            // expect(response.data.updatedAt).to.not.equal(Enums.STRING_EMPTY)
            expect(response.data).to.haveOwnProperty('length')
            expect(response.data.length).to.not.lessThan(1)
            expect(response.data).to.haveOwnProperty('chunkSize')
            expect(response.data.chunkSize).to.not.lessThan(1)
            expect(response.data).to.haveOwnProperty('uploadDate')
            expect(response.data.uploadDate).to.not.equal(Enums.STRING_EMPTY)
            expect(response.data).to.haveOwnProperty('md5')
            expect(response.data.md5).to.not.equal(Enums.STRING_EMPTY)
            expect(response.data).to.haveOwnProperty('contentType')
            expect(response.data.contentType).to.not.equal(Enums.STRING_EMPTY)
            expect(response.data.metadata).to.haveOwnProperty('createdBy')
            expect(response.data.metadata.createdBy).to.not.equal(Enums.STRING_EMPTY)
            expect(response.data.metadata).to.haveOwnProperty('modifiedBy')
            expect(response.data.metadata.modifiedBy).to.not.equal(Enums.STRING_EMPTY)

            recordId = response.data._id
          })
          .then(done, done)
      })

      it('Successful Zipped File (POSITIVE)', (done) => {
        agilite.Files.uploadFile('test', '', zippedFile, '', '')
          .then((response) => {
            expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if File Name provided matches
            expect(response.data).to.haveOwnProperty('filename')
            expect(response.data.filename).to.equal('test')
            expect(response.data.metadata).to.haveOwnProperty('persistFile')
            expect(response.data.metadata.persistFile).to.equal(false)
            expect(response.data.metadata).to.haveOwnProperty('isPublic')
            expect(response.data.metadata.isPublic).to.equal(false)

            // Check if unprovided values exist and have defaults
            expect(response.data).to.haveOwnProperty('_id')
            expect(response.data._id).to.not.equal(Enums.STRING_EMPTY)
            // expect(response.data).to.haveOwnProperty('createdAt')
            // expect(response.data.createdAt).to.not.equal(Enums.STRING_EMPTY)
            // expect(response.data).to.haveOwnProperty('updatedAt')
            // expect(response.data.updatedAt).to.not.equal(Enums.STRING_EMPTY)
            expect(response.data).to.haveOwnProperty('length')
            expect(response.data.length).to.not.lessThan(1)
            expect(response.data).to.haveOwnProperty('chunkSize')
            expect(response.data.chunkSize).to.not.lessThan(1)
            expect(response.data).to.haveOwnProperty('uploadDate')
            expect(response.data.uploadDate).to.not.equal(Enums.STRING_EMPTY)
            expect(response.data).to.haveOwnProperty('md5')
            expect(response.data.md5).to.not.equal(Enums.STRING_EMPTY)
            expect(response.data).to.haveOwnProperty('contentType')
            expect(response.data.contentType).to.not.equal(Enums.STRING_EMPTY)
            expect(response.data.metadata).to.haveOwnProperty('createdBy')
            expect(response.data.metadata.createdBy).to.not.equal(Enums.STRING_EMPTY)
            expect(response.data.metadata).to.haveOwnProperty('modifiedBy')
            expect(response.data.metadata.modifiedBy).to.not.equal(Enums.STRING_EMPTY)

            zippedFileRecordId = response.data._id
          })
          .then(done, done)
      })

      it('Successful Zipped Folder (POSITIVE)', (done) => {
        agilite.Files.uploadFile('test', '', zippedFolder, '', '')
          .then((response) => {
            expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if File Name provided matches
            expect(response.data).to.haveOwnProperty('filename')
            expect(response.data.filename).to.equal('test')
            expect(response.data.metadata).to.haveOwnProperty('persistFile')
            expect(response.data.metadata.persistFile).to.equal(false)
            expect(response.data.metadata).to.haveOwnProperty('isPublic')
            expect(response.data.metadata.isPublic).to.equal(false)

            // Check if unprovided values exist and have defaults
            expect(response.data).to.haveOwnProperty('_id')
            expect(response.data._id).to.not.equal(Enums.STRING_EMPTY)
            // expect(response.data).to.haveOwnProperty('createdAt')
            // expect(response.data.createdAt).to.not.equal(Enums.STRING_EMPTY)
            // expect(response.data).to.haveOwnProperty('updatedAt')
            // expect(response.data.updatedAt).to.not.equal(Enums.STRING_EMPTY)
            expect(response.data).to.haveOwnProperty('length')
            expect(response.data.length).to.not.lessThan(1)
            expect(response.data).to.haveOwnProperty('chunkSize')
            expect(response.data.chunkSize).to.not.lessThan(1)
            expect(response.data).to.haveOwnProperty('uploadDate')
            expect(response.data.uploadDate).to.not.equal(Enums.STRING_EMPTY)
            expect(response.data).to.haveOwnProperty('md5')
            expect(response.data.md5).to.not.equal(Enums.STRING_EMPTY)
            expect(response.data).to.haveOwnProperty('contentType')
            expect(response.data.contentType).to.not.equal(Enums.STRING_EMPTY)
            expect(response.data.metadata).to.haveOwnProperty('createdBy')
            expect(response.data.metadata.createdBy).to.not.equal(Enums.STRING_EMPTY)
            expect(response.data.metadata).to.haveOwnProperty('modifiedBy')
            expect(response.data.metadata.modifiedBy).to.not.equal(Enums.STRING_EMPTY)

            zippedFolderRecordId = response.data._id
          })
          .then(done, done)
      })

      it('Successful Public File (POSITIVE)', (done) => {
        agilite.Files.uploadFile('test', '', excelFile, '', true)
          .then((response) => {
            expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.OBJECT)
            // Check if File Name provided matches
            expect(response.data).to.haveOwnProperty('filename')
            expect(response.data.filename).to.equal('test')
            expect(response.data.metadata).to.haveOwnProperty('persistFile')
            expect(response.data.metadata.persistFile).to.equal(false)
            expect(response.data.metadata).to.haveOwnProperty('isPublic')
            expect(response.data.metadata.isPublic).to.equal(true)
            expect(response.data.metadata).to.haveOwnProperty('publicId')
            expect(response.data.metadata.isPublic).to.not.equal(Enums.STRING_EMPTY)

            publicToken = response.data.metadata.publicId

            // Check if unprovided values exist and have defaults
            expect(response.data).to.haveOwnProperty('_id')
            expect(response.data._id).to.not.equal(Enums.STRING_EMPTY)
            // expect(response.data).to.haveOwnProperty('createdAt')
            // expect(response.data.createdAt).to.not.equal(Enums.STRING_EMPTY)
            // expect(response.data).to.haveOwnProperty('updatedAt')
            // expect(response.data.updatedAt).to.not.equal(Enums.STRING_EMPTY)
            expect(response.data).to.haveOwnProperty('length')
            expect(response.data.length).to.not.lessThan(1)
            expect(response.data).to.haveOwnProperty('chunkSize')
            expect(response.data.chunkSize).to.not.lessThan(1)
            expect(response.data).to.haveOwnProperty('uploadDate')
            expect(response.data.uploadDate).to.not.equal(Enums.STRING_EMPTY)
            expect(response.data).to.haveOwnProperty('md5')
            expect(response.data.md5).to.not.equal(Enums.STRING_EMPTY)
            expect(response.data).to.haveOwnProperty('contentType')
            expect(response.data.contentType).to.not.equal(Enums.STRING_EMPTY)
            expect(response.data.metadata).to.haveOwnProperty('createdBy')
            expect(response.data.metadata.createdBy).to.not.equal(Enums.STRING_EMPTY)
            expect(response.data.metadata).to.haveOwnProperty('modifiedBy')
            expect(response.data.metadata.modifiedBy).to.not.equal(Enums.STRING_EMPTY)

            recordId2 = response.data._id
          })
          .then(done, done)
      })

      it('Successful Persisted File (POSITIVE)', (done) => {
        agilite.Files.uploadFile('test', '', excelFile, true, '')
          .then((response) => {
            expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if File Name provided matches
            expect(response.data).to.haveOwnProperty('filename')
            expect(response.data.filename).to.equal('test')
            expect(response.data.metadata).to.haveOwnProperty('persistFile')
            expect(response.data.metadata.persistFile).to.equal(true)
            expect(response.data.metadata).to.haveOwnProperty('isPublic')
            expect(response.data.metadata.isPublic).to.equal(false)

            // Check if unprovided values exist and have defaults
            expect(response.data).to.haveOwnProperty('_id')
            expect(response.data._id).to.not.equal(Enums.STRING_EMPTY)
            // expect(response.data).to.haveOwnProperty('createdAt')
            // expect(response.data.createdAt).to.not.equal(Enums.STRING_EMPTY)
            // expect(response.data).to.haveOwnProperty('updatedAt')
            // expect(response.data.updatedAt).to.not.equal(Enums.STRING_EMPTY)
            expect(response.data).to.haveOwnProperty('length')
            expect(response.data.length).to.not.lessThan(1)
            expect(response.data).to.haveOwnProperty('chunkSize')
            expect(response.data.chunkSize).to.not.lessThan(1)
            expect(response.data).to.haveOwnProperty('uploadDate')
            expect(response.data.uploadDate).to.not.equal(Enums.STRING_EMPTY)
            expect(response.data).to.haveOwnProperty('md5')
            expect(response.data.md5).to.not.equal(Enums.STRING_EMPTY)
            expect(response.data).to.haveOwnProperty('contentType')
            expect(response.data.contentType).to.not.equal(Enums.STRING_EMPTY)
            expect(response.data.metadata).to.haveOwnProperty('createdBy')
            expect(response.data.metadata.createdBy).to.not.equal(Enums.STRING_EMPTY)
            expect(response.data.metadata).to.haveOwnProperty('modifiedBy')
            expect(response.data.metadata.modifiedBy).to.not.equal(Enums.STRING_EMPTY)

            recordId3 = response.data._id
          })
          .then(done, done)
      })

      it('Successful Persisted Public File (POSITIVE)', (done) => {
        agilite.Files.uploadFile('test', '', excelFile, true, true)
          .then((response) => {
            expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if File Name provided matches
            expect(response.data).to.haveOwnProperty('filename')
            expect(response.data.filename).to.equal('test')
            expect(response.data.metadata).to.haveOwnProperty('persistFile')
            expect(response.data.metadata.persistFile).to.equal(true)
            expect(response.data.metadata).to.haveOwnProperty('isPublic')
            expect(response.data.metadata.isPublic).to.equal(true)

            // Check if unprovided values exist and have defaults
            expect(response.data).to.haveOwnProperty('_id')
            expect(response.data._id).to.not.equal(Enums.STRING_EMPTY)
            // expect(response.data).to.haveOwnProperty('createdAt')
            // expect(response.data.createdAt).to.not.equal(Enums.STRING_EMPTY)
            // expect(response.data).to.haveOwnProperty('updatedAt')
            // expect(response.data.updatedAt).to.not.equal(Enums.STRING_EMPTY)
            expect(response.data).to.haveOwnProperty('length')
            expect(response.data.length).to.not.lessThan(1)
            expect(response.data).to.haveOwnProperty('chunkSize')
            expect(response.data.chunkSize).to.not.lessThan(1)
            expect(response.data).to.haveOwnProperty('uploadDate')
            expect(response.data.uploadDate).to.not.equal(Enums.STRING_EMPTY)
            expect(response.data).to.haveOwnProperty('md5')
            expect(response.data.md5).to.not.equal(Enums.STRING_EMPTY)
            expect(response.data).to.haveOwnProperty('contentType')
            expect(response.data.contentType).to.not.equal(Enums.STRING_EMPTY)
            expect(response.data.metadata).to.haveOwnProperty('createdBy')
            expect(response.data.metadata.createdBy).to.not.equal(Enums.STRING_EMPTY)
            expect(response.data.metadata).to.haveOwnProperty('modifiedBy')
            expect(response.data.metadata.modifiedBy).to.not.equal(Enums.STRING_EMPTY)

            recordId4 = response.data._id
          })
          .then(done, done)
      })
    })
  })

  describe('Get File', () => {
    describe('Negative Tests', () => {
      it('No Params (NEGATIVE)', (done) => {
        agilite.Files.getFile()
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.UINT8ARRAY)

            // Check if errorMessage exists and contains correct error message
            err.response.data = JSON.parse(err.response.data.toString())

            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(err.response.data.errorMessage).to.equal('No Id was specified in the \'record-id\' header parameter')
          })
          .then(done, done)
      })

      it('Empty Record Id (NEGATIVE)', (done) => {
        agilite.Files.getFile('')
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.UINT8ARRAY)

            // Check if errorMessage exists and contains correct error message
            err.response.data = JSON.parse(err.response.data.toString())

            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(err.response.data.errorMessage).to.equal('No Id was specified in the \'record-id\' header parameter')
          })
          .then(done, done)
      })

      it('String Record Id (NEGATIVE)', (done) => { // TODO: Not a descriptive enough error message in Node-RED
        agilite.Files.getFile(invalidValue)
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.UINT8ARRAY)

            // Check if errorMessage exists and contains correct error message
            err.response.data = JSON.parse(err.response.data.toString())

            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(err.response.data.errorMessage).to.equal('Argument passed in must be a single String of 12 bytes or a string of 24 hex characters')
          })
          .then(done, done)
      })

      it('Number Record Id (NEGATIVE)', (done) => {
        agilite.Files.getFile(123123123213, '', '')
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message

            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(err.response.data.errorMessage).to.equal('FileNotFound: file 313233313233313233323133 was not found')
          })
          .then(done, done)
      })

      it('Array Record Id (NEGATIVE)', (done) => {
        agilite.Files.getFile([], '', '')
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message

            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(err.response.data.errorMessage).to.equal('No Id was specified in the \'record-id\' header parameter')
          })
          .then(done, done)
      })

      it('Object Record Id (NEGATIVE)', (done) => { // TODO: Not a descriptive enough error message in Node-RED
        agilite.Files.getFile({}, '', '')
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message

            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(err.response.data.errorMessage).to.equal('Argument passed in must be a single String of 12 bytes or a string of 24 hex characters')
          })
          .then(done, done)
      })

      it('Empty Record Id, String Response Type (NEGATIVE)', (done) => {
        agilite.Files.getFile('', 'string', '')
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message

            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(err.response.data.errorMessage).to.equal('No Id was specified in the \'record-id\' header parameter')
          })
          .then(done, done)
      })

      it('Empty Record Id, Number Response Type (NEGATIVE)', (done) => {
        agilite.Files.getFile('', 123123123, '')
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message

            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(err.response.data.errorMessage).to.equal('No Id was specified in the \'record-id\' header parameter')
          })
          .then(done, done)
      })

      it('Empty Record Id, Array Response Type (NEGATIVE)', (done) => {
        agilite.Files.getFile('', [], '')
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message

            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(err.response.data.errorMessage).to.equal('No Id was specified in the \'record-id\' header parameter')
          })
          .then(done, done)
      })

      it('Empty Record Id, Empty Response Type, String Log Process Id (NEGATIVE)', (done) => {
        agilite.Files.getFile('', '', 'asdasdasd')
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message

            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(err.response.data.errorMessage).to.equal('No Id was specified in the \'record-id\' header parameter')
          })
          .then(done, done)
      })

      it('Empty Record Id, Empty Response Type, Number Log Process Id  (NEGATIVE)', (done) => {
        agilite.Files.getFile('', '', 123123)
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message

            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(err.response.data.errorMessage).to.equal('No Id was specified in the \'record-id\' header parameter')
          })
          .then(done, done)
      })

      it('Empty Record Id, Empty Response Type, Array Log Process Id  (NEGATIVE)', (done) => {
        agilite.Files.getFile('', '', [])
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message

            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(err.response.data.errorMessage).to.equal('No Id was specified in the \'record-id\' header parameter')
          })
          .then(done, done)
      })
    })

    describe('Positive Tests', () => {
      it('Valid Record Id, Number Response Type (POSITIVE)', (done) => {
        agilite.Files.getFile(recordId, 123123123, '')
          .then((response) => {
            expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.STRING)
            // TODO: Unsure of how this should look, I know that the Response Type defaults to string
            //       However I do not know how to validate if this data is correct or not
          })
          .then(done, done)
      })

      it('Valid Record Id, Array Response Type (POSITIVE)', (done) => {
        agilite.Files.getFile(recordId, [], '')
          .then((response) => {
            expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.STRING)
            // TODO: Unsure of how this should look, I know that the Response Type defaults to string
            //       However I do not know how to validate if this data is correct or not
          })
          .then(done, done)
      })

      it('Valid Record Id, Object Response Type (POSITIVE)', (done) => {
        agilite.Files.getFile(recordId, {}, '')
          .then((response) => {
            expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.STRING)
            // TODO: Unsure of how this should look, I know that the Response Type defaults to string
            //       However I do not know how to validate if this data is correct or not
          })
          .then(done, done)
      })

      it('Valid Record Id, Random String Response Type (POSITIVE)', (done) => {
        agilite.Files.getFile(recordId, 'gibberish', '')
          .then((response) => {
            expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.STRING)
            // TODO: Unsure of how this should look, I know that the Response Type defaults to string
            //       However I do not know how to validate if this data is correct or not
          })
          .then(done, done)
      })

      it('Valid Record Id, Empty Response Type (POSITIVE)', (done) => {
        agilite.Files.getFile(recordId, '', '')
          .then((response) => {
            expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.STRING)
            // TODO: Unsure of how this should look, I know that the Response Type defaults to string
            //       However I do not know how to validate if this data is correct or not
          })
          .then(done, done)
      })

      it('Valid Record Id, Valid Response Type, Number Log Process Id (POSITIVE)', (done) => {
        agilite.Files.getFile(recordId, 'string', 123123)
          .then((response) => {
            expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.STRING)
            // TODO: Unsure of how this should look, I know that the Response Type defaults to string
            //       However I do not know how to validate if this data is correct or not
          })
          .then(done, done)
      })

      it('Valid Record Id, Valid Response Type, Array Log Process Id (POSITIVE)', (done) => {
        agilite.Files.getFile(recordId, 'string', [])
          .then((response) => {
            expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.STRING)
            // TODO: Unsure of how this should look, I know that the Response Type defaults to string
            //       However I do not know how to validate if this data is correct or not
          })
          .then(done, done)
      })

      it('Valid Record Id, Valid Response Type, Object Log Process Id (POSITIVE)', (done) => {
        agilite.Files.getFile(recordId, 'string', {})
          .then((response) => {
            expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.STRING)
            // TODO: Unsure of how this should look, I know that the Response Type defaults to string
            //       However I do not know how to validate if this data is correct or not
          })
          .then(done, done)
      })

      it('Valid Record Id, Valid Response Type, Invalid String Log Process Id (POSITIVE)', (done) => {
        agilite.Files.getFile(recordId, 'string', invalidValue)
          .then((response) => {
            expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.STRING)
            // TODO: Unsure of how this should look, I know that the Response Type defaults to string
            //       However I do not know how to validate if this data is correct or not
          })
          .then(done, done)
      })

      it('Valid Record Id, Valid Response Type, Empty Log Process Id (POSITIVE)', (done) => {
        agilite.Files.getFile(recordId, 'string', '')
          .then((response) => {
            expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.STRING)
            // TODO: Unsure of how this should look, I know that the Response Type defaults to string
            //       However I do not know how to validate if this data is correct or not
          })
          .then(done, done)
      })
    })
  })

  describe('Get Public File', () => {
    describe('Negative Tests', () => {
      it('No Params (NEGATIVE)', (done) => {
        agilite.Files.getPublicFile()
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message

            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(err.response.data.errorMessage).to.equal('No Id was specified in the \'record-id\' header parameter')
          })
          .then(done, done)
      })

      it('Empty Public Id (NEGATIVE)', (done) => {
        agilite.Files.getPublicFile('')
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message

            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(err.response.data.errorMessage).to.equal('No Id was specified in the \'record-id\' header parameter')
          })
          .then(done, done)
      })

      it('Number Public Id (NEGATIVE)', (done) => {
        agilite.Files.getPublicFile(12312312)
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message

            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(err.response.data.errorMessage).to.equal('Not enough or too many segments')
          })
          .then(done, done)
      })

      it('String Public Id (NEGATIVE)', (done) => {
        agilite.Files.getPublicFile(invalidValue)
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message

            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(err.response.data.errorMessage).to.equal('Not enough or too many segments')
          })
          .then(done, done)
      })

      it('Object Public Id (NEGATIVE)', (done) => {
        agilite.Files.getPublicFile({})
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message

            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(err.response.data.errorMessage).to.equal('Not enough or too many segments')
          })
          .then(done, done)
      })

      it('Array Public Id (NEGATIVE)', (done) => {
        agilite.Files.getPublicFile([])
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message

            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(err.response.data.errorMessage).to.equal('No Id was specified in the \'record-id\' header parameter')
          })
          .then(done, done)
      })
    })

    describe('Positive Tests', () => {
      it('Valid Public Id (POSITIVE)', (done) => {
        agilite.Files.getPublicFile(publicToken)
          .then((response) => {
            expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.STRING)
            // TODO: Unsure of how this should look, I know that the Response Type defaults to string
            //       However I do not know how to validate if this data is correct or not
          })
          .then(done, done)
      })
    })
  })

  describe('Get File Name', () => {
    describe('Negative Tests', () => {
      it('No Params (NEGATIVE)', (done) => {
        agilite.Files.getFileName()
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message

            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(err.response.data.errorMessage).to.equal('No Id was specified in the \'record-id\' header parameter')
          })
          .then(done, done)
      })

      it('Empty Record Id (NEGATIVE)', (done) => {
        agilite.Files.getFileName('')
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message

            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(err.response.data.errorMessage).to.equal('No Id was specified in the \'record-id\' header parameter')
          })
          .then(done, done)
      })

      it('Invalid Record Id (NEGATIVE)', (done) => {
        agilite.Files.getFileName(invalidValue)
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message

            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(err.response.data.errorMessage).to.equal('Argument passed in must be a single String of 12 bytes or a string of 24 hex characters')
          })
          .then(done, done)
      })

      it('Number Record Id (NEGATIVE)', (done) => {
        agilite.Files.getFileName(123123123)
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message

            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(err.response.data.errorMessage).to.equal('Argument passed in must be a single String of 12 bytes or a string of 24 hex characters')
          })
          .then(done, done)
      })

      it('Object Record Id (NEGATIVE)', (done) => {
        agilite.Files.getFileName({})
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message

            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(err.response.data.errorMessage).to.equal('Argument passed in must be a single String of 12 bytes or a string of 24 hex characters')
          })
          .then(done, done)
      })

      it('Array Record Id (NEGATIVE)', (done) => {
        agilite.Files.getFileName([])
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message

            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(err.response.data.errorMessage).to.equal('No Id was specified in the \'record-id\' header parameter')
          })
          .then(done, done)
      })
    })

    describe('Positive Tests', () => {
      it('Valid Record Id, Empty Log Process Id (POSITIVE)', (done) => {
        agilite.Files.getFileName(recordId, '')
          .then((response) => {
            expect(TypeDetect(response.data)).to.not.equal(EnumsTypeDetect.STRING_EMPTY)
            expect(response).to.haveOwnProperty('data')
            expect(response.status).to.equal(200)
            expect(response.data).to.equal('test')
          })
          .then(done, done)
      })

      it('Valid Record Id, Number Log Process Id (POSITIVE)', (done) => {
        agilite.Files.getFileName(recordId, 123123123)
          .then((response) => {
            expect(TypeDetect(response.data)).to.not.equal(EnumsTypeDetect.STRING_EMPTY)
            expect(response).to.haveOwnProperty('data')
            expect(response.status).to.equal(200)
            expect(response.data).to.equal('test')
          })
          .then(done, done)
      })

      it('Valid Record Id, Invalid Log Process Id (POSITIVE)', (done) => {
        agilite.Files.getFileName(recordId, invalidValue)
          .then((response) => {
            expect(TypeDetect(response.data)).to.not.equal(EnumsTypeDetect.STRING_EMPTY)
            expect(response).to.haveOwnProperty('data')
            expect(response.status).to.equal(200)
            expect(response.data).to.equal('test')
          })
          .then(done, done)
      })

      it('Valid Record Id, Array Log Process Id (POSITIVE)', (done) => {
        agilite.Files.getFileName(recordId, [])
          .then((response) => {
            expect(TypeDetect(response.data)).to.not.equal(EnumsTypeDetect.STRING_EMPTY)
            expect(response).to.haveOwnProperty('data')
            expect(response.status).to.equal(200)
            expect(response.data).to.equal('test')
          })
          .then(done, done)
      })

      it('Valid Record Id, Object Log Process Id (POSITIVE)', (done) => {
        agilite.Files.getFileName(recordId, {})
          .then((response) => {
            expect(TypeDetect(response.data)).to.not.equal(EnumsTypeDetect.STRING_EMPTY)
            expect(response).to.haveOwnProperty('data')
            expect(response.status).to.equal(200)
            expect(response.data).to.equal('test')
          })
          .then(done, done)
      })
    })
  })

  describe('Unzip File', () => {
    describe('Negative Tests', () => {
      it('No Params (NEGATIVE)', (done) => {
        agilite.Files.unzip()
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message

            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(err.response.data.errorMessage).to.equal('No Id was specified in the \'record-id\' header parameter')
          })
          .then(done, done)
      })

      it('Empty Record Id (NEGATIVE)', (done) => {
        agilite.Files.unzip('')
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message

            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(err.response.data.errorMessage).to.equal('No Id was specified in the \'record-id\' header parameter')
          })
          .then(done, done)
      })

      it('Invalid Record Id (NEGATIVE)', (done) => {
        agilite.Files.unzip(invalidValue)
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message

            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(err.response.data.errorMessage).to.equal('Argument passed in must be a single String of 12 bytes or a string of 24 hex characters')
          })
          .then(done, done)
      })

      it('Object Record Id (NEGATIVE)', (done) => {
        agilite.Files.unzip({})
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message

            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(err.response.data.errorMessage).to.equal('Argument passed in must be a single String of 12 bytes or a string of 24 hex characters')
          })
          .then(done, done)
      })

      it('Array Record Id (NEGATIVE)', (done) => {
        agilite.Files.unzip([])
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message

            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(err.response.data.errorMessage).to.equal('No Id was specified in the \'record-id\' header parameter')
          })
          .then(done, done)
      })
    })

    describe('Positive Tests', () => {
      it('Valid File Record Id (POSITIVE)', (done) => {
        agilite.Files.unzip(zippedFileRecordId)
          .then((response) => {
            expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.ARRAY)

            // Check if File Name provided matches
            expect(response.data[0]).to.haveOwnProperty('filename')
            expect(response.data[0].filename).to.equal('excelFile.xlsx')

            // Check if unprovided values exist and have defaults
            expect(response.data[0]).to.haveOwnProperty('_id')
            expect(response.data[0]._id).to.not.equal(Enums.STRING_EMPTY)
            // expect(response.data[0]).to.haveOwnProperty('createdAt')
            // expect(response.data[0].createdAt).to.not.equal(Enums.STRING_EMPTY)
            // expect(response.data[0]).to.haveOwnProperty('updatedAt')
            // expect(response.data[0].updatedAt).to.not.equal(Enums.STRING_EMPTY)
            expect(response.data[0]).to.haveOwnProperty('length')
            expect(response.data[0].length).to.not.lessThan(1)
            expect(response.data[0]).to.haveOwnProperty('chunkSize')
            expect(response.data[0].chunkSize).to.not.lessThan(1)
            expect(response.data[0]).to.haveOwnProperty('uploadDate')
            expect(response.data[0].uploadDate).to.not.equal(Enums.STRING_EMPTY)
            expect(response.data[0]).to.haveOwnProperty('md5')
            expect(response.data[0].md5).to.not.equal(Enums.STRING_EMPTY)
            expect(response.data[0]).to.haveOwnProperty('contentType')
            expect(response.data[0].contentType).to.not.equal(Enums.STRING_EMPTY)
            expect(response.data[0].metadata).to.haveOwnProperty('createdBy')
            expect(response.data[0].metadata.createdBy).to.not.equal(Enums.STRING_EMPTY)
            expect(response.data[0].metadata).to.haveOwnProperty('modifiedBy')
            expect(response.data[0].metadata.modifiedBy).to.not.equal(Enums.STRING_EMPTY)
          })
          .then(done, done)
      })

      it('Valid Folder Record Id (POSITIVE)', (done) => {
        agilite.Files.unzip(zippedFolderRecordId)
          .then((response) => {
            expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.ARRAY)
            // Check if File Name provided matches
            expect(response.data[0]).to.haveOwnProperty('filename')
            expect(response.data[0].filename).to.equal('excelFile.xlsx')

            // Check if unprovided values exist and have defaults
            expect(response.data[0]).to.haveOwnProperty('_id')
            expect(response.data[0]._id).to.not.equal(Enums.STRING_EMPTY)
            // expect(response.data[0]).to.haveOwnProperty('createdAt')
            // expect(response.data[0].createdAt).to.not.equal(Enums.STRING_EMPTY)
            // expect(response.data[0]).to.haveOwnProperty('updatedAt')
            // expect(response.data[0].updatedAt).to.not.equal(Enums.STRING_EMPTY)
            expect(response.data[0]).to.haveOwnProperty('length')
            expect(response.data[0].length).to.not.lessThan(1)
            expect(response.data[0]).to.haveOwnProperty('chunkSize')
            expect(response.data[0].chunkSize).to.not.lessThan(1)
            expect(response.data[0]).to.haveOwnProperty('uploadDate')
            expect(response.data[0].uploadDate).to.not.equal(Enums.STRING_EMPTY)
            expect(response.data[0]).to.haveOwnProperty('md5')
            expect(response.data[0].md5).to.not.equal(Enums.STRING_EMPTY)
            expect(response.data[0]).to.haveOwnProperty('contentType')
            expect(response.data[0].contentType).to.not.equal(Enums.STRING_EMPTY)
            expect(response.data[0].metadata).to.haveOwnProperty('createdBy')
            expect(response.data[0].metadata.createdBy).to.not.equal(Enums.STRING_EMPTY)
            expect(response.data[0].metadata).to.haveOwnProperty('modifiedBy')
            expect(response.data[0].metadata.modifiedBy).to.not.equal(Enums.STRING_EMPTY)

            expect(response.data[1]).to.haveOwnProperty('filename')
            expect(response.data[1].filename).to.equal('pdfFile.pdf')

            // Check if unprovided values exist and have defaults
            expect(response.data[1]).to.haveOwnProperty('_id')
            expect(response.data[1]._id).to.not.equal(Enums.STRING_EMPTY)
            // expect(response.data[1]).to.haveOwnProperty('createdAt')
            // expect(response.data[1].createdAt).to.not.equal(Enums.STRING_EMPTY)
            // expect(response.data[1]).to.haveOwnProperty('updatedAt')
            // expect(response.data[1].updatedAt).to.not.equal(Enums.STRING_EMPTY)
            expect(response.data[1]).to.haveOwnProperty('length')
            expect(response.data[1].length).to.not.lessThan(1)
            expect(response.data[1]).to.haveOwnProperty('chunkSize')
            expect(response.data[1].chunkSize).to.not.lessThan(1)
            expect(response.data[1]).to.haveOwnProperty('uploadDate')
            expect(response.data[1].uploadDate).to.not.equal(Enums.STRING_EMPTY)
            expect(response.data[1]).to.haveOwnProperty('md5')
            expect(response.data[1].md5).to.not.equal(Enums.STRING_EMPTY)
            expect(response.data[1]).to.haveOwnProperty('contentType')
            expect(response.data[1].contentType).to.not.equal(Enums.STRING_EMPTY)
            expect(response.data[1].metadata).to.haveOwnProperty('createdBy')
            expect(response.data[1].metadata.createdBy).to.not.equal(Enums.STRING_EMPTY)
            expect(response.data[1].metadata).to.haveOwnProperty('modifiedBy')
            expect(response.data[1].metadata.modifiedBy).to.not.equal(Enums.STRING_EMPTY)
          })
          .then(done, done)
      })
    })
  })

  describe('Delete File', () => {
    describe('Negative Tests', () => {
      it('Empty Record Id (NEGATIVE)', (done) => {
        agilite.Files.deleteFile('')
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message

            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(err.response.data.errorMessage).to.equal('No Id was specified in the \'record-id\' header parameter')
          })
          .then(done, done)
      })

      it('Invalid Record Id (NEGATIVE)', (done) => {
        agilite.Files.deleteFile(invalidValue)
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message

            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(err.response.data.errorMessage).to.equal('Argument passed in must be a single String of 12 bytes or a string of 24 hex characters')
          })
          .then(done, done)
      })

      it('Number Record Id (NEGATIVE)', (done) => {
        agilite.Files.deleteFile(123123123)
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message

            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(err.response.data.errorMessage).to.equal('Argument passed in must be a single String of 12 bytes or a string of 24 hex characters')
          })
          .then(done, done)
      })

      it('Object Record Id (NEGATIVE)', (done) => {
        agilite.Files.deleteFile({})
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message

            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(err.response.data.errorMessage).to.equal('Argument passed in must be a single String of 12 bytes or a string of 24 hex characters')
          })
          .then(done, done)
      })

      it('Array Record Id (NEGATIVE)', (done) => {
        agilite.Files.deleteFile([])
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message

            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(err.response.data.errorMessage).to.equal('No Id was specified in the \'record-id\' header parameter')
          })
          .then(done, done)
      })
    })

    describe('Positive Tests', () => {
      it('Valid Record Id, Empty Log Process Id (POSITIVE)', (done) => {
        agilite.Files.deleteFile(recordId, '')
          .then((response) => {
            expect(TypeDetect(response.data)).to.not.equal(EnumsTypeDetect.STRING_EMPTY)
            expect(response).to.haveOwnProperty('data')
            expect(response.status).to.equal(200)
            expect(response.data).to.equal(true)
          })
          .then(done, done)
      })

      it('Valid Record Id, Number Log Process Id (POSITIVE)', (done) => {
        agilite.Files.deleteFile(recordId2, 123123123)
          .then((response) => {
            expect(TypeDetect(response.data)).to.not.equal(EnumsTypeDetect.STRING_EMPTY)
            expect(response).to.haveOwnProperty('data')
            expect(response.status).to.equal(200)
            expect(response.data).to.equal(true)
          })
          .then(done, done)
      })

      it('Valid Record Id, Invalid Log Process Id (POSITIVE)', (done) => {
        agilite.Files.deleteFile(recordId3, invalidValue)
          .then((response) => {
            expect(TypeDetect(response.data)).to.not.equal(EnumsTypeDetect.STRING_EMPTY)
            expect(response).to.haveOwnProperty('data')
            expect(response.status).to.equal(200)
            expect(response.data).to.equal(true)
          })
          .then(done, done)
      })

      it('Valid Record Id, Object Log Process Id (POSITIVE)', (done) => {
        agilite.Files.deleteFile(recordId4, {})
          .then((response) => {
            expect(TypeDetect(response.data)).to.not.equal(EnumsTypeDetect.STRING_EMPTY)
            expect(response).to.haveOwnProperty('data')
            expect(response.status).to.equal(200)
            expect(response.data).to.equal(true)
          })
          .then(done, done)
      })
    })
  })
})
