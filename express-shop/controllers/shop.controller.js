const shopService = require("../services/shop.service");

module.exports.create = async (req, res, next) => {
  try {
    const shop = await shopService.create(req.body);
    return res.status(200).json(shop);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports.getAll = async (req, res, next) => {
  try {
    const shops = await shopService.find();
    return res.status(200).json(shops);
  } catch (err) {
    console.error(e);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports.getById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const shop = await shopService.findById(id);
    return res.status(200).json(shop);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports.updateById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const shop = await shopService.update(id, req.body);
    return res.status(200).json(shop);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports.deleteById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const shop = await shopService.delete(id);
    return res.status(200).json(shop);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
