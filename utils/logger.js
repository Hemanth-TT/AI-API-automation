export function logStep(step) {
    console.log(`\n=== ${step} ===`);
}

export function logResponse(data) {
    console.log("Response:", JSON.stringify(data, null, 2));
}

export function logResult(result) {
    console.log("AI Result:", result);
}