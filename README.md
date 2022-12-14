# side-scroller-game

## Installation
To install, just do npm i and then npm start

## Docs

### Assets
- Using Webpack Dev Server, https://github.com/webpack/webpack-dev-server
- It is run automagically for you when you use the command `npm run start` or the NPM Scripts bar in VSCode
- Sounds are Open license from https://freesound.org/

### Debugging
- On level 1, if you press the "k" key, you will open the debug scene, which lets you pick a specific scene
- You can also hardwire it in `/src/components/gameWindow.js` by overriding the `scenes` array

### Game Engine
- This project is using Phaser 3, https://photonstorm.github.io/phaser3-docs/
- Awsome examples for key properties at https://rexrainbow.github.io/phaser3-rex-notes/docs/site/ease-function/
- Game entry point is `/src/components/gameWindow.js` 
- Changes to the entry point file might cause some nonsense. It's good to note that using any React lifecycle functions may cause a double render in development mode.
- Phaser is loaded as a typed module, so you can get object references and autocompletes :)

### UI
- You can use MUI React for components, https://mui.com/material-ui/getting-started/overview/

### Usage
- `npm run start`
- After starting the server, all changes to /src will trigger an asset reload on any connected clients.
- If you make a new folder in /src, make sure to give it a new Alias in the webpack config, or else you'll end up in path hell.
