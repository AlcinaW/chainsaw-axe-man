// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// import '@testing-library/cypress/add-commands';

// Based on this video: 
// Extending on cypress-axe for Automated Accessibility Tests https://youtu.be/TaBhwaOy1XI

const severityIndicators = {
    minor: "🥺⚪ ",
    moderate: "🙁🟡 ", 
    serious: "😦🟠 ",
    critical: "😱🔴 ",
}

// detailed logging in cypress 
// consoleProps outputs to console 
// can't pass HTML here, but you can add markdown
function callback(violations) {
    violations.forEach(violation => {
        const nodes = Cypress.$(violation.nodes.map(node => node.target).join("."))

        // Cypress accepts an object with a name property
        Cypress.log({
            name: `${severityIndicators[violation.impact]} - A11Y`,
            consoleProps: () => violation,
            $el: nodes,
            message: `[${violation.help}](${violation.helpUrl})`
        })

        violation.nodes.forEach(({ target }) => {
            Cypress.log({
                name: "🚒🛠️",
                consoleProps: () => violation,
                $el: Cypress.$(target.join(",")),
                message: target
            })
        })
    });
}

// use add method and a function
// accept as an argument, the path that we want to visit 
// visit page, inject axe, and then pass more arguments
// use null to check everything, all defaults with null, callback for axe to provide the violations
Cypress.Commands.add("checkPageA11y", (path) => {
    cy.visit(path);
    cy.injectAxe();
    cy.checkA11y(null, null, callback);
})
