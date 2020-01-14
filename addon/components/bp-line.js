import Component from '@ember/component';import layout from '../templates/components/bp-line';
import { isEmpty, typeOf } from '@ember/utils';
        import { isArray,A } from '@ember/array';
        import echarts from 'echarts';
        import $ from 'jquery';
        import { inject as service } from '@ember/service';
        import { all } from 'rsvp';
        import EmberObject from '@ember/object';
            export default Component.extend({
            eid: "line-demo-first001",
confReqAdd: "http://192.168.100.25:5555",
provName: "全国",
cityName: "",
startDate: "201801",
endDate: "201901",
prodName: "Viread",

            layout,
                ajax: service(),
                classNames:["bp-line"],
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
            const {provName,cityName,prodName } = this
            this.chartData(cond, { provName, cityName, prodName }).then(data => {
                this.updateChartData(chartConfig, data);
            })
        },
updateChartData(chartConfig, chartData) {
            let linesPanelConfig = this.calculateLinesNumber(chartConfig, chartData);

            this.reGenerateChart(linesPanelConfig, chartData);

            this.dataReady(chartData, chartConfig);

            const echartInit = this.getChartIns();

            echartInit.hideLoading();
        },calculateLinesNumber(panelConfig, chartData) {
            let linesNumber = chartData.length - 1,
                lineConfig = isArray(panelConfig.series) ? panelConfig.series[0] : panelConfig.series,
                series = [...Array(linesNumber)].map(() => {
                    return lineConfig;
                });

            panelConfig.series = series;
            return panelConfig;
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
        onDataReady() { },});