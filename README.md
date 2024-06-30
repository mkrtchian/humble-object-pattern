# Humble Object Pattern

![Tests](https://github.com/mkrtchian/humble-object-pattern/actions/workflows/tests.yml/badge.svg?branch=main)

This project implements the main examples of humble object pattern described in [Unit Testing: Principles, Practices, and Patterns](https://www.manning.com/books/unit-testing) from Vladimir Khorikov, using TypeScript.

All the unit and integration tests are included.

## Audit system example

The [Audit system example](src/audit-system) (from chapter 6 in the book) refactors a project that uses the filesystem, from overcomplicated code to **functional architecture**.

## CRM example

The [CRM example](src/crm) (from chapter 7 in the book) refactors a project that uses a database and a message bus, from overcomplicated code to **hexagonal architecture**.
