const faker = require('faker/locale/pt_BR');

function generateSeeds() {
  const seeds = [];

  for (let i = 1; i <= 14; i += 1) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();

    seeds.push({
      name: `${firstName} ${lastName}`,
      email: faker.internet.email(firstName, lastName, 'fastfeet.com'),
      avatar_id: i,
      created_at: new Date(),
      updated_at: new Date(),
    });
  }

  return seeds;
}

module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert('deliverers', generateSeeds(), {});
  },

  down: QueryInterface => QueryInterface.bulkDelete('deliverers', null, {}),
};
