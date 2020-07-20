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
                sidebarIconStyleRight: computed('sidebarIconStyle', function(){
                    if (this.get('sidebarIconStyle')) {
                        return this.get('sidebarIconStyle') + '-right'
                    }
                }),
                sidebarIconStyleLeft: computed('sidebarIconStyle', function(){
                    if (this.get('sidebarIconStyle')) {
                        return this.get('sidebarIconStyle') + '-left'
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
                },
                    stepAction(dire) {
                        let curVireport = document.getElementById(this.get('vid'))
                        let curDom = curVireport.getElementsByClassName("transform-list")[0]
                        let step = Number(this.get('step')),
                        curStep = 0,
                        dis = 0

                        if ( curDom.style.transform ) {
                            let curStepString = curDom.style.transform ? curDom.style.transform : "",
                                match = curStepString.match(/translateX((.*)px)/)

                            curStep = Number(match && match[1])
                        }

                        if(dire === "right") {
                            dis = curStep + step
                        } else if (dire === "left") {
                            dis = curStep - step
                        }
                        curDom.style.transform = "translateX(" + dis + "px)"
                    }
                }});