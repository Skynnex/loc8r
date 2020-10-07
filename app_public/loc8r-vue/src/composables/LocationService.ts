import { LocationModel } from "@/models/LocationModel";
import axios from "axios";

export function useLocationService() {
  return {
    async list(){
      const params = { //L'API attend des coordonnées GPS
        lng: 0.2185714,
        lat: 47.9791214,
        maxDistance: 5000
      };
      const response = await axios.get<Array<LocationModel>>(
        "http://localhost:3000/api/locations",
        { params }
      );
      console.log(`Statut de la réponse : ${response.status}`);
      console.log(`Données de la réponse :`);
      console.log(response.data);
      
      return Promise.resolve(response.data);
    }
  };
}
