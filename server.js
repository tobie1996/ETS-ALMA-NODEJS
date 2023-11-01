
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mysql = require("mysql");
const multer = require("multer");
const app = express();
const path = require("path");
app.use(express.static("public"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


/// Configurer MySQL
const pool = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ets-alma'
});

// Établir la connexion à la base de données MySQL
pool.connect(err => {
  if (err) throw err;
  console.log('Connecté à la base de données MySQL');
});



// CONFIGURATION IMAGE
const storage = multer.diskStorage({
  destination: "public/uploads/",
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ".jpg");
  },
});

const upload = multer({ storage: storage });




/////////// ============ROUTE POUR PARTIE ADMINISTRATEURS =============//////////////////

// ROUTE LOGIN

app.get('/show-login', (req, res) => {
 
      res.render('admin/login');
   
});



//GESTION IMMOBILIERS


app.post('/eddit-immobiliers/:id', (req, res) => {
  const { id } = req.params;
  const { titre, prix, description } = req.body;
  const query = 'UPDATE immobiliers SET titre = ?, prix = ?, description = ? WHERE id = ?';
  pool.query(query, [titre, prix, description, id], (err, results) => {
    if (err) throw err;
    res.redirect(req.headers.referer);
  });
});

app.post('/delete-immobiliers/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM immobiliers WHERE id = ?';
  pool.query(query, [id], (err) => {
    if (err) throw err;
    res.redirect(req.headers.referer);
  });
});

app.get('/show-dashboard', (req, res) => {
  pool.query('select count(*) as count from product', (err, results) => {
    if (err) throw err;
    const count1 = results[0].count;
    pool.query('select count(*) as count from immobiliers', (err, results) => {
      if (err) throw err;
      const count2 = results[0].count;
      res.render('admin/dashboard', { count1, count2 });
    });
  });
});

// LES ROUTES SHOW


//main category




// GESTION PRODUITS

app.get('/show-product', (req, res) => {
  const query = 'SELECT * FROM product';
  const query1 = 'SELECT titre FROM category';
  const query2 = 'SELECT titre FROM subcategory';

  pool.query(query, (err, results) => {
    if (err) throw err;
    const product = results;
    
    pool.query(query2, (err, results2) => {
      if (err) throw err;
      const titre2 = results2.map(result => result.titre);
      
      pool.query(query1, (err, results1) => {
        if (err) throw err;
        const titre = results1.map(result => result.titre);
      
        res.render('admin/products', { product: product, titre: titre ,titre2:titre2});
      });
    });
  });
});

app.post('/add-article', upload.single("image"),  (req, res) => {   
  const { titre, prix, description, category, subcategory } = req.body;   
  const image = req.file.filename;   
  const query = 'INSERT INTO product (titre, prix, description, category, subcategory, image) VALUES (?,?,?,?,?,?)';   
  pool.query(query, [titre, prix, description, category, subcategory, image], err => {     
    if (err) throw err;     
    res.redirect(req.headers.referer);   
  }); 
});


app.post('/eddit-product/:id', (req, res) => {
  const { id } = req.params;
  const { titre, prix, description, category, subcategory } = req.body;
  const query = 'UPDATE product SET titre = ?, prix = ?, description = ?, category = ?, subcategory = ? WHERE id = ?';
  pool.query(query, [titre, prix, description, category, subcategory, id], (err, results) => {
    if (err) throw err;
    res.redirect(req.headers.referer);
  });
});

app.post('/delete-product/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM product WHERE id = ?';
  pool.query(query, [id], (err) => {
    if (err) throw err;
    res.redirect(req.headers.referer);
  });
});

// GESTION IMMOBILIERS

app.get('/show-immobiliers', (req, res) => {
  const query = 'SELECT * FROM immobiliers';

  pool.query(query, (err, results) => {
    if (err) throw err;
    res.render('admin/immobiliers', { immobiliers: results });
  });
});




app.post('/add-immobiliers', upload.single("image"), (req, res) => {
  const { titre, prix, description } = req.body;
  const image = req.file.filename;
  const query = 'INSERT INTO immobiliers (titre, prix, description, image) VALUES (?, ?, ?, ?)';
  pool.query(query, [titre, prix, description, image], (err, result) => {
    if (err) throw err;
    res.redirect(req.headers.referer);
  });
});





// GESTION CATEGORIES

app.get('/show-category', (req, res) => {
  const query = 'SELECT * FROM category';

  pool.query(query, (err, results) => {
    if (err) throw err;
    res.render('admin/categories', { category: results });
  });
});

app.post('/add-category', (req, res) => {
  const { titre } = req.body;
  const query = 'INSERT INTO category (titre) VALUES (?)';

  pool.query(query, [titre], err => {
    if (err) throw err;
    res.redirect(req.headers.referer);
  });
});


app.post('/eddit-category/:id', (req, res) => {
  const { id } = req.params;
  const { titre } = req.body;
  const query = 'UPDATE category SET titre = ? WHERE id = ?';

  pool.query(query, [titre, id], err => {
    if (err) throw err;
    res.redirect(req.headers.referer);
  });
});



app.post('/delete-category/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM category WHERE id = ?';
  pool.query(query, [id], (err) => {
    if (err) throw err;
    res.redirect(req.headers.referer);
  });
});



// GESTION SOUS CATEGORIES


app.get('/show-subcategory', (req, res) => {
  const query = 'SELECT * FROM subcategory';
  const query1 = 'SELECT titre FROM category';

  pool.query(query, (err, results) => {
    if (err) throw err;
    const subcategory = results;
    
    pool.query(query1, (err, results) => {
      if (err) throw err;
      const titre = results.map(result => result.titre);

      res.render('admin/subcategory', { subcategory: subcategory, titre: titre });
    });
  });
});


app.post('/add-subcategory', (req, res) => {
  const { titre, category} = req.body;
  const query = 'INSERT INTO subcategory (titre,category) VALUES (?,?)';

  pool.query(query, [titre, category], err => {
    if (err) throw err;
    res.redirect(req.headers.referer);
  });
});


app.post('/eddit-subcategory/:id', (req, res) => {
  const { id } = req.params;
  const { titre, category} = req.body;
  const query = 'UPDATE subcategory SET titre = ?, category = ? WHERE id = ?';

  pool.query(query, [titre,category, id], err => {
    if (err) throw err;
    res.redirect(req.headers.referer);
  });
});



app.post('/delete-subcategory/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM subcategory WHERE id = ?';
  pool.query(query, [id], (err) => {
    if (err) throw err;
    res.redirect(req.headers.referer);
  });
});



/////////// ============ROUTE POUR PARTIE INTERNAUTE =============//////////////////


app.get('/', (req, res) => {
 
  res.render('shop/index');

});



app.listen(5000, function () {
  console.log("Server started on port 5000");
});
