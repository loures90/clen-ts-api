export const surveyResultAnswersSchema = {
  type: 'object',
  properties: {
    answer: {
      type: 'string'
    },
    image: {
      type: 'string'
    },
    count: {
      type: 'number'
    },
    percent: {
      type: 'number'
    }
  }
}
