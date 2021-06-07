import { readFileSync } from "fs";
import { Metadata } from "../models/metadata";

const metaDataJSON = readFileSync('metadata.json', 'utf-8');

export const METADATA: Metadata = JSON.parse(metaDataJSON);
