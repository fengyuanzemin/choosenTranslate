chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    switch (request.method) {
        case 'playAudio':
            playAudio(request.data['audio_url']);
            break;
        case 'openShanbay':
            localStorage.setItem('shanbay', 'true');
            break;
        case 'closeShanbay':
            localStorage.setItem('shanbay', 'false');
            break;
        case 'getShanbay':
            sendResponse({data: localStorage.getItem('shanbay')});
            break;
        default:
            sendResponse({data: []}); // 传空数据
    }
});


function playAudio(audio_url) {
    if (audio_url) {
        new Howl({
            urls: [audio_url]
        }).play().volume(1.0);
    }
}
