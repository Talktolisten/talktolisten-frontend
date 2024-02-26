# Change Log
All notable changes to this project will be documented in this file.

## [1.1.0] - 2024-02-26

## Added
- Update UI for explore, sign up/login, message, chat, voice screen.
- Add search functionality for explore page.

## [1.0.3] - 2024-02-24

## Fixed
- Fix error by installing react-native-svg and react-native-screen, react-native-saft-area-view

## [1.0.2] - 2024-02-24

## Added
- Add debug error to fix the onboarding process of iPad

## [1.0.1] - 2024-02-23
Release again on App Store and First Release on Android

### Info
- Commit: 636415d
- Build ID: dd369fa5-28c1-4c1f-aeba-ef8303fd4d0a

### Fixed

- Fixed cannot find user token when log in

## [1.0.0] - 2024-02-22

First release of the app.

### Added

- Users can chat with defaults bots, 100 bots and 10 voices.
- User can talk to a bot using recording.
- User can log in, sign up.
- User can use the explore page and the category tab (not the search).
- User can use the chat and voice screen.

### Needed fixed

1. IOS Beta Test Flight
   
- Specifically, your app failed to load any content at launch. 
- Device type: iPad Air (5th generation) 
- OS version: iOS 17.3.1
- Issue [HERE](https://appstoreconnect.apple.com/apps/6478241209/distribution/reviewsubmissions/threads/60a47e94-5892-3da8-b816-54d3c4d0a41f)

2. IOS Submission

- Guideline 2.1 - Performance - App Completeness issue [HERE](https://appstoreconnect.apple.com/apps/6478241209/distribution/reviewsubmissions/details/35031701-36c6-4cd1-8bbb-f309747829e9)

- The app launched into an error alert asking users to restart the app, the app then launched into a non-interactive blank page on restart. Please review the details below and complete the next steps.

Review device details:

- Device type: iPad Air (5th generation) and iPhone 13 mini
- OS version: iOS 17.3.1

Guideline 2.3.3 - Performance - Accurate Metadata

- Screenshots do not sufficiently show your app in use. Specifically, your iPad screenshots show an iPhone device frame. Need to replace with iPad screenshots.