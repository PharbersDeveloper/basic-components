import Component from '@ember/component';import layout from '../templates/components/bp-radio-group';
        import { computed } from '@ember/object';
        export default Component.extend({
            layout,
            tagName:'div',
            classNames:['bp-radio-group'],
            content: 'default',
            classNameBindings: [],
            value: "text",
            onChange() { },
            
            
            actions: {
                change(value) {
                     this.set('choosedValue',value);
                     this.onChange(value)
                 }
            },});