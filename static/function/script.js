var Flipper = /** @class */ (function () {
    function Flipper(node, currentTime, nextTime) {
        this.isFlipping = false;
        this.duration = 400;
        this.flipNode = node;
        this.frontNode = node.querySelector(".front");
        this.backNode = node.querySelector(".back");
        this.setFrontTime(currentTime);
        this.setBackTime(nextTime);
    }
    Flipper.prototype.setFrontTime = function (time) {
        this.frontNode.dataset.number = time;
    };
    Flipper.prototype.setBackTime = function (time) {
        this.backNode.dataset.number = time;
    };
    Flipper.prototype.flipDown = function (currentTime, nextTime) {
        var _this = this;
        if (this.isFlipping) {
            return false;
        }
        this.isFlipping = true;
        this.setFrontTime(currentTime);
        this.setBackTime(nextTime);
        this.flipNode.classList.add("running");
        setTimeout(function () {
            _this.flipNode.classList.remove("running");
            _this.isFlipping = false;
            _this.setFrontTime(nextTime);
        }, this.duration);
    };
    return Flipper;
}());

var getTimeFromDate = function (date) {
    return date
        .toTimeString()
        .slice(0, 8)
        .split(":")
        .join("");
};

var flips = document.querySelectorAll(".flip");
var now = new Date();
var nowTimeStr = getTimeFromDate(new Date(now.getTime() - 1000));
var nextTimeStr = getTimeFromDate(now);
var flippers = Array.from(flips).map(function (flip, i) { return new Flipper(flip, nowTimeStr[i], nextTimeStr[i]); });
let monthNames = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"];
let dayNames = ["日", "一", "二", "三", "四", "五", "六"]

setInterval(function () {
    var now = new Date();
    var nowTimeStr = getTimeFromDate(new Date(now.getTime() - 1000));
    var nextTimeStr = getTimeFromDate(now);
    for (var i = 0; i < flippers.length; i++) {
        if (nowTimeStr[i] === nextTimeStr[i]) {
            continue;
        }
        flippers[i].flipDown(nowTimeStr[i], nextTimeStr[i]);
    }
    document.querySelectorAll('.date')[0].innerHTML = (
        changeNumToHanWithoutIndex(now.getFullYear()) + '年 ' + monthNames[now.getMonth()] + '月 ' + changeNumToHan(now.getDate()) + '日 周' + dayNames[now.getDay()]);
}, 1000);

// setInterval(() => {
// }, 1000);

function changeNumToHan(num) {
    let chars = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九']
    let index = ['', '十', '百', '千', '万', '十', '百', '千', '亿', '十', '百', '千', '万', '十', '百', '千', '亿']
    if (!num || isNaN(num)) return ''
    let english = num.toString().split('')
    let result = ''
    for (let i = 0; i < english.length; i++) {
        let des_i = english.length - 1 - i// 倒序排列设值
        result = index[i] + result
        let arr1_index = english[des_i]
        result = chars[arr1_index] + result
    }
    return result
}

function changeNumToHanWithoutIndex(num) {
    let chars = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
    let index = ['', '十', '百', '千', '万', '十', '百', '千', '亿', '十', '百', '千', '万', '十', '百', '千', '亿']
    if (!num || isNaN(num)) return ''
    let english = num.toString().split('')
    let result = ''
    for (let i = 0; i < english.length; i++) {
        let des_i = english.length - 1 - i// 倒序排列设值
        // result = index[i] + result
        let arr1_index = english[des_i]
        result = chars[arr1_index] + result
    }
    return result
}
