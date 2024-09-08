const { createHash } = require('crypto'); // Import createHash from the crypto module
const XLSX = require('xlsx'); // Import the XLSX module for handling Excel files
const dotenv = require('dotenv'); // Import dotenv for environment variable management
const fs = require('fs'); // Import file system module
const path = require('path'); // Import path module for handling file paths
const axios = require('axios'); // Import axios for making HTTP requests

dotenv.config(); // Load environment variables from .env file

// Get the secret key from the environment variable
const secretKey = process.env.SECRET_KEY;

// Check if the secret key is defined
if (!secretKey) {
    throw new Error('You must define your secret key in the .env file');
}

// Encrypt the secret key using SHA-256
const hashSecretKey = createHash('sha256').update(secretKey).digest('hex');

// Function to read data from an Excel file
async function testData(filePath) {
    try {
        const workbook = XLSX.readFile(filePath); // Read the Excel file
        const sheetName = workbook.SheetNames[0]; // Get the name of the first sheet
        const worksheet = workbook.Sheets[sheetName]; // Get the worksheet by name
        return XLSX.utils.sheet_to_json(worksheet); // Convert the worksheet to JSON
    } catch (error) {
        console.error(`Error reading data from Excel file: ${error.message}`); // Log error message
        throw new Error('Failed to read data from the Excel file.'); // Throw error if reading fails
    }
}

// Function to download and save the image to a specified folder
async function downloadImageToProjectFolder(imageUrl, savePath) {
    try {
        const response = await axios({
            url: imageUrl, // URL of the image
            method: 'GET', // HTTP method
            responseType: 'arraybuffer' // Response type to handle binary data
        });

        if (response.status !== 200) {
            throw new Error(`Error downloading the image: ${response.statusText}`); // Error message for failed download
        }

        const directory = path.dirname(savePath); // Get the directory from the save path
        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory, { recursive: true }); // Create directory if it does not exist
        }

        fs.writeFileSync(savePath, response.data); // Save the image data to the file
    } catch (error) {
        console.error(`Error downloading or saving the image: ${error.message}`); // Error message for issues in downloading or saving
        throw new Error(`Could not save the image from ${imageUrl}`); // Throw an error if saving fails
    }
}

// Function to validate the saved image file
// This function checks if the image file has an allowed extension and does not exceed the maximum file size
const validateImageFile = (imagePath) => {
    try {
        const allowedExtensions = ['.jpg', '.jpeg', '.png', '.svg']; // Allowed image file extensions
        
        // Get the file extension
        const extname = path.extname(imagePath).toLowerCase();
        
        // Validate the file extension
        if (!allowedExtensions.includes(extname)) {
            throw new Error(`Invalid image extension: ${extname}. Allowed extensions are ${allowedExtensions.join(', ')}.`);
        }
        
        // Validate the file size
        const stats = fs.statSync(imagePath); // Get file statistics
        const fileSizeInBytes = stats.size;
        
        if (fileSizeInBytes > 500000) {
            throw new Error(`Image file size is too large: ${fileSizeInBytes} bytes. Maximum allowed size is 500,000 bytes.`);
        }

        console.log(`Image file ${imagePath} is valid.`); // Log valid image file
    } catch (error) {
        console.error(`Error validating image file: ${error.message}`); // Log error message
        throw new Error(`Failed to validate image file ${imagePath}`); // Throw an error if validation fails
    }
};


module.exports = {
    hashSecretKey,
    testData,
    downloadImageToProjectFolder,
    validateImageFile
};
