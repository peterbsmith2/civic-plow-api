/**
 * CoordsController
 *
 * @description :: Server-side logic for managing coords
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  closest: function (req, res) {
    const lat = req.body.latitude;
    const long = req.body.longitude;
    const query = `SELECT latitude, longitude, address, date_fixed, truck_name,
      (DEGREES(
        ACOS(
          SIN(RADIANS(?)) * SIN(RADIANS(latitude)) +
          COS(RADIANS(?)) * COS(RADIANS(latitude)) *
          COS(RADIANS(? - longitude))
        )
      ) * 60 * 1.1515)
    AS distance FROM plow ORDER BY distance ASC LIMIT 20`;

    Plow.query(query, [lat, lat, long], (err, plows) => {
      if (err) {
        console.dir(err);
        res.status(400).send('err');
      }
      res.json(plows);
    });
  },
  lastTen: function (req, res) {
    Plow.find({}).limit(10).exec((err, plow) => {
      if (err) {
        res.status(400).send('err');
      }
      res.json(plow);
    })
  }
};

