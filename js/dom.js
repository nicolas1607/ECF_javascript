let i = 0; // nb de lignes du tableau

function newImport(artist, album, title, i){

    const table = document.querySelector("#res-body");

    const tr = document.createElement("tr");
    const tdRes = document.createElement("td");
    tdRes.className = "id-res";
    tdRes.textContent = i;
    const tdArtist = document.createElement("td");
    tdArtist.className = "artist-res";
    tdArtist.textContent = artist;
    const tdTitle = document.createElement("td");
    tdTitle.className = "title-res";
    tdTitle.textContent = title;
    const tdAlbum = document.createElement("td");
    tdAlbum.className = "album-res";
    tdAlbum.textContent = album;
    const tdAction = document.createElement("td");
    tdAction.className = "action-res";
    const a = document.createElement("a");
    a.className = "action-button";
    const img = document.createElement("img");
    img.src = "img/noun_more_4052946.svg";

    a.append(img);
    tdAction.append(a);
    tr.append(tdRes);
    tr.append(tdArtist);
    tr.append(tdTitle);
    tr.append(tdAlbum);
    tr.append(tdAction);
    table.append(tr);

}

function addSpinner(){
    const spinner = document.querySelector(".spinner");
    spinner.setAttribute("style", "visibility:visible");
}

function removeSpinner(){
    const spinner = document.querySelector(".spinner");
    spinner.setAttribute("style", "visibility:hidden");
}

function addTotal(totalSearch){
    const total = document.querySelector("#total");
    (totalSearch<=1) ? total.textContent = totalSearch + " résultat" : total.textContent = totalSearch + " résultats";
}

function noResult(){
    const table = document.querySelector("#res-table");

    const tfoot = document.createElement("tfoot");
    tfoot.id = "res-foot";
    const tr = document.createElement("tr");
    const th = document.createElement("th");
    th.textContent = "Aucun résultat ne correspond à votre recherche ... Try again !";

    tr.appendChild(th);
    tfoot.appendChild(tr);
    table.appendChild(tfoot);
}

function addInfo(){
    const tbody = document.querySelector("#res-body");
    const info = document.createElement("tr");
    info.id = "res-info";
    const th = document.createElement("th");
    th.textContent = "Veuillez saisir une nouvelle recherche... Please !";
    info.appendChild(th);
    tbody.appendChild(info);
}

function removeInfo(){
    const info = document.querySelector("#res-info");
    if (info) info.remove();
}

function removeMore(){
    let more = document.querySelector("#res-foot");
    if (more) more.remove();
}