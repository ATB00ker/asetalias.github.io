function showHome() {
    document.getElementById('home').style.display = "block";
    document.getElementById('intro').style.display = "none";
    document.getElementById('section_joinUs').style.display = "none";
    document.getElementById('events').style.display = "none";
    document.getElementById('team').style.display = "none";
    document.getElementById('settingsPage').style.display = "none";
    $('button-collapse').sideNav('hide');
}
function showAboutUs() {
    document.getElementById('home').style.display = "none";
    document.getElementById('intro').style.display = "block";
    document.getElementById('section_joinUs').style.display = "none";
    document.getElementById('events').style.display = "none";
    document.getElementById('team').style.display = "none";
    document.getElementById('settingsPage').style.display = "none";
    $('.button-collapse').sideNav('hide');
}
function showJoinUs(){
    document.getElementById('home').style.display = "none";
    document.getElementById('intro').style.display = "none";
    document.getElementById('section_joinUs').style.display = "block";
    document.getElementById('events').style.display = "none";
    document.getElementById('team').style.display = "none";
    document.getElementById('settingsPage').style.display = "none";
    $('.button-collapse').sideNav('hide');
}
function showEvents(){
    document.getElementById('home').style.display = "none";
    document.getElementById('intro').style.display = "none";
    document.getElementById('section_joinUs').style.display = "none";
    document.getElementById('events').style.display = "block";
    document.getElementById('team').style.display = "none";
    document.getElementById('settingsPage').style.display = "none";
    $('.button-collapse').sideNav('hide');
}
function showTeam(){
    document.getElementById('home').style.display = "none";
    document.getElementById('intro').style.display = "none";
    document.getElementById('section_joinUs').style.display = "none";
    document.getElementById('events').style.display = "none";
    document.getElementById('team').style.display = "block";
    document.getElementById('settingsPage').style.display = "none";
    $('.button-collapse').sideNav('hide');
}
function showSettingsPage(){
    document.getElementById('home').style.display = "none";
    document.getElementById('intro').style.display = "none";
    document.getElementById('section_joinUs').style.display = "none";
    document.getElementById('events').style.display = "none";
    document.getElementById('team').style.display = "none";
    document.getElementById('settingsPage').style.display = "block";
    $('.button-collapse').sideNav('hide');
}
