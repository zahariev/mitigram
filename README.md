# Mitigram

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Decisions made:

- Bumped angular version to 16
- Used signals in InvitationService
- Used standalone components.
- Reusable list with content projection templates. Drawer elements also.
- Basic dark/light theming.
- Translations.
- Search is activated on keyDown.
- TreeComponent should be dummy (with more time), showing data and exporting events e.g. selected
- I have NOT used any icons in the List, although they look friendly, from a heavy use perspective the eye is much quicker when dealing with text than images
- In the Group tree could be added state/bg color, checked/ if Contact is already invited from other group or solo :)

TODO: later this day:

- add counterparty by email only.
- add checklist tree for groupList data to be able to select partially group members
- Confirmation Dialog before sending emails
- clear console.logs
