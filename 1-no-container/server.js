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

router.get('/api/inventory', function *() {
  this.body = db.inventory;
});

router.get('/api/inventory/:inventoryId', function *() {
  const id = parseInt(this.params.inventoryId);
  this.body = db.inventory.find((inventory) => inventory.id == id);
});

router.get('/api/orders', function *() {
  this.body = db.orders;
});

router.get('/api/orders/:orderId', function *() {
  const id = parseInt(this.params.orderId);
  this.body = db.orders.find((order) => order.id == id);
});

router.get('/api/order/by-inv/:inventoryId', function *() {
  const id = parseInt(this.params.inventoryId);
  this.body = db.orders.filter((order) => order.inventoryId == id);
});

router.get('/api/orders/by-acc/:accountId', function *() {
  const id = parseInt(this.params.accountId);
  this.body = db.orders.filter((orders) => orders.createdBy == id);
});

router.get('/api/', function *() {
  this.body = "API ready to receive requests";
});

router.get('/', function *() {
  this.body = "Ready to receive requests";
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);
