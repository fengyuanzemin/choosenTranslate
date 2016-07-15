/**
 * 任意网页扇贝查词
 *
 */

$(function() {
    $(document).on('dblclick', searchingSelectedText);
});




// 查询单词
function searchingSelectedText() {
    var text = window.getSelection().toString().trim().match(/^[a-zA-Z\s']+$/);
    if (undefined != text && null != text && 0 < text.length) {
        var API = 'https://api.shanbay.com/bdc/search/?word=';
        // var url = API + normalize(text);
        var url=API+text;

        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'JSON',
            contentType: "application/json; charset=utf-8",
            success: function(data) {
                popover(data);
            },
            error: function() {
                console.log('error');
            },
            complete: function() {
                console.log('complete');
            }
        });

    }

}

function normalize(word) {
    return word.replace(/·/g, '');
}

function popover(alldata) {
    var data = alldata.data;
    var html = '<div class="shanbay_popover"><div class="shanbay_title">' +
        '<span class="shanbay_name">' + data.audio_name+'</span>' +
        '<span class="shanbay_uk">' +
        '<span class="uk_pron">'+data.pronunciations.uk+'</span>' +
        '</span>' +
        '<span class="shanbay_us">' +
        '<span class="us_pron">'+data.pronunciations.us+'</span>' +
        '</span>' +
        '</div>' +
        '<div class="shanbay_definitions">' +data.definition+
        '</div>' +
        '</div>';
        console.log(data);
        console.log(html);
    // var html = '<div id="shanbay_popover"><div class="popover-inner"><h3 class="popover-title">';
    // if (true == data.loading) { //loading notification
    //     html += '<p><span class="word">' + data.msg + '</span></p>';
    // } else if (data.data == undefined || data.data.learning_id == undefined) {
    //     if (1 == data.status_code) { // word not exist
    //         if (undefined == webster || webster.term == "") html += '未找到单词</h3></div>';
    //         else html += '<p><span class="word">' + webster.term + '</span></p></h3>' +
    //             '<div class="popover-content"><p>' + webster.defs + "</p></div>";
    //     } else { // word exist, but not recorded
    //         html += '<p><span class="word">' + data.data.content + '</span>' + '<small class="pronunciation">' + (data.data.pron.length ? ' [' + data.data.pron + '] ' : '') + '</small></p>'
    //         html += '<a href="#" class="speak uk">UK<i class="icon icon-speak"></i></a><a href="#" class="speak us">US<i class="icon icon-speak"></i></a></h3>'

    //         html += '<div class="popover-content">' + '<p>' + data.data.definition.split('\n').join("<br/>") + "<br/>" + defs + '</p>' + '<div class="add-btn"><a href="#" class="btn" id="shanbay-add-btn">添加生词</a>' + '<p class="success hide">成功添加！</p>' + '<a href="#" target="_blank" class="btn hide" id="shanbay-check-btn">查看</a></div>' + '</div>';
    //     }
    // } else { // word recorded
    //     var forgotUrl = "http://www.shanbay.com/review/learning/" + data.data.learning_id
    //     html += '<p><span class="word">' + data.data.content + '</span>' + '<span class="pronunciation">' + (data.data.pron.length ? ' [' + data.data.pron + '] ' : '') + '</span></p>'
    //     html += '<a href="#" class="speak uk">UK<i class="icon icon-speak"></i></a><a href="#" class="speak us">US<i class="icon icon-speak"></i></a></h3>'

    //     html += '<div class="popover-content">' + '<p>' + data.data.definition.split('\n').join("<br/>") + '</p>' + '<p>' + data.data.en_definition.defn.split('\n').join("<br/>") + '</p>' + '<div class="add-btn"><a href="#" class="btn" id="shanbay-forget-btn">我忘了</a></div>' + '<p class="success hide">成功添加！</p>' + '<div class="add-btn"><a href="' + forgotUrl + '" target="_blank" class="btn" id="shanbay-check-btn">查看</a></div>' + '</div>';
    // }

    // html += '</div></div>';
    // $('#shanbay_popover').remove();
    // $('body').append(html);

    // getSelectionOffset(function(left, top) {
    //     setPopoverPosition(left, top);
    //     var h = $(window).scrollTop() + $(window).height();
    //     if (h - 200 < top && h >= top) {
    //         $(window).scrollTop(200 + $(window).scrollTop());
    //     }
    // });
}

// function hidePopover() {
//     $('#shanbay_popover').remove();
// }

// function getSelectionOffset(callback) {
//     var left = window.innerWidth / 2;
//     var top = window.innerHeight / 2;
//     var selection = window.getSelection();
//     if (0 < selection.rangeCount) {
//         var range = window.getSelection().getRangeAt(0);
//         var dummy = document.createElement('span');
//         range.insertNode(dummy);
//         left = $(dummy).offset().left - 50 - dummy.offsetLeft + $(dummy).position().left;
//         top = $(dummy).offset().top + 25 - dummy.offsetTop + $(dummy).position().top;
//         dummy.remove();
//         window.getSelection().addRange(range);
//         console.log(left + ':' + top);
//         callback(left, top);
//     }
// }
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

// function setPopoverPosition(left, top) {
//     $('#shanbay_popover').css({
//         position: 'absolute',
//         left: left,
//         top: top
//     });
// }
