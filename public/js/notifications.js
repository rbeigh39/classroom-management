// const domain = '127.0.0.1:3000';
// const domain = '192.168.29.247';

const notificationContainer = document.querySelector('.notifications__wrapper');

const addListItem = (obj) => {
    const html = `<div class="notifications__container"><h2 class="notifications__title">%HEADING%</h2><p class="notifications__time-stamp">%TIME%</p><p class="notifications__text">%TEXT%</p></div>`;

    let newHTML = html.replace('%HEADING%', obj.notificationTitle);
    newHTML = newHTML.replace('%TIME%', obj.createdAt);
    newHTML = newHTML.replace('%TEXT%', obj.notificationMessage);

    notificationContainer.insertAdjacentHTML('afterbegin', newHTML);
}

const init = async () => {

    try {
        const result = await axios.get(`/api/v1/notifications`, {
            crossDomain: true,
        });

        const notifications = result.data.data.notifications;
        notifications.forEach(cur => {
            addListItem(cur);
        })
        
    } catch (err) {
        console.log(err);
    }
    
}

init();