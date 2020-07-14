'use strict'

require('dotenv').config()
const fs = require('fs')
const TypeDetect = require('type-detect')
const expect = require('chai').expect
const Agilite = require('../controllers/agilite')
const EnumsTypeDetect = require('../utils/enums-type-detect')
const Enums = require('../utils/enums')

const agilite = new Agilite({
  apiServerUrl: process.env.API_SERVER_URL,
  apiKey: process.env.API_KEY
})

describe('Agilit-e Files', function () {
  this.bail(true)
  const invalidValue = 'invalid_value'

  let recordId = null
  let recordId2 = null
  let recordId3 = null
  let recordId4 = null
  let zippedRecordId = null
  let publicToken = null

  let excelFile = null
  let pdfFile = null
  let zippedFile = null

  excelFile = fs.readFileSync(`${__dirname}/../data-templates/files/excelFile.xlsx`)
  pdfFile = fs.readFileSync(`${__dirname}/../data-templates/files/pdfFile.pdf`)
  zippedFile = fs.readFileSync(`${__dirname}/../data-templates/files/zippedFolder.zip`)

  describe('Upload New File', () => {
    describe('Negative Tests', () => {
      it('Upload New File - No Params (Negative)', function (done) {
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

      it('Upload New File - Empty File Name (Negative)', (done) => {
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

      it('Upload New File - Empty Content-Type (String) & Empty Data (String) (Negative)', (done) => {
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

      it('Upload New File - Empty Content-Type (String) & Empty Data (Null) (Negative)', (done) => {
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

      it('Upload New File - Empty Content-Type (Null) & Empty Data (Null) (Negative)', (done) => {
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

      it('Upload New File - Empty Data (Negative)', (done) => {
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

      it('Upload New File - Only Valid Data (Negative)', (done) => {
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

      it('Upload New File - No File Name, Valid Data & Content-Type (Negative)', (done) => {
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

      it('Upload New File - Array of Files (Negative)', (done) => {
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
      it('Upload New File - String persistFile (Positive)', (done) => {
        agilite.Files.uploadFile('test', 'application/octet-stream', excelFile, 'asdasd', '')
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
            expect(response.data).to.haveOwnProperty('createdAt')
            expect(response.data.createdAt).to.not.equal(Enums.STRING_EMPTY)
            expect(response.data).to.haveOwnProperty('updatedAt')
            expect(response.data.updatedAt).to.not.equal(Enums.STRING_EMPTY)
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
          })
          .then(done, done)
      })

      it('Upload New File - Number persistFile (Positive)', (done) => {
        agilite.Files.uploadFile('test', 'application/octet-stream', excelFile, 123123123, '')
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
            expect(response.data).to.haveOwnProperty('createdAt')
            expect(response.data.createdAt).to.not.equal(Enums.STRING_EMPTY)
            expect(response.data).to.haveOwnProperty('updatedAt')
            expect(response.data.updatedAt).to.not.equal(Enums.STRING_EMPTY)
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
          })
          .then(done, done)
      })

      it('Upload New File - Array persistFile (Positive)', (done) => {
        agilite.Files.uploadFile('test', 'application/octet-stream', excelFile, [], '')
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
            expect(response.data).to.haveOwnProperty('createdAt')
            expect(response.data.createdAt).to.not.equal(Enums.STRING_EMPTY)
            expect(response.data).to.haveOwnProperty('updatedAt')
            expect(response.data.updatedAt).to.not.equal(Enums.STRING_EMPTY)
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
          })
          .then(done, done)
      })

      it('Upload New File - String isPublic (Positive)', (done) => {
        agilite.Files.uploadFile('test', '', excelFile, '', 'asdasdasd')
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
            expect(response.data).to.haveOwnProperty('createdAt')
            expect(response.data.createdAt).to.not.equal(Enums.STRING_EMPTY)
            expect(response.data).to.haveOwnProperty('updatedAt')
            expect(response.data.updatedAt).to.not.equal(Enums.STRING_EMPTY)
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
          })
          .then(done, done)
      })

      it('Upload New File - Number isPublic (Positive)', (done) => {
        agilite.Files.uploadFile('test', '', excelFile, '', 123123)
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
            expect(response.data).to.haveOwnProperty('createdAt')
            expect(response.data.createdAt).to.not.equal(Enums.STRING_EMPTY)
            expect(response.data).to.haveOwnProperty('updatedAt')
            expect(response.data.updatedAt).to.not.equal(Enums.STRING_EMPTY)
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
          })
          .then(done, done)
      })

      it('Upload New File - Array isPublic (Positive)', (done) => {
        agilite.Files.uploadFile('test', '', excelFile, '', [])
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
            expect(response.data).to.haveOwnProperty('createdAt')
            expect(response.data.createdAt).to.not.equal(Enums.STRING_EMPTY)
            expect(response.data).to.haveOwnProperty('updatedAt')
            expect(response.data.updatedAt).to.not.equal(Enums.STRING_EMPTY)
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
          })
          .then(done, done)
      })

      it('Upload New File - Successful File (Positive)', (done) => {
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
            expect(response.data).to.haveOwnProperty('createdAt')
            expect(response.data.createdAt).to.not.equal(Enums.STRING_EMPTY)
            expect(response.data).to.haveOwnProperty('updatedAt')
            expect(response.data.updatedAt).to.not.equal(Enums.STRING_EMPTY)
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

      it('Upload New File - Successful Zipped File (Positive)', (done) => {
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
            expect(response.data).to.haveOwnProperty('createdAt')
            expect(response.data.createdAt).to.not.equal(Enums.STRING_EMPTY)
            expect(response.data).to.haveOwnProperty('updatedAt')
            expect(response.data.updatedAt).to.not.equal(Enums.STRING_EMPTY)
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

            zippedRecordId = response.data._id
          })
          .then(done, done)
      })

      it('Upload New File - Successful Public File (Positive)', (done) => {
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
            expect(response.data).to.haveOwnProperty('createdAt')
            expect(response.data.createdAt).to.not.equal(Enums.STRING_EMPTY)
            expect(response.data).to.haveOwnProperty('updatedAt')
            expect(response.data.updatedAt).to.not.equal(Enums.STRING_EMPTY)
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

      it('Upload New File - Successful Persisted File (Positive)', (done) => {
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
            expect(response.data).to.haveOwnProperty('createdAt')
            expect(response.data.createdAt).to.not.equal(Enums.STRING_EMPTY)
            expect(response.data).to.haveOwnProperty('updatedAt')
            expect(response.data.updatedAt).to.not.equal(Enums.STRING_EMPTY)
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

      it('Upload New File - Successful Persisted Public File (Positive)', (done) => {
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
            expect(response.data).to.haveOwnProperty('createdAt')
            expect(response.data.createdAt).to.not.equal(Enums.STRING_EMPTY)
            expect(response.data).to.haveOwnProperty('updatedAt')
            expect(response.data.updatedAt).to.not.equal(Enums.STRING_EMPTY)
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
      it('Get File - No Params (Negative)', (done) => {
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

      it('Get File - Empty Record Id (Negative)', (done) => {
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

      it('Get File - Invalid String Record Id (Negative)', (done) => {
        agilite.Files.getFile(invalidValue)
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.UINT8ARRAY)

            // Check if errorMessage exists and contains correct error message
            err.response.data = JSON.parse(err.response.data.toString())

            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(err.response.data.errorMessage).to.equal('Please provide a valid Record Id in the \'record-id\' header parameter')
          })
          .then(done, done)
      })

      it('Get File - Invalid Number Record Id (Negative)', (done) => {
        agilite.Files.getFile(123123123213, '', '')
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message

            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(err.response.data.errorMessage).to.equal('File with id: \'123123123213\' could not be found')
          })
          .then(done, done)
      })

      it('Get File - Array Record Id (Negative)', (done) => {
        agilite.Files.getFile([], '', '')
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message

            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(err.response.data.errorMessage).to.equal('Please provide a valid Record Id in the \'record-id\' header parameter')
          })
          .then(done, done)
      })

      it('Get File - Object Record Id (Negative)', (done) => {
        agilite.Files.getFile({}, '', '')
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message

            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(err.response.data.errorMessage).to.equal('Please provide a valid Record Id in the \'record-id\' header parameter')
          })
          .then(done, done)
      })

      it('Get File - Empty Record Id, String Response Type (Negative)', (done) => {
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

      it('Get File - Empty Record Id, Number Response Type (Negative)', (done) => {
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

      it('Get File - Empty Record Id, Array Response Type (Negative)', (done) => {
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

      it('Get File - Empty Record Id, Empty Response Type, String Log Process Id (Negative)', (done) => {
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

      it('Get File - Empty Record Id, Empty Response Type, Number Log Process Id  (Negative)', (done) => {
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

      it('Get File - Empty Record Id, Empty Response Type, Array Log Process Id  (Negative)', (done) => {
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
      it('Get File - Valid Record Id, Number Response Type (Positive)', (done) => {
        agilite.Files.getFile(recordId, 123123123, '')
          .then((response) => {
            expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.STRING)
            // TODO: Unsure of how this should look, I know that the Response Type defaults to string
            //       However I do not know how to validate if this data is correct or not
          })
          .then(done, done)
      })

      it('Get File - Valid Record Id, Array Response Type (Positive)', (done) => {
        agilite.Files.getFile(recordId, [], '')
          .then((response) => {
            expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.STRING)
            // TODO: Unsure of how this should look, I know that the Response Type defaults to string
            //       However I do not know how to validate if this data is correct or not
          })
          .then(done, done)
      })

      it('Get File - Valid Record Id, Object Response Type (Positive)', (done) => {
        agilite.Files.getFile(recordId, {}, '')
          .then((response) => {
            expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.STRING)
            // TODO: Unsure of how this should look, I know that the Response Type defaults to string
            //       However I do not know how to validate if this data is correct or not
          })
          .then(done, done)
      })

      it('Get File - Valid Record Id, Random String Response Type (Positive)', (done) => {
        agilite.Files.getFile(recordId, 'gibberish', '')
          .then((response) => {
            expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.STRING)
            // TODO: Unsure of how this should look, I know that the Response Type defaults to string
            //       However I do not know how to validate if this data is correct or not
          })
          .then(done, done)
      })

      it('Get File - Valid Record Id, Empty Response Type (Positive)', (done) => {
        agilite.Files.getFile(recordId, '', '')
          .then((response) => {
            expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.STRING)
            // TODO: Unsure of how this should look, I know that the Response Type defaults to string
            //       However I do not know how to validate if this data is correct or not
          })
          .then(done, done)
      })

      it('Get File - Valid Record Id, Valid Response Type, Number Log Process Id (Positive)', (done) => {
        agilite.Files.getFile(recordId, 'string', 123123)
          .then((response) => {
            expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.STRING)
            // TODO: Unsure of how this should look, I know that the Response Type defaults to string
            //       However I do not know how to validate if this data is correct or not
          })
          .then(done, done)
      })

      it('Get File - Valid Record Id, Valid Response Type, Array Log Process Id (Positive)', (done) => {
        agilite.Files.getFile(recordId, 'string', [])
          .then((response) => {
            expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.STRING)
            // TODO: Unsure of how this should look, I know that the Response Type defaults to string
            //       However I do not know how to validate if this data is correct or not
          })
          .then(done, done)
      })

      it('Get File - Valid Record Id, Valid Response Type, Object Log Process Id (Positive)', (done) => {
        agilite.Files.getFile(recordId, 'string', {})
          .then((response) => {
            expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.STRING)
            // TODO: Unsure of how this should look, I know that the Response Type defaults to string
            //       However I do not know how to validate if this data is correct or not
          })
          .then(done, done)
      })

      it('Get File - Valid Record Id, Valid Response Type, Invalid String Log Process Id (Positive)', (done) => {
        agilite.Files.getFile(recordId, 'string', invalidValue)
          .then((response) => {
            expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.STRING)
            // TODO: Unsure of how this should look, I know that the Response Type defaults to string
            //       However I do not know how to validate if this data is correct or not
          })
          .then(done, done)
      })

      it('Get File - Valid Record Id, Valid Response Type, Empty Log Process Id (Positive)', (done) => {
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
      it('Get Public File - No Params (Negative)', (done) => {
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

      it('Get Public File - Empty Public Id (Negative)', (done) => {
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

      it('Get Public File - Number Public Id (Negative)', (done) => {
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

      it('Get Public File - String Public Id (Negative)', (done) => {
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

      it('Get Public File - Object Public Id (Negative)', (done) => {
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

      it('Get Public File - Array Public Id (Negative)', (done) => {
        agilite.Files.getPublicFile([])
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message

            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(err.response.data.errorMessage).to.equal('Please provide a valid Record Id in the \'record-id\' header parameter')
          })
          .then(done, done)
      })
    })

    describe('Positive Tests', () => {
      it('Get Public File - Valid Public Id (Positive)', (done) => {
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
      it('Get File Name - Empty Record Id (Negative)', (done) => {
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

      it('Get File Name - Invalid Record Id (Negative)', (done) => {
        agilite.Files.getFileName(invalidValue)
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message

            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(err.response.data.errorMessage).to.equal('Please provide a valid Record Id in the \'record-id\' header parameter')
          })
          .then(done, done)
      })

      it('Get File Name - Number Record Id (Negative)', (done) => {
        agilite.Files.getFileName(123123123)
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message

            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(err.response.data.errorMessage).to.equal('Please provide a valid Record Id in the \'record-id\' header parameter')
          })
          .then(done, done)
      })

      it('Get File Name - Object Record Id (Negative)', (done) => {
        agilite.Files.getFileName({})
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message

            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(err.response.data.errorMessage).to.equal('Please provide a valid Record Id in the \'record-id\' header parameter')
          })
          .then(done, done)
      })

      it('Get File Name - Array Record Id (Negative)', (done) => {
        agilite.Files.getFileName([])
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message

            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(err.response.data.errorMessage).to.equal('Please provide a valid Record Id in the \'record-id\' header parameter')
          })
          .then(done, done)
      })
    })

    describe('Positive Tests', () => {
      it('Get File Name - Valid Record Id, Empty Log Process Id (Positive)', (done) => {
        agilite.Files.getFileName(recordId, '')
          .then((response) => {
            expect(TypeDetect(response.data)).to.not.equal(EnumsTypeDetect.STRING_EMPTY)
            expect(response).to.haveOwnProperty('data')
            expect(response.status).to.equal(200)
            expect(response.data).to.equal('test')
          })
          .then(done, done)
      })

      it('Get File Name - Valid Record Id, Number Log Process Id (Positive)', (done) => {
        agilite.Files.getFileName(recordId, 123123123)
          .then((response) => {
            expect(TypeDetect(response.data)).to.not.equal(EnumsTypeDetect.STRING_EMPTY)
            expect(response).to.haveOwnProperty('data')
            expect(response.status).to.equal(200)
            expect(response.data).to.equal('test')
          })
          .then(done, done)
      })

      it('Get File Name - Valid Record Id, Invalid Log Process Id (Positive)', (done) => {
        agilite.Files.getFileName(recordId, invalidValue)
          .then((response) => {
            expect(TypeDetect(response.data)).to.not.equal(EnumsTypeDetect.STRING_EMPTY)
            expect(response).to.haveOwnProperty('data')
            expect(response.status).to.equal(200)
            expect(response.data).to.equal('test')
          })
          .then(done, done)
      })

      it('Get File Name - Valid Record Id, Array Log Process Id (Positive)', (done) => {
        agilite.Files.getFileName(recordId, [])
          .then((response) => {
            expect(TypeDetect(response.data)).to.not.equal(EnumsTypeDetect.STRING_EMPTY)
            expect(response).to.haveOwnProperty('data')
            expect(response.status).to.equal(200)
            expect(response.data).to.equal('test')
          })
          .then(done, done)
      })

      it('Get File Name - Valid Record Id, Object Log Process Id (Positive)', (done) => {
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
      it('Unzip File - No Params (Negative)', (done) => {
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

      it('Unzip File - Empty Record Id (Negative)', (done) => {
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

      it('Unzip File - Invalid Record Id (Negative)', (done) => {
        agilite.Files.unzip(invalidValue)
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message

            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(err.response.data.errorMessage).to.equal('An unknown error occured. Please ensure that you\'re referencing a zip file')
          })
          .then(done, done)
      })

      it('Unzip File - Object Record Id (Negative)', (done) => {
        agilite.Files.unzip({})
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message

            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(err.response.data.errorMessage).to.equal('An unknown error occured. Please ensure that you\'re referencing a zip file')
          })
          .then(done, done)
      })

      it('Unzip File - Array Record Id (Negative)', (done) => {
        agilite.Files.unzip([])
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message

            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(err.response.data.errorMessage).to.equal('An unknown error occured. Please ensure that you\'re referencing a zip file')
          })
          .then(done, done)
      })
    })

    describe('Positive Tests', () => {
      it.skip('Unzip File - Valid Record Id (Positive)', (done) => {
        agilite.Files.unzip(zippedRecordId)
          .catch((err) => {
            console.log(err)
          })
          .then(done, done)
      })
    })
  })

  describe('Delete File', () => {
    describe('Negative Tests', () => {
      it('Delete File - Empty Record Id (Negative)', (done) => {
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

      it('Delete File - Invalid Record Id (Negative)', (done) => {
        agilite.Files.deleteFile(invalidValue)
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message

            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(err.response.data.errorMessage).to.equal('Please provide a valid Record Id in the \'record-id\' header parameter')
          })
          .then(done, done)
      })

      it('Delete File - Number Record Id (Negative)', (done) => {
        agilite.Files.deleteFile(123123123)
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message

            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(err.response.data.errorMessage).to.equal('Please provide a valid Record Id in the \'record-id\' header parameter')
          })
          .then(done, done)
      })

      it('Delete File - Object Record Id (Negative)', (done) => {
        agilite.Files.deleteFile({})
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message

            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(err.response.data.errorMessage).to.equal('Please provide a valid Record Id in the \'record-id\' header parameter')
          })
          .then(done, done)
      })

      it('Delete File - Array Record Id (Negative)', (done) => {
        agilite.Files.deleteFile([])
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message

            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(err.response.data.errorMessage).to.equal('Please provide a valid Record Id in the \'record-id\' header parameter')
          })
          .then(done, done)
      })
    })

    describe('Positive Tests', () => {
      it('Delete File - Valid Record Id, Empty Log Process Id (Positive)', (done) => {
        agilite.Files.deleteFile(recordId, '')
          .then((response) => {
            expect(TypeDetect(response.data)).to.not.equal(EnumsTypeDetect.STRING_EMPTY)
            expect(response).to.haveOwnProperty('data')
            expect(response.status).to.equal(200)
            expect(response.data).to.equal(true)
          })
          .then(done, done)
      })

      it('Delete File - Valid Record Id, Number Log Process Id (Positive)', (done) => {
        agilite.Files.deleteFile(recordId2, 123123123)
          .then((response) => {
            expect(TypeDetect(response.data)).to.not.equal(EnumsTypeDetect.STRING_EMPTY)
            expect(response).to.haveOwnProperty('data')
            expect(response.status).to.equal(200)
            expect(response.data).to.equal(true)
          })
          .then(done, done)
      })

      it('Delete File - Valid Record Id, Invalid Log Process Id (Positive)', (done) => {
        agilite.Files.deleteFile(recordId3, invalidValue)
          .then((response) => {
            expect(TypeDetect(response.data)).to.not.equal(EnumsTypeDetect.STRING_EMPTY)
            expect(response).to.haveOwnProperty('data')
            expect(response.status).to.equal(200)
            expect(response.data).to.equal(true)
          })
          .then(done, done)
      })

      it('Delete File - Valid Record Id, Object Log Process Id (Positive)', (done) => {
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