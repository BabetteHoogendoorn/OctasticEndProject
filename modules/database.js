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

//Models Spotify
db.spot_user = db.conn.define('spotifyusers', {
  spot_id: Sequelize.STRING,
  spot_name: Sequelize.STRING
})

db.song = db.conn.define('song', {
  song_name: Sequelize.STRING,
  song_artist: Sequelize.STRING
})

db.event = db.conn.define('events', {
  event_name: Sequelize.STRING,
  end_time: Sequelize.STRING
})

db.vote = db.conn.define('votes', {
  vote = Sequelize.INTEGER
})

//establish relationships
db.user.hasMany(db.vote);
db.vote.belongsTo(db.user);

db.song.hasMany(db.vote);
db.vote.belongsTo(db.song);

db.vote.hasMany(db.event);
db.event.belongsTo(db.vote);



//tell the port to listen
db.conn.sync({force: false
}).then(function() {
  console.log('sync done')
})

module.exports = db;
