// container object
var db = {
  mod: {}
};

//set up sql
var pg = require('pg');
var Sequelize = require('sequelize');
db.conn = new Sequelize('musicvote', process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD, {
    host: 'localhost',
    dialect: 'postgres',
    define: {
      timestamps: false
    }
  });

//Models
db.user = db.conn.define('users', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [1, 50]
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [1, 55]
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [3, Infinity]
    },
  }
}, {
  freezeTableName: true,
  instanceMethods: {
    generateHash: function(password) {
      return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    },
    validPassword: function(password) {
      return bcrypt.compareSync(password, this.password);
    },
  }
});

//establish relationships



//tell the port to listen
db.conn.sync({force: false
}).then(function() {
  console.log('sync done')
})

module.exports = db;
