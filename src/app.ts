export{}
const form         = document.getElementById("bookmark-form") as HTMLFormElement;
const titleInput   = document.getElementById("title") as HTMLInputElement;
const urlInput     = document.getElementById("url") as HTMLInputElement;
const memoTextarea = document.getElementById("memo") as HTMLTextAreaElement;
const searchInput  = document.getElementById("search") as HTMLInputElement;

const bookmarkList = document.getElementById("bookmark-list") as HTMLDivElement;
type Bookmark={
    id:number;
    title:string;
    url:string;
    memo:string;
    isFavorite:boolean;
}

let bookmarks:Bookmark[]=[];
let editingId: number | null = null;

form.addEventListener("submit",(event)=>{
    event.preventDefault();//ページリロードを止める。リロードすると入力した値が消えるから。
    const title = titleInput.value;
    const url   = urlInput.value;
    const memo  = memoTextarea.value;

    console.log(title);
    console.log(url);
    console.log(memo);
    if(editingId !== null){
    
        bookmarks = bookmarks.map((item)=>{
            if(item.id===editingId){
                
                item.title = titleInput.value;
                item.url   = urlInput.value;
                item.memo  = memoTextarea.value;
                
            return item ;
            }
            return item;
        });
        editingId  =null;
    }else{
            const newBookmark: Bookmark = {
                id:Date.now(),
                title:title,
                url:url,
                memo:memo,
                isFavorite:false,
            };//bookmarkのオブジェクトを作る
   
         
    bookmarks.push(newBookmark);//配列bookmarksに追加する
    }
    titleInput.value  = "";
    urlInput.value    = "";
    memoTextarea.value= "";
    renderBookmarks();//画面に表示する。


});      







function renderBookmarks(displayBookmarks: Bookmark[]=bookmarks){
    bookmarkList.innerHTML="";//上書き防止のため一度すべて消す

    displayBookmarks.forEach((bookmark)=>{
        const div =document.createElement("div")//ックマークを表示するための箱（div）を作る。
        div.innerHTML = `
          <h3>${bookmark.title}</h3>
          <a href="${bookmark.url}"target="_blank">${bookmark.url}</a>
          <p>${bookmark.memo}</p>
        `;
          const deleteButton = document.createElement("button");
          deleteButton.textContent = "削除"
          div.appendChild(deleteButton);
          deleteButton.addEventListener("click",()=>{
            bookmarks=bookmarks.filter((item)=>{
                return item.id !==bookmark.id;
            });
            renderBookmarks();
          })

          const editButton = document.createElement("button");
          editButton.textContent="編集"
          div.appendChild(editButton);
          editButton.addEventListener("click",()=>{
              titleInput.value=bookmark.title;
              urlInput.value=bookmark.url;
              memoTextarea.value=bookmark.memo;

              editingId = bookmark.id;

          });

        bookmarkList.appendChild(div);
    
    });
}
searchInput.addEventListener("input",()=>{
    const keyword=searchInput.value;
    const filterBookmarks=bookmarks.filter((bookmark)=>{
        return bookmark.title.includes(keyword);
    })
    renderBookmarks(filterBookmarks)
})