import { helper } from '@ember/component/helper';

export default helper(function belongTo(params/*, hash*/) {
  if (params.length < 2) {
    return false
  } 

  let arr = params[0],
    item = params[1],
    tempArr= [].concat(...arr) // 多维数组展开

  return tempArr.includes(item);
});
