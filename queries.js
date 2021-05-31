const express = require("express");
var router = express.Router();

const Pool = require("pg").Pool;
const pool = new Pool({
  user: "uulspqqigiqvs3ce24qm",
  host: "b296itnauwnrvra02tni-postgresql.services.clever-cloud.com",
  database: "b296itnauwnrvra02tni",
  password: "mYGlOMdrVe5PsD3rCElL",
  port: 5432,
});
router.get("/", (request, response) => {
  let query = request.query.q;
  let limit = request.query.limit ? request.query.limit : 4;
  let offset = request.query.offset ? request.query.offset : 0;
  if (query) {
    query = "'" + query.toLocaleUpperCase() + "%" + "'";
    pool.query(
      "SELECT * FROM bank_branches WHERE ifsc LIKE " +
        query +
        "OR branch LIKE " +
        query +
        "OR bank_name LIKE " +
        query +
        "OR address LIKE " +
        query +
        "OR city LIKE " +
        query +
        "OR district LIKE " +
        query +
        "OR state LIKE " +
        query +
        " ORDER BY ifsc ASC LIMIT " +
        limit,
      (error, results) => {
        if (error) {
          response.status(500).json(error);
        } else response.status(200).json(results.rows);
      }
    );
  } else {
    response.send("invalid query");
  }
});
router.get("/autocomplete", (request, response) => {
  let query = request.query.q;
  let limit = request.query.limit ? request.query.limit : 3;
  let offset = request.query.offset ? request.query.offset : 0;
  if (query) {
    query = "'" + query.toLocaleUpperCase() + "%" + "'";
    pool.query(
      "SELECT * FROM bank_branches WHERE branch LIKE " +
        query +
        " ORDER BY ifsc ASC LIMIT " +
        limit,
      (error, results) => {
        if (error) {
          response.status(500).json(error);
        } else response.status(200).json(results.rows);
      }
    );
  } else {
    response.send("invalid query");
  }
});
module.exports = router;
