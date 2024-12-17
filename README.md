# Gestion de Services Locaux
Description
Gestion de Services Locaux est une application web permettant aux utilisateurs de rechercher, réserver et interagir avec des artisans locaux et des prestataires de services (plombiers, électriciens, mécaniciens, services de nettoyage, etc.). Le projet utilise React pour le frontend et Spring Boot pour le backend afin de fournir une expérience utilisateur fluide et des fonctionnalités robustes.

Technologies Utilisées
Frontend : React
React : Création de l'interface utilisateur dynamique.
Axios : Communication avec le backend via API REST.
React Router : Gestion de la navigation.
Tailwind CSS : Styling moderne et responsive.
React Context API : Gestion de l'état global.

Backend : Spring Boot
Spring Boot : Framework pour le développement d'API REST.
Spring Data JPA : Gestion de la base de données.
MySQL : Base de données relationnelle.
Spring Security : Sécurisation de l'application.

Installation et Configuration
1. Cloner le projet
bash
Copier le code
git clone https://github.com/nom_utilisateur/gestion-de-services-locaux.git
cd gestion-de-services-locaux

2. Configuration du Backend (Spring Boot)
Ouvrir le dossier backend.
Configurer le fichier application.properties :
properties
Copier le code :
spring.datasource.url=jdbc:mysql://localhost:3306/gestion_services_locaux
spring.datasource.username=VOTRE_USERNAME
spring.datasource.password=VOTRE_PASSWORD
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

Compiler et démarrer l'application Spring Boot :
bash
Copier le code
cd server/serviceLocaux
mvn clean install
mvn spring-boot:run

3. Configuration du Frontend (React)
Ouvrir le dossier frontend.
Installer les dépendances :
cd client
npm install
Lancer le serveur de développement React :
npm start
