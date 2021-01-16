document.addEventListener("DOMContentLoaded", () => {
  const btnSaveTabs = document.getElementById("btnSaveTabs");
  const canClose = document.getElementById("check");
  const bookmarkInput = document.getElementById("bookmark");

  btnSaveTabs.addEventListener("click", () => {
    chrome.tabs.getAllInWindow(null, (tabs) => {
      createFolder(bookmarkInput.value, tabs);
    });
  });

  const createFolder = (bookmark, tabs) => {
    const dt = new Date();
    return chrome.bookmarks.create(
      {
        parentId: "1",
        title: `${bookmark} - ${dt.toLocaleDateString()}`,
      },
      ({ id }) => addAllTabsToBookmark(tabs, id)
    );
  };

  const closeAlltabs = (tab) => {
    chrome.tabs.query({ active: true }, (activeTabs) => {
      currentTab = activeTabs[0];
      if (currentTab.id !== tab.id) {
        chrome.tabs.remove(tab.id, () => {});
      }
    });
  };

  const addAllTabsToBookmark = (tabs, parentId) => {
    tabs.forEach((tab) => {
      const { title, url } = tab;
      chrome.bookmarks.create(
        {
          parentId,
          title,
          url,
        },
        () => window.close()
      );
      if (canClose.checked) closeAlltabs(tab);
    });
  };
});
