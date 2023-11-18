DROP TABLE IF EXISTS rock_paper_scissors CASCADE;
DROP TYPE IF EXISTS rps_moves;

CREATE TYPE rps_moves AS ENUM ('Rock', 'Paper', 'Scissors');

CREATE TABLE rock_paper_scissors (
  member_id   INTEGER PRIMARY KEY REFERENCES members(id) ON DELETE CASCADE ON UPDATE CASCADE,
  move        rps_moves NOT NULL
);
