import Component from '@ember/component';import layout from '../templates/components/bp-tag';
        import { computed } from '@ember/object';
        export default Component.extend({
            layout,
            tagName:"span",
            classNames:["bp-tag", ""],
            content: 'default',
            attributeBindings: [''],
            tagContent: 'tag test',
            type: 'blue',subtle: true,show: true,
            
            classNameBindings: ["currentStyle", "currentType", "show::display-none"],
            currentStyle: computed('subtle', function () {
                let isSubtle = this.get('subtle')
                if (isSubtle) {
                    return "tag-subtle"
                } else {
                    return "tag-bold"
                }
            }),
            currentType: computed('type', function () {
                let type = this.get('type');

                return "tag-" + type
            }),
            click() {
                let action = this.actions.emit;

                action.call(this, this, "click", "")
            },
            mouseEnter() {
                let action = this.actions.emit;

                action.call(this, this, "mouseEnter", "")
            },
            mouseLeave() {
                let action = this.actions.emit;

                action.call(this, this, "mouseLeave", "")
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
            mss.pushObject({ "source": this, "signal": "mouseEnter" })
            mts.pushObject({ "target": this, "slot": this.get("actions.slots.onMouseEnter") })
            mcs.pushObject({
               "source": this,
               "signal": "mouseEnter",
               "target": this,
               "slot": this.get("actions.slots.onMouseEnter")
           })
            mss.pushObject({ "source": this, "signal": "mouseLeave" })
            mts.pushObject({ "target": this, "slot": this.get("actions.slots.onMouseLeave") })
            mcs.pushObject({
               "source": this,
               "signal": "mouseLeave",
               "target": this,
               "slot": this.get("actions.slots.onMouseLeave")
           })
                this.set("mstc", [mss, mts, mcs])
            this.sendAction("ssc", mss, mts, mcs)
            },
                slots: {
                onClick(target,data) {
                window.console.log("BP-UI-Parse Click event => " + data)
            },onMouseEnter(target,data) {
                window.console.log("BP-UI-Parse MouseEnter event => " + data)
            },onMouseLeave(target,data) {
                window.console.log("BP-UI-Parse MouseLeave event => " + data)
            },
                }},});