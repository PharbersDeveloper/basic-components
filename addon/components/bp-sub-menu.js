import Component from '@ember/component';import layout from '../templates/components/bp-sub-menu';import { computed } from '@ember/object';
export default Component.extend({    layout,    tagName: 'li',    classNames:['bp-sub-menu'],    classNameBindings: ['isActive:menu-active'],    attributeBindings: ['disabled'],    disabled: false,   text: '',   show: false,   actions: {       toggleShow() {           this.toggleProperty('show')       }   }});