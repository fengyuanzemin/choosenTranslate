// 移除一些不必要的元素
$('body > header').css('display', 'none');
// 以body元素开始
var element = document.querySelector('body');
var list = [];
var temp = [];
var filter = /ad-|footer|sub|message|meta|twitter|labels/;
var filter_head = /head/;


// 只能用定时器把这两个元素去掉了
var a = setInterval(function() {
    if ($('.content__secondary-column') !== null) {
        $('.content__secondary-column').remove();
        clearInterval(a);
    }
}, 50);

setInterval(function() {
    if ($('.element-rich-link') !== null) {
        $('.element-rich-link').remove();
    }
}, 500);

getClassName(element);

function getClassName(ele) {
    var i, j, count = 0;
    // 有子元素
    if (ele.children.length > 0) {
        for (i = 0; i < ele.classList.length; i++) {
            if (filter.test(ele.classList[i]) && !filter_head.test(ele.classList[i])) {
                list.push(ele.classList[i]);
                count++;
                break;
            }
        }
        // 未找到符合条件的class，进入子元素找
        if (count === 0) {
            for (i = 0; i < ele.children.length; i++) {
                getClassName(ele.children[i]);
            }
        }
    } else if (ele.children.length === 0) {
        for (i = 0; i < ele.classList.length; i++) {
            if (filter.test(ele.classList[i]) && !filter_head.test(ele.classList[i])) {
                list.push(ele.classList[i]);
                break;
            }
        }
    }
}
// list里面有所有的class名
for (var j in list) {
    $('.' + list[j]).css('display', 'none');
}
