import Component from '@ember/component';
import layout from '../templates/components/bp-row-layout';
export default Component.extend({
                layout,
                classNames:["bp-row-layout"],
                wrap: false,
mainAxis: "main-flex-start",
crossAxis: "cross-stretch",
alignContent: "wrap-flex-start",

                classNameBindings: ["wrap","mainAxis","crossAxis","alignContent",],});
