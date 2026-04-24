
function get_content_html(content) {
    let str;

    // array

    if (Array.isArray(content)) {

        // table

        if (Array.isArray(content[0])) {
            str = "<table>";
            for (let i = 0; i < content.length; i++) {
                str += "<tr>";
                for (let j = 0; j < content[i].length; j++) {
                    str += "<td>" + get_content_html(content[i][j]) + "</td>";
                }
                str += "</tr>";
            }
            str += "</table>";
        }

        // list

        else {
            str = "<ul>";
            for (let i = 0; i < content.length; i++) {
                str += "<li>" + content[i] + "</li>";
            }
            str += "</ul>";
        }
    }

    // other

    else {
        str = content
        str = str.replaceAll("{a=", "<a href=\"Article.html?title=");
        str = str.replaceAll("{a}", "</a>");
        str = str.replaceAll("}", "\">");
    }

    return str;
}



function get_section_html(sections, steps) {
    let body = "<div>";
    let secion;
    let content;
    let str;
    for (let i = 0; i < sections.length; i++) {
        secion = sections[i];
        switch (steps) {
            case 0:
                body += "<h2>" + secion.header + "</h2>";
                break;
            case 1:
                body += "<h3>" + secion.header + "</h3>";
                break;
            default:
                body += "<h6>" + secion.header + "</h6>";
        }

        // contents

        for (let j = 0; j < secion.contents.length; j++) {
            body += "<p>" + get_content_html(secion.contents[j]) + "</p>";
        }

        if (secion.subsections != undefined) body += get_section_html(secion.subsections, steps + 1);
    }
    body += "</div>";
    return body;
}



function load_article(article_name) {

    // load json file

    fetch("./Articles/" + article_name + ".json").then(response => {

        // get response

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); 
    }).then(data => {
        console.log(data);

        // title

        console.log(data.title);
        document.getElementById("article-head").innerHTML = data.title

        // opener

        let body = ""
        for (let i = 0; i < data.opener.length; i++) {
            let str = data.opener[i]
            str = str.replaceAll("{a=", "<a href=\"Article.html?title=");
            str = str.replaceAll("{a}", "</a>");
            str = str.replaceAll("}", "\">");
            body += "<p>" + str + "</p>";
        }

        // sections

        body += get_section_html(data.sections, 0) + "</div>";
        document.getElementById("article-sections").innerHTML = body

        // see also

        document.getElementById("article-seealso").innerHTML = ""
    }).catch(error => {
        document.getElementById("article-head").innerHTML = "Failed to load :("
        document.getElementById("article-sections").innerHTML = "Failed to load article \"" + article_name + "\""
        document.getElementById("article-timeline").innerHTML = error
        document.getElementById("article-seealso").innerHTML = "There is nothing to see"

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