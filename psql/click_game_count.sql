DROP VIEW click_game_count;

CREATE VIEW click_game_count AS
SELECT
  color,
  count(color) AS count
FROM
  click_game
GROUP BY
  color;