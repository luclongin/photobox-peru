const db = require("../models");
const Photo = db.photos;
const Op = db.Sequelize.Op;

exports.createPhoto = (req, res) => {
  // Validate request
  const data = Object.assign({}, req.body);
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const newPhoto = {
    photoId: data.photoId,
    orderId: data.orderId,
    photoName: data.photoName
  };

  // Save Photo in the database
  Photo.create(newPhoto).then(data => {
    console.log("Finished creating photo entry:", data);
    res.send(data);
  }).catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
};


exports.uploadPhoto = (req, res) => {
      if (req.files === null) {
        return res.status(400).json({ msg: "No file was uploaded" });
      }
      
      let fileValues;
      const file = Object.assign({}, req.files.file);
      try {
        if (req.files.file.name.length > 0) {
          // if you can access this, then ony one image uploaded
          fileValues = [file];
        }
      } catch (e) {
        // else it's an array
        fileValues = Object.values(file);
      }
    
      fileValues.forEach(item => {
        item.mv(`${__dirname}/../public/uploads/${item.name}`, (err) => {
          if (err) {
            console.error(err);
            return res.status(500).send(err);
          }
        });
        console.log('photo uploaded: ', item.name);
      });
    
      return;
};

exports.getPhotos = (req, res) => {
  Photo.findAll().then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message:
          err.message || "Some error occurred while retrieving uploaded photos."
      });
  });
}