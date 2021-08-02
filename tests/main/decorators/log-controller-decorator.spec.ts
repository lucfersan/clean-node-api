import faker from 'faker'

import { LogControllerDecorator } from '@/main/decorators'
import { ok, serverError } from '@/presentation/helpers'
import { Controller, HttpResponse } from '@/presentation/protocols'
import { LogErrorRepositorySpy } from '@/tests/data/mocks'

class ControllerSpy implements Controller {
  httpResponse = ok(faker.random.word())
  request: any

  async handle(request: any): Promise<HttpResponse> {
    this.request = request
    return this.httpResponse
  }
}

const mockServerError = (): HttpResponse => {
  const fakeError = new Error()
  fakeError.stack = 'any_stack'
  return serverError(fakeError)
}

type SutTypes = {
  sut: LogControllerDecorator
  controllerSpy: ControllerSpy
  logErrorRepositorySpy: LogErrorRepositorySpy
}

const makeSut = (): SutTypes => {
  const controllerSpy = new ControllerSpy()
  const logErrorRepositorySpy = new LogErrorRepositorySpy()
  const sut = new LogControllerDecorator(controllerSpy, logErrorRepositorySpy)
  return {
    sut,
    controllerSpy,
    logErrorRepositorySpy
  }
}

describe('LogControllerDecorator', () => {
  it('should call controller handle', async () => {
    const { sut, controllerSpy } = makeSut()
    const request = faker.lorem.sentence()
    await sut.handle(request)
    expect(controllerSpy.request).toEqual(request)
  })

  it('should return the controller httpResponse', async () => {
    const { sut, controllerSpy } = makeSut()
    const request = faker.lorem.sentence()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(controllerSpy.httpResponse)
  })

  it('should call LogErrorRepository with correct error if controller return a ServerError', async () => {
    const { sut, controllerSpy, logErrorRepositorySpy } = makeSut()
    const serverError = mockServerError()
    controllerSpy.httpResponse = serverError
    const request = faker.lorem.sentence()
    await sut.handle(request)
    expect(logErrorRepositorySpy.stack).toBe(serverError.body.stack)
  })
})
