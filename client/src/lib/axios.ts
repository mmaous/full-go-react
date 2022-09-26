import axios from 'axios';

// enable axios to work with cors and cookies

// Access-Control-Allow-Origin is set to * by default
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:3003';

// Access-Control-Allow-Credentials is set to false by default
// axios.defaults.withCredentials = false;

// set base url
axios.defaults.baseURL = process.env.SERVER_BASE_URL;

// export axios
export default axios;
