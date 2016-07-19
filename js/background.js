chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    switch (request.method) {
        case 'playAudio':
            playAudio(request.data['audio_url']);
            break;
        case 'openFilter':
            localStorage.setItem('filter', 'true');
            break;
        case 'closeFilter':
            localStorage.setItem('filter', 'false');
            break;
        case 'openPagination':
            localStorage.setItem('pagination', 'true');
            break;
        case 'closePagination':
            localStorage.setItem('pagination', 'false');
            break;
        case 'openShanbay':
            localStorage.setItem('shanbay', 'true');
            break;
        case 'closeShanbay':
            localStorage.setItem('shanbay', 'false');
            break;
        // default:
        //     sendResponse({ data: [] }); // snub them.
    }
});


function playAudio(audio_url) {
    if (audio_url) {
        new Howl({
            urls: [audio_url]
        }).play().volume(1.0);
    }
}
