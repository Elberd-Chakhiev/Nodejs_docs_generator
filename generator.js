/*

// before start generation docs set this steps:

# 1 - cd src/components/Documentation
# 2 - set file.path and file.name
# 3 - node generator.js

*/

const fs = require("fs");

// import fs from "module";

const file = {
  path: "../UI/Alerts/",
  name: "Alert",
  extension: "vue",
};

const PHUSH_NEW_OBJ = `/* add new obj from generator.js DO NOT DELETE THIS STRING */
  {
    link: "${file.name.split("-").join("_")}",
    text: "${file.name}",
    id: ${Date.now()},
    code_example: __${file.name}__content,
    isOpened: false,
    // preview: pathPreview(""),
    child: [],
  },`;

const connect = fs.readFileSync("Content.js").toString();

const getFileContent = () => {
  let textContent = fs
    .readFileSync(`${file.path}${file.name}.${file.extension}`)
    .toString()
    .split("`")
    .join('${"`"}')
    .split("__$")
    .join('__${"$"}')
    .split("_-$")
    .join('_-${"$"}')
    .split("${size}")
    .join('${"$"}{size}')
    .split("${type}")
    .join('${"$"}{type}')
    .split("${state}")
    .join('${"$"}{state}');

  return textContent;
};

fs.writeFile(
  `${file.path}__${file.name.split("-").join("_")}__content.js`,
  `export const __${file.name
    .split("-")
    .join("_")}__content = ${"`"}${getFileContent()}${"`"};\n`,
  (err) => {
    if (err) throw err;

    console.log(
      `was created __${file.name.split("-").join("_")}__content.${
        file.extension
      } on ${file.path}`
    );
  }
);

fs.writeFileSync(
  "Content.js",
  `import { __${file.name.split("-").join("_")}__content } from "${
    file.path
  }__${file.name.split("-").join("_")}__content.js";\n` +
    `${connect
      .split("/* add new obj from generator.js DO NOT DELETE THIS STRING */")
      .join(PHUSH_NEW_OBJ)}`
);
