const form = document.getElementById("bookmark-form");
const titleInput = document.getElementById("title");
const urlInput = document.getElementById("url");
const memoTextarea = document.getElementById("memo");
const bookmarkList = document.getElementById("bookmark-list");
const bookmarks = [];
form.addEventListener("submit", (event) => {
    event.preventDefault(); //ページリロードを止める。リロードすると入力した値が消えるから。
    const title = titleInput.value;
    const url = urlInput.value;
    const memo = memoTextarea.value;
    console.log(title);
    console.log(url);
    console.log(memo);
    const newBookmark = {
        id: Date.now(),
        title: title,
        url: url,
        memo: memo,
        isFavorite: false,
    }; //bookmarkのオブジェクトを作る
    bookmarks.push(newBookmark); //配列bookmarksに追加する
    renderBookmarks(); //画面に表示する。
});
function renderBookmarks() {
    bookmarkList.innerHTML = ""; //上書き防止のため一度すべて消す
    bookmarks.forEach((bookmark) => {
        const div = document.createElement("div"); //ックマークを表示するための箱（div）を作る。
        div.innerHTML = `
          <h3>${bookmark.title}</h3>
          <a href="${bookmark.url}"target="_blank">${bookmark.url}</a>
          <p>${bookmark.memo}</p>
        `;
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "削除";
        div.appendChild(deleteButton);
        deleteButton.addEventListener("click", () => {
            console.log(bookmark.id);
        });
        bookmarkList.appendChild(div);
    });
}

