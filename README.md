### Background
Find-the-country is a 'Where's Waldo' style game, and instead of finding a character on a static image, you have to find countries based on given flags and match the countries to ther respective flags. The project is made with React JS.

<img src=https://user-images.githubusercontent.com/88045655/172295420-53bdab44-69cc-446d-b2ad-c814b584dcdf.JPG alt="To-do tasks" width="600">

Live demo: [https://kn8a.github.io/find-the-country/](https://kn8a.github.io/find-the-country/)

### Project Requirments

 - ✔️ Start with a large photograph which contains several elements the user is meant to find, e.g. Waldo, The Wizard, Wilma etc… name your own if you’d like to use your own photos. The user will make selections for each character and they will get feedback on whether they are correct or not.
 - ✔️ When the user selects one of these characters, you should check with your Backend to see if that character is actually within the targeting box. Provide the user with appropriate feedback (e.g. if wrong, an error message). If correct, place a marker on the photo in the character’s location.
 - ✔️ Keep track of how long it takes between when the photo is first loaded and when the user finally identifies all characters.
 - ✔️ Once a round is complete, ask the user for his/her name and record that time. This will get a bit tricky since you’ll have anonymous users you need to keep track of.
 - ⭐ Optional - Have multiple levels of difficulty.
 - ⭐ Bonus - Keep track of user selection errors.

### Resources used
- Firebase - for storing game data, solutions and game scores
- svg world map - Guilherme de Souza Vieira, CC BY-SA 3.0 <https://creativecommons.org/licenses/by-sa/3.0>, via Wikimedia Commons
- svg2jsx - to convert world map svg to jsx
- react-bootstrap - UI library
- react-hash-string - Library to hash solutions for comparison with DB
- react-country-flag - Library to display country flags
- react-toastify - Library to display toasts
 
### Where I struggled

- Working with react-bootstrap, particularly with getting flags to display in the Navbar - documentation was a bit lacking.
- Timing the game play - solved using `Timestamp.now()` 
- Programatically navigating to `/scores/` route after score submit - solved using `useNavigate()`

### What I Learned

- Greater understanding of useEffect
- Using .env
- Manipulating individual paths of svg
- react-bootstrap; Navbar, Modal, Tabs, Table
- Greater understanding of react-router and `useNavigate()`
