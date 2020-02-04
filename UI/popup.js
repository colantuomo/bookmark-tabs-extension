
document.addEventListener('DOMContentLoaded', () => {
    const btnSaveTabs = document.getElementById('btnSaveTabs');

    btnSaveTabs.addEventListener('click', () => {
        const bookmark = document.getElementById('bookmark').value;
        chrome.tabs.getAllInWindow(null, (tabs) => {
            createFolder(bookmark, tabs);
        });
    });

    const createFolder = (bookmark, tabs) => {
        const dt = new Date();
        return chrome.bookmarks.create({
            parentId: "1",
            title: `${bookmark} ${dt.toLocaleDateString()}`
        }, ({ id }) => addAllTabsToBookmark(tabs, id))
    }

    const addAllTabsToBookmark = (tabs, parentId) => {
        tabs.forEach((tab) => {
            const { title, url } = tab;
            chrome.bookmarks.create({
                parentId,
                title,
                url
            })
        })
    }

});
