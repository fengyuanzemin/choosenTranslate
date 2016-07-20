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
    // 分页数
    var num = Math.ceil($(document).height() / $(window).height());

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

        $('.remind').css('top', (($('#pag').val() - 1) * h) - 18 + 'px');
        $(window).scrollTop(($('#pag').val() - 1) * h);

    });
    $(document).scroll(function() {
        var i;
        for (i = 1; i <= num; i++) {
            if ($(window).scrollTop() == 0) {
                $('#pag').val(1);
                return;
            }
            if ($(window).scrollTop() + $(window).height() < i * h + 20) {
                $('#pag').val(i);
                return;
            }
        }

    });

}
