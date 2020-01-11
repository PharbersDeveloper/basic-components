import Component from '@ember/component';
import layout from '../templates/components/bp-table';
import { computed } from '@ember/object';
import { A } from '@ember/array';
import { all } from 'rsvp';
import { inject as service } from '@ember/service';
import { isEmpty, typeOf } from '@ember/utils';

export default Component.extend({
    layout,
    ajax: service(),
    classNames: ["bp-table"],
    content: 'default',
    classNameBindings: ['border:border-table', "border",],
    attributeBindings: [''],
    tid: "bp-table-test",
    confReqAdd: "http://192.168.100.59:5555",
    undefined: "undefined",
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
    },
});
