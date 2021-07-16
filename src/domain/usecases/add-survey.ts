export interface AddSurveyModel {
  question: string
  answers: SurveyAnswer[]
}

interface SurveyAnswer {
  image?: string
  answer: string
}

export interface AddSurvey {
  add: (surveyData: AddSurveyModel) => Promise<void>
}
