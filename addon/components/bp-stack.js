import Component from '@ember/component';
import layout from '../templates/components/bp-stack';

import { isEmpty, typeOf } from '@ember/utils';
import { isArray, A } from '@ember/array';
import echarts from 'echarts';
import $ from 'jquery';
import { inject as service } from '@ember/service';
import { all } from 'rsvp';
import EmberObject from '@ember/object';
import { tooltips } from "../utils/tooltips";

export default Component.extend({
    eid: "stack-demo-first001",
    confReqAdd: "http://192.168.100.25:5555",
    provName: "广东",
    cityName: "广州市",
    startDate: "201801",
    endDate: "201901",
    prodName: "代文",

    layout,
    ajax: service(),
    classNames: ["bp-stack"],
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
            this.generateChartOption(dataConfig, dataCondition);
        }
    },
    didInsertElement() {
        this._super(...arguments);

        const chartId = this.eid;
        this.set('chartId', chartId)
        // this.get('ajax').request(this.confReqAdd + '/chartsConfig', {
        //     method: 'GET',
        //     data: chartId
        // })
        this.store.findRecord( "chart", chartId )

        .then(data => {
            const config = data.styleConfigs
            const condition = data.dataConfigs
            
            if (!isEmpty(data.id) && !isEmpty(condition)) {
                // ADD 处理提示框
                let tooltipType = config.tooltip.formatter;

                if(tooltipType in tooltips) {
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
        const { provName, cityName, prodName } = this
        this.chartData(cond, { provName, cityName, prodName }).then(data => {
            this.updateChartData(chartConfig, data);
        })
    },
    updateChartData(chartConfig, chartData) {
        let stackConfig = this.calcBarsNumber(chartConfig, chartData);

        this.reGenerateChart(stackConfig, chartData);

        this.dataReady(chartData, chartConfig);

        const echartInit = this.getChartIns();

        echartInit.hideLoading();
    }, calcBarsNumber(panelConfig, chartData) {
        let barsNumber = chartData.length - 1,
            stackConfig = isArray(panelConfig.series) ? panelConfig.series[0] : panelConfig.series,
            series = [...Array(barsNumber)].map(() => {
                return stackConfig;
            });

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
