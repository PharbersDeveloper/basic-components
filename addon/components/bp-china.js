import Component from '@ember/component';import layout from '../templates/components/bp-china';
import { isEmpty, typeOf } from '@ember/utils';
        import { isArray,A } from '@ember/array';
        import echarts from 'echarts';
        import $ from 'jquery';
        import { inject as service } from '@ember/service';
        import { all } from 'rsvp';
        import EmberObject from '@ember/object';
        import { tooltips,otherConfCb } from "../utils/tooltips";
        import { copy } from '@ember/object/internals';
    
            export default Component.extend({
            eid: "china-demo-first001",
store: this.store,
confReqAdd: "http://192.168.100.25:5555",
currentProv: "全国",
onChangeProv: function() {},
startDate: "201801",
endDate: "201901",
prodName: "Viread",

            layout,
                ajax: service(),
                classNames:["bp-china"],
                xValues: A([]),
            init() {
            this._super(...arguments);
            this.set('result', {});
            this.set('opts', {
                renderer: 'canvas' // canvas of svg
            });
        },
        didUpdateAttrs() {
            this._super(...arguments);
            // date / prodName 改变时，将 currentProv 重置为全国。
            let echart = this.getChartIns()
            this.onEvents.click({ name: "全国" }, echart)
            const { dataConfig, dataCondition } = this;
            if (!isEmpty(dataCondition)) {
                this.generateChartOption(dataConfig, dataCondition);
            }
        },
        didInsertElement() {
            this._super(...arguments);

            const chartId = this.eid;
            this.set('chartId', chartId)
            let chartConfPromise = null
            if (isEmpty(this.store)) {
                chartConfPromise = this.get('ajax').request(this.confReqAdd, {
                    method: 'GET',
                    data: chartId
                })
            } else {
                chartConfPromise = this.store.findRecord("chart", chartId)
            }

            chartConfPromise.then(data => {
                const config = data.styleConfigs
                const condition = data.dataConfigs
                if (!isEmpty(data.id) && !isEmpty(condition)) {
                    // 处理提示框
                    let tooltipType = config.tooltip.formatter;

                    if (tooltipType in tooltips) {
                        config.tooltip.formatter = tooltips[tooltipType]
                    } else {
                        delete config.tooltip.formatter
                    }
                    this.setProperties({
                        dataConfig: config,
                        dataCondition: condition
                    });
                    this.generateChartOption(config, condition);
                }
            })
        },
            
        getChartIns() {
            const selector = '#' + this.get('eid'),
                $el = $(selector),
                echartInstance = echarts.getInstanceByDom($el[0]);

            return echartInstance;
        },
        generateChartOption(chartConfig, cond) {
            const ajax = this.ajax

            let { prodName, endDate, compName } = this;
            const queryConfig = cond.query
            const qa = queryConfig.address;
            let queryChartSql = "SELECT PROVINCE, AVG(CURR_MKT_SALES_IN_PROV)  " +
            "AS MKT_SALES, AVG(EI_MKT_PROV) AS EI FROM result WHERE MKT " +
            "IN (SELECT MKT FROM result WHERE COMPANY = '" + compName + "' AND " +
            "DATE = " + endDate + " AND PRODUCT_NAME = '" +
            prodName + "') AND COMPANY = '" + compName + "' AND DATE = " +
            endDate + " GROUP BY PROVINCE.keyword"
            const ec = cond.encode;

            ajax.request(qa + '?tag='+ec.tag+'&dimensionKeys=' + ec.dimension, {
                method: 'POST',
                data: JSON.stringify({ "sql": queryChartSql }),
                dataType: 'json'
            }).then(data => {
                const resultData = isArray(data) ? data : [["PROVINCE_NAME", "EI", "PROV_SALES_VALUE"]]
                let length = isArray(resultData[0]) ? resultData[0].length - 1 : 0
                let visualMapMaxArr = resultData.map(ele => typeof ele[length] === "number" ? ele[length] : 0)
                chartConfig.visualMap.max = Math.max.apply(null, visualMapMaxArr)

                this.updateChartData(chartConfig, resultData);
            })
        },
updateChartData(chartConfig, chartData) {
                    this.reGenerateChart(chartConfig, chartData);

                    this.dataReady(chartData, chartConfig);

                    const echartInit = this.getChartIns();

                    echartInit.hideLoading();
                },reGenerateChart(option, chartData) {
            const opts = this.get('opts'),
                echartInstance = this.getChartIns();

            let chartOption = null;

            if (isEmpty(option)) {
                echartInstance.setOption({}, opts);
                return;
            }

            echartInstance.clear();
            chartOption = this.optionWithData(option, chartData);
            echartInstance.setOption(chartOption, opts);
        },
        optionWithData(option, data) {
            option.dataset = { source: data };
            return option;
        },
        onChartReady(chart) {
            chart.currentProv = this.currentProv
            chart.onChangeProv = function(prov) {
                this.set("currentProv",prov)
                this.onChangeProv(prov)
            }.bind(this)
            chart.showLoading({
                text: '加载中...',
                color: '#FFAB00',
                textColor: '#fff',
                maskColor: 'rgba(9,30,66,0.54)',
                zlevel: 0
            });
        },
        dataReady(chartData, panelConfig) {
            this.onDataReady(chartData, panelConfig);
        },
        onDataReady() { },
        onEvents: EmberObject.create({
            click(param, echart) {
                let clickProv = param.name;
                let currentProv = clickProv
                if(clickProv === echart.currentProv) {
                    currentProv = "全国"
                }
                echart.currentProv = currentProv
                echart.onChangeProv(currentProv)
            }
        }),});