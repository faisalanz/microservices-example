const app = require('koa')();
const router = require('koa-router')();
const db = require('./db.json');

// Log requests
app.use(function *(next){
  const start = new Date;
  yield next;
  const ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});

router.get('/api/accounts', function *(next) {
  this.body = db.accounts;
});

router.get('/api/accounts/:accountId', function *(next) {
  const id = parseInt(this.params.accountId);
  this.body = db.accounts.find((user) => user.id == id);
});

router.get('/api/', function *() {
  this.body = "Microservice Account API ready to receive requests";
});

router.get('/api/accounts/about', function *() {
  this.body = "Microservice Account API";
});

router.get('/', function *() {
  this.body = "Ready to receive requests for Accounts";
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);

console.log('Worker started');
