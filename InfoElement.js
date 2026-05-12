

// ---------------------------------------------- Get Element


function add_elements(root, data)
{

    // text

    if (typeof data === "string") {
        element = document.createElement("p");
        element.innerHTML = get_text(data);
        root.appendChild(element);
        return;
    }
    
    // list
    
    if (Array.isArray(data)) {
        root.appendChild(get_list_element());
        return;
    }

    // other

    if (typeof data === "object") switch (data.type) {
        case "section":
            root.appendChild(get_section_element(data));
            break;
        return;
    }
}


// ---------------------------------------------- Get Section Element


function get_section_element(data)
{
    let element_div = document.createElement("div");

    // header

    let element_header = document.createElement("h2");
    element_header.innerText = data.header;
    element_div.appendChild(element_header);

    // contents

    let element;
    let subdata;
    for (let i = 0; i < data.content.length; i++) {
        add_elements(element_div, data.content[i]);
    }

    // return

    return element_div;
}


// ---------------------------------------------- Get Text


function get_text(data)
{
    let meta_key = "";
    let meta_val = "";
    let meta_creating = false;
    let meta_finish_key = false;
    let meta_ending = false;

    // loop through text

    let text = "";
    let char = "";
    for (let i = 0; i < data.length; i++) {
        char = data[i];
        if (!meta_creating) {
            if (char != "{") text += char;
            else meta_creating = true;
        } else {

            // clear meta

            if (char == "/" && !meta_finish_key) meta_ending = true;

            // end meta

            else if (char == "}") {
                meta_creating = false;
                switch (meta_key) {

                    // general links

                    case "l":
                        if (meta_ending) text += "</a>";
                        else text += "<a href=\"" + meta_val + "\">";
                        break;
                    
                    // article links

                    case "a":
                        if (meta_ending) text += "</a>";
                        else text += "<a href=\"Article.html?title=" + meta_val + "\">";
                        break;
                    
                }
                if (meta_ending) {
                    meta_key = "";
                    meta_val = "";
                }
                meta_finish_key = false;
                meta_ending = false;
            }

            // finish key

            else if (char == "=") meta_finish_key = true;

            // add to meta

            else {
                if (meta_finish_key) meta_val += char;
                else meta_key += char;
            }

        }
    }
    return text;
}


// ---------------------------------------------- Get List Element


function get_list_element(data)
{
    let element_ul = document.createElement("ul");
    let element_li;
    for (let i = 0; i < data.length; i++) {
        element_li = document.createElement("li");
        add_elements(element_li, data[i]);
        element_ul.appendChild(element_li);
    }
}
