
const MONTHS = [
    "January",
    "Feburary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];



function load_timeline(month, year) {
    let element = document.createElement("div");
    element.innerHTML = "<h1>" + MONTHS[month] + " " + year + "</h1>"
    document.getElementById("timeline-body").appendChild(element);

    // load json file

    // https://raw.githubusercontent.com/LynxOfUndyin477/CraigUniverseManual/refs/heads/main/Timeline/2023_10.json
    fetch("https://raw.githubusercontent.com/LynxOfUndyin477/CraigUniverseManual/refs/heads/main/Timeline/" + year + "_" + (month + 1) + ".json").then(response => {

        // get response

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); 
    }).then(data => {
        console.log(data);
        let body = "";

        // events

        let event;
        for (let i = 0; i < data.length; i++) {
            event = data[i];
            body += "<div><h2>" + event.header + "</h2>";

            // contents

            for (let j = 0; j < event.contents.length; j++) {
                let str = event.contents[j]
                str = str.replaceAll("{a=", "<a href=\"Article.html?title=");
                str = str.replaceAll("{a}", "</a>");
                str = str.replaceAll("}", "\">");
                body += "<p>" + str + "</p>";
            }

            body += "</div>";
        }
        element.innerHTML += body;
    }).catch(error => {
        element.innerHTML += "<p>Data unavailable</p>";

        // catch error

        console.error("Failed to fetch data:", error);
    });
}



for (let i = 2023; i < 2027; i++) {
    for (let j = 0; j < 12; j++) {
        load_timeline(j, i);
    }
}