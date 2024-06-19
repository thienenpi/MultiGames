const { BlobServiceClient } = require("@azure/storage-blob");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const AZURE_STORAGE_CONNECTION_STRING =
  process.env.AZURE_STORAGE_CONNECTION_STRING;

const uploadBlob = async (containerName, fileName, fileBuffer) => {
  try {
    const blobServiceClient = BlobServiceClient.fromConnectionString(
      AZURE_STORAGE_CONNECTION_STRING
    );

    const containerClient = blobServiceClient.getContainerClient(containerName);

    const blobName = `${fileName}.png`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    await blockBlobClient.upload(fileBuffer, fileBuffer.length);

    return blockBlobClient.url;
  } catch (error) {
    console.error("Failed to upload blob: ", error);
  }
};

module.exports = {
  uploadBlob,
};
