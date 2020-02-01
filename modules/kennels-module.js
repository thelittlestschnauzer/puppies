const db = require("../data/dbConfig.js");

const Dogs = require("./dogs-module.js")

module.exports = {
  find, 
  findById,
  add,
  remove
};

async function find() {
  const kennels = await db("kennels")
  const fullKennel = await Promise.all(kennels.map(kennel => findById(kennel.id)))
  return fullKennel;
}
async function findById(id) {
  const kennel = await db("kennels").where({id}).first();
  const doggos = await db("dogs").where({"kennel_id": id})
  const fullDogs = await Promise.all(doggos.map(dog => Dogs.findById(dog.id)))
  return {...kennel, dogs:fullDogs}
}
async function add(kennel){
  const [id] = await db('kennels').insert(kennel);
  return findById(id);
}
function remove(id){
  return db("kennels").whereRaw({id}).del();
}

module.exports = {}