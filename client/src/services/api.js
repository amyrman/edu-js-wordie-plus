const fetchPost = async (endpoint, data) => {
    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            const text = await response.text();
            const errorData = text ? JSON.parse(text) : {};
            const error = new Error(errorData.error || "Server error");
            error.response = response;
            throw error;
        }
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error(error);
        if (error.response) {
            console.error(error.response);
        }
    }
};

export default fetchPost;
