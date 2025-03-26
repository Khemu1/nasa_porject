import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SOURCE_FOLDERS = [
  {
    src: path.resolve(__dirname, "..", "data"),
    dest: path.resolve(__dirname, "../../dist/src/data"),
    filterByExtension: true, // Only copy specific file types (e.g., CSVs)
  },
  {
    src: path.resolve(__dirname, "..", "..", "public"),
    dest: path.resolve(__dirname, "../../dist/public"),
    filterByExtension: false, // Copy the entire folder (all files and subdirectories)
  },
];

const FILE_TYPES_TO_COPY = [".csv"];

const copyFilesRecursively = (source, destination, filterByExtension) => {
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }

  const items = fs.readdirSync(source);

  items.forEach((item) => {
    const srcPath = path.join(source, item);
    const destPath = path.join(destination, item);
    const stat = fs.statSync(srcPath);

    if (stat.isDirectory()) {
      copyFilesRecursively(srcPath, destPath, filterByExtension);
    } else if (
      !filterByExtension ||
      FILE_TYPES_TO_COPY.includes(path.extname(item))
    ) {
      fs.copyFileSync(srcPath, destPath);
    }
  });
};

SOURCE_FOLDERS.forEach(({ src, dest, filterByExtension }) => {
  if (fs.existsSync(src)) {
    copyFilesRecursively(src, dest, filterByExtension);
  } else {
    console.warn(`Warning: Source folder "${src}" does not exist.`);
  }
});

console.log("copying operation done");
