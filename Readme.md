# Node.js API Project

This Node.js project provides a simple API with three endpoints: `/hits`, `/logs`, and `/second-largest`. The project also logs all activities to a `logs.txt` file.

## Prerequisites

- Node.js (v12 or later)
- npm (v6 or later)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/tester-assignment.git
    ```

2. Navigate to the project directory:

    ```bash
    cd tester-assignment
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

## Usage

### Running the Application

To start the server locally:

```bash
npm start
This will start the server on port 3000 and continue running even after you log out of the EC2 instance.

API Endpoints
1. /second-largest (POST)
Calculates the second largest number in an array.

Headers:

Authorization: Bearer <your-token>
who: A token for identifying the user.
Body:

arr: An array of numbers.
Response:

Success: { "message": "Second largest number is <number>" }
Failure: Appropriate error message with status code.
Example:
curl -X POST http://localhost:3000/second-largest \
-H "Content-Type: application/json" \
-H "Authorization: Bearer qewysddiwuewnqweiwemwdowemew" \
-H "who: yash" \
-d '{"arr": [1, 5, 3, 4, 2]}'

Error Handling
404 Not Found: Returned for any undefined routes.
500 Internal Server Error: Returned when an unhandled exception occurs within the server.
Logs
All logs are stored in logs.txt within the project directory. Each log entry includes a timestamp and the corresponding log message.

Deployment
This application can be deployed on an AWS EC2 instance. Use the following command to keep the server running in the background:

nohup npm start &


Here is a README.md file for your Node.js project:

markdown
Copy code
# Node.js API Project

This Node.js project provides a simple API with three endpoints: `/hits`, `/logs`, and `/second-largest`. The project also logs all activities to a `logs.txt` file.

## Prerequisites

- Node.js (v12 or later)
- npm (v6 or later)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-repository.git
    ```

2. Navigate to the project directory:

    ```bash
    cd your-repository
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

## Usage

### Running the Application

To start the server locally:

```bash
npm start
If you want to run the server in the background on an AWS EC2 instance, use the following command:

bash
Copy code
nohup npm start &
This will start the server on port 3000 and continue running even after you log out of the EC2 instance.

API Endpoints
1. /second-largest (POST)
Calculates the second largest number in an array.

Headers:

Authorization: Bearer <your-token>
who: A token for identifying the user.
Body:

arr: An array of numbers.
Response:

Success: { "message": "Second largest number is <number>" }
Failure: Appropriate error message with status code.
Example:

bash
Copy code
curl -X POST http://localhost:3000/second-largest \
-H "Content-Type: application/json" \
-H "Authorization: Bearer qewysddiwuewnqweiwemwdowemew" \
-H "who: yash" \
-d '{"arr": [1, 5, 3, 4, 2]}'
2. /hits (GET)
Returns the total number of hits to the /second-largest endpoint along with the number of hits per IP address.

Headers:

who: A token for identifying the user.
Response:

Success: { "totalHits": <number>, "ipHits": { "ip": <number_of_hits> } }
Failure: Appropriate error message with status code.
Example:

bash
Copy code
curl -X GET http://localhost:3000/hits \
-H "who: yash"
3. /logs (GET)
Returns the contents of the logs.txt file.

Headers:

who: A token for identifying the user.
Response:

Success: { "log": "<log_contents>" }
Failure: Appropriate error message with status code.
Example:

bash
Copy code
curl -X GET http://localhost:3000/logs \
-H "who: yash"
Error Handling
404 Not Found: Returned for any undefined routes.
500 Internal Server Error: Returned when an unhandled exception occurs within the server.
Logs
All logs are stored in logs.txt within the project directory. Each log entry includes a timestamp and the corresponding log message.

Deployment
This application can be deployed on an AWS EC2 instance. Use the following command to keep the server running in the background:

bash
Copy code
nohup npm start &
This will allow the application to continue running even if you close your terminal or disconnect from your SSH session.

License
This project is licensed under the MIT License - see the LICENSE file for details.

You can modify the URLs and details as needed for your specific project and environment.
