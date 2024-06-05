# CSV Data API

Welcome to the CSV Data API! This project provides a simple interface to upload a CSV file, load the data, and filter through the records. The API is built with a frontend for uploading and searching data, and a backend to handle the CSV processing and serve the data.

## Features

- **Upload CSV**: Upload your CSV file with data.
- **Data Loading**: Automatically load and process the CSV data.
- **Search and Filter**: Easily search and filter through the data.

## Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

- Node.js (version 14 or higher)
- npm (version 6 or higher)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/adriraul/csv-read-and-show
   cd csv-data-api
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

### Running the Application

To start the application, simply run:

```bash
npm run dev
```

This command will start both the frontend and backend servers concurrently. The frontend will be available at `http://localhost:4000` and the backend at `http://localhost:3000`.

### Usage

1. **Upload CSV**: Navigate to the frontend URL (`http://localhost:4000`) and use the provided interface to upload your CSV file.
2. **Search Data**: Use the search bar to filter the data based on your query.

## Project Structure

- **frontend**: Contains the React application for the frontend.
- **backend**: Contains the Express server for the backend.
- **public**: Static files for the frontend.
- **src**: Source code for both frontend and backend.

## Technologies Used

- **Frontend**: React, Vite
- **Backend**: Node.js, Express
- **CSV Processing**: `convert-csv-to-json`

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to the contributors of the libraries used in this project.

Feel free to contribute to this project by submitting issues or pull requests. Happy coding!
