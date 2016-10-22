/**
 * 任意网页扇贝查词
 *
 */
let usAudio, ukAudio;

// 取得shanbay是否打开
chrome.runtime.sendMessage({method: "getShanbay"}, function (response) {
    const isShanbay = response.data;
    if (isShanbay === 'true') {
        shanbay();
    }
});

function shanbay() {
    const $body = document.querySelector('body');
    $body.addEventListener('dblclick', searchingSelectedText);
    $body.addEventListener('click', function (e) {
        e.stopPropagation();
        const target = e.target;
        switch (target.className) {
            case 'shanbay-popover':
            case 'shanbay-definitions':
            case 'shanbay-title':
            case 'shanbay-name':
            case 'triangle-up':
            case 'triangle-down':
                break;
            case 'shanbay-us speak':
            case 'icon-speak us-icon':
            case 'us-pron':
                e.preventDefault();
                playAudio(usAudio);
                break;
            case 'shanbay-uk speak':
            case 'icon-speak uk-icon':
            case 'uk-pron':
                e.preventDefault();
                playAudio(ukAudio);
                break;
            default:
                hidePopover();
                break;
        }
    });

    // 查询单词
    function searchingSelectedText() {
        const text = window.getSelection().toString().trim().match(/^[a-zA-Z\s']+$/);
        if (undefined !== text && null !== text && 0 < text.length) {
            const API = 'https://api.shanbay.com/bdc/search/?word=';
            // var url = API + normalize(text);
            const url = API + text;
            const $popover = document.querySelector('.shanbay-popover');
            if ($popover) {
                $popover.remove();
            }
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

    function popover(allData) {
        const data = allData.data;
        let html = '';
        usAudio = data.us_audio;
        ukAudio = data.uk_audio;

        getSelectionOffset(function (left, top) {
            // 创建
            const popover = document.createElement('div');
            popover.className = 'shanbay-popover';

            let htmlContent;
            const h = $(window).scrollTop() + $(window).height();
            // 添加到底部
            const $body = document.querySelector('body');
            $body.appendChild(popover);

            if (allData.status_code === 0) {
                // 查找成功
                htmlContent =
                    `<div class="shanbay-container">
                        <div class="shanbay-title">
                            <span class="shanbay-name">${data.audio_name}</span><br/>
                            <span class="shanbay-uk speak">UK 
                                <span class="uk-pron">[ ${data.pronunciations.uk} ]</span>
                                <span class="icon-speak uk-icon"></span>
                            </span>
                            <span class="shanbay-us speak">US 
                                <span class="us-pron">[ ${data.pronunciations.us} ]</span>
                                <span class="icon-speak us-icon"></span>
                            </span>
                        </div>
                    <div class="shanbay-definitions">${data.definition.split('\n').join('<br/>')}</div>
                    </div>`;
            } else {
                // 未找到该单词
                htmlContent =
                    `<div class="shanbay-container">
                        <div class="shanbay-title">${allData.msg}</div>
                    </div>`;

            }
            // 判断位置
            if (h - 200 < top && h >= top) {
                // 在最底部
                html = `${htmlContent}<div class="triangle-down"></div>`;
                setPopoverPosition(left, top - document.querySelector('.shanbay-popover').height() - 5);
            } else {
                // 默认在上部
                html = `<div class="triangle-up"></div>${htmlContent}`;
                setPopoverPosition(left, top);
            }
            popover.innerHTML = html;

            // 在最右部
            // 在最左部，暂时认为左右不用管

        });
    }

    function hidePopover() {
        const $popover = document.querySelector('.shanbay-popover');
        if ($popover) {
            $popover.remove();
        }
    }

    function getSelectionOffset(callback) {
        // 取默认值
        let left = window.innerWidth / 2;
        let top = window.innerHeight / 2;

        const selection = window.getSelection();
        if (0 < selection.rangeCount) {
            const range = selection.getRangeAt(0);
            const dummy = document.createElement('span');
            dummy.style.display = 'inline-block';
            range.insertNode(dummy);
            // 获得选区的位置
            const clientRect = dummy.getBoundingClientRect();
            left = clientRect.left + document.body.scrollLeft - 50;
            top = clientRect.top + clientRect.height + document.body.scrollTop;

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
        $('.shanbay-popover').css({
            position: 'absolute',
            left: left,
            top: top
        });
    }

    function playAudio(audio_url) {
        chrome.runtime.sendMessage({method: "playAudio", data: {audio_url: audio_url}});
    }
}
