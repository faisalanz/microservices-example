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

router.get('/api/inventory', function *() {
  this.body = db.inventory;
});

router.get('/api/inventory/:inventoryId', function *() {
  const id = parseInt(this.params.inventoryId);
  this.body = db.inventory.find((inventory) => inventory.id == id);
});

router.get('/api/', function *() {
  this.body = "Microservice Inventory API ready to receive requests";
});

router.get('/api/inventory/about', function *() {
  this.body = "Microservice Inventory API";
});

router.get('/', function *() {
  this.body = "Ready to receive requests for Inventory";
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);

console.log('Worker started');
