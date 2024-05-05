import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createDeveloperIcon } from "../createDeveloperIcon";

import IconsData from "../icons/icons.data";
import { capitalizeFirstletter } from "../utils/capitalizeFirstLetter";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const svgDir = path.join(__dirname, "../../");

let exportStatement = "";

IconsData.forEach((icon) => {
  //create exportable icon components
  const iconContent = fs.readFileSync(path.join(svgDir, icon.path), "utf-8");
  const iconName = `${icon.name
    .split(/[-. ]+/)
    .map((item) => capitalizeFirstletter(item))
    .join("")}Icon`;

  const component = createDeveloperIcon(iconName, iconContent);
  fs.writeFileSync(
    path.join(__dirname, "../icons", `${iconName}.tsx`),
    component
  );

  exportStatement += `export * from './${iconName}.tsx';`;
});
fs.writeFileSync(path.join(__dirname, "../icons/index.ts"), exportStatement);
