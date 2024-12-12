# Projet Web - Portfolio Cybersécurité

Ce projet est un portfolio personnel destiné à présenter les compétences, expériences, certifications, projets et articles d'un professionnel en cybersécurité passionné par le Pentest et les CTF. Il inclut également une interface d'administration (CRM) permettant de gérer le contenu du site, notamment les articles, projets, CTF, et messages de contact.

### Disponible sur : https://lucas-torres.fr/

---

## Table des Matières

1. [Aperçu](#apercu)
2. [Technologies Utilisées](#technologies-utilisees)
3. [Structure du Projet](#structure-du-projet)
4. [Installation](#installation)
5. [Fonctionnalités Clés](#fonctionnalites-cles)
6. [Configuration](#configuration)
7. [Démarrage](#demarrage)
8. [Crédits](#credits)

---

## Aperçu

Ce portfolio inclut les pages suivantes :

- **Accueil** : Présentation succincte de l'auteur.
- **À Propos** : Détails sur les compétences, expériences et outils utilisés.
- **Blog** : Articles détaillés sur des sujets liés à la cybersécurité.
- **Projets** : Liste des projets réalisés avec leurs descriptions et technologies utilisées.
- **Contact** : Formulaire de contact et liens vers les réseaux sociaux.
- **CTF** : Résultats des  CTF.
- **Administration** : Interface CRM pour gérer les articles, projets, CTFs et messages.

## Technologies Utilisées

- **Framework Frontend** : [Astro](https://astro.build/)
- **Styles** : TailwindCSS avec extensions personnalisées
- **Backend** : Node.js avec gestion des données via SQLite
- **Scripts** : TypeScript
- **Bibliothèques et outils** :
    - bcryptjs pour le hachage des mots de passe
    - jsonwebtoken pour la gestion des tokens d'authentification
    - nodemailer pour l'envoi d'emails

## Structure du Projet

Voici les principaux fichiers et répertoires du projet :

- `src/` : Contient tous les fichiers de sources Astro, scripts et configurations.
    - `components/` : Composants réutilisables (e.g., `Button.astro`, `Card.astro`).
    - `layouts/` : Modèles pour les pages (e.g., `Layout.astro`, `Layout_admin.astro`).
    - `lib/` : Scripts utilitaires pour l'authentification, la base de données et l'envoi de mails.
    - `pages/` : Pages principales du site (e.g., about.astro, blog.astro, admin/).
    - `api/` : Points d'API pour les fonctionnalités d'authentification et de gestion du contenu.
    - `admin/` : Interface d'administration avec des pages pour gérer les articles, projets, messages, et CTFs.
- `astro.config.mjs` : Configuration d'Astro.
- `tailwind.config.mjs` : Configuration de TailwindCSS.
- `ecosystem.config.cjs` : Configuration PM2 pour le déploiement.
- `package.json` & `package-lock.json` : Dépendances et scripts du projet.
- `tsconfig.json` : Configuration TypeScript.
- `local.db` : Base de données SQLite utilisée pour stocker les données des articles, projets, etc.

## Installation

### Prérequis

- Node.js (v18 ou plus récent)
- npm ou yarn

### Étapes

1. Clonez le dépôt :
   ```bash
   git clone https://github.com/Rootingg/portfolio_propre
   cd portfolio_propre
   ```
2. Installez les dépendances :
   ```bash
   npm install
   ```
3. Initialisez la base de données et l'utilisateur admin :
   ```bash
   npm run init-admin
   ```

## Fonctionnalités Clés

### Sécurité
- Authentification via JWT pour les pages administratives.
- Hachage des mots de passe avec bcryptjs.

### Administration
- Interface CRM pour gérer les articles, projets,  CTF et messages non lus.
- Scripts d'initialisation pour créer un utilisateur admin par défaut.

### Optimisation
- Utilisation de TailwindCSS pour un design moderne et réactif.
- Fonctionnalité de recherche dynamique dans le blog et les projets.

## Configuration

- **Port et Hôte** : Configurés dans `ecosystem.config.cjs`.
- **Base de Données** : SQLite est configuré par défaut. Vérifiez `lib/db.ts` pour des options avancées.

## Démarrage

### En Environnement de Développement

1. Lancez le serveur de développement :
   ```bash
   npm run dev
   ```
2. Accédez au site à [http://localhost:3000](http://localhost:3000).

### En Production

1. Construisez le projet :
   ```bash
   npm run build
   ```
2. Démarrez le serveur avec PM2 :
   ```bash
   pm2 start ecosystem.config.cjs
   ```

## Crédits

Ce projet est développé par **Lucas Torres**, étudiant en cybersécurité, passionné de Pentest et CTF.

---

Pour toute question ou suggestion, veuillez contacter :
- Email : [lucas.torres@oteria.fr](mailto:lucas.torres@oteria.fr)
- GitHub : [Rootingg](https://github.com/Rootingg)

