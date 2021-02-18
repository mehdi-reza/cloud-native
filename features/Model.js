const create = function (properties, tableName, modelName) {
  if (this.modelName !== undefined)
    throw "Use Model.create() to create a Model";

  const model = Object.create(Object.getPrototypeOf(this));
  model.properties = properties;
  model.tableName = tableName;
  model.modelName = modelName;
  model.hierarchy = modelName ? [modelName] : [];
  return model;
};

const extend = function (properties, tableName, modelName) {
  const extended = Object.create(Object.getPrototypeOf(this));
  extended.properties = this.properties.concat(properties);
  if (modelName) extended.hierarchy = [modelName].concat(this.hierarchy);

  extended.tableName = tableName;
  extended.modelName = modelName;
  return extended;
};

class Model {
  constructor(orm) {
    Object.getPrototypeOf(this).getOrm = () => orm;
    Object.getPrototypeOf(this).create = create;
    Object.getPrototypeOf(this).extend = extend;
  }
}

module.exports = Model;