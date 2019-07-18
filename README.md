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