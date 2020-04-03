DROP FUNCTION click_game_count_by_color;

CREATE FUNCTION click_game_count_by_color (search_color text)
  RETURNS SETOF click_game_count
  AS $$
DECLARE
  last_clicked_at timestamp;
BEGIN
  -- get the timestamp to be 5 seconds after first click
  SELECT
    (min(clicked_at) + interval '5 second') INTO last_clicked_at
  FROM
    click_game;
  -- count with color and timestamp filters
  RETURN QUERY
  SELECT
    *
  FROM 
  (
    SELECT 
      c.color, count(click_game.color)
    FROM 
    (
      SELECT 'blue' AS color
      UNION
      SELECT 'orange' AS color
    ) AS c
    LEFT JOIN click_game ON c.color = click_game.color
    -- filtered by the timestamp to be 5 seconds after first click
    AND clicked_at <= last_clicked_at 
    GROUP BY
      c.color
  ) AS color_count
  WHERE
    -- $1 == search_color
    color_count.color = $1;
END;
$$
LANGUAGE plpgsql STABLE;
