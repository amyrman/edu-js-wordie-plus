const api = {
    // Define HTTP methods
    httpMethod: {
        GET: "GET",
        POST: "POST",
        PUT: "PUT",
        DELETE: "DELETE",
    },

    // Define endpoints
    endpoint: {
        highscores: "/api/highscores",
    },

    // Helper function to send the HTTP request
    sendRequest: async function (method, endpoint, data) {
        // Check if the provided method is valid
        if (!Object.values(this.httpMethod).includes(method)) {
            throw new Error(`Invalid HTTP method: ${method}`);
        }

        const response = await fetch(endpoint, {
            method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        return response;
    },

    // Helper function to handle the response from the HTTP request
    handleResponse: async function (response) {
        if (!response.ok) {
            throw response;
        }
        const responseData = await response.json();
        return responseData;
    },

    // Helper function to handle any errors that occur when making the HTTP request
    handleError: async function (error) {
        console.error(error);
        if (error.response) {
            const text = await error.response.text();
            const errorData = text ? JSON.parse(text) : {};
            const errorMessage = errorData.message || "Server error";
            console.error(errorMessage);
        }
        throw error;
    },
    // TODO: add guessWord to highscore data
    insertHighscore: async function (data) {
        const { POST } = this.httpMethod;
        const { highscores } = this.endpoint;

        try {
            const response = await this.sendRequest(POST, highscores, data);
            const responseData = await this.handleResponse(response);
            return responseData;
        } catch (error) {
            this.handleError(error);
        }
    },

    // Main function that performs the HTTP operation
    // It uses the helper functions defined above to send the request, handle the response, and handle any errors
    // TODO: Refactor like insertHighscore ?
    performHttpOperation: async function (method, endpoint, data) {
        try {
            const response = await this.sendRequest(method, endpoint, data);
            const responseData = await this.handleResponse(response);
            return responseData;
        } catch (error) {
            this.handleError(error);
        }
    },
};

export default api;
