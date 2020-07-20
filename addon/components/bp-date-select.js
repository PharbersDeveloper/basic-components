import Component from '@ember/component';import layout from '../templates/components/bp-date-select';
        import { computed } from '@ember/object';
        export default Component.extend({
            layout,
            start: 2000,
            end: 2020,
            show: false,
            type: "year",
            classNames:['bp-input-downdrop'],
            attributeBindings: ['tabIndex'],
            inputListType: computed("type", function () {
                return "input-list-container-"  + this.get("type")
                // type 目前有 month 和 year
            }),
            array: computed("start", "end", function() {
                let s = Number(this.get("start")),
                e = Number(this.get("end")),
                a = []

                for(let i = s; i <= e; i++) {
                a.push(i)
                }
                return a
            }),
            value: "2020",
            tabIndex: '1',
            focusOut() {
                this.set('show',false)
                window.console.log("1")
            },
            
            
            actions: {
                toggleShow() {
                    // this.set("show", true)
                    this.toggleProperty("show")
                  },
                  chooseItem(index) {
                    let a = this.get("array")
                    this.set("value", a[index])
                    this.set("show", false)

                    return false
                  }
            }});