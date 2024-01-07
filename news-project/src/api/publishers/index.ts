import BASE_URL from "../BASE_URL";
import axios from "axios";
// import Cookies from 'js-cookie';

// export const getAllArtists = async(name?: string):Promise<Publisher[]>=>{
//     let artists: Publisher[] = [];
//     const token = await Cookies.get('token');
//     if (name) {
//         await axios.get(`${BASE_URL}/publishers?name=${name}`,{
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         })
//         .then((res: AxiosResponse )=>{
//             artists = res.data;
//         } )
//     }
//     else{
//         await axios.get(`${BASE_URL}/publishers`,{
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         })
//         .then((res: AxiosResponse )=>{
//             artists = res.data;
//         } )
//     }

//     return artists;
// }


export const loginPublisher = async (currentPublisher: { publisherName: string; password: string }): Promise<{ status: number; message: string , token?: string} | undefined> => {
    try {
      const response = await axios.post(`${BASE_URL}/publishers/login`, currentPublisher);
      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      return undefined;
    }
  };