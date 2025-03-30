HW-2 | REST API | Express framework

Write a REST API to work with a contact collection. Use [Postman] to work with the REST API.

## Step 1

Create a repository named `goit-node-rest-api` and place the files from the `src` folder in the main branch (main). Note: There should be no `src` folder in the repository; only its contents are relevant.
Create a branch `hw02-express` from the main branch.
Install modules by running the command:

```bash
npm i
```

## Step 2

Copy the functions from the `contacts.js` file from the first module homework into the `contactsServices.js` file (located in the `services` folder).

## Step 3

Write controllers in the `contactsControllers.js` file (located in the `controllers` folder) according to the following requirements.

### The REST API should support the following routes:

#### `GET /api/contacts`

- Calls the `listContacts` service function to work with the `contacts.json` file.
- Returns an array of all contacts in JSON format with a status of 200.

#### `GET /api/contacts/:id`

- Calls the `getContactById` service function to work with the `contacts.json` file.
- If the contact with the given ID is found, returns the contact object in JSON format with a status of 200.
- If the contact with the given ID is not found, returns `{"message": "Not found"}` in JSON format with a status of 404.

#### `DELETE /api/contacts/:id`

- Calls the `removeContact` service function to work with the `contacts.json` file.
- If the contact with the given ID is found and deleted, returns the deleted contact object in JSON format with a status of 200.
- If the contact with the given ID is not found, returns `{"message": "Not found"}` in JSON format with a status of 404.

#### `POST /api/contacts`

- Accepts a JSON body with the fields `{name, email, phone}`. All fields are required—use the `joi` package to create a schema in the `contactsSchemas.js` file (located in the `schemas` folder).
- If the body is missing any required fields (or if the provided fields have invalid values), returns `{"message": error.message}` in JSON format (where `error.message` is a descriptive error message) with a status of 400.
- If the body is valid, calls the `addContact` service function to work with the `contacts.json` file, passing the data from the body.
- After the function execution, returns the newly created object with the fields `{id, name, email, phone}` and a status of 201.

#### `PUT /api/contacts/:id`

- Accepts a JSON body with any set of updated fields (`name, email, phone`). It is not necessary to require all fields in the body; if a field is not provided, it should remain unchanged.
- If the request to update is made without at least one field in the body, returns `{"message": "Body must have at least one field"}` in JSON format with a status of 400.
- The provided fields must be validated—use the `joi` package in the `contactsSchemas.js` file (located in the `schemas` folder). If the provided fields have invalid values, return `{"message": error.message}` (where `error.message` is a descriptive error message) with a status of 400.
- If everything is fine with the body, call the `updateContact` service function (which should be created in the `contactsServices.js` file, located in the `services` folder). This function should accept the contact's ID to be updated and the data from the body and update the contact in the `contacts.json` file.
- After the function execution, return the updated contact object with a status of 200.
- If the contact with the given ID is not found, return `{"message": "Not found"}` in JSON format with a status of 404.

## Attention

- You can perform body validation either in the controller or by creating a separate middleware that will be called before the controller. To create middleware, you can use the `validateBody.js` function, which can be found in the `helpers` folder.
- For working with errors, you can use the `HttpError.js` function, which can be found in the `helpers` folder.
- If you don't use the specified functions, remove them from the project before submitting the work for review.

## Acceptance Criteria

- A repository for the homework is created.
- A link to the repository (with the homework branch) is sent to the mentor for review.
- The code meets the technical requirements (including exact requirements for the body structure, response content, and status codes).
- There are no commented-out sections in the code.
- The project works correctly with the current LTS version of Node.js.

## Submission Format

The homework contains two links: one to the repository files (link to the repository with the code) and another to the live page on GitHub Pages.
The repository file in a `.zip` format is attached.

☝ IMPORTANT: Review the instructions for uploading the working file from the repository to GitHub.

## Grading

The total maximum score is 100 points.

### Step 2 — 5 points

- The functions from the `contacts.js` file from Module 1 homework are copied into the `contactsServices.js` file (located in the `services` folder).

### Step 3 — 5 points

- Controllers are written in the `contactsControllers.js` file (located in the `controllers` folder) based on the requirements below.

#### `GET /api/contacts` — 10 points

- Calls the `listContacts` service function to work with the `contacts.json` file.
- Returns an array of all contacts in JSON format with a status of 200.

#### `GET /api/contacts/:id` — 15 points

- Calls the `getContactById` service function to work with the `contacts.json` file.
- Returns the contact object by ID in JSON format with a status of 200.
- Returns `{"message": "Not found"}` in JSON format with a status of 404 if the contact by ID is not found.

#### `DELETE /api/contacts/:id` — 15 points

- Calls the `removeContact` service function to work with the `contacts.json` file.
- Returns the deleted contact object in JSON format with a status of 200.
- Returns `{"message": "Not found"}` in JSON format with a status of 404 if the contact by ID is not found.

#### `POST /api/contacts` — 25 points

- Validates the body with fields `{name, email, phone}` using the `joi` package in the `contactsSchemas.js` file.
- Returns `{"message": error.message}` in JSON format with a status of 400 if required fields are missing or if fields have invalid values.
- Calls the `addContact` service function to work with the `contacts.json` file.
- Returns the newly created object with the fields `{id, name, email, phone}` and a status of 201.

#### `PUT /api/contacts/:id` — 25 points

- Validates the body with any set of updated fields (`name, email, phone`) using the `joi` package in the `contactsSchemas.js` file.
- Returns `{"message": "Body must have at least one field"}` in JSON format with a status of 400 if no field is provided for update.
- Returns `{"message": error.message}` in JSON format with a status of 400 if provided fields have invalid values.
- Calls the `updateContact` service function to update the contact in the `contacts.json` file.
- Returns the updated contact object with a status of 200.
- Returns `{"message": "Not found"}` in JSON format with a status of 404 if the contact by ID is not found.

# TASKS' RESULTS

### GET /api/contacts

![Screenshot_1](/assets/Screenshot_1.jpg)

### GET /api/contacts/:id

![Screenshot_2](/assets/Screenshot_2.jpg)

### DELETE /api/contacts/:id

![Screenshot_3](/assets/Screenshot_3.jpg)

### POST /api/contacts

![Screenshot_4](/assets/Screenshot_4.jpg)

### PUT /api/contacts/:id

![Screenshot_5](/assets/Screenshot_5.jpg)
