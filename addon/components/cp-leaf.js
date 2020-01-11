import Component from '@ember/component';
        import { A } from '@ember/array';

        export default Component.extend({
            didInsertElement() {
                this.set("mstc", [A([]), A([]), A([])])

                this.sendAction("ssc", A([]), A([]), A([]))
              },
              willDestroyElement() {
                this.sendAction("disconnect", ...this.mstc)
                // this._super( ...arguments )
              }});