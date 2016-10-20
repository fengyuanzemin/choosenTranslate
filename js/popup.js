// 扇贝查词
const shanbayOpen = localStorage.getItem('shanbay') ? localStorage.getItem('shanbay') : 'true';
const shanbay = document.querySelector('.shanbay');
if (shanbayOpen === 'false') {
    shanbay.classList.add('closed');
    shanbay.innerText = '开启屏幕查词';
} else if (shanbayOpen === 'true') {
    shanbay.classList.remove('closed');
    shanbay.innerText = '关闭屏幕查词';
}
shanbay.addEventListener('click', (e) => {
    if (shanbay.classList.contains('closed')) {
        shanbay.classList.remove('closed');
        shanbay.innerText = '关闭屏幕查词';
        chrome.runtime.sendMessage({method: "openShanbay"});
    } else {
        shanbay.classList.add('closed');
        shanbay.innerText = '开启屏幕查词';
        chrome.runtime.sendMessage({method: "closeShanbay"});
    }
    e.stopPropagation();
});
