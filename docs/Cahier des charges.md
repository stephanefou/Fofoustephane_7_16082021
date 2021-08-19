# Création d'un réseau social d'entreprise : Cahier des charges

## Fonctionnalités
- Création d'utilisateurs (CRUD)
- Les utilisateurs pourront
  - Voir les derniers posts de tous les utilisateurs
  - Voir les derniers posts d'un utilisateur en particulier
  - Publier des images/gif
  - Publier du texte
- Sur chaque posts, les utilisateurs pourront
  - Liker / disliker
  - Commenter
  - Supprimer leur propre post/commentaire/like
- Modération par des administrateurs qui peuvent
  - Supprimer les posts/commentaires inappropriés.
  - Donner/enlever les droits d'admin à un utilisateur
- Autres
  - Système de notification
  - Session persistante au rechargement de la page

## Pages
- Login
- Sign-in
- Agora = feed d'actualité
  - Liste des derniers posts
  - Like / Commentaire
- User = utilisateurs
  - Liste les utilisateurs
  - Recherche d'utilisateur
- User/:id = profil d'un utilisateur
  - Modifier les infos
  - CRUD de la photo de profil
  - Supprimer le compte
- Notification = Page des notifications d'un utilisateur
  - répertorie les derniers commentaires et likes à l'un de ses posts

## Organisation de travail
- AGILE
- Une première version basique (MVP) sera présentée au client
- Le développement se fera "au fil de l'eau" selon les requêtes du client
- L'objectif de ce projet est de créer ce premier MVP