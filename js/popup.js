// 过滤信息
var filterOpen = localStorage.getItem('filter') ? localStorage.getItem('filter') : false;
if (filterOpen == 'false') {
    $('.filter').addClass('closed');
    $('.filter').text('开启拦截元素');
} else if (filterOpen == 'true') {
    $('.filter').removeClass('closed');
    $('.filter').text('关闭拦截元素');
}
$('.filter').click(function() {
    if ($('.filter').hasClass('closed')) {
        $('.filter').removeClass('closed');
        $('.filter').text('关闭拦截元素');
        chrome.runtime.sendMessage({ method: "openFilter" });
    } else {
        $('.filter').addClass('closed');
        $('.filter').text('开启拦截元素');
        chrome.runtime.sendMessage({ method: "closeFilter" });
    }
});

// 开启分页
var paginationOpen = localStorage.getItem('pagination') ? localStorage.getItem('pagination') : false;

if (paginationOpen == 'false') {
    $('.pagination').addClass('closed');
    $('.pagination').text('开启分页');
} else if (paginationOpen == 'true') {
    $('.pagination').removeClass('closed');
    $('.pagination').text('关闭分页')
}
$('.pagination').click(function() {

    if ($('.pagination').hasClass('closed')) {
        $('.pagination').removeClass('closed');
        $('.pagination').text('关闭分页')
        chrome.runtime.sendMessage({ method: "openPagination" });
    } else {
        $('.pagination').addClass('closed');
        $('.pagination').text('开启分页');
        chrome.runtime.sendMessage({ method: "closePagination" });
    }
});


// 扇贝查词
var shanbayOpen = localStorage.getItem('shanbay') ? localStorage.getItem('shanbay') : true;
if (shanbayOpen == 'false') {
    $('.shanbay').addClass('closed');
    $('.shanbay').text('开启屏幕查词');
} else if (shanbayOpen == 'true') {
    $('.shanbay').removeClass('closed');
    $('.shanbay').text('关闭屏幕查词');
}
$('.shanbay').click(function() {
    if ($('.shanbay').hasClass('closed')) {
        $('.shanbay').removeClass('closed');
        $('.shanbay').text('关闭屏幕查词');
        chrome.runtime.sendMessage({ method: "openShanbay" });
    } else {
        $('.shanbay').addClass('closed');
        $('.shanbay').text('开启屏幕查词');
        chrome.runtime.sendMessage({ method: "closeShanbay" });
    }
});
