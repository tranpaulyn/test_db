const env = process.env.NODE_ENV || 'development';
const knexConfig = require('./knexfile');
const knex = require('knex')(knexConfig[env]);


knex('famous_people').asCallback((err, rows) => {
    let count = 0;
    let birthday = '';
    let realBirthday = '';
    const name = process.argv[2];
    console.log(`Found person(s) by the name '${name}'`)
    rows.forEach(row => {
        if (row.first_name === name) {
            count += 1
            birthday = row.birthdate.toISOString();
            realBirthday = birthday.slice(0, -14);
            console.log(`- ${count}: ${row.first_name} ${row.last_name}, born '${realBirthday}'`)
        }
    });
    knex.destroy();
});