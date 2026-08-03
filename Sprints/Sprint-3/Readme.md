# Engineering Sprint 3 – Preventing Duplicate Applications

# Sprint Objective

Modify the `submitApplication()` method to prevent duplicate applications.

Before processing a new application, the system checks whether the student has already applied for the same job.

---

# Business Requirement

A student should not be allowed to apply for the same company more than once.

---

# Task Completed

- Queried the `Application__c` object using SOQL.
- Checked whether an application already exists.
- Returned a duplicate message if found.
- Continued processing if no duplicate exists.

---

# Source Code

```apex
public class ApplicationService {

    public static String submitApplication(Id studentId, Id jobId) {

        List<Application__c> existingApplications = [
            SELECT Id
            FROM Application__c
            WHERE Student__c = :studentId
            AND Job__c = :jobId
            LIMIT 1
        ];

        if (!existingApplications.isEmpty()) {
            return 'You have already applied for this job.';
        }

        return 'Application request received successfully.';
    }

}
```

---

# Execute Anonymous

```apex
Id studentId='YOUR_STUDENT_ID';
Id jobId='YOUR_JOB_ID';

System.debug(
ApplicationService.submitApplication(studentId,jobId)
);
```

---

# Expected Results

| Scenario | Result |
|----------|--------|
| First Application | Application request received successfully. |
| Duplicate Application | You have already applied for this job. |
| Different Job | Application request received successfully. |

---

# Screenshots

## Debug Output

![Debug Output](Duplicate_Application.jpeg)

---

# Learning Outcome

During this sprint I learned:

- Writing SOQL queries.
- Retrieving Salesforce records.
- Checking duplicate records.
- Returning meaningful messages.

---

# Conclusion

Successfully implemented duplicate application validation using SOQL before processing the application request.
