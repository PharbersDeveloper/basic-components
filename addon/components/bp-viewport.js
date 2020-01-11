import Component from '@ember/component';import layout from '../templates/components/bp-viewport';
import { computed } from '@ember/object';
            export default Component.extend({
                layout,
                classNames:['bp-viewport','viewport-class'],
                content: 'default',
                attributeBindings: ['style', 'vid:id'],
                height: "120px",
width: "calc(100% - 48px)",
clickChange: true,
vid: "bp-viewport-test",
step: 200,
row: true,

                classNameBindings: ["row",],
                style: computed('width', 'height', function() {
                    return 'height:' + this.get('height') + ';width:' + this.get('width') + ';'
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
                },
                    stepAction(dire) {
                        let curDom = document.getElementById(this.get('vid'))
                        let curSroll = curDom.getElementsByClassName("viewport-auto-wrapper")[0]
                        let curDistance = curSroll.scrollLeft
                        let step = this.get('step')
                        if(dire ==="right") {
                            curSroll.scrollLeft = step + curDistance
                        } else if (dire === "left") {
                            curSroll.scrollLeft = curDistance - step
                        }
                    }
                }});