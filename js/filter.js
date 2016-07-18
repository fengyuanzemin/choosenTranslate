// 移除一些不必要的元素
$('.js-navigation-header').remove();
$('body > header').css('display', 'none');
$('footer').css('display', 'none');
$('aside').css('display', 'none');
$('section').css('display', 'none');
$("iframe").css('display', 'none');
$('popover').css('display', 'none');
// $('noscript,script').remove();

// 以body元素开始
var element = document.querySelector('body');
var list = [];
var temp = [];
var filter = /ad-|footer|sub|message/;
var filter_head = /head/;

getClassName(element);

function getClassName(ele) {
    var i, j;

    if (ele.children.length > 0) {
        // console.log(ele.classList);
        for (j = 0; j < ele.classList.length; j++) {
            if (filter.test(ele.classList[j]) && !filter_head.test(ele.classList[j])) {
                list.push(ele.classList[j]);
            }
        }
        //     if (ele.className && filter.test(ele.className) && !filter_head.test(ele.className)) {
        //         list.push(ele.classList[0]);
        //     } else {
        //         for (i = 0; i < ele.children.length; i++) {
        //             getClassName(ele.children[i]);
        //         }
        //     }
        // } else if (ele.children.length === 0) {
        //     if (ele.className && filter.test(ele.className) && !filter_head.test(ele.className)) {
        //         list.push(ele.classList[0]);
        //     }
    }
}
// list里面有所有的class名
console.log(list);
for (var j in list) {
    console.log(list[j]);
    $('.' + list[j]).css('display', 'none');
}
