import Component from '@ember/component';
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