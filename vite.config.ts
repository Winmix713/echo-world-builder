
import react from "@vitejs/plugin-react";
import {defineConfig} from "vite";
import * as babel from "@babel/core";
import {SourceMapConsumer} from "source-map-js";
import type {Plugin} from "vite";
import type {RawSourceMap} from "source-map-js";
import type {NodePath} from "@babel/traverse";
import type * as BabelTypes from "@babel/types";

// Inline implementation of the babel plugin
function babelPluginInjectDataLocator(
  babelAPI: {types: typeof BabelTypes; assertVersion: (version: number) => void},
  options: {inputSourceMap?: RawSourceMap | string; types: typeof BabelTypes}
) {
  babelAPI.assertVersion(7);
  const t = babelAPI.types;
  const consumerHolder: {consumer?: SourceMapConsumer} = {};

  return {
    name: "inject-data-locator-original-source",
    post() {
      consumerHolder.consumer = undefined;
    },
    pre(file: {opts: {filename?: string; [key: string]: unknown}}) {
      if (options.inputSourceMap) {
        try {
          let rawMap: RawSourceMap;
          if (typeof options.inputSourceMap === "string") {
            rawMap = JSON.parse(options.inputSourceMap) as RawSourceMap;
          } else {
            rawMap = options.inputSourceMap;
          }
          consumerHolder.consumer = new SourceMapConsumer(rawMap);
        } catch (errCaught: unknown) {
          const error = errCaught as Error & {message: string};
          console.warn(
            `[inject-data-locator-original-source] Failed to initialize SourceMapConsumer for ${file.opts.filename}:`,
            error.message
          );
          consumerHolder.consumer = undefined;
        }
      } else {
        consumerHolder.consumer = undefined;
      }
    },
    visitor: {
      JSXElement(path: NodePath<BabelTypes.JSXElement>, state: {file: {opts: {filename?: string; [key: string]: unknown}}}) {
        const currentConsumer = consumerHolder.consumer;
        const openingElement = path.node.openingElement;
        const attributes = openingElement.attributes;
        const filename = state.file.opts.filename || "unknown";

        let filePath = filename;
        const srcIndex = filename.lastIndexOf("/src/");
        if (srcIndex !== -1) {
          filePath = filename.substring(srcIndex + 1);
        } else {
          filePath = filename.split("/").pop() || filename;
        }

        if (t.isJSXIdentifier(openingElement.name) && openingElement.name.name === "Fragment") {
          return;
        }

        const hasDataLocator = attributes.some(
          (attr) => t.isJSXAttribute(attr) && attr.name.name === "data-locator"
        );

        if (!hasDataLocator && path.node.loc) {
          let elementName = "Unknown";
          if (t.isJSXIdentifier(openingElement.name)) {
            elementName = openingElement.name.name;
          } else if (t.isJSXMemberExpression(openingElement.name)) {
            elementName = openingElement.name.property.name;
          }

          const {start} = path.node.loc;
          let finalLine = start.line;
          let finalColumn = start.column;
          let mapped = false;

          if (currentConsumer) {
            try {
              const originalPosition = currentConsumer.originalPositionFor({
                column: start.column,
                line: start.line,
              });

              if (originalPosition && originalPosition.line != null && originalPosition.column != null) {
                finalLine = originalPosition.line;
                finalColumn = originalPosition.column;
                mapped = true;
              }
            } catch (errCaught: unknown) {
              const error = errCaught as Error & {message: string};
              console.warn(
                `[inject-data-locator-original-source] Error during source map lookup for ${elementName} in ${filename}:L${start.line}:C${start.column}`,
                error.message
              );
            }
          }

          const locatorValue = `${filePath}:${elementName}:${finalLine}:${finalColumn}`;
          const dataLocatorAttr = t.jsxAttribute(
            t.jsxIdentifier("data-locator"),
            t.stringLiteral(locatorValue)
          );

          openingElement.attributes.push(dataLocatorAttr);
        }
      },
    },
  };
}

// Inline implementation of the vite plugin
function vitePluginInjectDataLocator(): Plugin {
  return {
    enforce: "pre",
    name: "vite-plugin-inject-data-locator",

    async transform(code, id) {
      if (!/\.(jsx|tsx)$/.test(id)) {
        return null;
      }

      const inputSourceMap = this.getCombinedSourcemap();

      try {
        const result = babel.transformSync(code, {
          ast: false,
          babelrc: false,
          configFile: false,
          filename: id,
          inputSourceMap: inputSourceMap,
          plugins: [
            [
              babelPluginInjectDataLocator,
              {
                inputSourceMap: inputSourceMap,
                types: babel.types,
              },
            ],
          ],
          presets: [["@babel/preset-react", {runtime: "automatic"}], "@babel/preset-typescript"],
          sourceMaps: true,
        });

        if (result?.code) {
          return {
            code: result.code,
            map: result.map,
          };
        }
      } catch (error) {
        console.error(`Error transforming ${id}:`, error);
      }

      return null;
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), vitePluginInjectDataLocator()],
  server: {
    port: 8080,
    allowedHosts: true,
  },
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
