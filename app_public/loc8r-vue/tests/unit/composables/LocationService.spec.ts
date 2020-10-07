import axios, { AxiosResponse } from "axios";
import { useLocationService } from "@/composables/LocationService";
import { LocationModel } from "@/models/LocationModel";

describe("useLocationService", () => {
  test("should list locations", async () => {
    const locationService = useLocationService();
    const response = {
      data: [
        {
          id: "123fg",
          name: "Abc",
          adress: "machin",
          rating: 4,
          facilities: ["wh", "je", "ap"],
          distance: "125"
        },
        {
          id: "456aze",
          name: "Def",
          adress: "truc",
          rating: 3,
          facilities: ["wh", "je", "ap"],
          distance: "300"
        }
      ]
    } as AxiosResponse<Array<LocationModel>>;
    jest.spyOn(axios, "get").mockResolvedValue(response);

    const locations = await locationService.list();
    const params = {
      lng: 0.2185714,
      lat: 47.9791214,
      maxDistance: 5000
    };
    expect(
      axios.get
    ).toHaveBeenCalledWith("http://localhost:3000/api/locations", { params });
    expect(locations).toHaveLength(2);
  });
});
