# agilite
A NodeJS module that provides seamless interactions with [Agilit-e](https://agilite.io) APIs.

Created by [Agilit-e](https://agilite.io)

**Installation**

Using npm:

```
npm install agilite
```

In Node.js:

```javascript
const Agilite = require('agilite');

const agilite = new Agilite({
    apiServerUrl: "{api_server_url}",
    apiKey: "{agilite_api_key}"
});

agilite.Keywords.getData()
.then((response) => {
    console.log(response.data);
})
.catch((err) => {
    console.log(err.response.data);
})
```

### To Run Unit Tests

```
npm run test
```

# APIs
Every API returns a promise

Each of App APIs except the Utility APIs contain a **postData**, **getData**, **putData** and **deleteData** function that can be used for CRUD requests. e.g

**postData**

* data - The request body data to post

```javascript
agilite.Keywords.postData(data)
```

**getData**

* profileKeys - **Array** of Profile Keys to return
* recordIds - **Array** of Record Ids to return
* slimResult - Default: true, Only return data

```javascript
agilite.Keywords.getData(profileKeys, recordIds, slimResult)
```

**putData**

* recordId - The Id of the record to PUT / Update
* data - The request body data to put

```javascript
agilite.Keywords.putData(recordId, data)
```

**deleteData**

* recordId - The Id of the record to DELETE / Remove

```javascript
agilite.Keywords.deleteData(recordId)
```

**executeCRUDRequest** - Executes a CRUD request relative to any Agilit-e App

* appName - The App Name relative to the Request. e.g. "keywords" or "numbering"
* reqType - The Request Type. e.g. "GET", "PUT"
* data - Optional request body data
* headers - Request Headers

```javascript
agilite.executeCRUDRequest(appName, reqType, data, headers)
```


## App APIs
* ### [API Keys](./docs/APIKEYS)
* ### [BPM](./docs/BPM)
* ### [Connectors](./docs/CONNECTORS)
* ### [Files](./docs/FILES)
* ### [Keywords](./docs/KEYWORDS)
* ### [Numbering](./docs/NUMBERING)
* ### [Roles](./docs/ROLES)
* ### [Templates](./docs/TEMPLATES)
* ### [Tier Structures](./docs/TIERSTRUCTURES)
* ### [Utilities](./docs/UTILS)