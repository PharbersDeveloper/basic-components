import Component from '@ember/component';import layout from '../templates/components/bp-button-group';
        import { computed } from '@ember/object';
        export default Component.extend({
            layout,
            tagName:'div',
            classNames:['bp-button-group', 'button-group'],
            content: 'default',
            classNameBindings: [],
            attributeBindings: [],
            currentValue: null,
            });