# Engineering Sprint 10 – Creating the Application

# Sprint Objective

Create and save the Application record after all business validations are completed successfully.

---

# Business Requirement

Once all validations pass, the application should be recorded in Salesforce by creating a new `Application__c` record and saving it using DML.

---

# Tasks Completed

- Created a new `Application__c` record.
- Populated the required fields.
- Saved the record using DML (`insert`).
- Handled DML exceptions using `try-catch`.
- Returned meaningful confirmation or error messages.

---

# Engineering Principle

Never perform DML until every business rule has been verified.

---

# Expected Behaviour

A valid application is successfully stored in Salesforce and a confirmation message is displayed.

---

# Screenshots

## Debug Output

![Debug Output](submitted.png)


---

# Learning Outcome

- Learned to create records using Apex.
- Learned to use DML responsibly.
- Learned to handle DML exceptions.
- Understood why validation should occur before database changes.

---

# Conclusion

Successfully implemented the final record creation step by inserting a valid application into Salesforce using DML.
