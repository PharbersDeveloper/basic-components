import Component from '@ember/component';import layout from '../templates/components/bp-menu';
export default Component.extend({    layout,    tagName:'ul',    classNames:['bp-menu'],    currentIndex: 0});