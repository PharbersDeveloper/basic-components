import Component from '@ember/component';import layout from '../templates/components/bp-radio';
        import { computed } from '@ember/object';
        export default Component.extend({
            layout,
            tagName:'div',
            classNames:['bp-radio'],
            content: 'default',
            classNameBindings: [],
            attributeBindings: ['disabled:disabled', 'type', 'value', 'name'],
            type: "radio",
            value: "text",
            rid: "rid",
            name: "radio name",
            disabled: 'false',value: 'radio text',type: 'radio',name: 'radio',rid: 'rid',
            
            isChoosed: computed('choosedValue',function() {
                return this.value === this.choosedValue
            }),
            onClick() {
            },
            click() {
                this.onClick(this.value)
            }, });