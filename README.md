# Emoji Clicker

![Screenshot](https://github.com/marpor/emoji-clicker/assets/8584446/701eb432-a088-473e-807f-d1cc99dc8b7a)

Welcome to Emoji Clicker - a Cookie Clicker inspired game, using Emojis instead of cookies.

The game is pretty basic, and the upgrades will only take you so far.

But think of the game as a template, and replace the various emojis, upgrades and maybe even game logic with your original ideas!

## Upgrades

Upgrades are defined in `upgrades.js`.

At the top of the file there's a comment describing the supported upgrade types.

> The file is JavaScript, so you need be careful about formatting.
> 
> Pay special attention to match the various types of parantheses. Every start `{` and `[` needs a matching `]` and `}`! The same goes for quotes `""`.
> 
> Also, you need to look out for the colons `:` and commas `,`.
> 
> If something doesn't work, look for errors in **Devtools**, or press Ctrl+S to have Repl.it format the code for you. If you missed a special character, the alignment of the text will most likely look odd.

But copy-paste an existing upgrade and you should be fine.

## Visuals

To change the visual look and feel of the game you will need some experience with HTML and CSS to edit the files `index.html` and `style.css`.

You will need to be careful to retain the existing id's and class names, as many of these are referenced from the JavaScript `script.js`.

As long as you do that, though, you can change pretty much everything here. In particular, there's a special `div` with `id="TEMPLATE"` that is cloned and updated for each upgrade.

## Behavior

Behavior apart from what can be defined via the upgrades will need some adjustments to `script.js`, and requires some experience with JavaScript.

I have, however, tried hard to structure the code to be both simple and easy to understand. Be sure to read the comments, and don't be afraid to break stuff!

## Tips

### Tip #1 - Start with more Emojis when testing
While you test your game and upgrades you may want to increase the number of emojis you start with.

Simply change the `total` in `script.js` to something greater than `0`:

```javascript
let total = 0;         // Total number of emojis
```

## Ideas 

### Idea: Change the Name of the Game

`index.html` is where the action is. You'll want to make sure to replace the name inside both `<title>` and `<h1>` tags. 

### Idea: Change the Emoji

Also in `index.html`. Hard to miss, but make sure to leave the surrounding `<button><span id="emoji">` intact.

You can type emojis by pressing **Win + .** (on Windows) or the **Globe key** (on Mac), then type in a word to search.

You can also use a site such as https://unicode.party/

### Idea: Make the Emoji larger

The current size is defined by the CSS selector `#game button`. Since our Emojis are actually text, their size is controlled by `font-size`.

### Idea: Remove Emoji Button Background

Maybe your game is better without a button under the Emoji?

Look for the `background`, `border` and `box-shadow` in both  `#game button` and `#game button:active`.

### Idea: Change the Background

You can control the background of either the entire page (via a rule for `body`), the `.left` or `.right` sides (or `#game` and `#upgrade`).

### Idea: Add a new upgrade type

The behavior of each existing upgrade type is implemented with code.

Start by looking at one of the existing types.

Search (Ctrl+F) for it's name (for example `farm`) in `script.js`.

Copy or adjust the behavior in the places needed.

## Have Fun!

Take a look on the next two pages for some **tips** 😎 and **ideas** ⭐

I can't wait to see what you will build with this!

Have fun!

/Mark
