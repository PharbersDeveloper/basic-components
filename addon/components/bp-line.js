import Component from '@ember/component';
import layout from '../templates/components/bp-line';

import { isEmpty, typeOf } from '@ember/utils';
import { isArray, A } from '@ember/array';
import echarts from 'echarts';
import $ from 'jquery';
import { inject as service } from '@ember/service';
import { all } from 'rsvp';
import EmberObject from '@ember/object';
import { tooltips, otherConfCb } from "../utils/tooltips";
import { copy } from '@ember/object/internals';

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
    classNames: ["bp-line"],
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
        const { dataConfig, dataCondition } = this;

        if (!isEmpty(dataCondition)) {
            const newConfig = copy(dataConfig, true)

            this.generateChartOption(newConfig, dataCondition);
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
                const newConfig = copy(config, true)

                this.generateChartOption(newConfig, condition);
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
        const { provName, cityName, prodName } = this
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
    },
    calculateLinesNumber(panelConfig, chartData) {
        // console.log(this.dataConfig)
        let linesNumber = chartData.length - 1,
            dc = this.dataConfig,
            lineConfig = isArray(dc.series) ? dc.series[0] : dc.series,
            lineColor = lineConfig.itemStyle ? lineConfig.itemStyle.color : "",
            series = [];

        // 线条颜色
        if (lineColor in otherConfCb) {
            series = [...Array(linesNumber)].map((item, index) => {
                let newConfig = copy(lineConfig, true)
                if (index === 0) {
                    newConfig.itemStyle.color = otherConfCb[lineColor]

                    newConfig.lineStyle.color = "#C3DD41"
                    return newConfig
                }
                newConfig.itemStyle.color = otherConfCb[lineColor]

                newConfig.lineStyle.color = "#5CA6EF"

                return newConfig;
            });
        } else {
            series = [...Array(linesNumber)].map(() => {
                return lineConfig;
            });
        }

        panelConfig.series = series;
        return panelConfig;
    }, reGenerateChart(option, chartData) {
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
    onDataReady() { },
});
