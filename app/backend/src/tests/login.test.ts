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

describe('Login API - /login route', () => {
    let chaiHttpResponse: Response;
  
    it('should successfully login and receive a token', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: user.email, password: user.password });
  
      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.have.property('token');
    });
  
    it('should fail login without email', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({ password: '65635gfg' });
  
      expect(chaiHttpResponse).to.have.status(400);
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body.message).to.eql('All fields must be filled');
    });
  
    it('should successfully retrieve user role after login', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: user.email, password: user.password });
  
      const reqRole = await chai
        .request(app)
        .get('/login/role')
        .set('Authorization', chaiHttpResponse.body.token);
  
      expect(reqRole).to.have.status(200);
      expect(reqRole.body).to.have.property('role');
    });
  
    it('should fail login with non-existent user', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: 'non-valid@non.com', password: '125a225s5' });
  
      expect(chaiHttpResponse).to.have.status(401);
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body.message).to.eql('Invalid email or password');
    });
  });