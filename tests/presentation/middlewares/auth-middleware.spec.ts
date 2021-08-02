import { AccessDeniedError } from '@/presentation/errors'
import { forbidden, serverError, ok } from '@/presentation/helpers'
import { AuthMiddleware } from '@/presentation/middlewares'
import { throwError } from '@/tests/domain/mocks'
import { LoadAccountByTokenSpy } from '@/tests/presentation/mocks'

const mockRequest = (): AuthMiddleware.Request => ({
  accessToken: 'any_token'
})

type SutTypes = {
  sut: AuthMiddleware
  loadAccountByTokenSpy: LoadAccountByTokenSpy
}

const makeSut = (role?: string): SutTypes => {
  const loadAccountByTokenSpy = new LoadAccountByTokenSpy()
  const sut = new AuthMiddleware(loadAccountByTokenSpy, role)
  return {
    sut,
    loadAccountByTokenSpy
  }
}

describe('AuthMiddleware', () => {
  it('should return 403 if x-access-token does not exist in headers', async () => {
    const { sut } = makeSut()
    const request = {}
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  it('should call LoadAccountByToken with correct values', async () => {
    const role = 'any_role'
    const { sut, loadAccountByTokenSpy } = makeSut(role)
    const request = mockRequest()
    await sut.handle(request)
    expect(loadAccountByTokenSpy.token).toBe(request.accessToken)
    expect(loadAccountByTokenSpy.role).toBe(role)
  })

  it('should return 403 if LoadAccountByToken returns null', async () => {
    const { sut, loadAccountByTokenSpy } = makeSut()
    loadAccountByTokenSpy.result = null
    const request = mockRequest()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  it('should return 200 if LoadAccountByToken returns an account', async () => {
    const { sut, loadAccountByTokenSpy } = makeSut()
    const request = mockRequest()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(
      ok({ accountId: loadAccountByTokenSpy.result.id })
    )
  })

  it('should return 500 if LoadAccountByToken throws', async () => {
    const { sut, loadAccountByTokenSpy } = makeSut()
    jest.spyOn(loadAccountByTokenSpy, 'load').mockImplementationOnce(throwError)
    const request = mockRequest()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
