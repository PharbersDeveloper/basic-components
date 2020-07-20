import Component from '@ember/component';import layout from '../templates/components/bp-img';
        export default Component.extend({
            layout,
            tagName:'img',
            classNames:['bp-img'],
            classNameBindings: [],
            attributeBindings: ['src','alt'],});