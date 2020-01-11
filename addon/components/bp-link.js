import Component from '@ember/component';import layout from '../templates/components/bp-link';
        import { computed } from '@ember/object';
        export default Component.extend({
            layout,
            tagName:'button',
            classNames:['bp-link'],
            content: 'default',
            classNameBindings: ['currentType'],
            attributeBindings: ['disabled:disabled'],
            name: 'test link',disabled: false,
            currentType: computed('type', 'disabled', function () {
                let disabled = this.get('disabled')

                if (disabled) {
                    return 'link-disabled'
                } else {

                    let type = this.get('type') ? this.get('type') : 'default';

                    return 'link-' + type
                }
            }),
            click() {
                let action = this.actions.emit;

                action.call(this, this, "click", "")
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

            
                
            mss.pushObject({ "source": this, "signal": "click" })
            mts.pushObject({ "target": this, "slot": this.get("actions.slots.onClick") })
            mcs.pushObject({
               "source": this,
               "signal": "click",
               "target": this,
               "slot": this.get("actions.slots.onClick")
           })
                this.set("mstc", [mss, mts, mcs])
            this.sendAction("ssc", mss, mts, mcs)
            },
                slots: {
                onClick(target,data) {
                window.console.log("BP-UI-Parse Click event => " + data)
            },
                }}, });