const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const dbTagData = await Tag.findAll({
      include: [
        {
          model: Product,
          through: ProductTag,
          as: 'product_tags',
        },
      ],
    });
    res.json(dbTagData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const dbTagData = await Tag.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Product,
          through: ProductTag,
          as: 'product_tags',
        },
      ],
    });
    if (!dbTagData) {
      return res.status(400).json({ message: 'Invalid tag id' });
    }
    res.json(dbTagData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const dbTagData = await Tag.create(req.body);
    res.json(dbTagData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const dbTagData = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    if (!dbTagData) {
      return res.status(400).json({ message: 'Invalid tag id' });
    }
    res.json(dbTagData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const dbTagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!dbTagData) {
      return res.status(400).json({ message: 'Invalid tag id' });
    }
    res.json(dbTagData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
