import Component from '@ember/component';import layout from '../templates/components/bp-img';
import { computed } from '@ember/object';
             export default Component.extend({
                 layout,
                 tagName:'img',
                 classNames:['bp-img'],
                 content: 'default',
                 classNameBindings: [],
                 attributeBindings: ['src'],
                 
                 src: 'https://desk-fd.zol-img.com.cn/t_s960x600c5/g5/M00/01/0F/ChMkJlbKwvKILghAAAXdSSmnlysAALGvgEMwnEABd1h654.jpg',});