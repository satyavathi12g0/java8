let books = [];

function addBook() {
    const bookId = document.getElementById('bookId').value.trim();
    const title = document.getElementById('title').value.trim();
    const author = document.getElementById('author').value.trim();
    const genre = document.getElementById('genre').value.trim();
    const availability = document.getElementById('availability').value;

    if (!bookId || !title || !author || !genre) {
        alert("All fields are required!");
        return;
    }
    if (books.some(book => book.bookId === bookId)) {
        alert("Book ID must be unique!");
        return;
    }

    books.push({ bookId, title, author, genre, availability });
    displayBooks();
    document.querySelectorAll('input').forEach(input => input.value = '');
}

function displayBooks() {
    const bookList = document.getElementById('bookList');
    bookList.innerHTML = '';

    books.forEach((book, index) => {
        bookList.innerHTML += `
            <tr>
                <td>${book.bookId}</td>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.genre}</td>
                <td>
                    <select onchange="updateAvailability(${index}, this.value)">
                        <option value="Available" ${book.availability === "Available" ? "selected" : ""}>Available</option>
                        <option value="Checked Out" ${book.availability === "Checked Out" ? "selected" : ""}>Checked Out</option>
                    </select>
                </td>
                <td>
                    <button onclick="deleteBook(${index})">Delete</button>
                </td>
            </tr>`;
    });
}

function searchBook() {
    const query = document.getElementById('search').value.toLowerCase();
    document.querySelectorAll('#bookList tr').forEach(row => {
        row.style.display = row.innerText.toLowerCase().includes(query) ? '' : 'none';
    });
}

function updateAvailability(index, status) {
    books[index].availability = status;
    displayBooks();
}

function deleteBook(index) {
    books.splice(index, 1);
    displayBooks();
}
