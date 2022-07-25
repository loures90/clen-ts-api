# Design Patterns:

## 1. Adapter:
Adapter are used to make invertion dependency at an internal layer to an external layer. ExpressAdpaterRouter for example adapts Controllers layer (internal) to point to Express framework (external).

https://refactoring.guru/design-patterns/adapter

## 2. Composite: 
Main layer is going to couple all the layers of the project.
In Presentation layer at validation, ValidationComposite class composes the validations of controllers: EmailValidation and RequiredFieldsValidation

https://refactoring.guru/design-patterns/composite

## 3. Factory:
Creational Design Pattern that provides an interface for creating objects in a superclass.
https://refactoring.guru/design-patterns/factory-method

## 4. Decorator:
Attach new behaviours to objects by placing these objects inside special wrapper objects that contains behaviors.
https://refactoring.guru/design-patterns/decorator


# Clean Code
## Dependency Injection
Dependency Injection is technic that makes a class independent of its dependencies. It happens by decoupling the usage of an object from its creation. And helps to achieve SOLID principles of Dependency Inversion and Single Responsability.

https://stackify.com/dependency-injection/

## Dependency Inversion
High level modules should not depend on low level modules. Both should depend on abstractions. Abstractions should not depend on details. Details should be determined by Abstractions.

https://deviq.com/principles/dependency-inversion-principle
## Notes:

SUT - System Under Test
STUB - System Test Double 

The main layer is the most coupled layer of the repository, it sees all others layers.

## Safety:

Differences between Encryption and Hashing:
    https://www.geeksforgeeks.org/difference-between-hashing-and-encryption/
    https://itnext.io/password-encryption-hashing-in-node-application-311a6f61cd65
    


## APIs construídas no treinamento

- [Cadastro](./requirements/signup.md)
- [Login](./requirements/login.md)
- [Criar enquete](./requirements/add-survey.md)
- [Listar enquetes](./requirements/load-surveys.md)
- [Responder enquete](./requirements/add-survey-result.md)
- [Resultado da enquete](./requirements/load-survey-result.md)
