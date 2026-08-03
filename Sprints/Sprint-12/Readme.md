# Engineering Sprint 12 – Completing the Business Transaction

# Sprint Objective

Complete the end-to-end business transaction by integrating all previous engineering sprints into a single workflow.

---

# Business Requirement

The application should perform the following sequence successfully:

- Receive the application request.
- Retrieve Student information.
- Retrieve Job information.
- Check for duplicate applications.
- Validate student eligibility.
- Create the Application record.
- Save the record using DML.
- Display a confirmation message.

---

# Tasks Completed

- Integrated Student retrieval.
- Integrated Job retrieval.
- Implemented duplicate application validation.
- Implemented eligibility validation.
- Created the Application record.
- Saved the record using DML.
- Returned appropriate confirmation and error messages.

---

# Complete Workflow

```text
Receive Request
      ↓
Retrieve Student
      ↓
Retrieve Job
      ↓
Check Duplicate
      ↓
Validate Eligibility
      ↓
Create Application
      ↓
Save Record
      ↓
Display Confirmation
```

---

# Source Code

See **Source-Code/ApplicationService.cls**

---

# Expected Behaviour

The application successfully performs the complete business transaction from receiving the request to storing the application record.

---

# Screenshots

## Debug Output

![Debug Output](bb.png)


# Learning Outcome

During this sprint, I learned:

- How to integrate multiple business operations into one workflow.
- How SOQL and DML work together in a complete business transaction.
- The importance of validating business rules before saving data.
- How clean service design improves maintainability.

---

# Engineering Principle

A complete business transaction should retrieve information, validate business rules, and modify data only after all validations succeed.

---

# Conclusion

Successfully completed the Placement Management System by implementing an end-to-end business transaction using Apex, SOQL, and DML. The application now retrieves data, validates business rules, creates records, and provides meaningful feedback.
