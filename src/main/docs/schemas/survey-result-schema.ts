export const surveyResultParamsSchema = {
  type: 'object',
  properties: {
    surveyId: {
      type: 'string'
    },
    answer: {
      type: 'array',
      items: {
        $ref: '#/schemas/surveyResultAnswers'
      }
    },
    date: {
      type: 'string'
    }
  }
}
