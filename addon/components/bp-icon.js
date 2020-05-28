import Component from '@ember/component';
import layout from '../templates/components/bp-icon'; 
export default Component.extend({
    layout,
    tagName:'div',
    classNames:['bp-icon'],
    content: 'default',
    attributeBindings: [''],
    iconName: 'cross',
    color: '',
    
    classNameBindings: ['iconSmall:icon-small:'],});