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

7:37 PM

I'm trying to think about how this works... everytime you type that's good... keep the counter going

I think useful time unit would be a whole minute

Then you store those over time

Something like if user stops typing for a whole minute, then done working

7:39 PM

interesting here

https://stackoverflow.com/questions/57811209/how-to-get-currently-opened-files-project-folder-path-in-visual-studio-code-ext

talk about an npm package cron

7:41 PM

today's gonna be a miserable day I gotta reset my sleep pattern, I keep trying/failing

I've only tried once recently but yeah, I woke up near 5 PM today that's how bad my sleep pattern is atm

You have to make yourself stay awake like 30+ hrs until you get to within 12 hours of your waking time, ideally you have a nice bed/dark place or mask with no distractions

In my case my bed is uncomfortable so I keep rolling around every few hours

It would be nice to get metrics on a project vs. just hours but that's future, you can also see github commits

So my current thought is there is global counter that keeps counting, and everytime the change thing fires, it does something...

elapsed time, if the elapsed time is more than 1 minute then discard group

7:47 PM

ooh yes loopable song came on, recent future funk find

okay I think I know what it does...

- first run starts every second recursive function (secondCounter)
  - stores current epoch timestamp
- next run checks if within 1 minute
  - stores with current batch
  - does not store, save previous batch and start new

finally when you run the palette command it pulls the group for the active folder

oh wait... there's no need for a counter

7:51 PM

the timestamp is 13 digits long so it's millisecond accurate

7:55 PM

I think this logic is simple enough

You need two events, so you can compare the two times

As more are added, you are comparing first entry with latest, if that set is at 60 seconds apart then that's a minute to add to batch time

idk... doesn't seem right

you open a file, edit it, wait 59 seconds, edit it again, did you spend a minute working on it?

key strokes can be less than a second apart

so you log the new second as you type, then sum these up when they hit 60

7:58 PM

still need to store it/group

8:09 PM

storing seconds... hmm

8:20 PM

this is working... I'm just going to write a quick second to whatever formatter, test it then get this thing installed

8:35 PM

lol I've written a time formatter before but I still get mixed up a bit with the whole modulus remainder thing and guard clauses

install a package bro

days > hours > minutes > seconds

8:55 PM

okay this seems passable, need to add and start using

9:05 PM

ugh tracked VSIX file still dang it

cool it's active now tracking this repo ha

9:08 PM

I'm considering this done for now
