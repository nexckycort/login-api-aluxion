import supertest from 'supertest'

import server from '../../../src/app/config/app'

describe('server', () => {
  const request = supertest(server)

  it('Should send a success response', (done) => {
    request.get('/status').then((response) => {
      expect(response.status).toBe(200)
      done()
    })
  })
})
