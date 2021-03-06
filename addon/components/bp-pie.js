import Component from '@ember/component';import layout from '../templates/components/bp-pie';
import { isEmpty, typeOf } from '@ember/utils';
        import { isArray,A } from '@ember/array';
        import echarts from 'echarts';
        import $ from 'jquery';
        import { inject as service } from '@ember/service';
        import { all } from 'rsvp';
        import EmberObject from '@ember/object';
            export default Component.extend({
            eid: "pie-demo-first001",

            layout,
                ajax: service(),
                classNames:["bp-pie"],
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
        didInsertElement() {
            this._super(...arguments);

            const chartId = this.eid;
            this.set('chartId', chartId)
            this.get('ajax').request(this.confReqAdd+'/chartsConfig', {
                method: 'GET',
                data: chartId
            }).then(data => {
                if (!isEmpty(data.id) && !isEmpty(data.condition)) {
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
            const queryXSql = queryConfig.xSql;
            const queryDimensionSql = queryConfig.dimensionSql;
            const queryChartSql = queryConfig.chartSql;
            const ajax = this.ajax;
            const ec = cond.encode;
            let getXValues = null;
            let chartData = []


            getXValues = this.get('ajax').request(qa + '?tag=array', {
                method: 'POST',
                data: JSON.stringify({"sql":queryXSql}),
                dataType: 'json'
            })

            getXValues.then(data => {
                this.set("xValues", data)
                chartData.push(data)
                // query dimension
                return ajax.request(qa + '?tag=array', {
                    method: 'POST',
                    data: JSON.stringify({"sql":queryDimensionSql}),
                    dataType: 'json'
                }).then(data => {
                    return all(data.map(ele => {
                        let reqBody = {
                            "sql": queryChartSql.replace(ec.placeHolder, ele),
                            "x-values": this.xValues
                        }
                        return ajax.request(qa + '?tag=chart&x-axis='+ec.x+'&y-axis='+ec.y+'&dimensionKeys='+ec.dimension, {
                            method: 'POST',
                            data: JSON.stringify(reqBody),
                            dataType: 'json'
                        })
                    }))
                }).then(data => {
                    data.forEach(ele => {
                        chartData.push(ele[1])
                    })
                    chartData[0].unshift(ec.x)
                    this.updateChartData(chartConfig, chartData);
                })
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