import Component from '@ember/component';import layout from '../templates/components/bp-label';
        import { computed } from '@ember/object';
        export default Component.extend({
            layout,
            tagName:'label',
            classNames:[],
            content: 'default',
            attributeBindings: ['for'],
            text: 'test label',

            type: 'body-primary',

            
            classNameBindings: ["type"],});