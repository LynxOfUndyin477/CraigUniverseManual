
const MONTHS = [
    "nil",
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
    let element = document.createElement("tr");
    element.innerHTML = "<td class=\"timeline-date\"><h1 class=\"timeline-date\">" + MONTHS[month] + " " + year + "</h1></td>"
    document.getElementById("timeline-body").appendChild(element);

    // load json file

    // https://raw.githubusercontent.com/LynxOfUndyin477/CraigUniverseManual/refs/heads/main/Timeline/2023_10.json
    fetch("https://raw.githubusercontent.com/LynxOfUndyin477/CraigUniverseManual/refs/heads/main/Timeline/" + year + "_" + month + ".json").then(response => {

        // get response

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); 
    }).then(data => {
        console.log(data);
        let body = "<td class=\"timeline-info\">";

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
        element.innerHTML += body + "</td>";
    }).catch(error => {
        element.innerHTML += "<h2>Data Unavailable</h2><p>" + error + "</p></td>";

        // catch error

        console.error("Failed to fetch data:", error);
    });
}


fetch("https://raw.githubusercontent.com/LynxOfUndyin477/CraigUniverseManual/refs/heads/main/Timeline_Metadata.json").then(response => {

    // get response

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json(); 
}).then(data => {
    console.log(data);
    for (let i = 0; i < data.length; i++) {
        load_timeline(data[i][1], data[i][0]);
    }
}).catch(error => {

    // catch error

    console.error("Failed to fetch data:", error);
});