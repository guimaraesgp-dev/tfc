import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';

chai.use(chaiHttp);
const { expect } = chai;

const user = {
  email: 'admin@admin.com',
  password: 'secret_admin',
};

describe('Matches test', () => {
    let chaiHttpResponse: Response;
  
    it('should return 200 when get matches', async () => {
      const response = chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: user.email, password: user.password });

      const { token } = response.body

      chaiHttpResponse = await chai
        .request(app)
        .get('/matches')
        .set('authorization', `Bearer ${token}`)
        .send();
  
      expect(chaiHttpResponse).to.have.status(200);
    });

    it('should return 200 when get a valid match id', async () => {
      const response = chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: user.email, password: user.password });

      const { token } = response.body
      chaiHttpResponse = await chai
        .request(app)
        .get('/matches/1')
        .set('authorization', `Bearer ${token}`)
        .send();
  
      expect(chaiHttpResponse).to.have.status(200);
    });
   
    it('should return 200 when finish a match', async () => {
      const response = chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: user.email, password: user.password });

      const { token } = response.body
      chaiHttpResponse = await chai
        .request(app)
        .patch('/matches/1/finish')
        .set('authorization', `Bearer ${token}`)
        .send();
  
      expect(chaiHttpResponse).to.have.status(200);
    });

    it('should return 200 when update a match', async () => {
      const response = chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: user.email, password: user.password });

      const { token } = response.body
      chaiHttpResponse = await chai
        .request(app)
        .patch('/matches/1')
        .set('authorization', `Bearer ${token}`)
        .send({homeTeamGoals: 9, awayTeamGoals: 8});
  
      expect(chaiHttpResponse).to.have.status(200);
    });
   

  });