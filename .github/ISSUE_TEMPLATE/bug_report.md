---
name: Bug report
about: Create a report if something seems broken
title: ''
labels: ''
assignees: ''
body:
  - type: checkboxes
    attributes:
      label: Code of Conduct
      description: The Code of Conduct helps create a safe space for everyone. We require that everyone agrees to it.
      options:
        - label: I have read the [general Readme](https://github.com/jvolker/miq-nz-booking-tools/#readme) and [MIQ-Booking-Assistance Readme](https://github.com/jvolker/miq-nz-booking-tools/blob/master/MIQ-Booking-Assistance/README.md)
          required: true
        - label: I have searched for other [similar issues](https://github.com/jvolker/miq-nz-booking-tools/issues?q=is%3Aissue) before creating this new one
          required: true
        - label: This is not a [general support or feature request](https://github.com/jvolker/miq-nz-booking-tools/issues/new/choose) 
          required: true
  - type: textarea
    attributes:
      label: Operating System
      description: What operating system are you using?
      placeholder: "Example: macOS Big Sur (11.2.3) or Windows 10"
      value: operating system
    validations:
      required: true
---

**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
A clear and concise description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Your system (please complete the following information):**
 - Operating System: [e.g. macOS 11.2.3 or Windows 10]
 - Version:  [e.g. MIQ-Booking-Assistance 0.10.1]

