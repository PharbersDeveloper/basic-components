import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('components');
  this.route('navigation');
  this.route('charts');
  this.route('layout');
  this.route('simple');
});

export default Router;
