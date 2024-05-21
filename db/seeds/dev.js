exports.seed = async function(knex) {
  await knex.raw('TRUNCATE TABLE "users" CASCADE');
  await knex('users').insert([
    {
      id: 1,
      name: "user1",
      email: "test1@gmail.com",
      password: "123"
    }
  ]);
  await knex('contact').del();

  // Inserts seed entries
  await knex('contact').insert([
    {id: 1, name: 'John Doe', email: 'johndoe@example.com', phone: '123-456-7890'},
  
  ]);
};
