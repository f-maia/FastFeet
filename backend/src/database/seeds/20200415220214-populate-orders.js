const faker = require('faker/locale/pt_BR');

function generateSeeds() {
  const seeds = [];

  for (let i = 0; i < 65; i += 1) {
    const signature_id = i % 4 !== 2 ? null : i / 4 + 14.5;
    const canceled_at = i % 4 < 3 ? null : new Date();
    const start_date = i % 4 === 0 ? null : new Date();
    const end_date = i % 4 < 2 ? null : new Date();

    seeds.push({
      recipient_id: faker.random.number({ min: 1, max: 31 }),
      deliveryman_id: faker.random.number({ min: 1, max: 14 }),
      product: faker.commerce.productName(),
      signature_id,
      canceled_at,
      start_date,
      end_date,
      created_at: new Date(),
      updated_at: new Date(),
    });
  }

  return seeds;
}

module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert('orders', generateSeeds(), {});
  },

  down: QueryInterface => QueryInterface.bulkDelete('orders', null, {}),
};
