/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('craigslist', { 
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    post_links: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    post_titles: {
      type: DataTypes.STRING,
      allowNull: true,
    },
     data_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    repost_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
     age: {
      type: DataTypes.STRING,
      allowNull: true,
    },
     location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    body_type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    race_pref: {
      type: DataTypes.STRING,
      allowNull: true,
    }, 
    post_text: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: false,
    freezeTableName: true
  });
};
