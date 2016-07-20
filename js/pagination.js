// 取得pagination是否打开
chrome.runtime.sendMessage({ method: "getPagination" }, function(response) {
    var isPagination = response.data;
    if (isPagination == 'true') {
        pagination();
    }
});

function pagination() {
    // 屏幕高度
    var h = $(window).height();
    // console.log('文档高度：' + $(document).height());
    // console.log('文档滚动条到顶部的高度' + $(document).scrollTop());
    // console.log('窗口高度' + $(window).height());
    // console.log('窗口到顶部的高度' + $(window).scrollTop());
    // console.log('窗口到顶部的高度等于文档到顶部的高度';
    // 全文高度
    // var sh = document.body.scrollHeight;
    // 分页数
    var num = document.body.scrollHeight / $(window).height();
    // console.log(Math.ceil(num));

    var html = '<select id="pag">';
    var i;
    for (i = 0; i < num; i++) {
        html += '<option value="' + (i + 1) + '">第' + (i + 1) + '页</option>';
    }
    html += '</select>';
    $('body').append(html);

    $('#pag').change(function() {
        $('.remind').remove();
        if (($('#pag').val() - 1) != 0) {

            var triangle = '<div class="remind"><div class="triangle"></div><div class="remind-word">上页结尾</div></div>';
            $('body').append(triangle);
        }

        $('.remind').css('top', ($('#pag').val() - 1) * h + 'px');
        $(window).scrollTop(($('#pag').val() - 1) * h);

    });
    // $(document).scroll(function(){

    // })

}
