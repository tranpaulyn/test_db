const env = process.env.NODE_ENV || 'development';
const knexConfig = require('./knexfile');
const knex = require('knex')(knexConfig[env]);


const firstName = process.argv[2];
const lastName = process.argv[3];
const birthdate = process.argv[4];

console.log(firstName);
console.log(lastName);
console.log(birthdate);


const addPerson = {
    first_name: firstName,
    last_name: lastName,
    birthdate: birthdate
};

knex('famous_people').insert(addPerson).asCallback((err, res) => {
    console.log(res);
})


knex.destroy();