const { model } = require("../models/Shop.model");
const Shop = require("../models/Shop.model");

module.exports.create = (shop) => {
  return Shop.create(shop);
};

module.exports.find = () => {
  return Shop.find({});
};

module.exports.findById = (id) => {
  return Shop.findById(id);
};

module.exports.update = (id, shop) => {
  return Shop.findByIdAndUpdate(id, shop);
};

module.exports.delete = (id) => {
  return Shop.findByIdAndDelete(id);
};
