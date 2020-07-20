import Component from '@ember/component';
import layout from '../templates/components/bp-progressbar';
import { computed } from '@ember/object';

export default Component.extend({
  layout,
  height: 4,
  width: 163,
  curProgress: 0.5,
  curProgressWidth: computed("curProgress", function( ){
    return Math.floor(this.get("width") * this.get("curProgress"))
  }),
});
