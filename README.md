Here's the README content formatted in Markdown for you:

```markdown
# Backend TeleBot

This is the backend for the TeleBot application. Follow the instructions below to set up and run the project on your local machine.

## Getting Started

### Prerequisites

Make sure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (includes npm)
- [ngrok](https://ngrok.com/)

### Installation

1. **Clone the Repository**

   Clone the repository from GitHub:

   ```bash
   git clone https://github.com/anaskh27/backendTeleBot.git
   ```

   Navigate into the project directory:

   ```bash
   cd backendTeleBot
   ```

2. **Initialize Node.js and Install Dependencies**

   Initialize the Node.js project:

   ```bash
   npm init
   ```

   Install the necessary Node.js modules:

   ```bash
   npm install
   ```

3. **Add the `.env` File**

   Place the provided `.env` file in the root directory of the project. This file should contain all the necessary environment variables required for the application to run.

4. **Run ngrok**

   Open a new terminal window and run ngrok to expose your local server to the internet:

   ```bash
   ngrok http 3000
   ```

   Once ngrok is running, copy the URL provided in the terminal (it will look something like `http://abcd1234.ngrok.io`).

5. **Update Environment Variables**

   In your `.env` file, replace the `NGROK_KEY` value with the URL provided by ngrok:

   ```env
   NGROK_KEY=http://abcd1234.ngrok.io
   ```

6. **Start the Server**

   Run the server with the following command:

   ```bash
   node index.js
   ```

   You should see the following output in the terminal:

   ```
   Server is running on port 3000
   Connected to MongoDB
   Webhook set
   ```

### Troubleshooting

- **Server fails to connect to MongoDB:** Verify your MongoDB URI and ensure your MongoDB instance is running.
- **ngrok URL is not working:** Ensure ngrok is running and you have copied the correct URL. Also, check if your firewall is blocking the connection.

## Additional Notes

- Ensure your MongoDB instance is running and properly configured in your `.env` file.
- The ngrok URL will change each time you restart it unless you have a paid ngrok plan. Be sure to update your `.env` file accordingly.
```
