// datauri.js
import DatauriParser from "datauri/parser.js";
import { get } from "http";
import path from "path";

const parser = new DatauriParser();

 const getDataUri = (file) => {
    if (!file || !file.originalname || !file.buffer) {
        throw new Error("Invalid file input"); // Improved error message
    }
    const extName = path.extname(file.originalname).toString();
    return parser.format(extName, file.buffer).content;
};

export default getDataUri;