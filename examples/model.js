const Model = require("../features/Model");

const Device = new Model("orm").create(
  [{ key: "id", type: "string", required: true }], // properties
  "Device", //table name
  "Device" // model name
);


const Lock = Device.extend(
  [
    { key: "col1", type: "string" },
    { key: "col2", type: "string" },
  ], // properties
  "Lock", //table name
  "Lock" // model name
);

console.log(Device);
console.log(Lock)