const faker = require('faker/locale/pt_BR');

function generateSeeds() {
  const seeds = [];

  for (let i = 0; i < 31; i += 1) {
    seeds.push({
      name: faker.name.findName(),
      city: faker.address.city(1),
      street: `Rua ${faker.address.streetName()}`,
      state: faker.address.state(),
      number: faker.random.number({ min: 100, max: 999 }),
      zip_code: faker.address.zipCode('########'),
      address_details: faker.random.arrayElement([
        faker.lorem.sentence(),
        null,
      ]),
      created_at: new Date(),
      updated_at: new Date(),
    });
  }

  return seeds;
}

module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert('recipients', generateSeeds(), {});
  },

  down: QueryInterface => QueryInterface.bulkDelete('recipients', null, {}),
};
