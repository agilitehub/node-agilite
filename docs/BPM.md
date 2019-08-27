# BPM

**registerBPMRecord** - Register a new BPM Record

* processKey - The Key of the BPM Process
* currentUser - The Current User registering a BPM Record

```javascript
agilite.BPM.registerBPMRecord(processKey, currentUser)
```

**execute** - Execute a Process

* processKey - The Key of the BPM Process
* bpmRecordId - The Id of the Registered BPM Record
* optionSelected - The selected option of the BPM Profile. e.g. "submit"
* currentUser - The Current User executing the Process
* comments - Additional Comments
* data - Optional request body data

```javascript
agilite.BPM.execute(processKey, bpmRecordId, optionSelected, currentUser, comments, data)
```

**getRecordState** - Get current state of BPM Record

* processKeys - **Array** of ProcessKeys
* bpmRecordIds - **Array** of BPM Record Ids
* stepNames - **Array** of Step Names
* responsibleUsers - **Array** of Responsible Users
* relevantUsers - **Array** of Relevant Users
* includeHistory - Default: true
* includeStepOptions - Default: true
* includeVisibleObjects - Default: true

```javascript
agilite.BPM.getRecordState(processKeys, bpmRecordIds, stepNames, responsibleUsers, relevantUsers, includeHistory, includeStepOptions, includeVisibleObjects, page, pageLimit)
```

**getByProfileKey** - Get BPM Record By Profile Key

* profileKey - Profile Key to return

```javascript
agilite.BPM.getByProfileKey(profileKey)
```

**clearHistoryData** - Clear BPM History Data

* profileKey - Profile Key of Profile History to clear

```javascript
agilite.BPM.clearHistoryData(profileKey)
```

**getActiveSteps** - Get Active Steps of relevant Process

* processKey

```javascript
agilite.BPM.getActiveSteps(processKey)
```

**getActiveUsers** - Get Active Users of relevant Process

* processKey

```javascript
agilite.BPM.getActiveUsers(processKey)
```


