// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

const slugify = (str) => str.split(' ').join('-').toLowerCase();

const formatSeconds = (seconds) => {
	let timeLeft = seconds;

  // seconds
  if (seconds < 60) {
  	return `${seconds}s`;
  }

  // mins
  if (seconds > 60 && seconds < 3600) {
  	const minutes = Math.trunc(seconds / 60);

    return `${minutes}min${minutes > 1 ? 's' : ''} ${seconds % 60}s`;
  }

  // hours
  if (seconds > 3600 && seconds < 86400) {
 		const hours = Math.trunc(seconds / 3600);

    timeLeft = timeLeft - hours * 3600;

    const minutes = Math.trunc(timeLeft / 60);

    timeLeft = timeLeft - minutes * 60;

    return `${hours}hr${hours > 1 ? 's' : ''} ${minutes}min${minutes > 1 ? 's' : ''} ${timeLeft % 60}s`;
  }

  // days
  if (seconds >= 86400) {
  	const days = Math.trunc(seconds / 86400);

    timeLeft = timeLeft - days * 86400;

 		const hours = Math.trunc(timeLeft / 3600);

    timeLeft = timeLeft - hours * 3600;

    const minutes = Math.trunc(timeLeft / 60);

    timeLeft = timeLeft - minutes * 60;

    return `${days}day${days > 1 ? 's' : ''} ${hours}hr${hours > 1 ? 's' : ''} ${minutes}min${minutes > 1 ? 's' : ''} ${timeLeft % 60}s`;
  }
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	console.log('"time-in-editor" extension activated');

	const projectFolder = vscode.workspace.workspaceFolders[0]?.name || `project-${time.now()}`;
	const projectName = slugify(projectFolder);

	const timeInEditor = () => {
		const seconds = context.globalState.get(projectName)?.timeInEditor || 0;
		return {
			formatted: formatSeconds(seconds),
			raw: seconds
		};
	}

	// this is ran by the user with command palette eg. cltr + shift + p
	// matches package.json definition
	let disposable = vscode.commands.registerCommand('extension.timeInEditor', () => {
		const projectElapsedTime = timeInEditor();

		vscode.window.showInformationMessage(`time in editor: ${projectElapsedTime.formatted} \n | ${projectElapsedTime.raw} seconds`);
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