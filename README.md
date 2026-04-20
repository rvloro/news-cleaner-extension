# News Cleaner Extension 🚀

Une extension de navigateur moderne pour nettoyer vos sites d'actualité préférés en supprimant les commentaires, les publicités et les recommandations intrusives (Taboola, Outbrain, etc.).

![Version](https://img.shields.io/badge/version-4.0-blue)
![Platform](https://img.shields.io/badge/platform-Chrome%20%7C%20Firefox-orange)

## ✨ Fonctionnalités

- **Nettoyage intelligent** : Supprime les commentaires, les publicités et les blocs de recommandation.
- **Performance optimisée** : Utilise une technique de "debouncing" pour minimiser l'impact sur le processeur.
- **Masquage immédiat** : Injection de CSS pour éviter le clignotement des éléments indésirables pendant le chargement.
- **Interface Premium** : Une popup moderne avec dark mode et compteur d'éléments supprimés en temps réel.
- **Statistiques** : Gardez un œil sur le nombre total d'éléments nettoyés.

## 📰 Sites Supportés

L'extension est pré-configurée avec des sélecteurs optimisés pour :
- **Le Monde** (.fr)
- **Le Figaro** (.fr)
- **Libération** (.fr)
- **Le Parisien** (.fr)
- **BFMTV** (.com)

## 🛠 Installation

### Chrome / Brave / Edge
1. Clonez ce dépôt ou téléchargez le ZIP.
2. Accédez à `chrome://extensions`.
3. Activez le **Mode développeur**.
4. Cliquez sur **Charger l'extension décompressée** et sélectionnez le dossier du projet.

### Firefox
1. Accédez à `about:debugging`.
2. Cliquez sur **Ce Firefox**.
3. Cliquez sur **Installer un module temporaire...** et sélectionnez le fichier `manifest.json`.

## ⚙️ Structure du Projet

- `manifest.json` : Configuration de l'extension (v3).
- `content.js` : Logique de nettoyage et MutationObserver.
- `sites.js` : Dictionnaire des sélecteurs par domaine.
- `popup.html` / `popup.js` : Interface utilisateur et statistiques.
- `style.css` : Règles de masquage global (injectées).

## 📄 Licence

Ce projet est sous licence MIT. Libre à vous de l'adapter et de l'améliorer !
