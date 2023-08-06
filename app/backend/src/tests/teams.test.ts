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

describe('Teams test', () => {
    let chaiHttpResponse: Response;
  
    it('should return 200 when get teams', async () => {
      const response = chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: user.email, password: user.password });

      const { token } = response.body

      chaiHttpResponse = await chai
        .request(app)
        .get('/teams')
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
        .get('/teams/1')
        .set('authorization', `Bearer ${token}`)
        .send();
  
      expect(chaiHttpResponse).to.have.status(200);
    });
   
    

  });