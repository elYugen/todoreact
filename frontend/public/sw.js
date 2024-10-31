self.addEventListener("push", (event) => {
    const data = event.data.json();
    const title = data.title;
    const body = data.body;
    const icon = data.icon;
    const url = data.data.url;

    const notificationOptions = {
        body: body,
        tag: "unique-tag", // tag unique pour éviter la duplication des notifications
        icon: icon,
        data: {
            url: url, // remplace l'url avec l'url désiré pour rediriger l'utilisateur
        },
    }

    self.registration.showNotification(title, notificationOptions)
});