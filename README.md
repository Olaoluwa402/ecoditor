# Your App Name

## Overview

This is a fullstack code editor application written in react and python. Aims to allow one write and compile code.

## two options to start this app

# Option 1

## Prerequisites

Before running the application, make sure you have the following installed:

- Docker: [Installation Guide](https://docs.docker.com/get-docker/)
- Docker Compose: [Installation Guide](https://docs.docker.com/compose/install/)

## Getting Started

Follow these steps to run the application using Docker Compose:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Olaoluwa402/ecoditor.git
   cd your-repo

   ```

2. **Create a .env file based on .env.example and configure any necessary environment variables.**

3. **Build and start the containers:**

   ```
   docker-compose up -d --build

   This command will download necessary images, build the application, and start it in detached mode.
   ```

4. **Access the application:**

   Once the containers are up and running, you can access the application in your web browser at http://localhost:5000.

   http://localhost:5000/docs for docs

# Option 2

### Prerequisites

Make sure you have the following installed on your machine:

- [Python](https://www.python.org/) (3.12.1)
- [Pipenv](https://pipenv.pypa.io/) (latest)
- [Docker](https://www.docker.com/) (optional)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Olaoluwa402/ecoditor.git
   cd ecoditor
   ```

2. run

   ```
   pipenv install

   ```

# Starting the Python App

## Using Pipenv

1.  Activate the virtual environment:

    ```
    pipenv shell

    ```

2.  Run the Python app:

    ```
       pipenv run python run.py

    ```

## Troubleshooting

If you encounter any issues, refer to the troubleshooting section or contact support.

## Contributing

If you'd like to contribute to the project, follow the guidelines in the CONTRIBUTING.md file.

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/Olaoluwa402/ecoditor/blob/main/LICENSE) file for details.

## Author

This app is authored by [Olaoluwa Daniel IBUKUN](https://github.com/Olaoluwa402).
