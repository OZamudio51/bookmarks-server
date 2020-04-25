const { expect } = require('chai')
const supertest = require('supertest')

process.env.NODE_ENV = 'test'
process.env.API_TOKEN = 'test-auth-token'

global.expect = expect
global.supertest = supertest