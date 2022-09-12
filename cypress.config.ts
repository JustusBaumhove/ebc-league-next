import { defineConfig } from "cypress";

export default defineConfig({
  projectId: '7ghqhb',
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
