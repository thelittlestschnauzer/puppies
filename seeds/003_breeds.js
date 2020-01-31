const faker = require('faker');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('breeds').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('breeds').insert([
        {"name": faker.commerce.color()},
        {"name": faker.commerce.color()},
        {"name": faker.commerce.color()},
        {"name": faker.commerce.color()},
        {"name": faker.commerce.color()}
      ]);
    });
};
