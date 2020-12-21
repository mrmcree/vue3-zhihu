import { createApp } from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
/*自动引入@component组件*/
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import { camelCase, upperFirst } from "lodash";
const app = createApp(App);
const requireComponents = require.context("@/components", true, /.vue$/);
requireComponents.keys().forEach((__filename: string) => {
  const componentConfig = requireComponents(__filename);
  const componentName = upperFirst(
    camelCase(
      // 获取和目录深度无关的文件名
      __filename
        ?.split("/")
        ?.pop()
        ?.replace(/\.\w+$/, "")
    )
  );
  app.component(componentName, componentConfig.default || componentConfig);
});

app
  .use(store)
  .use(router)
  .mount("#app");
