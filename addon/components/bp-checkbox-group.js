import Component from '@ember/component';
import layout from '../templates/components/bp-checkbox-group';
        import { computed } from '@ember/object';
        export default Component.extend({
            layout,
            tagName:'div',
            classNames:['bp-checkbox-group'],
            content: 'default',
            classNameBindings: [],
            choosedValue: [],
            onChange() { },
            
            
            actions: {
                change(value) {
                    let arr = this.get("choosedValue")
                    if (arr.includes(value)) {
                      let index = arr.indexOf(value)
                      arr.splice(index, 1)
                    } else {
                      arr.push(value)
                    }
                    this.set('choosedValue',[...new Set(arr)]);
                    this.onChange(value)
                    console.log(this.get("choosedValue"))
                 }
            },});
