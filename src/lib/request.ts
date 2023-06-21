import type  {Results} from '@/decoder/shows';
import axios from 'axios';

const apiPath: string = 'https://cors-anywhere.herokuapp.com/https://api.tvmaze.com/shows';

// Due the only request, i'm squashing it all in one piece
export const getPopularFilms = (): Promise<void> => 
  axios
    .get<Results>(
      apiPath,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
    )
    .then(response =>  
      window.localStorage.setItem(
        'PopularFilms', 
        JSON.stringify({
          results: response.data
        }))
      )
    .catch(error => {
      console.log(`Impossibile recuperare la risposta (${error})`);
      return window.localStorage.setItem('UseMockData', 'true')
    });