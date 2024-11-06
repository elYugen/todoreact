// notificationService.js
import webpush from "web-push";

// Fonction pour envoyer une notification à tous les abonnés
export async function sendNotification(subscriptions, message) {
    const notificationPayload = {
        title: "Rappel de tâche",
        body: message,
        icon: "https://example.com/icon.png",
        data: {
            url: "/tasks",
        },
    };

    try {
        await Promise.all(
            subscriptions.map((subscription) =>
                webpush.sendNotification(subscription, JSON.stringify(notificationPayload))
            )
        );
        console.log("Notification envoyée avec succès");
    } catch (error) {
        console.error("Erreur lors de l'envoi de la notification :", error);
    }
}