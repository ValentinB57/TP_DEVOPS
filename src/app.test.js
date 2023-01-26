// Importe l'instance de l'application
const app = require("./app")

// Importe les modules supertest et jest
const supertest = require("supertest")
const { expect } = require("jest")

// Crée une instance de supertest pour tester l'application
const request = supertest(app)

describe("/test endpoint", () => {
    it("should return a response", async () => {
        // Envoie une requête GET à l'endpoint '/test'
        const response = await request.get("/test")

        // Vérifie que la réponse a un statut 200 (OK)
        expect(response.status).toBe(200)

        // Vérifie que le corps de la réponse est égal à "Hello world"
        expect(response.text).toBe("Hello world")
    })
})
