import { isEmpty } from "@ember/utils";

function numberFixed(number, fixed = 2) {
    return number.toFixed(fixed)
}
function numberThousand(number, fixed = 0) {
    if (isEmpty(number)) {
        return 0
    }
    let str = number.toFixed(fixed).toString(),
        reg = /(?=(\B\d{3})+$)/g;
    return str.replace(reg, ",");
}
function numberPercentage(number, fixed = 0) {
    if (isEmpty(number)) {
        return '';
    }
    let str = Number(number * 100).toFixed(fixed);

    if (Number(number) === 0) {
        return 0;
    }

    return `${str}%`;
}
function plus(...args) {
    return args.reduce((m, n) => m + n, 0)
}
export { numberFixed, numberThousand, numberPercentage, plus }