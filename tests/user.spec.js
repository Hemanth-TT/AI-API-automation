import { test, expect } from '@playwright/test';
import { APIClient } from '../utils/apiClient';
import { validateWithAI } from '../utils/aiValidator';
import { validateSchema } from '../utils/schemaValidator';
import { userSchema } from '../schemas/userSchema';
import { logStep, logResponse, logResult } from '../utils/logger';
import { attachment } from 'allure-js-commons';


test('Validate User API with AI + Schema Validation', async ({ request }) => {

    test.info().annotations.push({ type: 'feature', description: 'User API Testing' });
    test.info().annotations.push({ type: 'story', description: 'Validate user data integrity' });
    test.info().annotations.push({ type: 'severity', description: 'critical' });
    test.info().annotations.push({ type: 'description', description: 'Validates API using schema + AI logic' });


    const api = new APIClient(request);

    let response, body;

    //step 1
    await test.step('Send API Request', async () => {
        response = await api.get('https://fakerestapi.azurewebsites.net/api/v1/Users/1');
        body = await response.json();
    });


    //step 2
    await test.step('Validate status Code', async () => {
        expect(response.status()).toBe(200);
    });

    //step 3 // Schema Validation
    await test.step('Validate Schema', async () => {
        const isSchemaValid = validateSchema(userSchema, body);
        expect(isSchemaValid).toBe(true);
    });



    //step 4 // AI Validation
    await test.step('AI Validation', async () => {
        const aiResult = await validateWithAI(body);

        attachment("API Response", JSON.stringify(body, null, 2), "application/json");
        attachment("AI Result", aiResult, "text/plain");
        expect(aiResult).toContain("PASS");
    });


});


test('Negative Test - Invalid User', async ({ request }) => {

    const api = new APIClient(request);

    const response = await api.get('https://fakerestapi.azurewebsites.net/api/v1/Users/999999');
    console.log("Status:", response.status());

    expect(response.status()).toBe(404);
});

test('Edge Case - Get All Users', async ({ request }) => {

    const api = new APIClient(request);

    const response = await api.get('https://fakerestapi.azurewebsites.net/api/v1/Users');

    const body = await response.json();

    console.log("Users Count:", body.length);

    expect(response.status()).toBe(200);
    expect(Array.isArray(body)).toBe(true);
});