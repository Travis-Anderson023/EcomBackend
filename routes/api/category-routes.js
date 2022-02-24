const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const dbCategoryData = await Category.findAll({
      include: [
        {
          model: Product
        }
      ]
    })
    await res.json(dbCategoryData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const dbCategoryData = await Category.findOne({

      where: {
        id: req.params.id
      },
      include: [
        {
          model: Product
        }
      ]
    });
    if (!dbCategoryData) {
      return res.status(400).json({ message: "invalid Category id" })
    }
    res.json(dbCategoryData)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
});


router.post('/', async (req, res) => {
  try {
    const dbCategoryData = await Category.create({
      category_name: req.body.category_name
    });
    res.json(dbCategoryData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const dbCategoryData = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    if (!dbCategoryData) {
      return res.status(400).json({ message: "invalid Category id" })
    }
    res.json(dbCategoryData)
  } catch {
    console.log(err)
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const dbCategoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!dbCategoryData) {
      return res.status(400).json({ message: "invalid Category id" })
    }
    res.json(dbCategoryData)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
});

module.exports = router;
