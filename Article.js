
function load_article(article_name) {

    // load json file

    fetch("https://raw.githubusercontent.com/LynxOfUndyin477/CraigUniverseManual/refs/heads/main/Articles/" + article_name + ".json").then(response => {

        // get response

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); 
    }).then(data => {
        console.log(data);
        let element_head = document.getElementById("article-head");
        element_head.innerHTML = ""

        // title

        let element_h1 = document.createElement("h1");
        element_h1.innerHTML = data.title;
        element_head.appendChild(element_h1);

        // opener

        for (let i = 0; i < data.opener.length; i++) {
            add_elements(element_head, data.opener[i]);
        }

        // sections

        let element_section = document.getElementById("article-sections");
        element_section.innerHTML = ""
        for (let i = 0; i < data.sections.length; i++) {
            element_section.appendChild(get_section_element(data.sections[i]));
        }

        document.getElementById("article-timeline").innerHTML = "";
        document.getElementById("article-seealso").innerHTML = "";
    }).catch(error => {
        document.getElementById("article-head").innerHTML = "Failed to load article \"" + article_name + "\" :(";
        document.getElementById("article-sections").innerHTML = error;
        document.getElementById("article-timeline").innerHTML = "";
        document.getElementById("article-seealso").innerHTML = "There is nothing to see";

        // catch error

        console.error("Failed to fetch data:", error);
    });
}



const [DOMAIN_AND_PATH, QUERY_STRING] = window.location.href.split("?");
const QUERY_LIST = QUERY_STRING.split("&");
console.log(DOMAIN_AND_PATH);
console.log(QUERY_STRING);
console.log(QUERY_LIST);
if (QUERY_LIST.length > 0) {
    var [query_name, query_value] = QUERY_LIST[0].split("=");
    console.log(query_name);
    console.log(query_value);
    if (query_name == "title") load_article(query_value);
}