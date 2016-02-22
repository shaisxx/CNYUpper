/**
 * 插件: 将货币数字转化为大写
 * 用法: upCalc(123.12)
 * value: 千万位内,精确到两位小数
 *
 * author: yeliex
 * website: yeliex.com
 * version: 1.0
 * lastUpdate: 2015年09月03日19:10:05
 *
 * based: jQuery
 *
 *
 * @param value
 * @returns {*}
 */
function upCalc(value) {
    // 先判断是否可执行计算
    if (value === 0) {
        return "零";
    }
    var numMap = "壹贰叁肆伍陆柒捌玖拾";
    var moneyMap = "元拾佰仟万拾佰仟";
    var pointMap = "分角";
    var numString = "";
    var numArr = String(value).split(".");
    numArr[2] = numArr[0].length;
    var numTmp, numLast, numCalc = numArr[0];
    // 开始计算
    for (var i = 1; i <= numArr[2]; i++) {
        numLast = numTmp;
        numTmp = Math.floor(numCalc / (Math.pow(10, numArr[2] - i)));
        numCalc = numCalc - numTmp * (Math.pow(10, numArr[2] - i));
        if (numTmp == 0) {
            if (i == numArr[2]) {
                numString += "元";
            }
            else if (i <= numArr[2] - 4 && numLast != 0 && numArr[2] >= 6) {
                numString += "万";
            }
            else {
                //
            }
        }
        else if (numTmp != 0 && numLast == 0 && i == numArr[2]) {
            numString = numString + "零" + numMap.substr(numTmp - 1, 1) + "元";
        }
        else {
            numString = numString + numMap.substr(numTmp - 1, 1) + moneyMap.substr(numArr[2] - i, 1);
        }
    }
    //计算小数点后面的内容
    numTmp = 1;
    for (i = 0; i < 2; i++) {
        numLast = numTmp;
        numTmp = numArr[1].substr(i, 1);
        if (numTmp === 0 && numLast === 0) {
            numString += "整"
        }
        else if (numTmp !== 0) {
            numString += numMap.substr(numTmp - 1, 1) + pointMap.substr(i - 1, 1);
        }
        else {
            //
        }
    }

    // 处理下小于1元的情况
    numString = numString.substr(1);

    return numString;
}