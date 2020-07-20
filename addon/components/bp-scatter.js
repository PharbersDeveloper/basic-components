import Component from '@ember/component';import layout from '../templates/components/bp-scatter';
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
            eid: "scatter-demo-first001",
store: this.store,
confReqAdd: "http://192.168.100.25:5555",
currentProv: "全国",
currentCity: "",
onChangeCity: function() {},
startDate: "201801",
endDate: "201901",
prodName: "Viread",

            layout,
                ajax: service(),
                classNames:["bp-scatter"],
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
            const queryConfig = cond.query
            const qa = queryConfig.address;
            const { endDate, prodName, currentProv, compName, ajax } = this;

            const queryChartSql = "SELECT CITY_NAME, AVG(CURR_MKT_SALES_IN_CITY) " +
            "AS CITY_SALES, AVG(MOM_RATE_ON_MKT_CITY) AS CITY_MOM, "+
            "AVG(MOM_RATE_ON_MKT_PROV) AS PROV_MOM FROM result "+
            "WHERE MKT IN (SELECT MKT FROM result WHERE COMPANY = '"+compName +
            "' AND DATE = "+endDate +" AND PRODUCT_NAME = '"+prodName +
            "') AND COMPANY = '"+compName+"' AND  DATE = "+
            endDate +" AND PROVINCE = '"+currentProv+"' GROUP BY CITY.keyword";

            const ec = cond.encode;

            ajax.request(qa + '?tag=row2line&dimensionKeys=' + ec.dimension, {
                method: 'POST',
                data: JSON.stringify({ "sql": queryChartSql }),
                dataType: 'json'
            }).then(data => {
                let preData = [
                    ["CITY_NAME", "MKT_MOM", "CITY_MOM", "CITY_SALES_VALUE"]];
                // TODO 数据为空时的配置
                let noDataConfig = {
                    text: '暂无数据',
                    effect: 'bubble',
                    effectOption: {
                        effect: {
                            n: 0 //气泡个数为0
                        }
                    }
                }
                let result = isEmpty(data) ? preData : data
                let config = isEmpty(data) ? noDataConfig : chartConfig
                this.updateChartData(chartConfig, result);
            })
        },
updateChartData(chartConfig, chartData) {
            /**  示例数据
            let mock = [
                ["省份", "marketGrowth", "prodGrowth", "sales"],
                ["山东", 28.604, 7.7, 1111706869],
                ["浙江", 31.163, 77.4, 27662440],
                ["北京", -15.16, -68, 1154605773],
                ["台湾", 13.670, 74.7, 10582082],
            ]
            */
            /** 修改数据顺序需要修改
                - visualMap.dimension
                - series.encode.x
                - series.encode.y
                - optionWithData 函数体内的 circleRangeArr
                this.reGenerateChart(chartConfig, mock);
            */
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
            let xAxisColor = option.xAxis.axisLabel.color;
            let yAxisColor = option.yAxis.axisLabel.color;
            if(xAxisColor.length !== 7) {
                option.xAxis.axisLabel.color = new Function('value',"return value === '0'?'#7A869A':'transparent';")
            }
            if(yAxisColor.length !== 7) {
                option.yAxis.axisLabel.color = new Function('value',"return value === '0'?'#7A869A':'transparent';")
            }
            let circleRangeArr = data.map( ele => isNaN(ele[3])?0:ele[3]);
            if(option.visualMap) {
                option.visualMap.max = Math.max.apply(null,circleRangeArr)
            }
            return option;
        },
        onChartReady(chart) {
            chart.currentCity = this.currentCity
            chart.onChangeCity = function(city) {
                this.set("currentCity",city)
                this.onChangeCity(city)
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
                let clickCity = param.data[0];

                echart.currentCity = clickCity
                echart.onChangeCity(clickCity)
            }
        }),});