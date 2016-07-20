// 取得filter是否打开
chrome.runtime.sendMessage({ method: "getFilter" }, function(response) {
    var isFilter = response.data;
    if (isFilter == 'true') {
        filter();
    }
});


function filter() {
    // 移除一些不必要的元素
    // $('body > header').css('display', 'none');
     $('body > header').remove()
    // 以body元素开始
    var element = document.querySelector('body');
    var list_class = [];
    var list_id = [];
    var filter = /^ad|ad-|footer|sub|message|meta|twitter|labels/;
    var filter_id = /^ad|ad-|-ad/;
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

    getClassNameFilter(element);

    function getClassNameFilter(ele) {
        var i, j, count = 0;
        // 有子元素
        if (ele.children.length > 0) {
            // 过滤 ID中包含规则的
            if (ele.id && filter_id.test(ele.id) && !filter_head.test(ele.id)) {
                list_id.push(ele.id);
            } else { // ID找不到再去找class的
                for (i = 0; i < ele.classList.length; i++) {
                    if (filter.test(ele.classList[i]) && !filter_head.test(ele.classList[i])) {
                        list_class.push(ele.classList[i]);
                        count++;
                        break;
                    }
                }
                // 未找到符合条件的class，进入子元素找
                if (count === 0) {
                    for (i = 0; i < ele.children.length; i++) {
                        getClassNameFilter(ele.children[i]);
                    }
                }
            }
        } else if (ele.children.length === 0) { // 无子元素
            if (ele.id && filter_id.test(ele.id) && !filter_head.test(ele.id)) {
                list_id.push(ele.id);
                return;
            }
            for (i = 0; i < ele.classList.length; i++) {
                if (filter.test(ele.classList[i]) && !filter_head.test(ele.classList[i])) {
                    list_class.push(ele.classList[i]);
                    break;
                }
            }
        }
    }

    // list里面有所有的class名
    for (var i in list_class) {
        // $('.' + list_class[i]).css('display', 'none');
        $('.' + list_class[i]).remove()
    }
    for (var j in list_id) {
        // $('#' + list_id[j]).css('display', 'none');
        $('#' + list_id[j]).remove();
    }

}
