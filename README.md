# PokeProject
Playwright Automation Project

## Overview

This project uses Playwright and JavaScript to automate testing for APIs and web pages. It connects with PokeAPI, JSONPlaceholder, and Wikipedia.

### Key Features

- **API Testing**: 
  - Runs GET and POST requests using data from an Excel file to test PokeAPI and JSONPlaceholder.

- **Web Testing**: 
  - Scrapes Pokémon images from Wikipedia, verifies page titles, and saves images for format validation.
  - Takes screenshots to help with detailed reporting and troubleshooting.

## Setup Instructions

To get started with the project, follow these steps:

### 1. Clone the Repository

Clone the repository using Git:
gh repo clone PaulaCarluccio/PokeProject

### 2. Install Node Dependencies

npm install

### 3. Install Playwright and Browsers

npx playwright install

### 4. Set Up Environment Variables

Create a .env file in the root of the project directory with the following content:
<br>SECRET_KEY={your-secret-key}

## 5. Run All Tests
npx playwright test

### Run API Tests
Pokemon API Tests:
npx playwright test tests/api/pokemon.api.spec.js
### JSONPlaceholder API Tests:
npx playwright test tests/api/typicode.api.spec.js

### Run UI Tests
npx playwright test tests/ui/pokemon.ui.spec.js

## Project Structure:

- **PokeProject/**  
  The root directory of the project.

  - **config/**  
    Contains configuration files.  
    - `utils.js`  
    - `environment.js`  

  - **tests/**  
    - **api/** 
    API test scripts.  

      - `pokemon.api.spec.ts`  
      - `typicode.api.spec.ts`  
      
    - **ui/**  
      Web UI test scripts.  
      - **pages/**  
        Page Object Model (POM) 
        - `BasePage.js`  
        - `PokemonPage.js`  
      - `pokemon.ui.spec.ts`  

      
    - **data/**  
      Contains test data files.  
      - `dataset.xlsx`  

  - `playwright.config.ts`  
    Playwright configuration file.  

  - `.env`  
    Environment variables file (SECRET_KEY).
