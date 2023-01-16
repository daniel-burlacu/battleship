import axios from 'axios';

let host = "http://localhost:3000";

const delay = 5000;

export const addGameStateAndCookieIdToDB = async (_game_state,_cookie) => {
  const config = {
    method:'POST',
    url:host+'/api/addDataToGameDB',
    data:{game_state:_game_state, cookiesId:_cookie},
    headers: {'Content-Type': 'application/json'}
  }

  let res = await axios.request(config).then(function (response) {
    return(
      response.data
    )
  }).catch(function (error) {
    console.error(error);
  });
return res;
}

export const addPlayersToDB = async (_player_name,_palyer_turn, _player_nr, _cookie) => {
  const config = {
    method:'POST',
    url:host+'/api/addDataToPlayersDB',
    data:{player_name:_player_name, player_turn:_palyer_turn, player_nr:_player_nr, cookiesId:_cookie},
    headers: {'Content-Type': 'application/json'}
    
  }

  let res = await axios.request(config).then(function (response) {
    return(
      response.data
    )
  }).catch(function (error) {
    console.error(error);
  });
return res;
}

export const updatePlayerNameInPlayers = async (_player_name, _player_nr, _cookie) => {
  const config = {
    method:'POST',
    url:host+'/api/updatePlayerNameInPlayers',
    data:{player_name:_player_name, player_nr:_player_nr, cookiesId:_cookie},
    headers: {'Content-Type': 'application/json'}
  }

  let res = await axios.request(config).then(function (response) {
    return(
      response.data
    )
  }).catch(function (error) {
    console.error(error);
  });
return res;
}


//x,y,tile_value,player_nr, cookies
//${values.x},${values.y},'${values.tile_value}',${values.player_nr},'${values.cookiesId}
export const updateBoardDataToDB= async (rowsToUpdate) => {

  const config = {
    method:'POST',
    url:host+'/api/updateBoardData',
    data:{rows:rowsToUpdate},
    headers: {'Content-Type': 'application/json'}
  }

  let res = await axios.request(config).then(function (response) {
    return(
      response.data
    )
  }).catch(function (error) {
    console.error(error);
  });
  setTimeout(() => {
    // Code to send the next request
    return res;
  }, delay);
}

export const addDataToBoardDB = async(rowsToInsert)=>{
  console.log("My rows addDataToBoardDB are: "+rowsToInsert[0][0].x);

  const config = {
    method:'POST',
    url:host+'/api/addDataToBoardDB',
    data:{rows:rowsToInsert[0]},
    headers: {'Content-Type': 'application/json'}
  }
  let res = await axios.request(config).then(function (response) {
    return(
      response.data
    )
  }).catch(function (error) {
    console.error(error);
  });
  await new Promise(resolve => setTimeout(resolve, delay));
  return res;
}

export const updateTileValueInBoard = async(_x,_y,_tile_value,_player_nr,cookie)=>{
  const config = {
    method:'POST',
    url:host+'/api/updateTileValueInBoard',
    data:{x:_x,y:_y,tile_value:_tile_value, player_nr:_player_nr, cookiesId:cookie},
    headers: {'Content-Type': 'application/json'}
  }
  let res = await axios.request(config).then(function (response) {
    return(
      response.data
    )
  }).catch(function (error) {
    console.error(error);
  });
  await new Promise(resolve => setTimeout(resolve, delay));
  return res;
}

// /api/addDataToShiptDB

export const addDataToShipsDB = async(rowsToInsert)=>{

  const config = {
    method:'POST',
    url:host+'/api/addDataToShipsDB',
    data:{rows:rowsToInsert},
    headers: {'Content-Type': 'application/json'}
  }
  let res = await axios.request(config).then(function (response) {
    return(
      response.data
    )
  }).catch(function (error) {
    console.error(error);
  });
  await new Promise(resolve => setTimeout(resolve, delay));
  return res;
}

///api/addDataToResultDB

export const insertDataToResultsDB = async(rowsToInsert)=>{
  console.log("adding data to result table ! hits:"+rowsToInsert.rows[0].hits);
  const config = {
    method:'POST',
    url:host+'/api/insertDataToResultsDB',
    data:{rows:rowsToInsert},
    headers: {'Content-Type': 'application/json'}
  }
  let res = await axios.request(config).then(function (response) {
    return(
      response.data
    )
  }).catch(function (error) {
    console.error(error);
  });
  await new Promise(resolve => setTimeout(resolve, delay));
  return res;
}

export const updateHitsToResultsDB= async (cookies,_player_nr,_hits) => {

  const config = {
    method:'POST',
    url:host+'/api/updateHitsResults',
    data:{hits:_hits, player_nr:_player_nr, cookiesId:cookies},
    headers: {'Content-Type': 'application/json'}
  }

  console.log("Calling inside POSTS: updateHitsToResultsDB !!")

  let res = await axios.request(config).then(function (response) {
    return(
      response.data
    )
  }).catch(function (error) {
    console.error(error);
  });
  await new Promise(resolve => setTimeout(resolve, delay));
  return res;
}

export const updateMissedToResultsDB= async (cookies,_player_nr,_missed) => {

  const config = {
    method:'POST',
    url:host+'/api/updateMissedResults',
    data:{missed:_missed, player_nr:_player_nr, cookiesId:cookies},
    headers: {'Content-Type': 'application/json'}
  }

  console.log("Calling inside POSTS: updateMissedToResultsDB !!")

  let res = await axios.request(config).then(function (response) {
    return(
      response.data
    )
  }).catch(function (error) {
    console.error(error);
  });
  await new Promise(resolve => setTimeout(resolve, delay));
  return res;
}

export const updateWinnerToResultsDB= async (cookies,_player_nr,_winner) => {

  const config = {
    method:'POST',
    url:host+'/api/updateWinnerResults',
    data:{winner:_winner, player_nr:_player_nr, cookiesId:cookies},
    headers: {'Content-Type': 'application/json'}
  }

  let res = await axios.request(config).then(function (response) {
    return(
      response.data
    )
  }).catch(function (error) {
    console.error(error);
  });
  await new Promise(resolve => setTimeout(resolve, delay));
  return res;
}

export const updateShipStatusDB= async (_ship_type,_ship_status,_player_nr,cookies) => {
  console.log("Updating ships"+_ship_type+" ,"+_ship_status+" ,"+_player_nr+" ,"+cookies);
  const config = {
    method:'POST',
    url:host+'/api/updateShipStatusInShips',
    data:{ship_type:_ship_type,player_nr:_player_nr, ship_status:_ship_status, cookiesId:cookies},
    headers: {'Content-Type': 'application/json'}
  }

  let res = await axios.request(config).then(function (response) {
    return(
      response.data
    )
  }).catch(function (error) {
    console.error(error);
  });
  await new Promise(resolve => setTimeout(resolve, delay));
  return res;
}

export const updateGameStateInDB= async (_game_state, cookie) => {
  console.log("Updating gamestate: "+_game_state+" ,"+cookie);
  const config = {
    method:'POST',
    url:host+'/api/updateGameStateInGame',
    data:{game_state:_game_state,cookiesId:cookie},
    headers: {'Content-Type': 'application/json'}
  }

  let res = await axios.request(config).then(function (response) {
    return(
      response.data
    )
  }).catch(function (error) {
    console.error(error);
  });
  await new Promise(resolve => setTimeout(resolve, delay));
  return res;
}