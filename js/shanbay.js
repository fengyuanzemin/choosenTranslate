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
            complete: function(data) {
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
        '<div class="shanbay_definitions">' +data.definition.split('\n').join('<br/>')+
        '</div>' +
        '</div>';
        console.log(data);
        console.log(html);
        $('body').append(html);
   
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
