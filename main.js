const grantPerminssion = () => {
    if (!('Notification' in window)){
        alert(`This browser doesnt support system notifications`);
        return;
    }

    if (Notification.permission === 'granted'){
        new Notification(`You are already subscribed to web nottifications`);
        return;
    }

    if (
        Notification.permission !== 'denied' ||
        Notification.permission === 'default'
    ){
        Notification.requestPermission().then(result => {
            if (result === 'granted'){
                const notification = new Notification(
                    `Awesome! You will start receiving notifications shortly`
                );
            }
        });
    }

};

const showNotification = data => {
    const title = `${data.pusher.name} pushed to the ${data.repository.name} repo`;
    new Notification(title);
};

const pusher = new Pusher('28307fce7a448947949d',{
    cluster: 'ap2',
    encrypted: true,
});

const channel = pusher.subscribe('github');
channel.bind('push', data => {
    showNotification(data.payload);
});

const subscribe = document.querySelector('#subscribe');
subscribe.addEventListener('click', event => {
    grantPerminssion();
    subscribe.parentNode.removeChild(subscribe);
});