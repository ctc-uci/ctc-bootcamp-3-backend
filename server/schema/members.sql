DROP TABLE IF EXISTS members CASCADE;
DROP TYPE IF EXISTS year_standing;
DROP TYPE IF EXISTS ctc_project;

CREATE TYPE year_standing AS ENUM ('1st', '2nd', '3rd', "4th");
CREATE TYPE ctc_project AS ENUM ('AISS', 'FPH', 'S2T', "(Board)");

CREATE TABLE members (
  id              SERIAL PRIMARY KEY,
  member_name     TEXT NOT NULL,
  member_year     year_standing NOT NULL,
  majors_minors   TEXT NOT NULL,
  project         ctc_project NOT NULL,
  mbti            TEXT NOT NULL,
  birthday        TEXT NOT NULL,
  spirit_animal   TEXT NOT NULL,
  bio             TEXT,
  funny_quote     TEXT,
  image_link      TEXT
);
