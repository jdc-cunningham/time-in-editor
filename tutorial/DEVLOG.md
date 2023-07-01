6:16 PM

okay I'm just going to use their minimal code sample as a base

https://github.com/microsoft/vscode-extension-samples/tree/main/helloworld-minimal-sample

6:23 PM

ugh... trying to find a simple "editor is active or not"

editor focus when clause context

6:31 PM

okay I'm starting to form an idea of how this will work

I will use globalState (didn't really want to)

Need to figure out how to run a function when the editor has focus (and no longer does?)

6:34 PM

grabbed a NOS, cleaned fingers/keyboard damn oily keyboard fingers

6:37 PM

cool so I have a way to display the output as a little toast thing, can get more fancier but I just want hours/mins as a starting point

https://stackoverflow.com/a/58139566/2710227

https://stackoverflow.com/a/58139566/2710227

https://code.visualstudio.com/api/references/when-clause-contexts

6:52 PM

hmm... I broke it, doesn't open the extension host anymore

6:57 PM

I have that message again about markdown hmm

6:59 PM

that did fix it, I just realized this extension won't start unless I type it into the search bar so that's not good, has to start on its own

7:01 PM

okay this looks helpful, does use an activationEvent

https://stackoverflow.com/a/66572953/2710227

oh... it tries to run Markdown if that file is focused, not where it is, interesting

7:04 PM

yeah so if I have extension.js focused and run F5 it'll work, the above does activate extension on load

need to bind the editor focus

7:13 PM

I'm failing

7:19 PM

looking at this list of actions I can bind to

https://gist.github.com/skfarhat/4e88ef386c93b9dceb98121d9457edbf

7:28 PM

I found something I can use, on file cahnge...

problem with that is you can leave an editor open without changing a file... then large gap in time seems like working for a while

7:30 PM

idk I could work with that... typing into a file fires this event

I can make some kind of debouncer, to batch events

Hmm

