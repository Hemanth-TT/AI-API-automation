export async function validateWithAI(responseBody) {

    // Mock AI Logic (temporary)
    if (responseBody && responseBody.id && responseBody.userName) {
        return "PASS: Valid response structure";
    }

    return "FAIL: Missing required fields";
}