const express = require('express');
const { keysToCamel } = require('../common/utils');
const { db } = require('../server/db');

const memberRouter = express.Router();

memberRouter.get('/', async (req, res) => {
  try {
    const basicUserInfo = await db.query(`SELECT id, member_name, member_year, project FROM members;`);
    res.status(200).json(keysToCamel(basicUserInfo));
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
});


memberRouter.get('/ids', async (req, res) => {
  try {
    const ids = await db.query(`SELECT id FROM members;`);
    res.status(200).json(ids.map(({id})=>(id)));
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
});

memberRouter.get('/:member_id', async (req, res) => {
  try {
    const { member_id } = req.params;
    const memberInfo = await db.query(`SELECT * FROM members WHERE id = $1;`,  [member_id]);
    res.status(200).json(keysToCamel(memberInfo));
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
});


module.exports = memberRouter;
