import Component from '@ember/component';
        import { computed } from '@ember/object';
        export default Component.extend({
            layout,
            tagName:'div',
            classNames:['bp-icon'],
            content: 'default',
            attributeBindings: [''],
            iconName: 'cross',
            color: 'icon-info',
            
            classNameBindings: ['iconSmall:icon-small:'],});