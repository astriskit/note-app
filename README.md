# note-app

A reactJS based simple web-app to keep track of various-notes.

## Migration to typescript

1. Removed the original dependencies - `react`, `react-dom`, `material-ui` and react-scripts by rewriting `package.json` and removing the `yarn.lock`.
2. Installed above mentioned dependencies, except `material-ui`. Intead install `@material-ui/core`, since it has upgraded. Due to this source has to be refactored to change the import statements and components name and thier possibly usage. The changes happened to be:
   1. Update imports: `material-ui/<ComponentName>` -> `@material-ui/core/<ComponentName>` or `import {<Components[]>} from "@material-ui/core"`.
   2. Update `onChange` handler in `TextField`. Now it uses `event.target.value`.
   3. Remove `CardText` - discarded from the library. Instead used `CardHeader` with `title` prop.
   4. Remove `FlatButton` and `RaisedButton` - discarded from the library. Instead used `Button` with props `variant` and `color` to get similar results.
   5. `Dialog` component -
      1. Updated `onRequestClose` prop to `onClose`.
      2. Added `DialogTitle` instead of `title` prop.
      3. Added `DialogContent` and `DialogContentText`.
3. To add typescript support as mentioned in the [CRA-docs](https://create-react-app.dev/docs/adding-typescript/#installation), install related dependencies using - `yarn add typescript @types/node @types/react @types/react-dom @types/jest`.
