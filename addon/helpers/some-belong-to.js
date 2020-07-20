import { helper } from '@ember/component/helper';

export default helper(function someBelongTo(params/*, hash*/) {
  let data = params[0],
    selected = params[1],
    index = params[2]

    if (selected[index].length > 0 && selected[index].length < data[index].length){
      return true
    }


});
