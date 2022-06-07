
// Retrieve a list of books from the server 
//Display a list of book titles to the admin
//text input next to each book title= the quantity of the associated book
//Place a submit button next to each text input
//When the submit button is clicked, retrieve the quantity from the associated text input and save the updated quantity to the server
async function getBooks() {
    let response = await fetch('http://localhost:3001/listBooks')
    let books = await response.json()
    books.forEach(listBooks)
}

function listBooks(book) {
    let root = document.querySelector('#root')

    let li = document.createElement('li')
    li.textContent = book.title

    let quantityInput = document.createElement('input')
    quantityInput.value = book.quantity

    let saveButton = document.createElement('button')
    saveButton.textContent = 'Save book'

    saveButton.addEventListener('click', () => {
        fetch('http://localhost:3001/updateBook', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: book.id,
                quantity: quantityInput.value
            })
        })
    })
    li.append(quantityInput, saveButton)
    root.append(li)
}

getBooks()

