-- kinda an antipattern to put two schemas in one file,
-- but this organziation groups inseparable features together,
-- which i think is nicer from an architecture/maintenance standpoint (andrew)

DROP TABLE IF EXISTS truths CASCADE;
DROP TABLE IF EXISTS lies CASCADE;

-- need a separate primary key since member_id to truths is a 1:N relation.
-- could also have been done with a combined primary key
CREATE TABLE truths (
  id          SERIAL PRIMARY KEY,
  member_id   INTEGER REFERENCES members(id) ON DELETE CASCADE ON UPDATE CASCADE,
  truth       TEXT NOT NULL
);


CREATE TABLE lies (
  member_id   INTEGER PRIMARY KEY REFERENCES members(id) ON DELETE CASCADE ON UPDATE CASCADE,
  lie         TEXT NOT NULL
);
