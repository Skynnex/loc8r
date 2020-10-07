import { mount } from "@vue/test-utils";
import RatingToStars from "@/components/RatingToStars.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

describe("RatingToStars.vue", () => {
  test("should display 3 full stars and 2 empty", () => {
    const wrapper = mount(RatingToStars, { props: { rating: 3 } });

    const spanList = wrapper.findAll("span");
    expect(spanList).toHaveLength(6);

    // const iconList = wrapper.findAllComponents();
    // expect(iconList).toHaveLength(5);

    // const iconFullStar = iconList[0];
    // expect(iconFullStar).toBeDefined();

    // const imgEmptyStar = iconList[4];
    // expect(imgEmptyStar).toBeDefined();
  });
});
