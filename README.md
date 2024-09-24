# SmartTimeline

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.12.

# Smart Timeline

Smart Timeline is an Angular application that allows users to create and manage a timeline of memories and activities. The application integrates with Facebook to allow users to log in and fetch their profile information, photos, and posts.

## Features

- **User Authentication**: Users can log in using their Facebook account.
- **Timeline Management**: Users can add, edit, and view memories and activities on a timeline.
- **Facebook Integration**: Fetch user profile information, photos, and posts from Facebook.
- **Responsive Design**: The application is designed to be responsive and user-friendly.

## Technologies Used

- **Angular**: Frontend framework for building the application.
- **RxJS**: For handling asynchronous data streams.
- **Angular Material**: UI component library for Angular.
- **Facebook Graph API**: For interacting with Facebook services.

## Getting Started

### Prerequisites

- Node.js (version 12 or higher)
- Angular CLI (version 12 or higher)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/smart-timeline.git
   cd smart-timeline
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Set up your Facebook App:
   - Go to the [Facebook Developer Dashboard](https://developers.facebook.com/).
   - Create a new app and configure it to use Facebook Login.
   - Add your app's domain (e.g., `localhost`) in the app settings.

4. Update the environment files:
   - Open `src/environments/environment.ts` and `src/environments/environment.prod.ts`.
   - Replace the placeholders with your Facebook App ID and other necessary configurations.

   ```typescript
   export const environment = {
     production: false,
     facebookAppId: 'YOUR_FACEBOOK_APP_ID',
     // Other configurations...
   };
   ```

### Running the Application

To run the application in development mode, use the following command:

ng serve

Open your browser and navigate to `http://localhost:4200`.

### Building the Application

To build the application for production, use the following command:

ng build --prod

The output will be in the `dist/` directory.

## Usage

1. Click on the "Log in with Facebook" button to authenticate.
2. After logging in, you can view your profile information, photos, and posts.
3. Use the timeline interface to add and manage your memories and activities.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Angular](https://angular.io/)
- [RxJS](https://rxjs.dev/)
- [Angular Material](https://material.angular.io/)
- [Facebook Graph API](https://developers.facebook.com/docs/graph-api)


