let id = 1;
let offset = 0;
let nb = 0; // compte le nb de résultat par fetch
let totalSearch = 0;
let finish = false;


window.onscroll = function(ev) {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        if (!finish){
            addSpinner();
            moreSearch();
        }
    }
};


function search(){

    addSpinner();

    let search;
    let resArtist = [];
    let resTitle = [];
    let resAlbum = [];
    let artist, album, title;

    if (offset==0) removeInfo();

    const select = document.querySelector("#search-select").value;
    const input = document.querySelector("#search-input").value.split(" ").reduce((acc, cur) => { return { count: acc.count + 1, result: (acc.count > 1 ? (cur + ", " + acc.result) : (acc.count === 1 ? (acc.result + "+" + cur) : cur)) } }, { result: "", count: 0 }).result;

    if (select == 'title') search = encodeURI("recording:"+input);
    else if (select == 'artist') search = encodeURI("artist:"+input);
    else if (select == 'album') search = encodeURI("release:"+input);
    else if (select == 'everything') search = encodeURI("recording:"+input+" OR artist:"+input+" OR release:"+input);

    fetch("http://musicbrainz.org/ws/2/recording/?query="+search+"&limit=100&fmt=json&offset="+offset).then(function(response){
        if (response.status == 200) removeSpinner();
        response.json().then(function(value){
            nb = 0;
            addTotal(value.count);
            if (value.count == 0) noResult();
            if (totalSearch == value.count) finish = true;
            else{
                value.recordings.map(function(record){
                    artist = "";
                    // On check les artist featuring another artist
                    listArtist = record['artist-credit'];
                    for (let i=0; i<=listArtist.length-1; i++){
                        if (i==listArtist.length-1) artist = listArtist[i].name + artist;
                        else artist += " feat. " + listArtist[i].name;
                    }
                    if (record.releases != null){
                        if (select=='album'){
                            for (let i=0; i<record.releases.length; i++){
                                if (record.releases[i]['release-group'].title.toLowerCase().includes(input.toLowerCase())){
                                    album = record.releases[i]['release-group'].title;
                                }
                            }
                        }
                        else album = record.releases[i]['release-group'].title;
                    }
                    // (record.releases != null) ? album = record.releases[0]['release-group'].title : album = 'Unknow album';
                    title = record.title;
                    // On évite les doublons (des différents formats)
                    // if (!resArtist.includes(artist) || !resTitle.includes(title) || !resAlbum.includes(album)){
                        resArtist.push(artist);
                        resTitle.push(title);
                        resAlbum.push(album);
                        // if ((select == 'title' && title.toLowerCase().includes(input.toLowerCase())) ||
                        //     (select == 'artist' && artist.toLowerCase().includes(input.toLowerCase())) ||
                        //     (select == 'album' && album.toLowerCase().includes(input.toLowerCase())) ||
                        //     (select == 'everything' && (title.toLowerCase().includes(input.toLowerCase()) || 
                            // artist.toLowerCase().includes(input.toLowerCase()) || album.toLowerCase().includes(input.toLowerCase())))) {
                        // if (title!=undefined && artist!=undefined && album!=undefined){
                            newImport(artist, album, title, id++); 
                            totalSearch++;
                            nb++;
                        // }
                    // }
                });
                removeSpinner();
                if (nb == 0 && !finish){
                    removeMore();
                    moreSearch();
                }
            }
        });
    });

}   

const btn = document.querySelector("#search-button");
btn.addEventListener('click', newSearch);

const input = document.querySelector("#search-input");
input.addEventListener('keypress', function(e){
    var key = e.which || e.keyCode;
    if (key === 13) {
        newSearch();
    }
});

function resetSearch(){
    let table = document.querySelector("#res-table");
    let tbody = document.querySelector("#res-body");
    tbody.remove();
    tbody = document.createElement("tbody");
    tbody.id = "res-body";
    table.append(tbody);
}

function moreSearch(){
    offset+=100;
    search();
}

function newSearch(){
    id = 1;
    offset = 0;
    totalSearch = 0;
    finish = false;
    // On reset le tableau
    let more = document.querySelector("#res-foot");
    if (more) more.remove();
    resetSearch();
    search();
}