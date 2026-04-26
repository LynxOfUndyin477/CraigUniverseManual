
function load_article(article_name, id) {

    // load json file

    fetch("https://raw.githubusercontent.com/LynxOfUndyin477/CraigUniverseManual/refs/heads/main/Articles/" + article_name + ".json").then(response => {

        // get response

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); 
    }).then(data => {
        console.log(data);

        // opener

        let body = "<h2><a href=\"Article.html?title=" + article_name + "\">" + data.title + "</a></h2>";
        for (let i = 0; i < data.opener.length; i++) {
            let str = data.opener[i]
            str = str.replaceAll("{a=", "<a href=\"Article.html?title=");
            str = str.replaceAll("{a}", "</a>");
            str = str.replaceAll("}", "\">");
            body += "<p>" + str + "</p>";
        }
        document.getElementById(id).innerHTML += body;
    }).catch(error => {
        document.getElementById(id).innerHTML = "Failed to load :(";

        // catch error

        console.error("Failed to fetch data:", error);
    });
}



fetch("https://raw.githubusercontent.com/LynxOfUndyin477/CraigUniverseManual/refs/heads/main/Article_Metadata.json").then(response => {
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json(); 
}).then(data => {
    console.log(data);
    let articles = [];
    for (let i = 0; i < 4; i++) {
        let index = -1;
        let cont = true;
        while (cont) {
            index = Math.floor(Math.random() * data.length);
            cont = false
            for (let j = 0; j < articles.length; j++) {
                if (index == articles[j])
                cont = true;
            }
        }
        articles.push(index);
    }
    for (let i = 0; i < articles.length; i++) {
        load_article(data[articles[i]], "chosen" + (i + 1));
    }
}).catch(error => {
    console.error("Failed to fetch data:", error);
});
