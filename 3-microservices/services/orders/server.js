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

router.get('/api/orders', function *() {
  this.body = db.orders;
});

router.get('/api/orders/:orderId', function *() {
  const id = parseInt(this.params.orderId);
  this.body = db.orders.find((order) => order.id == id);
});

router.get('/api/orders/by-inv/:inventoryId', function *() {
  const id = parseInt(this.params.inventoryId);
  this.body = db.orders.filter((order) => order.inventoryId == id);
});

router.get('/api/orders/by-acc/:accountId', function *() {
  const id = parseInt(this.params.accountId);
  this.body = db.orders.filter((orders) => orders.createdBy == id);
});

router.get('/api/', function *() {
  this.body = "Microservice Order API ready to receive requests";
});

router.get('/api/orders/about', function *() {
  this.body = "Microservice Order API";
});

router.get('/', function *() {
  this.body = "Ready to receive requests for Orders";
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);

console.log('Worker started');
