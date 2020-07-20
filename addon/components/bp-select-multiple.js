import Component from '@ember/component';
import layout from '../templates/components/bp-select-multiple';
        import { computed } from '@ember/object';
        export default Component.extend({
            layout,
            show: false,
            width: 320,
            classNames:['bp-input-downdrop'],
            attributeBindings: ['tabIndex'],
            dataArray: ["option 1", "option 2", "option 3", "option 4", "option 5", "option 6", "option 7", "option 8"],
            showDataList: true,
            selectArr: [],
            tabIndex: '1',
            flagFirst: 0,
            inputId: "input-id",
            focusOut() {
            },
            focusIn() {
            },
            keyDown(event) {
                if (event.keyCode === 13) {
                  let input = this.get("inputValue"),
                    curArr = this.get("selectArr")
                    curArr.push(input)
                    this.set("show", false)
                    this.$("#" + this.get("inputId")).blur();

                    this.set("inputValue", "")
                  this.set("selectArr", [...new Set(curArr)])

                }
              },
            
            
            actions: {
                close() {
                    this.set("show",false)
                    setTimeout(function() {
                      this.set("flagFirst", false)
                    }.bind(this),100)
                  },
                  show() {
                    this.set("show",true)
                  },
                  toggleShow() {
                    this.toggleProperty("flagFirst")
                    if (this.get("flagFirst")) {
                      this.$("#" + this.get("inputId")).focus();
                    } else {
                      this.$("#" + this.get("inputId")).blur();
                    }
                  },
                chooseItem(index) {
                    this.$("#" + this.get("inputId")).blur();
                    let arr = this.get("dataArray"),
                    curArr = this.get("selectArr")
                    curArr.push(arr[index])

                    this.set("show", false)
                    this.set("selectArr", [...new Set(curArr)])
                    // [...new Ser()] 的写法会让模版进行更新，curArr 不会
                    // 原因？
                    return false
                },
                deleteTag(item) {
                    let curArr = this.get("selectArr")
                    for(let i = 0; i < curArr.length; i++) {
                    if (curArr[i] === item) {
                        curArr.splice(i, 1)
                        i = i - 1
                    }
                    }
                    this.set("selectArr", [...new Set(curArr)])
                    this.set("show", false)

                    return false
                }
            }});
