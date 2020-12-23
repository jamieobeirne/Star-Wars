
import pec2 from './pec2';



//Ejercicio 1///////
async function setMovieHeading(movieId, titleSelector, infoSelector, directorSelector) {

    let movieTitle = document.querySelector(titleSelector); //para que serve?
    let movieInfo = document.querySelector(infoSelector);
    let movieDirector = document.querySelector(directorSelector);

    let movie = await pec2.getMovieInfo(movieId);

    movieTitle.innerHTML = movie.name;
    movieInfo.innerHTML = "Episode " + movie.episodeID + " - " + movie.release.slice(0, 4);
    movieDirector.innerHTML = "Director: " + movie.director;
}



//Ejercicio 2/////////
async function initMovieSelect(htmlID) {
    let movieList = await pec2.listMoviesSorted();

    let selectElement = document.querySelector(htmlID);
    let selectMovieTitle = document.createElement("OPTION");//for "Select message"
    selectMovieTitle.innerText = "Select A Movie";
    selectMovieTitle.setAttribute('value', ' ');
    selectElement.appendChild(selectMovieTitle);

    for (let i = 0; i < movieList.length; i++) {            //for titles of movies        
        let testMovieTitle = document.createElement("OPTION");
        testMovieTitle.innerText = movieList[i].name;
        testMovieTitle.setAttribute("value", movieList[i].episodeID);//for values
        selectElement.appendChild(testMovieTitle);
    }
}



//Ejercicio 3/////////
async function setMovieSelectCallbacks() {
    let title = document.querySelector(".movie__title");
    let info = document.querySelector(".movie__info");
    let director = document.querySelector(".movie__director");

    title.style.visibility = "hidden"; //hides initial HTML select message
    info.style.visibility = "hidden";
    director.style.visibility = "hidden";

    document.getElementById("select-movie").addEventListener("change", function (dataFromEvent) {
        document.querySelector(".list__characters").innerHTML = ""; //clears list of characters in main section (again)
        if (dataFromEvent.target.value != " ") {
            let newID;
            switch (dataFromEvent.target.value) {//convert episode ID to films ID
                case '4':
                    newID = 1;
                    break;
                case '5':
                    newID = 2;
                    break;
                case '6':
                    newID = 3;
                    break;
                case '1':
                    newID = 4;
                    break;
                case '2':
                    newID = 5;
                    break;
                case '3':
                    newID = 6;
                    break;
            }

            title.style.visibility = "visible";//displays selection
            info.style.visibility = "visible";
            director.style.visibility = "visible";

            setMovieHeading(newID, ".movie__title", ".movie__info", ".movie__director");

            loadPlanets(newID);//excericse 4

        } else {
            title.style.visibility = "hidden"; //returns to hidden for select message
            info.style.visibility = "hidden";
            director.style.visibility = "hidden";
        }
    });
}



//Ejercicio 4///////
async function loadPlanets(movieID) {
    let planetas = await pec2.getMovieCharactersAndHomeworlds(movieID);
    let planetasArray = [];
    let selectHomeworldElement = document.querySelector("#select-homeworld");
    let selectPlanetTitle = document.createElement("OPTION");//for "Select message"

    document.getElementById("select-homeworld").innerHTML = ""; //clears selector

    for (let i = 0; i < planetas.characters.length - 1; i++) {
        planetasArray.indexOf(planetas.characters[i].homeworld) === -1 ? planetasArray.push(planetas.characters[i].homeworld) : console.log(planetas.characters[i].homeworld + " already exists");
        //the above command filters for planets that already are in the array
    }

    selectPlanetTitle.innerText = "Select a homeworld";
    selectPlanetTitle.setAttribute('value', ' ');
    selectHomeworldElement.appendChild(selectPlanetTitle);

    for (let i = 0; i < planetasArray.length; i++) {  //for titles of movies        
        let homeworldName = document.createElement("OPTION");

        homeworldName.innerText = planetasArray[i];
        homeworldName.setAttribute("value", [i]);
        homeworldName.setAttribute('id', 'homeworld');
        selectHomeworldElement.appendChild(homeworldName);
    }

    addChangeEventToSelectHomeworld(planetas);//exercise 5
}



//Ejercicio 5
let li = document.querySelector(".list__item");//copies HTML elements to recycle
document.querySelector(".list__characters").innerHTML = ""; //clears initial list of characters in main section

async function addChangeEventToSelectHomeworld(objectFromAPI) {
    let overallCharacterData = objectFromAPI.characters;

    document.getElementById("select-homeworld").addEventListener("change", function (dataFromEvent) {
        document.querySelector(".list__characters").innerHTML = ""; //clears list of characters in main section

        let convertValueToString = (parseInt(dataFromEvent.target.value)) + 1;
        let selectedHomeworld = (dataFromEvent.target[convertValueToString].innerText);

        for (let i = 0; i < overallCharacterData.length; i++) {
            let homeworld = overallCharacterData[i].homeworld;
            let characterName = overallCharacterData[i].name
            let birth_year = overallCharacterData[i].birth_year
            let eye_color = overallCharacterData[i].eye_color
            let gender = overallCharacterData[i].gender

            if (selectedHomeworld == homeworld) {

                let newLi = li.cloneNode(true);
                newLi.querySelector(".character__name").innerHTML = characterName;
                newLi.querySelector(".character__birth").innerHTML = "<strong>Birth Year:</strong> " + birth_year;
                newLi.querySelector(".character__eye").innerHTML = "<strong>Eye color:</strong> " + eye_color;
                newLi.querySelector(".character__gender").innerHTML = "<strong>Gender:</strong> " + gender;
                newLi.querySelector(".character__home").innerHTML = "<strong>Home World:</strong> " + homeworld;

                document.querySelector(".list__characters").appendChild(newLi);

                console.log(characterName);


            }
        }
    });
}


export default { setMovieHeading, initMovieSelect, setMovieSelectCallbacks };




