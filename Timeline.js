
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
    let element_tr = document.createElement("tr");
    document.getElementById("timeline-body").appendChild(element_tr);
    let element_td = document.createElement("td");
    element_td.classList.add('timeline-date');
    element_td.innerHTML = "<h1 class=\"timeline-date\">" + MONTHS[month] + " " + year + "</h1>";
    element_tr.appendChild(element_td);
    element_td = document.createElement("td");
    element_td.classList.add('timeline-info');
    element_tr.appendChild(element_td);

    // load json file

    // https://raw.githubusercontent.com/LynxOfUndyin477/CraigUniverseManual/refs/heads/main/Timeline/2023_10.json
    fetch("https://raw.githubusercontent.com/LynxOfUndyin477/CraigUniverseManual/refs/heads/main/Timeline/" + year + "_" + month + ".json").then(response => {

        // get response

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    }).then(data => {

        // setup

        console.log(data);
        for (let i = 0; i < data.length; i++) {
            element_td.appendChild(get_section_element(data[i]));
        }
    }).catch(error => {

        // catch error

        element_td.innerHTML += "<h2>Data Unavailable</h2><p>" + error + "</p></td>";
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