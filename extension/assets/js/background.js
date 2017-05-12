var moviTabs = []

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (sender.tab && sender.tab.url.match(/tecnospeed.movidesk.com/)) moviTabs.push(sender.tab.id)
})

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (moviTabs.indexOf(tabId) !== -1 && changeInfo.status === 'complete') {
    chrome.tabs.sendMessage(tabId, true)
  }
})

chrome.storage.sync.get({
  hasOptions: false
}, function (items) {
  if (!items.hasOptions) {
    chrome.runtime.openOptionsPage()
  }
})