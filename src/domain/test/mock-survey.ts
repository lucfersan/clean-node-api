import faker from 'faker'

import { SurveyModel } from '@/domain/models'
import { AddSurveyParams } from '@/domain/usecases'

export const mockSurveyModel = (): SurveyModel => ({
  id: faker.datatype.uuid(),
  question: faker.random.words(),
  answers: [
    {
      image: faker.image.imageUrl(),
      answer: faker.random.word()
    },
    {
      image: faker.image.imageUrl(),
      answer: faker.random.word()
    }
  ],
  date: faker.date.recent()
})

export const mockSurveyModels = (): SurveyModel[] => [
  mockSurveyModel(),
  mockSurveyModel()
]

export const mockAddSurveyParams = (): AddSurveyParams => ({
  question: faker.random.words(),
  answers: [
    {
      image: faker.image.imageUrl(),
      answer: faker.random.word()
    },
    {
      image: faker.image.imageUrl(),
      answer: faker.random.word()
    }
  ],
  date: faker.date.recent()
})
