# Quiz App

The Quiz App is an Angular-based application designed to provide users with a simple platform to take quiz on a range of English Learning topics and view their scores.

## Features

- Home page
- Quiz selection and completion
- Score result and course recommendation

## Technologies Used

- TypeScript
- Angular
- Angular Material
- Tailwind
- NgRX
- RxJs
- RxAngular
- HTML
- CSS

## Getting Started

To set up and run the Quiz App locally on your machine, please follow the instructions below:

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd quiz-app-ui`
3. Install the dependencies: `npm install`
4. Start the development server: `ng serve`
5. Open your browser and visit: `http://localhost:4200`

## Folder Structure

The folder structure of the project is organized as follows:

```
quiz-app/
  |- src/
      |- app/
          |- constants/
          |- guards/
          |- layouts/
          |- models/
          |- pipes/
          |- services/
          |- shared/
          |- state/
          |- ...
      |- assets/
      |- ...
  |- ...

```

- `src/` folder contains the source code of the application.
- `app/` folder contains the Angular layouts, services, and models and etc.
- `constants` folder contains the unchanging data used in the app.
- `layouts/` folder contains the individual components used in the app.
- `models/` folder contains the data models used in the application.
- `pipes/` folder contains the pipes used to transform strings, currency amounts, dates, and other data for display in the application.
- `services/` folder contains the Angular services for data retrieval and manipulation.
- `shared/` folder contains the shared individual components used in the app.
- `state/` folder contains the state management files used in the app.
- `assets/` folder contains static assets such as images and CSS files.

## Acknowledgements

- [Angular](https://angular.io/) - The web application framework used.
- [Angular Material](https://material.angular.io/) - The UI component library used.
- [Tailwind](https://tailwindcss.com/) - The CSS framework used for styling.
- [NgRX](https://ngrx.io/) - The state management used.
- [RxJS](https://rxjs.dev/) - The library used for reactive programming using Observables.
- [RxAngular](https://www.rx-angular.io/) - The library used for handling fully reactive app.
