# Change Log
All notable changes to this project will be documented in this file.

## [7.3.0] - 2024-04-22
### Method
- Expo Build

### Test
- Test a build on Android if the app is working

## [7.2.0] - 2024-04-22
### Method
- Expo Update

### Added
- Users can change voice for the character they created

## [7.1.0] - 2024-04-22
### Method
- Expo Update

### Added
- User can see the groups in explore screen
- User can see more voices and has filter when create a bot

## [7.0.1] - 2024-04-21
### Method
- Expo Update

### Fixed
- The message screen is reset when in focus

### Changed
- Audio is fetched from storage, not decoded from base64 anymore

## [7.0.0] - 2024-04-21
### Method
- Expo Update

### Fixed
- User cannot record on iOS

### Add
- User can create a group chat
- User can see the group chat list
- User can talk in a group chat

## [6.0.2] - 2024-04-20

### Method
- Expo Update

### Fixed
- Fix character privacy cannot be changed in the profile screen.
- Fix the audio mode in the voice screen. The audio volume is too low.

## [6.0.1] - 2024-04-15

### Fixed
- Fix expo update error in App.js

## [6.0.0] - 2024-04-14

### Add
- User can see their created and liked bot and edit.
- Update UI for the profile screen, message, explore, random.
- Add expo updates for the app.

### Fixed
- UI of the random character screen not scrollable.

## [5.0.0] - 2024-04-10

### Added
- User can create a new bot, generate AI images for avatar, choose a voice
- User can like a bot, see their liked characters, and created characters
- User can choose a random character to chat with
- User can delete a chat

### Changed
- Change the UI of the explore screen, and character profile.

## [4.0.2] - 2024-03-10

### Add
- Add version code for Android

## [4.0.2] - 2024-03-07

### Change
- Change Welcome screen UI

### Fix
- User will not hear sound when going out of the voice screen.
- Animation in Voice screen only happen when bot is talking.

## [4.0.1] - 2024-03-05

### Change
- Change app logo because of Apple Copycat

## [4.0.0] - 2024-03-05

### Add
- User can log in with guest mode

## [3.0.1] - 2024-03-01

### Fix
- Fix log out by adding to the profile stack

## [3.0.0] - 2024-03-01

### Added
- Add Welcome Screen, terms and conditions, checkusername function
- Add report and feedback screen

### Fixed
- fix Login screen by add welcome screen.

## [2.0.0] - 2024-02-28

### Added
- Add user delete account, login UI, reset passwords
- Add microphone permission to eas.json

## [1.1.1] - 2024-02-26

### Added
- Update Profile functions: Theme, Notification, About.

## [1.1.0] - 2024-02-26

### Added
- Update UI for explore, sign up/login, message, chat, voice screen.
- Add search functionality for explore page.

## [1.0.3] - 2024-02-24

### Fixed
- Fix error by installing react-native-svg and react-native-screen, react-native-saft-area-view

## [1.0.2] - 2024-02-24

### Added
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