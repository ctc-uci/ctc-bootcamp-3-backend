const express = require('express');
const { keysToCamel } = require('../common/utils');
const { db } = require('../server/db');

const gameRouter = express.Router();

gameRouter.get('/rps/:memberId', async (req, res) => {
  try {
    const { memberId } = req.params
    const [{move}] = await db.query(`SELECT move FROM rock_paper_scissors WHERE member_id = $1 LIMIT 1;`,  [memberId]);
    res.status(200).json({ memberId, move });
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
});

gameRouter.get('/hangman/:memberId', async (req, res) => {
  try {
    const { memberId } = req.params
    const [{phrase}] = await db.query(`SELECT phrase FROM hangman_phrases WHERE member_id = $1 LIMIT 1;`,  [memberId]);
    res.status(200).json({ memberId, phrase });
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
});

gameRouter.get('/truthslies/:memberId', async (req, res) => {
  try {
    const { memberId } = req.params
    const truths = await db.query(`SELECT truth FROM truths WHERE member_id = $1 LIMIT 2;`,  [memberId]);
    const [{lie}] = await db.query(`SELECT lie FROM lies WHERE member_id = $1 LIMIT 1;`,  [memberId]);
    res.status(200).json({
      truths: truths.map(({truth}) => (truth)),
      lie
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
});


module.exports = gameRouter;
