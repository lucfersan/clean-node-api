export type AddSurveyModel = {
  question: string
  answers: SurveyAnswer[]
  date: Date
}

type SurveyAnswer = {
  image?: string
  answer: string
}

export interface AddSurvey {
  add: (surveyData: AddSurveyModel) => Promise<void>
}
