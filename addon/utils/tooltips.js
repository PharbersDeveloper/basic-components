import { numberThousand, numberFixed, numberPercentage, plus } from "./numberFormatter"
const tooltips = {
    default() {
        return "default"
    },
    chinaTooltip(params) {
        if (!params.name) {
            return `<p style="margin:0;padding:0">此省份暂无数据</p>`
        }
        return `
            <p style="margin:0;">${params.name} 市场概况</p>
            <p style="margin:8px 0;padding-right: 8px">
            <span style="display:inline-block;width:64px">市场规模</span>
            <span style="flex: 1">¥${numberThousand(params.data[2])}</span>
            </p>
            <p style="margin:0;padding-right: 8px">
            <span style="display:inline-block;width:64px">EI</span>
            <span style="flex: 1">${numberFixed(params.value)}</span></p>
        `
    },
    scatterTooltip(param) {
        const data = param.data;
        return `
        <p style="margin:0;">${data[0]}</p>
        <p style="margin:8px 0;padding-right: 8px;">
            <span style="display:inline-block;width:120px;">${param.marker} 产品销量</span>
            <span style="width:auto;">¥${numberThousand(data[3])}</span>
        </p>
        <p style="margin:8px 0;padding-right: 8px">
            <span style="display:inline-block;width:120px;">${param.marker} 产品销量增长率</span>
            <span style="width:auto;">${numberPercentage(data[2])}</span>
        </p>
        <p style="margin:0;padding-right: 8px">
            <span style="display:inline-block;width:120px;">${param.marker} 市场增长率</span>
            <span style="width:auto;">${numberPercentage(data[1])}</span>
        </p>
    `
    },
    stackTooltip(params) {
        let data = params[0].data
        let title = params[0].name.toString()
        return `
        <p style="margin:0;">${title.slice(0, 4)}-${title.slice(4)}</p>
        <div style="display:flex">
            <div style="flex:1">
            <p style="margin:8px 0;padding-right: 8px;">
            <span style="display:inline-block;width:auto;padding-left: 18px;"> 总体市场规模</span>
        </p>
            ${
            params.map((ele) => {
                return `<p style="margin:8px 0;padding-right: 8px">
                    <span style="display:inline-block;width:auto;">${ele.marker} ${ele.seriesName}销售额</span>
                </p>`
            }).join(" ")
            }
            </div>
            <div style="flex: 1">
            <p style="margin:8px 0;padding-right: 8px;">
            <span style="width:auto;">¥${numberThousand(plus(...data.slice(1)))}</span>
        </p>
        ${
            params.map((ele, index) => {
                return `<p style="margin:8px 0;padding-right: 8px">
                <span style="width:auto;">¥${numberThousand(ele.data[index + 1])}</span>
            </p>`
            }).join(" ")
            }
            </div>
        </div>
    `
    },
    lineTooltip0(params) {
        let data = params[0].data
        let title = params[0].name.toString()
        return `
        <p style="margin:0;">${title.slice(0, 4)}-${title.slice(4)}</p>
        <div style="display:flex">
            <div style="flex:1">
            
            ${
            params.map((ele) => {
                return `<p style="margin:8px 0;padding-right: 8px">
                    <span style="display:inline-block;width:auto;">${ele.marker} ${ele.seriesName}增长率</span>
                </p>`
            }).join(" ")
            }
            </div>
            <div style="flex: 1">
            
        ${
            params.map((ele, index) => {
                return `<p style="margin:8px 0;padding-right: 8px">
                <span style="width:auto;">${ele.data[index + 1]}%</span>
            </p>`
            }).join(" ")
            }
            </div>
        </div>
    `
    },
    stackTooltip2(params) {
        let data = params[0].data
        let title = params[0].name.toString()
        return `
        <p style="margin:0;">${title.slice(0, 4)}-${title.slice(4)}</p>
        <div style="display:flex">
            <div style="flex:1">
            <p style="margin:8px 0;padding-right: 8px;">
            <span style="display:inline-block;width:auto;padding-left: 18px;"> 总和</span>
        </p>
            ${
            params.map((ele) => {
                return `<p style="margin:8px 0;padding-right: 8px">
                    <span style="display:inline-block;width:auto;">${ele.marker} ${ele.seriesName}</span>
                </p>`
            }).join(" ")
            }
            </div>
            <div style="flex: 1">
            <p style="margin:8px 0;padding-right: 8px;">
            <span style="width:auto;">${numberPercentage(plus(...data.slice(1)), 2)}</span>
        </p>
        ${
            params.map((ele, index) => {
                return `<p style="margin:8px 0;padding-right: 8px">
                <span style="width:auto;">${numberPercentage(ele.data[index + 1], 2)}</span>
            </p>`
            }).join(" ")
            }
            </div>
        </div>
    `
    },
    lineTooltip2(params) {
        let title = params[0].name.toString()
        let halfLen = Math.ceil((params.length - 1) / 2) + 1
        let curProdData = params[0]
        return `
        <p style="margin:0;">${title.slice(0, 4)}-${title.slice(4)}</p>
        <div style="display:flex">
        <div style="flex:1">
                <p style="margin:8px 0;padding-right: 8px">
                    <span style="display:inline-block;width:auto;">${curProdData.marker} ${curProdData.seriesName}</span>
                </p>
        </div>
        <div style="flex: 1">
            <p style="margin:8px 0;padding-right: 8px">
                <span style="width:auto;">${curProdData.data[1]}%</span>
            </p>
        </div>
    </div>
        <div style="display:flex">
            <div style="flex:1">
                <div style="display:flex">
                    <div style="flex:1">
                    ${
            params.slice(1, halfLen).map((ele) => {
                return `<p style="margin:8px 0;padding-right: 8px">
                                <span style="display:inline-block;width:auto;">${ele.marker} ${ele.seriesName}</span>
                            </p>`
            }).join(" ")
            }
                    </div>
                    <div style="flex: 1">
                    ${
            params.slice(1, halfLen).map((ele, index) => {
                return `<p style="margin:8px 0;padding-right: 8px">
                            <span style="width:auto;">${ele.data[index + 1]}%</span>
                        </p>`
            }).join(" ")
            }
                    </div>
                </div>
            </div>
            <div style="flex: 1">
                <div style="display:flex">
                <div style="flex:1">
                ${
            params.slice(halfLen).map((ele) => {
                return `<p style="margin:8px 0;padding-right: 8px">
                            <span style="display:inline-block;width:auto;">${ele.marker} ${ele.seriesName}</span>
                        </p>`
            }).join(" ")
            }
                </div>
                <div style="flex: 1">
                ${
            params.slice(halfLen).map((ele, index) => {
                return `<p style="margin:8px 0;padding-right: 8px">
                        <span style="width:auto;">${ele.data[index + 1]}%</span>
                    </p>`
            }).join(" ")
            }
                </div>
            </div>
            </div>
        </div>
    `
    }
}
const otherConfCb = {
    lineColorCallback: function (param) {
        if (param.seriesIndex === 0) {
            return "#C3DD41"
        }
        return "#5CA6EF"
    }
}
export { tooltips, otherConfCb }