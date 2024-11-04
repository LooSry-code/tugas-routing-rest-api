import express, { Request, Response } from "express";
const path = require("path");
const PORT = 3000;
express.static("public");

function init() {
  const app = express();
  app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
      message: "OK",
      data: null,
    });
  });

app.use(express.static(path.join(__dirname, '../public')));

  app.use(express.json());

  const categories = [
    { id: 1, name: 'Elektronik' },
    { id: 2, name: 'Perabotan'}
  ];

  const products = [
    { id: 1, name: 'Laptop', category: 'Elektronik' },
    { id: 2, name: 'Meja', category: 'Perabotan' }
  ];

  app.get("/hello", (req, res) => {
    res.json({
      message: 'Success fetch message',
      data: 'Hello World!'
    });
  });

  app.get("/user", (req, res) => {
    res.json({
      message: "Succes fetch user",
      data: {
        id: 1,
        name: "Budi",
        username: "budidu",
        email: "budidu@gmail.com"
      }
    })
  })

  // Route GET untuk daftar kategori
  app.get("/categories", (req, res) => {
    res.json({
      message: "Success fetch categories",
      data: categories
    });
  });

  // Route GET untuk detail kategori berdasarkan ID
  app.get("/categories/:id", (req, res) => {
    const categoryId = parseInt(req.params.id);
    const category = categories.find(c => c.id === categoryId);

    if (category) {
      res.json({
        message: "Success fetch category",
        data: category
      });
    } else {
      res.status(404).json({
        message: 'Category not found'
      });
    }
  });

  // Route POST untuk menambahkan kategori baru
  app.post("/categories", (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        message: 'Name is required'
      });
    }

    const newCategory = { id: categories.length + 1, name };

    categories.push(newCategory)

    res.status(201).json({
      message: 'Category created',
      data: newCategory
    });
  });

  // Route PUT untuk memperbarui kategori
  app.put("/categories/:id", (req, res) => {
    const categoryId = parseInt(req.params.id);
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        message: 'Name is required'
      });
    }
    const categoryIndex = categories.findIndex(c => c.id === categoryId);
    if (categoryIndex === -1) {
      return res.status(404).json({
        message: "Category not found"
      });
    }

    const updatedCategory = { id: categoryId, name };
    categories[categoryIndex] = updatedCategory;

    res.json({
      message: 'Category updated',
      data: updatedCategory
    });
  });

  // Route DELETE untuk menghapus kategori
  app.delete("/categories/:id", (req, res) => {
    const categoryId = parseInt(req.params.id);

    const categoryIndex = categories.findIndex(c => c.id === categoryId);
    if (categoryIndex === -1) {
      return res.status(404).json({
        message: 'Category not found'
      });
    } 

    const deletedCategory = categories.splice(categoryIndex, 1)[0];

    res.json({
      message: 'Category deleted',
      data: deletedCategory
    });
  });

  //Route GET untuk mencari produk berdasarkan nama
  app.get('/products', (req, res) => {
    const { name } = req.query;
    let filteredProducts = products;

    if (name) {
      filteredProducts = products.filter(p => p.name.toLowerCase().includes(name.toLocaleString()));
    }

    res.json({
      message: 'Success fetch products',
      data: filteredProducts
    });
  });

  // Route GET untuk mendapatkan produk dalam kategori tertentu
  app.get("/products", (req, res) => {
    const { category, name } = req.query;
    let filteredProducts = products;

    if (category) {
      filteredProducts = products.filter(p => p.category === category);
    }

    if (name) {
      filteredProducts = filteredProducts.filter(p => p.name.toLowerCase().includes(name.toLocaleString()));
    }
    
    res.json({
      message: 'Success fetch products',
      data: filteredProducts
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

init();
