export async function startGame(data) {
    const response = await fetch("/api/start", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        const text = await response.text();
        const errorData = text ? JSON.parse(text) : {};
        throw new Error(errorData.error || 'Server error');
    }
}

export async function sendGuess(data) {
    const response = await fetch("/api/guess", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    const responseData = await response.json();
    return responseData;
}
