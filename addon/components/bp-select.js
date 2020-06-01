import Component from '@ember/component';
import layout from '../templates/components/bp-select';

export default Component.extend({
    layout,
    classNames:['bp-select'],
    classNameBindings: ['disabled:select-disabled'],
    attributeBindings: ['tabIndex'],
    disabled: false,
    choosedValue: '请选择',
    show: false,
    tabIndex: '1',
    defaultValue: '',
    selectIcon: "down",
    focusOut() {
        this.set('show',false)
    },
    onChange() {},
    actions: {
        toggleShow() {
            if(!this.disabled) {
               this.toggleProperty('show')
            }
        },
        change(text) {
             this.set('choosedValue',text);
             this.onChange(text)
             this.set('show',false)
         }
    },
    didInsertElement() {
        this._super(...arguments);
        if(this.defaultValue) {
            this.set('choosedValue',this.defaultValue)
        }
    }});
