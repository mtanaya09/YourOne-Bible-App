
# Bible Screens
## Introduction
Bible screens heavily use `Reference` and methods from [biblejs](https://github.com/davewasmer/biblejs) package, we highly suggest you take a moment to check it out first before diving in.

### BibleChapters
Renders all the chapters of the book selected from [BibleHome](#BibleHome).
### BibleHome
The main menu for the bible, where the book list is rendered for selection.
### BibleScreen
Where the bible screen is initially launched, before stacking further bible screens, thus containing the navigation for the bible screens.
### BibleVerses
Renders all the verses of the book selected from [BibleChapters](#BibleChapters).
### BibleView
Where the actual texts of the book is rendered.
# Bible Screens' Components
### BibleAPI
#### Bible
Returns the whole bible as a JS Object.
#### getChapter(`bookID`: Number(), `chapterID`: Number())
Returns all the texts of book `bookID` in chapter `chapterID` using the [Bible](#Bible).
### BibleContexts
This helps track the current progress of the user within the bible screens. Has two exposed methods `useReferenceContext` and `useReferenceUpdate`.
#### useReferenceContext()
Takes the current Reference stored in BibleContexts.
#### useReferenceUpdate(`Reference()`)
Takes a single `Reference` as an argument. This function updates the current reference with the `Reference` argument passed.
### BibleHeader
The header for each of the bible screens. Has two props:
- `text` - The text that will appear at the center of the header.
- `disableBackButton` - whether to render header's back button.
### BibleItem
Rendered in a FlatList, these are the individual buttons rendered in the BibleHome, BibleChapters, and BibleVerses screens.
Has three props:
- `item`: `{id: Number(), type: String(), name: String()}` - an object that contains the properties of the current `BibleItem`.
- `book`: `Number()` - id of the book the current `BibleItem` belongs to.
- `chapter`: `Number()` - index of the chapter in the book of the current `BibleItem` belongs to.

### BibleNavigation
props:
- `text`: `String()` - the text that will be displayed in between the arrow buttons.
- `switchFunc`: `Function()` - the function that will handle the switching for the screens.
Used in BibleChapters, BibleVerses, and BibleView screens. This component navigates the screen through the bible using left and right buttons on both sides of the screen.
### bookList.js
An array that contains objects with the following keys:
- `id`: `Number()` - the book's ID.
- `type`: `String()` - value in this context is always `book` since this is the books list after all.
- `name`: `String()` - the book's name.
## Bible Screen's Flowchart
```mermaid
graph TD
    Home[BibleHome] -->|Get books| Home_0(Render books in FlatList)
    Home_0 --> Books{Options}
    Books -->|Book Selected| Chapters[Chapters Screen]
    Books -->|Filter by Testament| Books_0(Filter books by New/Old Testament)
    Books -->|Search| Books_1(Filter books by their title) --> Home_0
```
```mermaid
graph TD
    BibleChapters -->|Get chapters of book| Chapters_0(Render chapters in FlatList)
    Chapters_0 --> ChapterSelect{Options}
    ChapterSelect --> |Chapter selected| BibleVerses
    ChapterSelect --> |Back pressed| BibleHome
    ChapterSelect --> |Next/Prev book pressed| Chapters_1(Switch book) --> Chapters_0
```
```mermaid
graph TD
    BibleVerses -->|Get verses of chapter| Verses_0(Render verses in FlatList)
    Verses_0 --> VerseSelect{Options}

    VerseSelect --> |Verse selected| BibleView
    VerseSelect --> |Back pressed| BibleChapters
    VerseSelect --> |Next/Prev book pressed| Chapters_1(Switch chapter) --> Verses_0
```
```mermaid
graph TD
	BibleView --> |Get the texts of the current chapter|Render(Render texts of the entire chapter)
	Render --> fromVerses{is from verses selection screen?}
	fromVerses --> |yes| Scroll(Scroll to the selected verse's index in the list)
	--> Options{Options}
	fromVerses --> |no| Options
	Options --> |Text pressed| Select(Select the text)
	Options --> |Back pressed| BibleVerses
	Options --> |Home pressed| BibleHome
	Options --> |Next/Prev book pressed| Chapters_1(Switch chapter) --> Render
```
