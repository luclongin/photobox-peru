module.exports = {
      HOST: "mysql.luclongin.com",
      USER: "luclongin",
      PASSWORD: "LucLis2022!",
      DB: "photobox_peru",
      dialect: "mysql",
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    };
    