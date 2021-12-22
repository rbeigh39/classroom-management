// const domain = '127.0.0.1:3000';
// const domain = '192.168.29 .247';

const notificationContainer = document.querySelector('.resources__wrapper');

const addListItem = (obj) => {
    const html = `<div class="resources__container"><h2 class="resources__title">%TITLE%</h2><p class="resources__time-stamp">%TIME%</p><p class="resources__text">%TEXT%</p><a href="%LINK%" class="btn__download">Download</a></div>`;

    let newHTML = html.replace('%TITLE%', obj.title);
    newHTML = newHTML.replace('%TIME%', obj.createdAt);
    newHTML = newHTML.replace('%TEXT%', obj.description);
    newHTML = newHTML.replace('%LINK%', `/api/v1/resources/${obj.fileName}`)

    notificationContainer.insertAdjacentHTML('afterbegin', newHTML);
}

const init = async () => {

    try {
        const result = await axios.get(`/api/v1/resources`, {
            crossDomain: true,
        });

        const resources = result.data.data.resources;
        console.log(resources);
        resources.forEach(cur => {
            addListItem(cur);
        })
        
    } catch (err) {
        console.log(err);
    }
    
}

init();