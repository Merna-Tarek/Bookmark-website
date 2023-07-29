
var allWebsites = []; 

var siteNameInput = document.getElementById("siteName");
var urlInput = document.getElementById("url");

if (localStorage.getItem("siteList")) {
    allWebsites=  JSON.parse(localStorage.getItem("siteList"));
    display();
}

function isValidURL(url) {
    try {
        new URL(url);
        return true;
    } catch (error) {
        return false;
    }
}

function addSite() {
    var siteName = siteNameInput.value.trim();
    var url = urlInput.value.trim();

    var website = {
        name: siteName,
        url: url,
    };

    if (siteName === "" || url === "") {
        window.alert( "Please enter both Site Name and URL");
        return;
    }

    for (var i = 0; i < allWebsites.length; i++) {
        if (siteName.toLowerCase() === allWebsites[i].name.toLowerCase()) {
        window.alert("Site already exists.");
        return;
    }
    }
        for (var i = 0; i < allWebsites.length; i++) {
        if (url.toLowerCase() === allWebsites[i].url.toLowerCase()) {
        window.alert("Site already exists.");
        return;
    }
        }
    if (siteName.length<3) {
        window.alert( "Site name must be at least 3 letters");
        return;
    }
    if (!isValidURL(url)) {
        window.alert("Invalid URL.");
        return;
    }
    allWebsites.push(website);
    display();
    localStorage.setItem("siteList", JSON.stringify(allWebsites));
    clear();
}


function clear() {
    siteNameInput.value=" ";
    urlInput.value=" ";

}

function display() {
    var cartona=' ';
    for (var i = 0; i< allWebsites.length; i++) {
    cartona+=`  <tr>
    <td>${i+1}</td>
    <td>${allWebsites[i].name}</td>
    <td> <button class="btn-success btn" onclick="visitSite(${i})"><i class="fa-solid fa-eye"></i> Visit</button></td>
    <td> <button onclick="deletSite(${i})" class="btn btn-danger"> <i class="fa-solid fa-trash-can "></i>Delete</button></td>
    </tr>`
        
    }
    document.getElementById("tBody").innerHTML=cartona;
}


function deletSite(index){
    allWebsites.splice(index,1);
    localStorage.setItem("siteList",JSON.stringify(allWebsites));
    display();
}
    

function visitSite(index) {
    if (allWebsites[index] && allWebsites[index].url) {
    var url = allWebsites[index].url;
    window.open(url, "_blank"); 
        }
    
}
