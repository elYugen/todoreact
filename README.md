# Projet ToDo

Projet ToDo List en React

## Documentation

*Récupération du projet :*

- Cloner le projet
- Une fois le projet cloné, aller dans le dossier frontend et exécuter la commande `npm install`
- Lancer le projet react avec la commande `npm run dev`

*Update*

- Le projet est sous docker, aller dans le dossier contenant frontend et backend, et exécuter la commande `docker-compose up --build`
- Pour exécuter des commandes tel que les commandes pratique ci-dessous, on doit les exécuter dans le conteneur.
- Pour cela on ouvre un nouveau terminal et l'on tape : `docker-compose exec <nomDuConteneur> <commande>`.
- Ce qui devrait donner en exécution réel `docker-compose exec frontend npx yugenpages`


# Commandes pratique

-  `npx yugenpages` permet de créer une page facilement
-  `npx yugenrcg` permet de créer un composant facilement

## À faire

- [Backend](./backend/README.md)
- [Frontend](./frontend/README.md)
- [Liste d'idée à ajouter](./IDEA.md)

***Consigne de base :***

- [**✔️**] Création de tâches : Les utilisateurs doivent pouvoir créer de nouvelles tâches avec un titre, une description, une catégorie et une date d'échéance optionnelle.
- [**✔️**] Gestion des catégories : Les utilisateurs doivent pouvoir créer et gérer des catégories pour organiser leurs tâches.
- [**✔️**] Marquage des tâches comme complétées : Les utilisateurs doivent pouvoir marquer les tâches comme complétées ou non complétées.
- Filtrage et tri des tâches : Les utilisateurs doivent pouvoir filtrer les tâches par catégorie, par date d'échéance ou par statut (complétées/non complétées). Il doit également être possible de trier les tâches par ordre alphabétique, par date d'échéance ou par statut.
- [**✔️**] Suppression des tâches : Les utilisateurs doivent pouvoir supprimer les tâches lorsqu'elles ne sont plus nécessaires.
- Notifications et rappels : Les utilisateurs peuvent recevoir des notifications ou des rappels pour les tâches dont la date d'échéance approche. Avoir une vue calendaire des tâches.

***Terminé :***

- [**✔️**] Progressive Web App
- [**✔️**] Schéma & route des utilisateurs
- [**✔️**] Front
- [**✔️**] CRUD Tâche
- [**✔️**] CRUD Catégorie
- [**✔️**] Crud Bucketlist
- [**✔️**] Crud Habits Tracker
- [**✔️**] Ajouter une route pour récupéré les projet, tâches et habits d'un utilisateur grace a son id
- [**✔️**] Créer un hook pour l'affichage des projets, tâches et habits d'un utilisateur grace a son id
- [**✔️**] Affichage & création des données dans le front
- [**✔️**] Affichage des tâches du jour dans l'agenda