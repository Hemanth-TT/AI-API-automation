import { test, expect } from '@playwright/test';
import { APIClient } from '../utils/apiClient';

test('CRUD Operations - Users API', async ({ request }) => {

    const api = new APIClient(request);

    let userId = Date.now();

    const user = {
        id: userId,
        userName: "testUser",
        password: "testPass"
    };

    // CREATE
    const createRes = await api.post('https://fakerestapi.azurewebsites.net/api/v1/Users', user);
    expect(createRes.status()).toBe(200);

    // READ
    const getRes = await api.get(`https://fakerestapi.azurewebsites.net/api/v1/Users/${userId}`);
    expect(getRes.status()).toBe(200);

    // UPDATE
    user.userName = "updatedUser";
    const updateRes = await api.put(`https://fakerestapi.azurewebsites.net/api/v1/Users/${userId}`, user);
    expect(updateRes.status()).toBe(200);

    // DELETE
    const deleteRes = await api.delete(`https://fakerestapi.azurewebsites.net/api/v1/Users/${userId}`);
    expect(deleteRes.status()).toBe(200);

});