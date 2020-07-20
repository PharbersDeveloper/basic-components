import Component from '@ember/component';
import layout from '../templates/components/bp-cascader';
        import { computed } from '@ember/object';
        export default Component.extend({
            layout,
            show: false,
            subShow: false,
            selectIcon: "down",
            choosedValue: 0,
            curItemIndex: 0, // 一级的item
            tabIndex: '1',
            attributeBindings: ['tabIndex'],
            positionalParams: ["selectItems", "subSelectItems","data", "subData"],
            focusOut() {
                this.set('show',false)
                this.set('subShow',false)
            },
            
            
            actions: {
                toggleShow() {
                    if(!this.disabled) {
                        this.toggleProperty('show')
                        this.toggleProperty('subShow')
                        let subDataArr = this.get("subData")
                        this.set("curSubArea", subDataArr[0])
                    }
                },
                showSub(index) {
                    this.set("subShow", true)

                    let subDataArr = this.get("subData")
                    this.set("curSubArea", subDataArr[index])
                    this.set("curItemIndex", index)

                    console.log(11)
                    return false
                },
                addSubItem(item) {
                    let curItemIndex = this.get("curItemIndex"),
                    subSelectItemArr = this.get("subSelectItems"),
                    selectItemArr = this.get("selectItems"), // 被选中的一级item
                    curItem = this.get("data")[curItemIndex], // 二级 item 所属的一级item
                    curSubItem = item // 二级 item

                    // 二级item已存在，删除；不存在，则增加
                    if(subSelectItemArr[curItemIndex].includes(curSubItem)){
                        let i = subSelectItemArr[curItemIndex].indexOf(curSubItem)

                        subSelectItemArr[curItemIndex].splice(i, 1)
                    } else {
                        subSelectItemArr[curItemIndex].push(curSubItem)
                    }
                    this.set("subSelectItems", [...new Set(subSelectItemArr)])

                    // 所属一级item下，已有 len 个二级item
                    let len = subSelectItemArr[curItemIndex].length

                    // 所有二级item均被选中，则一级item也被选中
                    if ( len === this.get("subData")[curItemIndex].length ) {
                        selectItemArr.push(this.get("data")[curItemIndex])
                    } else {
                        // 二级item没有被全部选中，删除一级item
                        if ( selectItemArr.includes( curItem ) ) {
                            let selectItemArr = this.get("selectItems"),
                            i = this.get("selectItems").indexOf(curItem)

                            selectItemArr.splice(i, 1)
                        }
                    }
                    this.set("selectItems", [...new Set(selectItemArr)])
                    return false
                },
                addItem(item, index) {
                    let subDataArr = this.get("subData"),
                        selectItemArr = this.get("selectItems"),
                        subSelectItemArr = this.get("subSelectItems"),
                        curItemIndex = index

                    this.set("curSubArea", subDataArr[index])
                    this.set("curItemIndex", index)
                    if ( selectItemArr.includes( item ) ) {
                        let i = selectItemArr.indexOf(item),
                            arr = subSelectItemArr[curItemIndex]

                        selectItemArr.splice( i, 1 )
                        arr.splice( 0, arr.length )
                    } else {
                        let subDataRaw = subDataArr[curItemIndex]

                        selectItemArr.push(item)
                        for( let i = 0; i < subDataRaw.length; i++ ) {
                            subSelectItemArr[curItemIndex].push(subDataRaw[i])
                        }
                    }
                    this.set("subSelectItems", [...new Set(subSelectItemArr)])
                    this.set("selectItems", [...new Set(selectItemArr)])
                    return false
                }
            }});
