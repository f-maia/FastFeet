const faker = require('faker/locale/pt_BR');

function generateSeeds() {
  const seeds = [];

  for (let i = 0; i < 30; i += 1) {
    const imageUrl =
      i < 14
        ? faker.image.avatar()
        : `https://picsum.photos/seed/${i}0/500/250.jpg`;

    seeds.push({
      name: '@fastfeet/seedsUrl',
      path: imageUrl,
      created_at: new Date(),
      updated_at: new Date(),
    });
  }

  return seeds;
}

module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert('files', generateSeeds(), {});
  },

  down: QueryInterface => QueryInterface.bulkDelete('files', null, {}),
};
