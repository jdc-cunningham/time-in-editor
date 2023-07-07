### About

<img src="./extension.JPG"/>

This just tracks how long the editor was active for.

I know these extensions exists, I wanted to learn how to make my own.

### Uses `vscode.window.state` (focused or not)

This is using `setInterval` every second it checks if the window is focused, if it is, stores a second/adds to total time displayed by calling `Time In Editor` via command palette.

### To compile

Have `@vscode/vsce` package installed globally, `vsce package`, then install by right of extension search, install by VSIX option

[Resource](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)

### Based on this VS Code extension sample code

[sample code](https://github.com/microsoft/vscode-extension-samples/tree/main/helloworld-minimal-sample)
