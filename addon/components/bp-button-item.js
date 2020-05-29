import Component from '@ember/component';
import layout from '../templates/components/bp-button-item';
        import { computed } from '@ember/object';
        export default Component.extend({
            layout,
            tagName:'button',
            classNames:['bp-button-item', 'button-item'],
            content: 'default',
            classNameBindings: ['currentDensity',  'active:active'],
            attributeBindings: ['disabled:disabled'],
            iconClass: "",
            iconActiveClass: "",
            disabled: false,text: 'test text',
            density: 'default',active: true,
            currentDensity: computed('density', function () {
                let density = this.get('density')
                if (density) {
                    return "button-density-" + density
                } else {
                    return 'button-density-default'
                }
            }),
            click() {
                let action = this.actions.emit;

                action.call(this, this, "click", "")
            },
            dblclick() {
                let action = this.actions.emit;

                action.call(this, this, "dblclick", "")
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
            mss.pushObject({ "source": this, "signal": "dblclick" })
            mts.pushObject({ "target": this, "slot": this.get("actions.slots.onDblclick") })
            mcs.pushObject({
               "source": this,
               "signal": "dblclick",
               "target": this,
               "slot": this.get("actions.slots.onDblclick")
           })
                this.set("mstc", [mss, mts, mcs])
            this.sendAction("ssc", mss, mts, mcs)
            },
                slots: {
                onClick(target,data) {
                window.console.log("BP-UI-Parse Click event => " + data)
            },onDblclick(target,data) {
                window.console.log("BP-UI-Parse Dblclick event => " + data)
            },
                }},});
