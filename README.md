# Talk To Listen Front End

## Installation

1. Install dependencies

```bash
npm install
```

2. Run the application ( **switch to expo go mode** )

```bash
npx expo start --tunnel
```

## Submission to Expo

Build

```bash
npx eas build --platform all --profile production
```

- Submit the build to expo for iOS

```bash
npx eas submit --platform ios
```

- Submit the build to expo for Android

```bash
npx eas submit --platform android
```

## Update

```bash
git checkout production && git merge main && npx eas update --branch production --message "Update to latest version" && git checkout main
```
