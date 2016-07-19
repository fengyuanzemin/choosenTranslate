// 取得pagination是否打开
chrome.runtime.sendMessage({ method: "getPagination" }, function(response) {
    var isPagination = response.data;
    if (isPagination == 'true') {
        pagination();
    }
});

function pagination(){
	
}