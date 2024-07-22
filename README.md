Here's a comprehensive README file for your React Native contact manager app. This file will include an overview, setup instructions, dependencies, architecture, and usage details.

---

# Contact Manager App

This is a React Native contact manager app that allows users to sync their phone contacts, add new contacts, view and edit existing contacts, and handle contact photos. The app follows the MVVM architecture and adheres to SOLID principles.

## Table of Contents

- [Features](#features)
- [Dependencies](#dependencies)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Usage](#usage)
- [Contact Management](#contact-management)
- [Permissions](#permissions)
- [Validation](#validation)
- [Contributing](#contributing)
- [License](#license)

## Features

- Sync phone contacts with the app.
- Add new contacts with name, email, phone number, and photo.
- View and edit existing contacts.
- Validate German phone numbers.
- Follow MVVM architecture and SOLID principles.

## Dependencies

- **React Native**: A framework for building native apps using React.
- **React Navigation**: Routing and navigation for React Native apps.
- **React Native Contacts**: Access and manage contacts on the device.
- **React Native Permissions**: Request and check device permissions.
- **React Native Image Picker**: Select images from the library or capture them using the camera.
- **React Native Safe Area Context**: Handle safe area insets.
- **React Native Screens**: Native navigation performance improvements.
- **FlashList**: Efficient and performant list component.

## Project Structure

The project follows a structured and modular approach:

```
.
├── src
│   ├── data
│   │   ├── models
│   │   │   └── ContactModel.ts
│   │   ├── repositories
│   │   │   ├── ContactRepository.ts
│   │   │   └── IContactRepository.ts
│   ├── operations
│   │       └── ContactOperations.ts
│   ├── Presentation
│   │   ├── components
│   │   │   └── ContactForm.tsx
│   │   ├── context
│   │   │   └── ContactViewModelContext.tsx
│   │   ├── navigation
│   │   │   └── RootNavigator.tsx
│   │   ├── viewmodels
│   │   │   └── ContactViewModel.ts
│   │   └── views
│   │       ├── AddContactScreen.tsx
│   │       ├── EditContactScreen.tsx
│   │       └── HomeScreen.tsx
│   ├── utils
│   │   └── validators.ts
│   ├── App.tsx
│   └── index.ts
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js and npm/yarn
- React Native CLI
- Android Studio or Xcode for running the app on an emulator or physical device

### Installation

1. **Clone the repository:**

```sh
git clone https://github.com/yourusername/contact-manager-app.git
cd contact-manager-app
```

2. **Install dependencies:**

```sh
npm install
# or
yarn install
```

3. **Link native dependencies:**

```sh
npx pod-install
```

4. **Start the development server:**

```sh
npx react-native start
```

5. **Run the app:**

For iOS:
```sh
npx react-native run-ios
```

For Android:
```sh
npx react-native run-android
```

## Usage

### Home Screen

- Displays the list of contacts.
- Button to add a new contact.
- Prompts for contact sync permission on the first launch.

### Add Contact Screen

- Form to add a new contact with name, email, phone number, and photo.
- Validate input fields before submission.

### Edit Contact Screen

- Form to edit an existing contact.
- Shows the current contact details, including the photo.
- To keep scope small to complete within timeline, only name, email & phone number is editable.

## Contact Management

The app uses the `react-native-contacts` library to access and manage contacts. The contacts are fetched, added, and updated through the repository and use case layers, adhering to the MVVM architecture.

### Permissions

The app uses `react-native-permissions` to handle device permissions. It requests and checks permissions for accessing contacts, the media library, and the camera.

### Known issue

Photo is not being added or updated for Android

### improvement
- Add test cases
- More field to edit

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---