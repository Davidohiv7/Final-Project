const server = require('../app');
const db = require('../database/models');
const supertest = require('supertest');

const request = supertest(server);

describe('Product endpoint', () => {

  let data = {};

  beforeAll(async () => {
    await db.sequelize.authenticate();
    await db.sequelize.sync({ force: true });

    const pacifico = await db.Product.create({
      name: 'Pacifico',
      description: "Classic Pacifico beer 355 ml",
      price: 5.00,
      stock: 100,
      score: 5.0,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Create test categories
    const beveragesCategory = await db.Category.create({
      name: 'Beverages'
    });
    const beerCategory = await db.Category.create({
      name: 'Beer'
    });
    const importedBeerCategory = await db.Category.create({
      name: "Imported Beer"
    });
    const categories = [beveragesCategory, beerCategory];

    // Create test images
    const pacificoImage01 = await db.Image.create({
      url: "http://cloudinary.com/pacifico01.png",
      productId: pacifico.id
    });
    const pacificoImage02 = await db.Image.create({
      url: "http://cloudinary.com/pacifico02.png",
      productId: pacifico.id
    });
    const pacificoImage03 = await db.Image.create({
      url: "http://cloudinary.com/pacifico03.png",
      productId: pacifico.id
    });
    const images = [pacificoImage01, pacificoImage02];

    await pacifico.addCategories(categories);
    await pacifico.addImages(images);

    // Save data in global object
    data.id = pacifico.id;
    data.name = "Cerveza Pacifico";
    data.description = "Classic Pacifico beer 355 ml",
    data.price = 5.00,
    data.stock = 100,
    data.score = 5.0,

    data.images = [
      pacificoImage01.url,
      pacificoImage02.url,
      pacificoImage03.url  
    ];
    data.categories = [
      beveragesCategory.name,
      beerCategory.name,
      importedBeerCategory.name
    ];

  })

  it ("should update product", async () => {
    const res = await request.put("/products").send(data);
    const addedProductCategories = await db.ProductCategory.findAll();
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.data.name).toBe("Cerveza Pacifico");
    expect(addedProductCategories).toHaveLength(3);
  })

  it ("should return 404 if product to update is not found", async () => {
    const res = await request.put("/products").send({ id: 999, name: "Tecate" });
    expect(res.statusCode).toEqual(404);
  })

  it ("should delete a product", async () => {
    const corona = await db.Product.create({
      name: 'Corona',
      description: "Classic Corona beer 355 ml",
      price: 6.00,
      stock: 200,
      score: 5.0,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const coronaImage01 = await db.Image.create({
      url: "http://cloudinary.com/corona01.png",
      productId: corona.id
    });

    const res = await request.delete(`/products/${corona.id}`);
    const coronas = await db.Product.findAll({ where: { name: "Corona" } });

    expect(res.statusCode).toEqual(200);
    expect(res.body.data.message).toBe("Product deleted successfully.");
    expect(coronas).toHaveLength(0);

  })

  it ("should return 404 if product to delete is not found", async () => {
    const res = await request.delete(`/products/999`);
    expect(res.statusCode).toEqual(404);
  })

  afterAll(async () => {
    await db.sequelize.close();
  })
})
