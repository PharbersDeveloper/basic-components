import Component from '@ember/component';import layout from '../templates/components/bp-table';
import {computed} from '@ember/object';
            import { A } from '@ember/array';
            import { all } from 'rsvp';
            import { inject as service } from '@ember/service';
            import { isEmpty, typeOf } from '@ember/utils';

            export default Component.extend({
                layout,
                ajax: service(),
                classNames:["bp-table"],
                classNameBindings: ['border:border-table',"border",],
                attributeBindings: [''],
                tid: "bp-table-test",
confReqAdd: "http://192.168.100.59:5555",
border: "false",

                didUpdateAttrs() {
                    this._super(...arguments);
                    this.tableData.then(data => {
                        this.setProperties({
                            columns: data.columns,
                            rows: data.rows
                        })
                    })
                },
                didInsertElement() {
                    this._super(...arguments);
                    // this.getData()
                    this.tableData.then(data => {
                        this.setProperties({
                            columns: data.columns,
                            rows: data.rows
                        })
                    })
                    const that = this
                    const thisComp = document.getElementById(this.get('tid'))
                    const table = thisComp.getElementsByClassName('ember-table')[0]

                    table.onscroll = function () {
                        const ths = table.getElementsByTagName('th')
                        const length = ths.length
                        const leftWidth = ths[0].offsetWidth
                        const leftHeight = table.offsetHeight

                        const rightWidth = ths[length - 2].offsetWidth

                        that.set('leftWidth', leftWidth)
                        that.set('leftHeight', leftHeight)
                        that.set('rightWidth', rightWidth)
                        if ((ths[1].offsetLeft - ths[0].offsetLeft) >= leftWidth) {
                            that.set('tableLeftFixed', false)
                        } else {
                            that.set('tableLeftFixed', true)
                        }

                        if ((ths[length - 1].offsetLeft - ths[length - 2].offsetLeft) < rightWidth) {
                            that.set('tableRightFixed', true)
                        } else {
                            that.set('tableRightFixed', false)
                        }
                    }
                },
                generateTableOption(condition) {
                    const query = condition.query // query.xSql query.dimensionSql query.chartSql
                    const encode = condition.encode
                    const queryAddress = query.address
                    const ajax = this.ajax

                    let getXValues = this.get('ajax').request( queryAddress + '?tag=array', {
                        method: 'POST',
                        data: JSON.stringify({"sql":query.xSql}),
                        dataType: 'json'
                    })

                    getXValues.then(data => {
                        this.set("xValues", data)
                        let arrC = []
                        arrC.push({ name: "药品名", valuePath: "YM", width: 200,isFixed: 'left',  isSortable: false})
                        data.forEach(it => {
                            arrC.push({name:  it , valuePath: `${it}`, isSortable: true})
                        })

                        this.set("columns", arrC)

                        return ajax.request(queryAddress + '?tag=array', {
                            method: 'POST',
                            data: JSON.stringify({"sql": query.dimensionSql}),
                            dataType: 'json'
                        }).then(data => {
                            return all(data.map(ele => {
                                let reqBody = {
                                    "sql": query.chartSql.replace(encode.placeHolder, ele),
                                    "x-values": this.xValues
                                }
                                return ajax.request(queryAddress + '?tag=chart&x-axis='+encode.x+'&y-axis='+encode.y+'&dimensionKeys='+encode.dimension, {
                                    method: 'POST',
                                    data: JSON.stringify(reqBody),
                                    dataType: 'json'
                                })
                            }))
                        }).then(data => {
                            // let allData = []
                            let arrR = []
                            data.forEach(ele => {
                                let obj = {}
                                ele[0].forEach((it, index) => {
                                    if (!ele[1][index]) {
                                        obj[it] = 0
                                    } else {
                                        let isNum = ele[1][index]
                                        if (typeOf(isNum) === "number") {
                                            obj[it] = isNum.toFixed(6)
                                        } else {
                                            obj[it] = isNum
                                        }
                                    }

                                })
                                arrR.push(obj)
                            })
                            this.set('rows', arrR)
                        })
                    })
                },
                getData() {
                    if (!this.get('rows') && !this.get('columns')) {
                        const tableId = this.get('tid')
                        this.get('ajax').request(this.get("confReqAdd") + "/chartsConfig", {
                            method: 'GET',
                            data: tableId
                        }).then(data => {
                            if (!isEmpty(data.id) && !isEmpty(data.condition)) {
                                this.setProperties({
                                    dataCondition: data.condition
                                });
                                this.generateTableOption(data.condition);
                            }
                        })
                    }
                },
                actions: {
                    sortSowIcon(sorts) {
                        this.set('sorts', sorts)
                        this.columns.forEach(it => {
                            it.isAscending = false
                            it.isDesending = false

                            if (sorts.length >= 1) {
                                if (it.valuePath === sorts[0].valuePath) {
                                    it.isAscending = sorts[0].isAscending
                                    it.isDesending = !sorts[0].isAscending
                                }
                            }
                        })
                    }
                },});