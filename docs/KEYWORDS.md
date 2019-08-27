# Keywords

**getByProfileKey** - Get Keywords by Profile Key

* profileKey - The Profile Key to return
* sort - Sort the Values - Label: asc/desc - Value: asc_value/desc_value
* outputFormat - Format of the response: array/json

```javascript
agilite.Keywords.getByProfileKey(profileKey, sort, outputFormat)
```

**getProfileKeysByGroup** - Get Profile Keys by Group Name

* groupName - The GroupName of Keyword Profile Keys to return
* sort - Sort the Profile Keys: asc/desc

```javascript
agilite.Keywords.getProfileKeysByGroup(groupName, sort)
```

**getLabelByValue** - Get Keyword Label by Value

* profileKey - The Profile Key of the Profile
* value - Keyword Value
* outputFormat - Format of the response: string/json

```javascript
agilite.Keywords.getLabelByValue(profileKey, value, outputFormat)
```

**getValueByLabel** - Get Keyword Value by Label

* profileKey - The Profile Key of the Profile
* label - Keyword Label
* outputFormat - Format of the response: string/json

```javascript
agilite.Keywords.getValueByLabel(profileKey, label, outputFormat)
```