import Component from '@ember/component';
import layout from '../templates/components/bp-pagination';
import {computed} from '@ember/object';
            export default Component.extend({
                layout,
                tagName:'div',
                classNames:["bp-pagination"],
                content: 'default',
                classNameBindings: ['block:btn-block', 'reverse', 'active', 'computedIconOnly:icon-only'],
                attributeBindings: [''],
                curPage: 1,
                pages: 12,
                pageArray: computed("pages", function() {
                    let p = this.get("pages")
                    return [...Array(p)].map((it, i) => i + 1)
                }),
                forEachArray: computed("pages", function() {
                    let p = this.get("pages")
                    return [...Array(p)].map((it, i) => i + 1)
                }),
                changePageArray() {
                    // 1  折叠符...位置的改变
                    if (this.pageArray.length > 7) {
                        let newArr = []
                        // 首页始终显示
                        newArr.push(this.pageArray[0])
                        // 与尾页距离大于5，... 在后方显示
                        // 与首页距离大于5，... 在前方显示
                        // 与首页尾页距离大于5，使用双 ...
                        if (this.curPage < 5) {
                            for(let i = 2; i <= 5; i++) {
                                newArr.push(i)
                             }
                           newArr.push('...')
                        } else if ((this.pageArray.length - this.curPage) < 4) {
                            newArr.push('...')
                            for(let i = this.pageArray.length - 4; i <= this.pageArray.length - 1; i++) {
                                newArr.push(i)
                            }
                        } else {
                            newArr.push('...')
                            newArr.push(this.curPage - 1)
                            newArr.push(this.curPage)
                            newArr.push(this.curPage + 1)
                            newArr.push('...')
                        }
                        // 尾页始终显示
                         newArr.push(this.pageArray[this.pageArray.length-1])
                         this.set('forEachArray', newArr)
                    }
                },
                didInsertElement() {
                    this._super(...arguments)
                    this.changePageArray()
                },
                actions: {
                    changePage(type, page) {
                        if (type === 'next') {
                            this.set('curPage', Math.min(this.curPage + 1, this.pageArray.length))
                            this.changePageArray()
                        } else if (type === 'pre') {
                            this.set('curPage',Math.max( this.curPage - 1, 1))
                            this.changePageArray()
                        } else {
                            let cur = Number(page)
                            if (!isNaN(cur)) {
                                this.set('curPage', Number(page))
                                this.changePageArray()
                            }
                        }
                        // curPage, 执行外部传进来的函数
                        let way = this.get("changePage")
                        way(this.get("curPage"))
                    },
                }});
