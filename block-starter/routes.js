const routes = require('next-routes')();

routes
  .add('/campaigns/new', '/campaigns/new')
  .add('/campaigns/: ', '/campaigns/show');


module.exports = routes;
