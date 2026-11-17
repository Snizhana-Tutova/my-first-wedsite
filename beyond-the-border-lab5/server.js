const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
// Роздаємо статичні файли (наш зверстаний клієнт)
app.use(express.static(path.join(__dirname, 'public')));

// "База даних" у пам'яті (Mock DB)
let books = [
    { id: 1, title: "Темна епоха. Загроза", author: "Забіне Шультер", pages: 256, link: "book1.html", img: "image_f8657a.png" },
    { id: 2, title: "Темна епоха. Надія", author: "Забіне Шультер", pages: 352, link: "book2.html", img: "image_f865d2.png" },
    { id: 3, title: "Аутсайдер", author: "Стівен Кінг", pages: 592, link: "book3.html", img: "image_f868bd.png" },
    { id: 4, title: "Згодом", author: "Стівен Кінг", pages: 256, link: "book4.html", img: "image_f8691c.png" }
];

// --- REST API Ендпоінти ---

// 1. Отримати всі книги (READ)
app.get('/api/books', (req, res) => {
    res.json(books);
});

// 2. Отримати книгу за ID (READ)
app.get('/api/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).send('Книгу не знайдено');
    res.json(book);
});

// 3. Додати нову книгу (CREATE) - для демонстрації CRUD
app.post('/api/books', (req, res) => {
    const newBook = {
        id: books.length + 1,
        title: req.body.title,
        author: req.body.author,
        pages: req.body.pages,
        link: req.body.link || "#",
        img: req.body.img || "placeholder.png"
    };
    books.push(newBook);
    res.status(201).json(newBook);
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер працює на http://localhost:${PORT}`);
});