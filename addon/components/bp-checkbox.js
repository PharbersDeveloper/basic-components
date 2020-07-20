import Component from '@ember/component';import layout from '../templates/components/bp-checkbox';
        import { computed } from '@ember/object';
        export default Component.extend({
            layout,
            tagName:'div',
            classNames:['bp-checkbox'],
            content: 'default',
            classNameBindings: [],
            attributeBindings: ['disabled:disabled', 'type', 'value'],
            value: "text",
            choosedValue: [],
            isChecked: false,
            disabled: false,value: 'check text',type: 'checkbox',name: 'checkbox',cid: 'cid',
            
            isChoosed: computed('choosedValue', "isChecked",function() {
                return this.get("choosedValue").includes(this.value)
            }),
            onClick() {
            },
            click() {
                this.onClick(this.value)
                this.toggleProperty("isChecked")
            },});