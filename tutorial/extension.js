// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  let timeInEditor = 0;

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "time-in-editor" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.timeInEditor', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage(`time in editor: ${timeInEditor}`);
	});

	context.subscriptions.push(disposable);

	// https://stackoverflow.com/a/70340951/2710227
	// workbench.action.focusActiveEditorGroup
	// workbench.action.focusPanel
	// let focusDisposable = vscode.commands.registerCommand('workbench.action.focusActiveEditorGroup', (event) => focusFn(event));

	// const focusFn = (focusDisposable) => {
	// 	focusDisposable.dispose();

	// 	console.log('focus');
	// }

	// context.subscriptions.push(focusDisposable);

	vscode.workspace.onDidChangeTextDocument(event => {
		console.log('change');
	});
}

// this method is called when your extension is deactivated
function deactivate() {}

// eslint-disable-next-line no-undef
module.exports = {
	activate,
	deactivate
}