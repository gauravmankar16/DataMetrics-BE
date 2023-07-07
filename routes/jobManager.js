const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "nikola",
  password: "password",
  port: 5436,
});

router.post("/save", auth.verifyToken, async function (req, res, next) {
  try {
    let { username, email, password } = req.body;
    console.log(req.body);
  } catch (error) {
    res.send({ status: 0, error: error });
  }
});

router.get("/get", auth.verifyToken, async (req, res, next) => {
  try {
    const query = `Select * FROM job_details`;
    let temp = {
      jobs: []
    }
    const result = await pool.query(query);
    console.log(result, 'temp');
    if (result?.rows?.length > 0) {
      result.rows.forEach(element => {
        temp.jobs.push({
          deviceId: element.device,
          jobName: element.job,
          expectedOp: element.expected,
          actualOp: element.actual,
          startTime: '',
          endTime: '',
          operatorName: element.operator
        });
      }); 
    }
    res.send({ status: 1, data: temp });

  } catch (error) {
    res.send({ status: 0, error: error });
  }
});
module.exports = router;
