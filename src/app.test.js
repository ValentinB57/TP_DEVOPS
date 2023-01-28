// Importe l'instance de l'application
const app = require("./app")

// Importe les modules supertest et jest
const supertest = require("supertest")
const expect = require('chai').expect;

// Crée une instance de supertest pour tester l'application
const request = supertest(app)

describe("/test endpoint", () => {
    it("should return a response", async () => {
        // Envoie une requête GET à l'endpoint '/test'
        const response = await request.get("/test")

        // Vérifie que la réponse a un statut 200 (OK)
        expect(response.status).to.equal(200)

        // Vérifie que le corps de la réponse est égal à "Hello world"
        expect(response.text).to.equal("Hello world")
    })
})

describe("/test endpoint", () => {
    it("should have the 'Content-Type' header", async () => {
        // Envoie une requête GET à l'endpoint '/test'
        const response = await request.get("/test")

        // Vérifie que la réponse contient l'entête 'Content-Type'
        expect(response.headers).to.have.property("content-type")
    })
})

describe("/test endpoint", () => {
    it("should have the 'Content-Type' header set to 'text/plain'", async () => {
        // Envoie une requête GET à l'endpoint '/test'
        const response = await request.get("/test")

        // Vérifie que la valeur de l'entête 'Content-Type' est égale à 'text/plain'
        expect(response.headers["content-type"]).to.equal("text/plain; charset=utf-8")
    })
})

describe("/about endpoint", () => {
    it("should return a response", async () => {
        // Envoie une requête GET à l'endpoint '/about'
        const response = await request.get("/about")

        // Vérifie que la réponse a un statut 200 (OK)
        expect(response.status).to.equal(200)

        // Vérifie que le corps de la réponse est égal à "This is an about page"
        expect(response.text).to.equal("This is an about page")
    })
})

describe("/about endpoint", () => {
    it("should have the 'Content-Type' header", async () => {
        // Envoie une requête GET à l'endpoint '/about'
        const response = await request.get("/about")

        // Vérifie que la réponse contient l'entête 'Content-Type'
        expect(response.headers).to.have.property("content-type")
    })
})

describe("/about endpoint", () => {
    it("should have the 'Content-Type' header set to 'text/plain'", async () => {
        // Envoie une requête GET à l'endpoint '/about'
        const response = await request.get("/about")

        // Vérifie que la valeur de l'entête 'Content-Type' est égale à 'text/plain'
        expect(response.headers["content-type"]).to.equal("text/plain; charset=utf-8")
    })
})

describe("/contact endpoint", () => {
    it("should return a response", async () => {
        // Envoie une requête GET à l'endpoint '/contact'
        const response = await request.get("/contact")

        // Vérifie que la réponse a un statut 200 (OK)
        expect(response.status).to.equal(200)

        // Vérifie que le corps de la réponse est égal à "This is an contact page"
        expect(response.text).to.equal("Contact us at contact@example.com")
    })
})

describe("/contact endpoint", () => {
    it("should have the 'Content-Type' header", async () => {
        // Envoie une requête GET à l'endpoint '/contact'
        const response = await request.get("/contact")

        // Vérifie que la réponse contient l'entête 'Content-Type'
        expect(response.headers).to.have.property("content-type")
    })
})

describe("/contact endpoint", () => {
    it("should have the 'Content-Type' header set to 'text/plain'", async () => {
        // Envoie une requête GET à l'endpoint '/contact'
        const response = await request.get("/contact")

        // Vérifie que la valeur de l'entête 'Content-Type' est égale à 'text/plain'
        expect(response.headers["content-type"]).to.equal("text/plain; charset=utf-8")
    })
})

describe("/users endpoint", () => {
    it("should return a response", async () => {
        // Envoie une requête GET à l'endpoint '/users'
        const response = await request.get("/users/:974")

        // Vérifie que la réponse a un statut 200 (OK)
        expect(response.status).to.equal(200)

        // Vérifie que le corps de la réponse est égal à "This is an users page"
        expect(response.text).to.equal("Displaying information for user with ID: ${ req.params.id }")
    })
})

describe("/users endpoint", () => {
    it("should have the 'Content-Type' header", async () => {
        // Envoie une requête GET à l'endpoint '/users'
        const response = await request.get("/users/:974")

        // Vérifie que la réponse contient l'entête 'Content-Type'
        expect(response.headers).to.have.property("content-type")
    })
})

describe("/users endpoint", () => {
    it("should have the 'Content-Type' header set to 'text/plain'", async () => {
        // Envoie une requête GET à l'endpoint '/users'
        const response = await request.get("/users/:974")

        // Vérifie que la valeur de l'entête 'Content-Type' est égale à 'text/plain'
        expect(response.headers["content-type"]).to.equal("text/plain; charset=utf-8")
    })
})