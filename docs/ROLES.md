# Roles

**getRole**

* roleNames - **Array** of Role Names to return
* conditionalLevels - **Array** of Conditional Levels to return
* data - Optional request body data

```javascript
agilite.Roles.getRole(roleNames, conditionalLevels, data)
```

**assignRole**

* processKey - Key of the related BPM Process
* bpmRecordId - Record Id of the registered BPM Record
* roleName - Name of the Role
* currentUser - Current User assigning the role
* responsibleUsers - **Array** of responsibleUsers

```javascript
agilite.Roles.assignRole(processKey, bpmRecordId, roleName, currentUser, responsibleUsers)
```

**getAssignedRoles**

* processKey - Key of the related BPM Process
* bpmRecordId - Record Id of the registered BPM Record
* roleNames - **Array** of Role Names to return

```javascript
agilite.Roles.getAssignedRoles(processKey, bpmRecordId, roleNames)
```

**changeConditionalLevels**

* recordId - Record Id of the Role Profile
* conditionalLevels - **Array** of new Conditional Levels

```javascript
agilite.Roles.changeConditionalLevels(recordId, conditionalLevels)
```

**reAssignResponsibleUser**

* recordId - Record Id of the Role Profile
* responsibleUser - New Responsible User

```javascript
agilite.Roles.reAssignResponsibleUser(recordId, responsibleUser)
```