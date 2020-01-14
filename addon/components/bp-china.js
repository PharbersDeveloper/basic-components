import Component from '@ember/component';import layout from '../templates/components/bp-china';
import { isEmpty, typeOf } from '@ember/utils';
        import { isArray,A } from '@ember/array';
        import echarts from 'echarts';
        import $ from 'jquery';
        import { inject as service } from '@ember/service';
        import { all } from 'rsvp';
        import EmberObject from '@ember/object';
            export default Component.extend({
            eid: "china-demo-first001",
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
        didReceiveAttrs() {
            this._super(...arguments);
        },
        didUpdateAttrs() {
            this._super(...arguments);
            const {dataConfig,dataCondition} = this;

            this.generateChartOption(dataConfig, dataCondition);
        },
        didInsertElement() {
            this._super(...arguments);

            const chartId = this.eid;
            this.set('chartId', chartId)
            this.get('ajax').request(this.confReqAdd+'/chartsConfig', {
                method: 'GET',
                data: chartId
            }).then(data => {
                if (!isEmpty(data.id) && !isEmpty(data.condition)) {
                    this.setProperties({
                        dataConfig: data.config,
                        dataCondition: data.condition
                      });
                    this.generateChartOption(data.config, data.condition);
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
            const queryConfig = cond.query
            const qa = queryConfig.address;
            const queryChartSql = queryConfig.chartSql;
            const ajax = this.ajax;
            const ec = cond.encode;

            chartConfig.tooltip.formatter = function (data) {
                if (data.name === "") {
                    return "此省份暂无数据";
                }
                return data.name + " : " + data.value
            }
            ajax.request(qa + '?tag=row2line&dimensionKeys=' + ec.dimension, {
                method: 'POST',
                data: JSON.stringify({ "sql": queryChartSql }),
                dataType: 'json'
            }).then(data => {
                let length = data[0].length -1
                let visualMapMaxArr = data.map(ele=>typeof ele[length]==="number"?ele[length]:0)
                chartConfig.visualMap.max = Math.max.apply(null,visualMapMaxArr)

                this.updateChartData(chartConfig, data);
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