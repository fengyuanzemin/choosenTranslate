/**
 * 任意网页扇贝查词
 *
 */

// 取得shanbay是否打开
chrome.runtime.sendMessage({method: "getShanbay"}, function (response) {
    var isShanbay = response.data;
    if (isShanbay == 'true') {
        shanbay();
    }
});

function shanbay() {
    $(function () {
        $(document).on('dblclick', searchingSelectedText);
    });

    // 查询单词
    function searchingSelectedText() {
        var text = window.getSelection().toString().trim().match(/^[a-zA-Z\s']+$/);
        if (undefined != text && null != text && 0 < text.length) {
            var API = 'https://api.shanbay.com/bdc/search/?word=';
            // var url = API + normalize(text);
            var url = API + text;

            $.ajax({
                url: url,
                type: 'GET',
                dataType: 'JSON',
                contentType: "application/json; charset=utf-8"
            }).always(function (data) {
                popover(data);
            });

        }

    }

    function normalize(word) {
        return word.replace(/·/g, '');
    }

    function popover(alldata) {
        var data = alldata.data;
        var html = '';

        getSelectionOffset(function (left, top) {
            var html_begin = '<div class="shanbay_popover">';
            var html_end = '</div>'
            if (alldata.status_code === 0) {
                // 查找成功
                var html_content = '<div class="shanbay_container">' +
                    '<div class="shanbay_title">' +
                    '<span class="shanbay_name">' + data.audio_name + '</span><br/>' +
                    '<span class="shanbay_uk speak">UK ' +
                    '<span class="uk_pron">[' + data.pronunciations.uk + ']</span>' +
                    ' <span class="icon-speak"></span>' +
                    '</span>' +
                    '<span class="shanbay_us speak">US ' +
                    '<span class="us_pron">[' + data.pronunciations.us + ']</span>' +
                    ' <span class="icon-speak"></span>' +
                    '</span>' +
                    '</div>' +
                    '<div class="shanbay_definitions">' + data.definition.split('\n').join('<br/>') +
                    '</div></div>';

            } else {
                // 未找到该单词
                var html_content = '<div class="shanbay_container">' +
                    '<div class="shanbay_title">' + alldata.msg +
                    '</div>' +
                    '</div>';

            }

            var h = $(window).scrollTop() + $(window).height();
            var body = $('body');
            if (h - 200 < top && h >= top) {
                // 在最底部
                html = html_begin + html_content + '<div class="triangle-down"></div>' + html_end;
                $('.shanbay_popover').remove();
                body.append(html);
                setPopoverPosition(left, top - $('.shanbay_popover').height() - 5);
            } else { // 默认在上部
                html = html_begin + '<div class="triangle-up"></div>' + html_content + html_end;
                $('.shanbay_popover').remove();
                body.append(html);
                setPopoverPosition(left, top);
            }
            // 在最右部
            // 在最左部，暂时认为左右不用管

        });
        var body = $('body');
        body.on('click', function () {
            hidePopover();
        });
        body.on('click', '.shanbay_popover', function (e) {
            e.stopPropagation();
        });
        body.on('click', '.shanbay_us', function () {
            e.preventDefault();
            playAudio(data.us_audio);
        });
        body.on('click', '.shanbay_uk', function (e) {
            e.preventDefault();
            playAudio(data.uk_audio);
        });
    }

    function hidePopover() {
        $('.shanbay_popover').remove();
    }

    function getSelectionOffset(callback) {
        // 取默认值
        var left = window.innerWidth / 2;
        var top = window.innerHeight / 2;

        var selection = window.getSelection();
        if (0 < selection.rangeCount) {
            var range = selection.getRangeAt(0);
            var dummy = document.createElement('span');
            range.insertNode(dummy);
            // 获得选区的位置
            left = dummy.getBoundingClientRect().left + document.body.scrollLeft - 50;
            top = dummy.getBoundingClientRect().top + document.body.scrollTop + 13;
            dummy.remove();
            selection.addRange(range);
            callback(left, top);
        }
    }

    // function getTop(e) {
    //     var offset = e.offsetTop;
    //     if (e.offsetParent != null) offset += getTop(e.offsetParent);
    //     return offset;
    // }

    // function getLeft(e) {
    //     var offset = e.offsetLeft;
    //     if (e.offsetParent != null) offset += getLeft(e.offsetParent);
    //     return offset;
    // }

    function setPopoverPosition(left, top) {
        $('.shanbay_popover').css({
            position: 'absolute',
            left: left,
            top: top
        });
    }

    function playAudio(audio_url) {
        chrome.runtime.sendMessage({method: "playAudio", data: {audio_url: audio_url}})
    }
}
