module.exports = {
  type: 'object',
  properties: {
    createdBy: { type: 'string' },
    modifiedBy: { type: 'string' },
    data: {
      title: 'data',
      type: 'object',
      properties: {
        key: { type: 'string', required: true },
        name: { type: 'string', required: true },
        isActive: { type: 'boolean' },
        description: { type: 'string' },
        groupName: { type: 'string' },
        appUrl: { type: 'string' },
        referenceUrl: { type: 'string' },
        appAdmin: { type: 'string' },
        notificationTemplate: { type: 'string' },
        iln: {},
        processSteps: { type: 'array', items: {}, required: true },
        solutions: { type: 'array', items: {} },
        notes: { type: 'string' },
        numberingId: { type: 'string' }
      }
    },
    _id: { type: 'string', pattern: '^[0-9a-fA-F]{24}$' }
  }
}
