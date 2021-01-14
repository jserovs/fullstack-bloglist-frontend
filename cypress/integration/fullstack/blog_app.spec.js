import { element } from "prop-types"

describe('Blog app', function() {

  beforeEach(function() {
    //   cy.request('POST', 'http://localhost:3001/api/testing/reset')
    // create here a user to backend
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('blogs')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('tester')
      cy.get('#password').type('tester')
      cy.contains('Login').click()

    })

    it('Login form is shown', function() {
      cy.contains('Log in to application').click()
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('tester')
      cy.get('#password').type('wrong')
      cy.contains('Login').click()

      cy.contains('Wrong credentials')
      cy.get('#messageBox').should('have.class', 'error')
      cy.get('#messageBox').should('have.css', 'color','rgb(255, 0, 0)')
    })
  })
})