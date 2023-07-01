// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	console.log('"time-in-editor" extension activated');

	const projectFolder = vscode.workspace.workspaceFolders[0]?.name || `project-${time.now()}`;
	const slugify = (str) => str.split(' ').join('-').toLowerCase(); // no hoisting sad
	const projectName = slugify(projectFolder);

	const timeInEditor = () => {
		const seconds = context.globalState.get(projectName)?.timeInEditor || 0;
		return seconds; // format
	}

	// this is ran by the user with command palette eg. cltr + shift + p
	// matches package.json definition
	let disposable = vscode.commands.registerCommand('extension.timeInEditor', () => {
		vscode.window.showInformationMessage(`time in editor: ${timeInEditor()}`);
	});

	context.subscriptions.push(disposable);


	let tsGroup = [];

	const now = () => Math.trunc(Date.now() / 1000);

	const incrementProjectTime = () => {
		const prevTime = context.globalState.get(projectName)?.timeInEditor || 0;

		context.globalState.update(projectName, {
			timeInEditor: prevTime + tsGroup.length
		});

		tsGroup = [];
	}

	// this stores a timestamp if a keystroke elapsed a second from last stored event in tsGroup
	// then after a minute elapses in general the seconds that were logged in that minute are added
	// to the global state
	vscode.workspace.onDidChangeTextDocument(event => {
		const ts = now();

		if (tsGroup.length) {
			const firstEvent = tsGroup[0];
			const lastEvent = tsGroup[tsGroup.length - 1];

			if (ts > lastEvent) {
				if (ts > lastEvent + 60 || lastEvent - firstEvent >= 60) {
					// store new minute
					incrementProjectTime();
				} else {
					tsGroup.push(ts);
				}
			}
		} else {
			tsGroup.push(ts);
		}
	});
}

// this method is called when your extension is deactivated
function deactivate() {}

// eslint-disable-next-line no-undef
module.exports = {
	activate,
	deactivate
}