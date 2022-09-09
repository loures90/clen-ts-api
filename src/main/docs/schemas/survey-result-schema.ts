export const surveyResultParamsSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string'
    },
    surveyId: {
      type: 'string'
    },
    accountId: {
      type: 'string'
    },
    answer: {
      type: 'string'
    },
    date: {
      type: 'string'
    }
  }
}