function showHome() {
    document.getElementById('home').style.display = "block";
    document.getElementById('intro').style.display = "none";
    document.getElementById('section_joinUs').style.display = "none";
    document.getElementById('events').style.display = "none";
    document.getElementById('webinars').style.display = "none";
    document.getElementById('team').style.display = "none";
    document.getElementById('FAQ').style.display = "none";
    document.getElementById('settingsPage').style.display = "none";
    $('button-collapse').sideNav('hide');
}
function showAboutUs() {
    document.getElementById('home').style.display = "none";
    document.getElementById('intro').style.display = "block";
    document.getElementById('section_joinUs').style.display = "none";
    document.getElementById('events').style.display = "none";
    document.getElementById('webinars').style.display = "none";
    document.getElementById('team').style.display = "none";
    document.getElementById('FAQ').style.display = "none";
    document.getElementById('settingsPage').style.display = "none";
    $('.button-collapse').sideNav('hide');
}
function showJoinUs(){
    document.getElementById('home').style.display = "none";
    document.getElementById('intro').style.display = "none";
    document.getElementById('section_joinUs').style.display = "block";
    document.getElementById('events').style.display = "none";
    document.getElementById('webinars').style.display = "none";
    document.getElementById('team').style.display = "none";
    document.getElementById('FAQ').style.display = "none";
    document.getElementById('settingsPage').style.display = "none";
    $('.button-collapse').sideNav('hide');
}
function showEvents(){
    document.getElementById('home').style.display = "none";
    document.getElementById('intro').style.display = "none";
    document.getElementById('section_joinUs').style.display = "none";
    document.getElementById('events').style.display = "block";
    document.getElementById('webinars').style.display = "none";
    document.getElementById('team').style.display = "none";
    document.getElementById('FAQ').style.display = "none";
    document.getElementById('settingsPage').style.display = "none";
    $('.button-collapse').sideNav('hide');
}
function showWebinars(){
    document.getElementById('home').style.display = "none";
    document.getElementById('intro').style.display = "none";
    document.getElementById('section_joinUs').style.display = "none";
    document.getElementById('events').style.display = "none";
    document.getElementById('webinars').style.display = "block";
    document.getElementById('team').style.display = "none";
    document.getElementById('FAQ').style.display = "none";
    document.getElementById('settingsPage').style.display = "none";
    $('.button-collapse').sideNav('hide');
}
function showTeam(){
    document.getElementById('home').style.display = "none";
    document.getElementById('intro').style.display = "none";
    document.getElementById('section_joinUs').style.display = "none";
    document.getElementById('events').style.display = "none";
    document.getElementById('webinars').style.display = "none";
    document.getElementById('team').style.display = "block";
    document.getElementById('FAQ').style.display = "none";
    document.getElementById('settingsPage').style.display = "none";
    $('.button-collapse').sideNav('hide');
}
function showFAQ(){
    document.getElementById('home').style.display = "none";
    document.getElementById('intro').style.display = "none";
    document.getElementById('section_joinUs').style.display = "none";
    document.getElementById('events').style.display = "none";
    document.getElementById('webinars').style.display = "none";
    document.getElementById('team').style.display = "none";
    document.getElementById('FAQ').style.display = "block";
    document.getElementById('settingsPage').style.display = "none";
    $('.button-collapse').sideNav('hide');
}
function showSettingsPage(){
    document.getElementById('home').style.display = "none";
    document.getElementById('intro').style.display = "none";
    document.getElementById('section_joinUs').style.display = "none";
    document.getElementById('events').style.display = "none";
    document.getElementById('webinars').style.display = "none";
    document.getElementById('team').style.display = "none";
    document.getElementById('FAQ').style.display = "none";
    document.getElementById('settingsPage').style.display = "block";
    $('.button-collapse').sideNav('hide');
}
// Check if user is online or not!
function isOnline () {
  if (navigator.onLine){
    Materialize.Toast.removeAll();
    var offlineHideElements =  document.getElementsByClassName('offlineHidden');
    for (counter = 0; counter < offlineHideElements.length; counter++)
        offlineHideElements[counter].style.display = "block";
  } else {
    Materialize.toast('You are currently offline. Data you are viewing might be outdated!', 30000);
    var offlineHideElements =  document.getElementsByClassName('offlineHidden');
    for (counter = 0; counter < offlineHideElements.length; counter++)
        offlineHideElements[counter].style.display = "none";
  }
}
window.addEventListener('online', isOnline);
window.addEventListener('offline', isOnline);
