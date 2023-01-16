import axios from 'axios';

let host = "http://localhost:3000";

export const getNewCookie = async () => {
    const options = {
      method: 'GET',
      url: host+'/api/getNewCookie',
    };

    const res = await axios.request(options).then(function (response) {
      let dt=response.data;
      console.log("/api/getNewCookie => Get Request - my cookie is:"+dt.status);
      return dt;
    //  console.log("My dt is: "+dt.nfts[0].data);

    }).catch(function (error) {
      console.error(error);
    });

    return res;
  }

 

  export const checkifCookieIdExistsInDb = async (_cookieId) => {
    const options = {
      method: 'GET',
      url: host+'/api/checkForCookieIdExists',
      params: {cookieId:_cookieId},
    };

    const res = await axios.request(options).then(function (response) {
      return response.data;

    }).catch(function (error) {
      console.error(error);
    });
    console.log("/api/checkForCookieIdExists => Get Request - my cookieId is:"+res.result);

    return res;
    
  }

  export const getGameStateFromDB = async (_cookieId) => {
  
    const options = {
        method: 'GET',
        url: host+'/api/getGameState',
        params: {cookieId:_cookieId},
      };

      const res = await axios.request(options).then(function (response) {
        return response.data;
  
      }).catch(function (error) {
        console.error(error);
      });
      console.log("/api/getGameState => Get Request - my cookieId is:"+res.result.game_state);
      
      return res;
}

export const retrievePlayersName = async (_cookieId, _player_nr) => {
  
    const options = {
        method: 'GET',
        url: host+'/api/getPlayersName',
        params: {cookieId:_cookieId, player_nr:_player_nr},
      };

      const res = await axios.request(options).then(function (response) {
        return response.data;
  
      }).catch(function (error) {
        console.error(error);
      });
      console.log("/api/getPlayersName => Get Request - my cookieId is:"+res);
      
      return res;
}

export const retrieveGameWinner = async (_cookieId) => {
  
    const options = {
        method: 'GET',
        url: host+'/api/getPlayerWinner',
        params: {cookieId:_cookieId},
      };

      const res = await axios.request(options).then(function (response) {
        return response.data;
  
      }).catch(function (error) {
        console.error(error);
      });
      console.log("/api/getPlayerWinner => Get Request - my cookieId is:"+res);
      
      return res;
}



export const checkIfPlayerNamesExistsInPlayersDB= async (_cookieId) => {
  
    const options = {
        method: 'GET',
        url: host+'/api/checkForPlayers',
        params: {cookieId:_cookieId},
      };

      const res = await axios.request(options).then(function (response) {
        return response.data;
  
      }).catch(function (error) {
        console.error(error);
      });
      console.log("/api/checkForPlayers => Get Request - my cookieId is:"+res);
      
      return res;
}

//GET BOARD 

///api/checkForCookie
export const checkInBoardForCookie= async (_cookieId) => {
  
  const options = {
      method: 'GET',
      url: host+'/api/checkForCookie',
      params: {cookieId:_cookieId},
    };

    const res = await axios.request(options).then(function (response) {
      return response.data;

    }).catch(function (error) {
      console.error(error);
    });
    console.log("/api/checkForCookie => Get Request - my cookieId is:"+res);
    
    return res;
}
