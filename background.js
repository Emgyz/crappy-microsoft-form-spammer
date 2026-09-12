function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const totalIterations = 250; // Number of times to repeat

chrome.action.onClicked.addListener(async () => {
  for (let i = 0; i < totalIterations; i++) {
    const formUrl = 'https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=SLXVD66jb0eIbw30DBlyk8LyC8uv9KpDtigIORMUb0ZUNkZNSTBSQURUMkVLQlgwRkVZODdMNEE5Sy4u';

    // Open new tab
    const tab = await new Promise((resolve) => {
      chrome.tabs.create({ url: formUrl }, (tab) => resolve(tab));
    });

    // Wait for the tab to load
    await new Promise((resolve) => {
      chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
        if (tabId === tab.id && info.status === 'complete') {
          chrome.tabs.onUpdated.removeListener(listener);
          resolve();
        }
      });
    });

    // Send message to content script to fill and submit form
    await new Promise((resolve) => {
      chrome.tabs.sendMessage(tab.id, { action: 'fillAndSubmit' }, (response) => {
        if (response && response.status === 'done') {
          resolve();
        }
      });
    });

    await delay(1000);

    // Close the tab after submission
    chrome.tabs.remove(tab.id);
  }
});