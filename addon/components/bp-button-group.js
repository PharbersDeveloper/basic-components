import Component from '@ember/component';
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