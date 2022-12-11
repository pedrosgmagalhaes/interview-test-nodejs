const assert = require('assert');
const request = require('supertest');
const homepage = require('../routes/api/homepage');

describe('GET /getFeeds', () => {
    it('should return 10 posts by default', (done) => {
        request(homepage)
            .get('/getFeeds')
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body.length, 10);
                done(); // Call done here to signal that the test is finished
            });
    });
});

describe('POST /createPost', () => {
    it('should create a post', (done) => {
        request(homepage)
            .post('/createPost')
            .send({
                content: 'Test post',
                user: 'test-user',
                type: 'text'
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body.content, 'Test post');
                assert.equal(res.body.user, 'test-user');
                assert.equal(res.body.type, 'text');
                done(); // Call done here to signal that the test is finished
            });
    });
});