# Files

**getFile**

* recordId - The Id of the file to return
* responseType - Default arraybuffer - blob, document, json, text or stream

```javascript
agilite.Files.getFile(recordId, responseType)
```

**uploadFile**

* fileName - File Name
* contentType - Content Type of the file
* data - The file data

```javascript
agilite.Files.uploadFile(fileName, contentType, data)
```

**deleteFile**

* recordId - Record Id of the file to delte

```javascript
agilite.Files.deleteFile(recordId)
```

**getFileName**

* recordId - Record Id of the file

```javascript
agilite.Files.getFileName(recordId)
```

**unzip**

* recordId - Record Id of the file that needs to be unzipped

```javascript
agilite.Files.unzip(recordId)
```

