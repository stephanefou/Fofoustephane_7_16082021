# Organisation de la base de données MySQL

-------------------------------------------------------------------------------------------------
## Users
Liste des utilisateurs  

| Field         | Type           | Null | Key                        | Autre                     |
| ------------- | -------------- | ---- | -------------------------- | ------------------------- |
| id            | SMALLINT       | NO   | PRIMARY                    | auto_increment ; unsigned |
| username      | VARCHAR(255)   | NO   | UNIQUE                     | -                         |
| firstname     | VARCHAR(255)   | NO   | -                          | -                         |
| lastname      | VARCHAR(255)   | NO   | -                          | -                         |
| email         | VARCHAR(255)   | NO   | UNIQUE                     | -                         |
| password      | VARCHAR(255)   | NO   | -                          | -                         |
| pictureurl    | VARCHAR(255)   | YES  | -                          | -                         |
| bio           | VARCHAR(255)   | YES  | -                          | -                         |
| isadmin       | TINYINT        | NO   | -                          | -                         |


> id : SMALLINT unsigned = 65 534 utilisateurs possible.
> username : unique = 2 users différents ne peuvent pas avoir le même username 
> email : unique = 2 users différents ne peuvent pas avoir une même adresse mail de connexion
> la photo de profil (pictureurl) et la courte description (bio) ne sont pas obligatoires.


-------------------------------------------------------------------------------------------------
## Posts
Liste des publications  

| Field            | Type           | Null | Key                         | Autre                     |
| ---------------- | -------------- | ---- | --------------------------- | ------------------------- |
| id               | MEDIUMINT      | NO   | PRIMARY                     | auto_increment ; unsigned |
| publication_date | DATETIME       | NO   | -                           | -                         |
| user_id          | SMALLINT       | YES  | FOREIGN (Ref:Users.id)      | unsigned                  |
| imageurl         | VARCHAR(255)   | YES  | -                           | -                         |
| content          | TEXT           | YES  | -                           | -                         |



> id : MEDIUMINT unsigned = 16 777 214 posts possibles.  
> user_id : clé étrangère faisant référence à l'utilisateur qui a édité le post  
> imageurl : contient l'url de l'image  
> content : contient le texte de la publication


-------------------------------------------------------------------------------------------------
## Comments
Liste des commentaires des publications

| Field            | Type           | Null | Key                        | Autre                     |
| ---------------- | -------------- | ---- | -------------------------- | ------------------------- |
| id               | INT            | NO   | PRIMARY                    | auto_increment ; unsigned |
| publication_date | DATETIME       | NO   | -                          | -                         |
| content          | TEXT           | NO   | -                          | -                         |
| user_id          | SMALLINT       | YES  | FOREIGN (Ref:Users.id)     | unsigned                  |
| post_id          | MEDIUMINT      | NO   | FOREIGN (Ref:Posts.id)     | unsigned                  |


> id : INT car possibilité de nombreux commentaires pour chaque post
> user_id : clé étrangère faisant référence à l'utilisateur qui a écrit le commentaire  
> post_id : clé étrangère faisant référence au post (post_parent) auquel se rattache le commentaire


-------------------------------------------------------------------------------------------------
## Likes
Liste des likes/dislikes des publications

| Field         | Type           | Null | Key                        | Autre                     |
| ------------- | -------------- | ---- | -------------------------- | ------------------------- |
| id            | INT            | NO   | PRIMARY                    | auto_increment ; unsigned |
| rate          | TINYINT        | NO   | -                          | -                         |
| user_id       | SMALLINT       | NO   | FOREIGN (Ref:Users.id)     | unsigned                  |
| post_id       | MEDIUMINT      | NO   | FOREIGN (Ref:Posts.id)     | unsigned                  |

> rate : sera = 1 si like, et = -1 si dislike  
> user_id : clé étrangère faisant référence à l'utilisateur qui a like/dislike  
> post_id : clé étrangère faisant référence au post (post_parent) auquel se rattache le like/dislike  


-------------------------------------------------------------------------------------------------
## Notifications
Liste des notifications.  
Il y aura une notification si :  
  - un user like/dislike le post d'un autre user  
  - un user commente le post d'un autre user  
  - un user a répondu au commentaire d'un autre user  

| Field         | Type           | Null | Key                              | Autre                     |
| ------------- | -------------- | ---- | -------------------------------- | ------------------------- |
| id            | INT            | NO   | PRIMARY                          | auto_increment ; unsigned |
| user_id       | SMALLINT       | NO   | FOREIGN (Ref:Users.id)           | unsigned                  |
| initiator_id  | SMALLINT       | YES  | FOREIGN (Ref:Users.id)           | unsigned                  |
| post_id       | MEDIUMINT      | NO   | FOREIGN (Ref:Posts.id)           | unsigned                  |
| type_id       | TINYINT        | NO   | FOREIGN (Ref:Notification_types) | unsigned                  |

> user_id :      id de l'utilisateur qui recevra la notification  
> initiator_id : id de l'utilisateur qui a provoqué la notification (qui a réagi à un post ou un commentaire de l'utilisateur)  
> post_id :      id du post qui a initié l'interraction entre les 2 utilisateurs  
> type_id :      fait référence au type de notification (like/dislike, commentaire d'un post, réponse à un commentaire)


-------------------------------------------------------------------------------------------------
## Notification_types
Liste des types de notifications possibles

| Field         | Type           | Null | Key                        | Autre                     |
| ------------- | -------------- | ---- | -------------------------- | ------------------------- |
| id            | TINYINT        | NO   | PRIMARY                    | auto_increment ; unsigned |
| name          | VARCHAR(10)    | NO   | -                          | -                         |


> la table contiendra 3 lignes:  
> 1 : 'reaction' (pour like/dislike)  
> 2 : 'comment'  (pour un commentaire de publication)  
> 3 : 'answer'   (pour une réponse à un commentaire)  