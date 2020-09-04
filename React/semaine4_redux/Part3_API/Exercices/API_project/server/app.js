const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;
app.use(cors());

app.use(express.json({ limit: "1mb" }));

const generateHash = () => [...Array(10)].map(i => (~~(Math.random() * 36)).toString(36)).join('');

let authors = new Map([
    [
        "3hj9ecwzc5", 
            {
                "id": "3hj9ecwzc5",
                "name": "Alan",
                "bio": "DEA à l'université Luminy",
                "shop_name": "fnac",
                "books": ["Javascript", "Eloquent JavaScript, Second Edition"]
            },
    ],
    [
        "ii3v6javys", 
            {
                "id": "ii3v6javys",
                "name": "Albert",
                "bio": "BAC science et stages au CNRS",
                "shop_name": "librarie grande rue",
                "books": ["Maths", "Relativité restreinte"]
            }
    ],
    [
        "ii3v6jaYUY", 
            {
                "id": "ii3v6jaYUY",
                "name": "Sophie",
                "bio": "Science po",
                "shop_name": "librarie",
                "books": ["Politique", "Ecologie"]
            }
    ],
    [
        "81928usije", 
            {
                "id": "81928usije",
                "name": "Alice",
                "bio": "Brevet des collège",
                "shop_name": "fnac",
                "books": ["Le pays des merveilles", "un monde merveilleux"]
            },
    ],
    [
        "8798uhyek", 
            {
                "id": "8798uhyek",
                "name": "Phil",
                "bio": "Médecine",
                "shop_name": "fnac",
                "books": ["néphrologie", "beta bloquant"]
            }
    ]
]);

// get all authors
app.get('/authors', (req, res) => {

    res.json(  { 
        authors : [ ...authors.values() ],
        success : true
     });
});

// store new Author
app.post('/add', (req, res) => {
    const { name  } = req.body;
    const id = generateHash();
    
    authors.set(id, req.body);

    // réponse
    res.json({
        status: 'success',
        name: name,
        id : id
    });
});

// get one author 
app.get('/author/:id', (req, res) => {
    const { id } = req.params;

    if (authors.has(id)) {
        const author = authors.get(id);
        res.json({
            status: 'success',
            id: id,
            author: JSON.stringify(author)
        });
    }
    else
        res.status(404).send('Author not found'); // TODO gestion des authors non trouvé dans l'app
});

// update One Author
app.put('/author/:id', (req, res, next) => {
    const { id } = req.params;

    if (authors.has(id)) {
        authors.set(id, req.body); // update 
        
        const author = authors.get(id);
        res.json({
            status: 'success',
            id: id,
            author: JSON.stringify(author)
        });
    }
    else
        res.status(404).send('Author not found');
});


// delete author
app.delete('/author/:id', (req, res) => {
    const { id } = req.params;

    if (authors.has(id)) {
        const name = authors.get(id).name;
        authors.delete(id);
        res.json({
            status: 'success deleted author',
            lastId: id + Math.random().toString(),
            name: name
        });
    }
    else
        res.status(404).send('Author not found');
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));