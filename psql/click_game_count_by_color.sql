DROP FUNCTION IF EXISTS click_game_in_time_range;

CREATE FUNCTION click_game_in_time_range ()
  RETURNS SETOF click_game
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
    FROM click_game WHERE clicked_at <= last_clicked_at;
END;
$$
LANGUAGE plpgsql STABLE;
