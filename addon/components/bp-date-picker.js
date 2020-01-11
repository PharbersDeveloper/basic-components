import Component from '@ember/component';
import layout from '../templates/components/bp-date-picker';
import { computed } from '@ember/object';
import {isEmpty} from "@ember/utils"
            export default Component.extend({
                layout,
                tagName:'div',
                classNames:['positon-relative', 'width-fit-content'],
                content: 'default',
                classNameBindings: [],
                attributeBindings: [],
                date: computed("endDate",function() {
                    let endDate = this.endDate.toString();
                    if(isEmpty(endDate)) {
                        return ""
                    }
                    let year = endDate.slice(0,4)
                    let month = endDate.slice(4)
                    return year + "-" + month
                }),
                endDate: "",
                
                style: 'default',size: 'small',
                range: true,type: 'date',pid: 'date-picker',min: '1990-1-1',max: '2100-12-31',
                currentStyle: computed("style", function() {
                    let style = this.get('style')
                    if (style) {
                        return "date-picker-" + style
                    } else {
                        return 'date-picker-default'
                    }
                }),
                currentWidth: computed("size", function() {
                    let size = this.get('size')
                    if (size) {
                        return "date-picker-width-" + size
                    } else {
                        return 'date-picker-width-default'
                    }
                }),
                confirmAction(){
                },
                didInsertElement() {
                    let that = this
                    laydate.render({
                        elem: "#" + this.get('pid'), //指定元素
                        range: this.get('range'),
                        type: this.get('type'),
                        min: this.get("min"),
                        max: this.get("max"),
                        value: this.get("date"),
                        theme: "gray",
                        btns: ['confirm'],
                        done: function(value) {
                            
                            that.confirmAction(value)
                        }
                    });
                },
                actions: {}});
