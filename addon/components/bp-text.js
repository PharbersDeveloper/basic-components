import Component from '@ember/component';
import layout from '../templates/components/bp-text';
export default Component.extend({
                layout,
                classNames:["bp-text"],
                tagName: "span",
                title: "",
                attributeBindings: ["title"],
                classNameBindings: [],});
