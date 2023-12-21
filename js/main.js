


var siteName = document.getElementById('siteName');
var siteUrl = document.getElementById('siteUrl');
var siteDetails;
var allSites = []

if ( localStorage.getItem ("allSites") != null  ){

    allSites = JSON.parse (localStorage.getItem ('allSites'))
    displaySites()

};

function addSite() {



    if (      checkRegex()    ) {

        siteDetails = {

            siteNameValue: siteName.value,
            siteUrlValue: siteUrl.value,

        };

    allSites.push(siteDetails);

    localStorage.setItem ( 'allSites' , JSON.stringify(allSites));

    clearInputs()

    displaySites()

    }

    else { alert('Enter a valid URL') };

}


function clearInputs() {

    siteName.value = '';
    siteUrl.value = '';
}

function displaySites() {

    var cartoona = '';

    for (var i = 0; i < allSites.length; i++) {

        cartoona = cartoona + `<div class="row   py-4 myTopBorder">
                                    <div class="col myRightBorder">${i + 1}</div>
                                    <div class="col myRightBorder">${allSites[i].siteNameValue}</div>
                                    <div class="col myRightBorder">
                                        <button onclick="visitSite(${i})" class="btn btn1 " >
                                             <i class="fa-solid fa-eye text-white pe-2"></i>
                                             Visit
                                        </button>
                                    </div>
                                    <div class="col myRightBorder ">
                                        <button onclick="updateSiteFirstStep(${i})" class="btn btn3">
                                            <i class="fa-solid fa-arrows-rotate text-white pe-2"></i>
                                            Update
                                        </button>
                                    </div>
                                    <div class="col ">
                                        <button onclick="deleteSite(${i})" class="btn btn2">
                                            <i class="fa-solid fa-trash text-white pe-2"></i>
                                            Delete
                                        </button>
                                    </div>
                                    
                                </div>`
    }

    document.getElementById('details').innerHTML = cartoona;

}

function deleteSite(indx) {

    allSites.splice(indx, 1);

    localStorage.setItem ( 'allSites' , JSON.stringify(allSites));

    displaySites()

}

function visitSite(indx) {

    window.open(allSites[indx].siteUrlValue)
}

function updateSiteFirstStep(indx){
    
    siteName.value = allSites[indx].siteNameValue
    siteUrl.value = allSites[indx].siteUrlValue

    document.getElementById('mainBtn').innerHTML = ` <button 
    onclick="updateSiteSecondStep(${indx})" class="btn update mt-2 mb-4">Update</button>
    `

}

function updateSiteSecondStep (indx){

    if (      checkRegex()    ) {

        siteDetails = {

            siteNameValue: siteName.value,
            siteUrlValue: siteUrl.value,

        };

        allSites.splice( indx,1, siteDetails );

        localStorage.setItem ( 'allSites' , JSON.stringify(allSites));


        displaySites();
    
        clearInputs()
    
        document.getElementById('mainBtn').innerHTML = ` <button onclick="addSite()" class="btn submit mt-2 mb-4">Submit</button>`
}
}

function checkRegex() {

    var urlRegex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/

    return urlRegex.test(siteUrl.value)

}