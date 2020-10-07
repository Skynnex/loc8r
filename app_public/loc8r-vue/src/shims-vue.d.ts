declare module "*.vue" {
  import { defineComponent } from "vue";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export default defineComponent({ props: {} as any });
}
