const faker = require('faker/locale/pt_BR');

function generateSeeds() {
  const seeds = [];

  for (let i = 0; i < 91; i += 1) {
    seeds.push({
      delivery_id: faker.random.number({ min: 0, max: 65 }),
      description: faker.lorem.sentence(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  return seeds;
}

module.exports = generateSeeds();
