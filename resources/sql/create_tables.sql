DROP TABLE IF exists Game;
CREATE TABLE Game (
  id SERIAL PRIMARY KEY,
  game_state VARCHAR(8),
  cookies TEXT
);

DROP TABLE IF exists Register;
create TABLE Register (
  id SERIAL PRIMARY KEY,
  player_nr INTEGER,
  player_name VARCHAR(30),
  cookies TEXT
);

DROP TABLE IF exists Player;
create TABLE Player (
  id SERIAL PRIMARY KEY,
  player_turn INTEGER,
  player_nr INTEGER,
  cookies TEXT
);

DROP TABLE IF exists Board;
CREATE TABLE Board (
  id SERIAL PRIMARY KEY,
  x INTEGER,
  y INTEGER,
  value VARCHAR(10),
  player_nr INTEGER,
  cookies TEXT
);

DROP TABLE IF exists result;
create TABLE Result (
  id SERIAL PRIMARY KEY,
  total_shits INTEGER,
  hits INTEGER,
  missed INTEGER,
  player_nr INTEGER,
  cookies TEXT
);

DROP TABLE IF exists Ships;
CREATE TABLE Ships (
  id SERIAL PRIMARY KEY,
  player_nr INTEGER,
  cookies TEXT
);


