# clpsec-game

## Database
### click_game
1. color: orange / blue
2. clicked_at: timestamp
3. select count(1) from click_game where (
    clicked_at - (select min(clicked_at) from click_game order by clicked_at) < 5
) group by color

## UI
### Dashboard
1. Subscription  
Update UI only orange or blue count is not 0.
    * Chart statistics of click counts per second
        - Spine chart
    * Click counts of orange and blue
        - Stop count at 5 second after the first click

2. Mutation
  ```
  delete * from click_game
  ```

### Client   
1. Mutation  
Increate count by 1 for each click