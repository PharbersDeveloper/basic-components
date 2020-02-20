import Component from '@ember/component';
import layout from '../templates/components/bp-input';
        import { computed } from '@ember/object';
        export default Component.extend({
            layout,
            tagName:'input',
            classNames:['bp-input'],
            content: 'default',
            classNameBindings: ['currentStates', 'currentSize'],
            attributeBindings: ['disabled:disabled', 'placeholder', 'value', 'onInput', 'type'],
            disabled: false,value: null,placeholder: 'test placeHolder',size: 'comfy',
            states: '',
            currentStates: computed('states', function () {
                let states = this.get('states')
                if (states) {
                    return "input-" + states
                } else {
                    return ''
                }
            }),
            currentSize: computed('size', function () {
                let size = this.get('size') ? this.get('size') : 'default';

                return "input-" + size
            }),
            focus() {
                let action = this.actions.emit;

                action.call(this, this, "focus", "")
            },
            blur() {
                let action = this.actions.emit;

                action.call(this, this, "blur", "")
            },
            // input() {
            //     let action = this.actions.emit;

            //     action.call(this, this, "input", "")
            // },
            input(event) {
                this.set('value', event.target.value)
            },
        actions: {
            
            emit(source, signal, data) {
                this.sendAction("emit", source, signal, data)
            },
            disconnect(ss, ts, cs) {
                this.sendAction("disconnect", ...this.mstc)
            },
            ssc(ss, ts, cs) {
                const mss = ss
                const mts = ts
                const mcs = cs

            
                
            mss.pushObject({ "source": this, "signal": "focus" })
            mts.pushObject({ "target": this, "slot": this.get("actions.slots.onFocus") })
            mcs.pushObject({
               "source": this,
               "signal": "focus",
               "target": this,
               "slot": this.get("actions.slots.onFocus")
           })
            mss.pushObject({ "source": this, "signal": "blur" })
            mts.pushObject({ "target": this, "slot": this.get("actions.slots.onBlur") })
            mcs.pushObject({
               "source": this,
               "signal": "blur",
               "target": this,
               "slot": this.get("actions.slots.onBlur")
           })
            mss.pushObject({ "source": this, "signal": "input" })
            mts.pushObject({ "target": this, "slot": this.get("actions.slots.onInput") })
            mcs.pushObject({
               "source": this,
               "signal": "input",
               "target": this,
               "slot": this.get("actions.slots.onInput")
           })
            mss.pushObject({ "source": this, "signal": "change" })
            mts.pushObject({ "target": this, "slot": this.get("actions.slots.onChange") })
            mcs.pushObject({
               "source": this,
               "signal": "change",
               "target": this,
               "slot": this.get("actions.slots.onChange")
           })
                this.set("mstc", [mss, mts, mcs])
            this.sendAction("ssc", mss, mts, mcs)
            },
                slots: {
                onFocus(target,data) {
                window.console.log("BP-UI-Parse Focus event => " + data)
            },onBlur(target,data) {
                window.console.log("BP-UI-Parse Blur event => " + data)
            },onInput(target,data) {
                window.console.log("BP-UI-Parse Input event => " + data)
            },onChange(target,data) {
                window.console.log("BP-UI-Parse Change event => " + data)
            },
                }},});
