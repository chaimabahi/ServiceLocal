# 🛠 Gestion de Services Locaux
Gestion de Services Locaux est une application web complète permettant aux utilisateurs de rechercher, réserver et interagir avec des artisans locaux et des prestataires de services, tels que plombiers, électriciens, mécaniciens, services de nettoyage, etc. Ce projet utilise React pour le frontend et Spring Boot pour le backend, offrant une expérience utilisateur fluide et des fonctionnalités robustes.

# 🚀 Technologies Utilisées

Frontend

React : Création de l'interface utilisateur dynamique.

Axios : Communication avec le backend via API REST.

React Router : Gestion de la navigation.

Tailwind CSS : Styling moderne et responsive.

React Context API : Gestion de l'état global.


Backend

Spring Boot : Framework pour le développement d'API REST.

Spring Data JPA : Gestion de la base de données.

MySQL : Base de données relationnelle.

Spring Security : Sécurisation de l'application.


# 🛠 Installation et Configuration

1️⃣ Cloner le Projet

git clone https://github.com/nom_utilisateur/gestion-de-services-locaux.git

cd gestion-de-services-locaux

# 2️⃣ Configuration du Backend (Spring Boot)

Ouvrir le dossier backend.

2- Configurer le fichier application.properties :

properties

Copier le code :

spring.datasource.url=jdbc:mysql://localhost:3306/gestion_services_locaux

spring.datasource.username=VOTRE_USERNAME

spring.datasource.password=VOTRE_PASSWORD

spring.jpa.hibernate.ddl-auto=update

spring.jpa.show-sql=true

3- Compiler et démarrer l'application Spring Boot :

cd server/serviceLocaux

mvn clean install

mvn spring-boot:run


# 3️⃣ Configuration du Frontend (React)

1- Ouvrir le dossier frontend.

2- Installer les dépendances :

cd client

npm install

3- Lancer le serveur de développement React :

npm start

# 🎯 Fonctionnalités Principales

🔍 Recherche de Services : Trouvez facilement des artisans locaux.

📅 Réservation en Ligne : Réservez directement des services.

💬 Interaction Utilisateur : Laissez des avis et notes pour les prestataires.

🔐 Authentification Sécurisée : Sécurisé grâce à Spring Security.
