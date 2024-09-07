const { createHash } = require('crypto');
const XLSX = require('xlsx');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

dotenv.config();

// Get the secret key from the environment variable
const secretKey = process.env.SECRET_KEY;

// Check if the secret key is defined
if (!secretKey) {
    throw new Error('You must define your secret key in the .env');
}

// Encrypt the secret key using SHA-256
const hashSecretKey = createHash('sha256').update(secretKey).digest('hex');
console.log(`Encrypted secret key: ${hashSecretKey}`); // Print the encrypted secret key

// Function to read data from an Excel file
async function testData(filePath) {
    const workbook = XLSX.readFile(filePath); 
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    return XLSX.utils.sheet_to_json(worksheet); // Convert the worksheet to JSON
}

module.exports = {
    hashSecretKey,
    testData,
};
