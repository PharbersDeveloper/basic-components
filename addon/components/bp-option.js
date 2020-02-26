import Component from '@ember/component';
import layout from '../templates/components/bp-option';
import { computed } from '@ember/object';
export default Component.extend({
    layout,
    tagName:'li',
    classNames:['bp-option'],
    attributeBindings: ['disabled'],
    classNameBindings: ['isChoosed:option-active'],
    disabled: false,
    onClick() {},
    click() {
        this.onClick(this.text)
    },
    isChoosed: computed('choosedValue',function() {
        return this.text === this.choosedValue
    })
});
