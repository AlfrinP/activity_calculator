# EasyCertify

EasyCertify is a tool designed to automatically calculate activity points according to KTU (Kerala Technological University) rules when certificates are uploaded. It simplifies the process of managing and evaluating student activity certificates.

## Features

- Automated activity points calculation based on KTU guidelines
- Certificate upload functionality
- User-friendly interface
- Efficient certificate management system

## Tech Stack

- **Frontend**: React.js
- **Backend**: Go (Golang)

## Prerequisites

Before running the project, make sure you have the following installed:
- Node.js and npm (Node Package Manager)
- Go (latest version)
- Git

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/EasyCertify
cd EasyCertify
```

### 2. Frontend Setup
```bash
# Navigate to the client directory
cd client

# Install dependencies
npm install

# Start the development server
npm start
```
The frontend will be available at `http://localhost:3000`

### 3. Backend Setup
```bash
# Navigate to the server directory
cd server

# Download Go dependencies
go mod download

# Run the server
go run main.go
```
The backend server will start running on the configured port.

## Project Structure
```
easycertify/
├── client/          # React frontend
└── server/          # Golang backend
```

## Contributing

Please read [CONTRIBUTING.md](https://github.com/AlfrinP/EasyCertify/blob/main/CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
