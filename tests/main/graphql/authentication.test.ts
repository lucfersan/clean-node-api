import { ApolloServer, gql } from 'apollo-server-express'
import { hash } from 'bcrypt'
import { Collection } from 'mongodb'

import { MongoHelper } from '@/infra/db'

import { makeApolloServer } from './helpers'

describe('Authentication GraphQL', () => {
  let accountCollection: Collection
  let apolloServer: ApolloServer

  beforeAll(async () => {
    apolloServer = makeApolloServer()
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  describe('Login Query', () => {
    const loginQuery = gql`
      query ($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          accessToken
          name
        }
      }
    `

    it('should return an account on valid credentials', async () => {
      const password = await hash('any_password', 12)
      await accountCollection.insertOne({
        name: 'any_name',
        email: 'any_email@mail.com',
        password
      })
      const res = await apolloServer.executeOperation({
        query: loginQuery,
        variables: { email: 'any_email@mail.com', password: 'any_password' }
      })
      expect(res.data.login.accessToken).toBeTruthy()
      expect(res.data.login.name).toBe('any_name')
    })

    it('should return UnauthorizedError on invalid credentials', async () => {
      const res = await apolloServer.executeOperation({
        query: loginQuery,
        variables: { email: 'any_email@mail.com', password: 'any_password' }
      })
      expect(res.data).toBeFalsy()
      expect(res.errors[0].message).toBe('Unauthorized')
    })
  })

  describe('SignUp Mutation', () => {
    const signUpMutation = gql`
      mutation (
        $name: String!
        $email: String!
        $password: String!
        $passwordConfirmation: String!
      ) {
        signUp(
          name: $name
          email: $email
          password: $password
          passwordConfirmation: $passwordConfirmation
        ) {
          accessToken
          name
        }
      }
    `

    it('should return an account on valid data', async () => {
      const res = await apolloServer.executeOperation({
        query: signUpMutation,
        variables: {
          name: 'any_name',
          email: 'any_email@mail.com',
          password: 'any_password',
          passwordConfirmation: 'any_password'
        }
      })
      expect(res.data.signUp.accessToken).toBeTruthy()
      expect(res.data.signUp.name).toBe('any_name')
    })

    it('should return EmailInUseError if email in already in use', async () => {
      const password = await hash('any_password', 12)
      await accountCollection.insertOne({
        name: 'any_name',
        email: 'any_email@mail.com',
        password
      })
      const res = await apolloServer.executeOperation({
        query: signUpMutation,
        variables: {
          name: 'any_name',
          email: 'any_email@mail.com',
          password: 'any_password',
          passwordConfirmation: 'any_password'
        }
      })
      expect(res.data).toBeFalsy()
      expect(res.errors[0].message).toBe('The received email is already in use')
    })
  })
})
