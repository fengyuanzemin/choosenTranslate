// 扇贝查词
const shanbayOpen = localStorage.getItem('shanbay') ? localStorage.getItem('shanbay') : true;
const shanbay = $('.shanbay');
if (shanbayOpen === 'false') {
    shanbay.addClass('closed');
    shanbay.text('开启屏幕查词');
} else if (shanbayOpen === 'true') {
    shanbay.removeClass('closed');
    shanbay.text('关闭屏幕查词');
}
shanbay.click(function (e) {
    if (shanbay.hasClass('closed')) {
        shanbay.removeClass('closed');
        shanbay.text('关闭屏幕查词');
        chrome.runtime.sendMessage({method: "openShanbay"});
    } else {
        shanbay.addClass('closed');
        shanbay.text('开启屏幕查词');
        chrome.runtime.sendMessage({method: "closeShanbay"});
    }
    e.stopPropagation();
});
