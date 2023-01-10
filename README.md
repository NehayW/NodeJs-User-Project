# User-Project
User CRUD Operation 

Develop a NodeJS server that will connect to a MySQL database and contain the following endpoints:

/add-user-account
/list-user-accounts
/update-user-account
/remove-user-account
/suspend-user-account
/reactivate-user-account

The user account consists of the the following data:

ID (auto increment in the database)
Full name (up to 100 characters, may contain any UTF-8 characters, not just ASCII)
Birth date (in yyyy-mm-dd)
Email (up to 200 characters)
Unique alphanumberic ID (exactly 24 characters)
Activity status ('active', 'suspended', or 'archived')


/add-user-account expects the full name, birth date (in yyyy-mm-dd format), and email parameters.
The unique ID must be generated randomly on the server side as 24 alphanumberic characters.
All data must be validated according to the expected format and if the request is not valid, error must be generated.
For the data format validation, 'jsonschema' NodeJS library needs to be used.
It is required that users must be at least 18 years old. If that's not the case, the proper error must be returned.

/update-user-account expects the email and ID parameter to update the email of the user
All data must be validated according to the expected format and if the request is not valid, error must be generated.
For the data format validation, 'validator' NodeJS library needs to be used.
Only the accounts that are active can be updated, if no user with this ID and status 'active' exists, the proper error must be returned.

/list-user-accounts returns the list of account including ID, full name, birth date (in yyyy-mm-dd format), email, and activity status.
Only the accounts whose status is not 'archived' should be listed.

/remove-user-account expects the account ID as a parameter and it needs to set the activity status to 'archived'.
Only users that are not archived can be removed, if no user with this ID and status 'active' or 'suspended' exists, the proper error must be returned.

/suspend-user-account expects the account ID as a parameter and it needs to set the activity status to 'suspended'
Only active users can be suspended, if no user with this ID and status 'active' exists, the proper error must be returned.

/reactivate-user-account expenses the account ID as a parameter and it needs to change the status from suspended to active
Only suspended users can be reactivated, if no user with this ID and status 'suspended' exists, the proper error must be returned.

All data validation must be done in the backend, and if the data received is not in the expected format, the proper error must be returned.
Any expections and errors must be caught to return a proper message without crashing the server.

The data needs to be stored in the MySQL database, all user status codes needs to be separated and referenced in a special table.
The proper constraints and foreign keys need to be defined in the database.
All database logic needs to encapsulated inside the database procedures and wrapped into SQL transactions when needed.
The procedure calls need to be sent to the database in a parametarized way to prevent the SQL injection.

Deliver the SQL code, NodeJS server code, the database graphic schema, and the architecture graphic schema.
Deliver the instructions on running the project on a local machine. It is expected that the backend endpoints will be accessed and tested using Postman.
Use SOLID principles in the code.
