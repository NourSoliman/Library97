let buttonForm = document.getElementById(`show-form`)
let showForm = document.getElementById(`form`)
let buttonSum = document.getElementById(`submit`)
let form = document.getElementsByTagName(`form`) [0];
showForm.style.display =`none`
form.addEventListener(`submit` , addbook);
buttonForm.addEventListener(`click` , showform);
class Book {
    constructor(title , author , pages , readBook , picture , id) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.readBook = readBook;
    this.picture = picture;
    this.id = id
}}
let book1 = new Book(`The Great Gatsby`, `Nour` , `255` , `Read` , `https://upload.wikimedia.org/wikipedia/commons/a/a0/The_Great_Gatsby_cover_1925_%281%29.jpg`)
let book2 = new Book(`To Kill a Mockingbird` , `Nour` , `255` , `Not Read` , `https://cdn2.penguin.com.au/covers/original/9781784752637.jpg`)
let myLibrary = [book1 , book2];

function addBockToLibrary(book) {
    myLibrary.push(book);
    addLocal(myLibrary)
}
// getLocal(myLibrary)
if (localStorage.getItem(`books`)) {
    myLibrary = JSON.parse(localStorage.getItem(`books`))
}
// loop to create html Elements
function loop() {
    for (let i = 0; i < myLibrary.length ; i++) {
        let titleP = document.createElement(`p`);
        titleP.setAttribute(`id` , `title`)
        titleP.innerHTML = "title: " + myLibrary[i].title;

        let titleDiv = document.createElement(`div`)
        titleDiv.appendChild(titleP);

        let authorP = document.createElement(`p`)
        authorP.setAttribute(`id` , `author`)
        authorP.innerHTML = `author: ` + myLibrary[i].author;

        let authorDiv = document.createElement(`div`)
        authorDiv.appendChild(authorP);

        let pagesP = document.createElement(`p`)
        pagesP.setAttribute(`id` , `pagess`)
        pagesP.innerHTML= "pages: " + myLibrary[i].pages;

        let pagesDiv = document.createElement(`div`)
        pagesDiv.appendChild(pagesP)

        let readP = document.createElement(`p`)
        readP.setAttribute(`id` , `read`)
        readP.innerHTML = myLibrary[i].readBook;

        if(myLibrary[i].readBook == `Read`) {
            readP.style.color = `green`;
        } else if (myLibrary[i].readBook == `Not Read`) {
            readP.style.color = `Red`
        } else return;

        let readDiv = document.createElement(`div`)
        readDiv.setAttribute(`id` , `read-div`)
        readDiv.appendChild(readP);
// add delete button
        let deleteButton = document.createElement(`button`)
        deleteButton.setAttribute(`id` , `delete`)
        deleteButton.setAttribute(`class` , `deleted`)
        deleteButton.innerHTML = `delete`
        let deleteDiv = document.createElement(`div`)
        deleteDiv.setAttribute(`id` , `delete-div`)
        deleteDiv.appendChild(deleteButton)
// add edit button
        let editButton = document.createElement(`button`)
        editButton.setAttribute(`id` , `edit`)
        editButton.innerHTML = `Edit`
        let editDiv = document.createElement(`div`)
        editDiv.appendChild(editButton)
        editButton.setAttribute(`item`, i);
// create image staff
        let image = document.createElement(`img`)
        image.setAttribute(`id` , `img`)
        image.src = myLibrary[i].picture

        let iamgeDiv = document.createElement(`div`)
        iamgeDiv.setAttribute(`id` , `pic`)
        iamgeDiv.appendChild(image)
// button container
        let buttonContainer = document.createElement(`div`)
        buttonContainer.setAttribute(`id` , `buttons`)
        buttonContainer.appendChild(deleteButton)
        buttonContainer.appendChild(editButton)
// div container
        let divContainer = document.createElement(`div`)
        divContainer.setAttribute(`id` , `div-contain`)
        divContainer.appendChild(titleDiv)
        divContainer.appendChild(authorDiv)
        divContainer.appendChild(pagesDiv)
        divContainer.appendChild(readDiv)


        let divContain = document.createElement(`div`) 
        divContain.setAttribute(`id` , `sec-div`)
        divContain.appendChild(buttonContainer)
        divContain.appendChild(iamgeDiv)
        divContain.appendChild(divContainer)

        let bookContainer = document.getElementById(`container`)
        bookContainer.appendChild(divContain)
        
        deleteButton.setAttribute('data-item-index', i);
        deleteButton.addEventListener(`click` , () => {
            let index = deleteButton.getAttribute(`data-item-index`);
            myLibrary.splice(index , 1);
            divContain.style.display = `none`
            addLocal(myLibrary)
            console.log(index);
        })
        // deleteButton.addEventListener(`click` , (e) => {
        //         if (e.target.classList.contains(`deleted`)) {
        //                 e.target.parentElement.remove();
        //                 divContain.style.display = `none`
        //             }
        //             addLocal(myLibrary)
        //         })
        editButton.addEventListener(`click` ,  () => {
            let item = editButton.getAttribute(`item`)
            if(myLibrary[item].readBook == `Read`) {
                myLibrary[item].readBook = `Not Read`;
                readP.innerHTML = myLibrary[item].readBook
                readP.style.color = `red`
            } else if (myLibrary[item].readBook == `Not Read`) {
                myLibrary[item].readBook = `Read`
                readP.innerHTML = myLibrary[item].readBook
                readP.style.color = `green`
            }
            addLocal(myLibrary)
        })

    }
}

function showform() {
    document.getElementById(`title`).value = "";
    document.getElementById(`author`).value = "";
    document.getElementById(`pages-num`).value = "";
    showForm.style.display = `block`
    buttonForm.style.display = `none`
}
function addbook(e) {
    e.preventDefault()
    let newTitle = document.getElementById(`book-title`).value;
    let newAuthor = document.getElementById(`book-author`).value;
    let newPage = document.getElementById(`pages-num`).value;
    let newRead;
    let newPic;
    let id = Math.random();
    let checked = document.querySelector(`input[name="checker"]:checked`)
    if(checked.value == 0) {
        newRead = `Read`}
    if (checked.value == 1) {
        newRead = `Not Read`}

        let newSrc = document.getElementById(`image-src`).value;
        if (newSrc == "") {
            newPic = `https://st2.depositphotos.com/1328013/5295/v/600/depositphotos_52954137-stock-illustration-book-cover-design.jpg`
        } else {
            newPic = newSrc;
        }
    let newBook97 = new Book(newTitle , newAuthor , newPage , newRead , newPic , id )
    addBockToLibrary(newBook97)
    showForm.style.display = `none`
    buttonForm.style.display = `block`
    document.getElementById('container').innerHTML = null;
    loop();
}
//add local storage 
function addLocal(myLibrary) {
    window.localStorage.setItem(`books`, JSON.stringify(myLibrary))
    }
function getLocal() {
    let data = window.localStorage.getItem(`books`) 
    if (data) {
        let tasks = JSON.parse(data)
    }
}
loop()

