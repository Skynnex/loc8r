import { mount } from "@vue/test-utils";
import Location from "@/components/Location.vue";
import { LocationModel } from "@/models/LocationModel";
import RatingToStars from "@/components/RatingToStars.vue";

describe("Location.vue", () => {
  test("should display a location name and his properties", () => {
    const locationModel = {
      id: "123AZE",
      name: "Truc",
      adress: "123 rue abc",
      rating: 3,
      facilities: ["abcd", "efgh"],
      distance: "200m"
    } as LocationModel;

    const wrapper = mount(Location, {
      props: { locationModel }
    });

    const url = wrapper.vm.locationUrl;
    expect(url).toBe("/location/123AZE");

    const locationName = wrapper.get("h4");
    expect(locationName.text()).toContain("Truc");

    const locationRating = wrapper.findComponent(RatingToStars);
    expect(locationRating).toBeDefined();

    const locationAdress = wrapper.get("p");
    expect(locationAdress.text()).toContain("123 rue");

    const locationFacilities = wrapper.find("#facilities");
    expect(locationFacilities).toBeTruthy();
    expect(locationFacilities.findAll("span")).toHaveLength(2);

    const facilitiesSpan = locationFacilities.findAll("span");
    expect(facilitiesSpan[0].text()).toBe("abcd");
    expect(facilitiesSpan[1].text()).toBe("efgh");
  });
});
