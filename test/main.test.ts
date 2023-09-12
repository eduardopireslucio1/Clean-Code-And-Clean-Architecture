import axios from "axios"

test("Deve fazer o cálculo do preço de uma corrida durante o dia", async function () {
    const input = {
        segments: [
            { distance: 10, date: "2021-03-01T10:00:00" }
        ]
    }
    const response = await axios.post("http://localhost:3000/calculate_ride", input);
    const output = response.data;
    expect(output.price).toBe(21);
})

test("Deve fazer o cálculo do preço de uma corrida durante a noite", async function () {
    const input = {
        segments: [
            { distance: 10, date: "2021-03-01T23:00:00" }
        ]
    }
    const response = await axios.post("http://localhost:3000/calculate_ride", input);
    const output = response.data;
    expect(output.price).toBe(39);
})

test("Deve fazer o cálculo do preço de uma corrida no domingo de dia", async function () {
    const input = {
        segments: [
            { distance: 10, date: "2021-03-07T10:00:00" }
        ]
    }
    const response = await axios.post("http://localhost:3000/calculate_ride", input);
    const output = response.data;
    expect(output.price).toBe(10);
})

test("Deve fazer o cálculo do preço de uma corrida no domingo de noite", async function () {
    const input = {
        segments: [
            { distance: 10, date: "2021-03-07T23:00:00" }
        ]
    }
    const response = await axios.post("http://localhost:3000/calculate_ride", input);
    const output = response.data;
    expect(output.price).toBe(50);
})

test("Deve retornar -1 se a distanceância for inválida", async function () {
    const input = {
        segments: [
            { distance: -10, date: "2021-03-07T23:00:00" }
        ]
    }
    const response = await axios.post("http://localhost:3000/calculate_ride", input);
    const output = response.data;
    expect(output.price).toBe(-1);
})

test("Deve retornar -2 se a data for inválida", async function () {
    const input = {
        segments: [
            { distance: 10, date: "typescript" }
        ]
    }
    const response = await axios.post("http://localhost:3000/calculate_ride", input);
    const output = response.data;
    expect(output.price).toBe(-2);
})