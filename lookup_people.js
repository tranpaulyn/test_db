const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});



client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  const name = process.argv[2];
  client.query(`SELECT first_name, last_name, birthdate FROM famous_people WHERE first_name = '${name}';` , (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log('Searching ...');
    let count = 0;
    let birthday = '';
    let realBirthday = '';
    // console.log(result.rows)
    console.log(`Found ${result.rowCount} person(s) by the name '${name}'`)
    result.rows.forEach(person => {
        if (person.first_name === name) {
        count += 1
        birthday = person.birthdate.toISOString();
        realBirthday = birthday.slice(0, -14);
        console.log(`- ${count}: ${person.first_name} ${person.last_name}, born '${realBirthday}'`)
      }

    });

    client.end();
  });
});

 

