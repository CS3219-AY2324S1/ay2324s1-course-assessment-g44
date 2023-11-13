/// <reference types="Cypress" />

const loginUserApi = "http://localhost:4200/api/users/loginUser";

describe('logging in with admin credentials', () => {
    it('should be able to login with admin credentials', () => {
        const adminEmail = "admin123@gmail.com";
        const adminPassword = "adminpassword";
        cy.request({
            method: 'POST',
            url: loginUserApi,
            body: {
                email: adminEmail,
                password: adminPassword,
            }
        }).then((response) => {
            const status = response.status;
            expect(status).to.be.equal(201);
            const data = response.body;
            expect(data.username).to.be.equal("admin");   
            expect(data.role).to.be.equal("admin");   
        });
    })
});



