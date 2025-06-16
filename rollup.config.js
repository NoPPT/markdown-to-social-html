import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import copy from "rollup-plugin-copy";

export default [
  {
    input: "src/index.ts",
    output: {
      dir: "dist",
      format: "es",
      sourcemap: true,
      preserveModules: true,
      preserveModulesRoot: "src",
    },
    external: [/node_modules/],
    plugins: [
      resolve({
        preferBuiltins: true,
        exportConditions: ["node"],
      }),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
        sourceMap: true,
        inlineSources: true,
      }),
      copy({
        targets: [{ src: "src/**/*.css", dest: "dist" }],
        flatten: false,
        copyOnce: false,
      }),
    ],
  },
];
