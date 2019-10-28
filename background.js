/*-----------------------------------------------------------------------------
>>> BACKGROUND
-----------------------------------------------------------------------------*/

chrome.runtime.onMessage.addListener(function(request, sender) {
    console.log(request);
});