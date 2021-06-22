import { readFileSync, outputFileSync } from "fs-extra";
import { Metadata } from "../models/metadata";
import { PublicMetadata } from "../models/public-metadata";

const PUBLIC_METADATA_PATH = 'public/metadata.json';
const PRIVATE_METADATA_PATH = 'metadata.json';


export function getPublicMetadata(): PublicMetadata {
    const publicMetadataJSON = readFileSync(PUBLIC_METADATA_PATH, 'utf-8');
    return publicMetadataJSON ? JSON.parse(publicMetadataJSON) : {};
}

export function getPrivateMetadata(): Metadata {
    const privateMetadataJSON = readFileSync(PRIVATE_METADATA_PATH, 'utf-8');
    return privateMetadataJSON ? JSON.parse(privateMetadataJSON) : {};
}

export function setPublicMetadata(publicMetadata: PublicMetadata): void {
    const json = JSON.stringify(publicMetadata, undefined, 2);
    outputFileSync(PUBLIC_METADATA_PATH, json);
}

export function setPrivateMetadata(privateMetadata: Metadata): void {
    const json = JSON.stringify(privateMetadata, undefined, 2);
    outputFileSync(PRIVATE_METADATA_PATH, json);
}