import Component from '@ember/component';
export default Component.extend({
                layout,
                classNames:["bp-row-layout"],
                wrap: false,
mainAxis: "main-flex-start",
crossAxis: "cross-stretch",
alignContent: "wrap-flex-start",

                classNameBindings: ["wrap","mainAxis","crossAxis","alignContent",],});