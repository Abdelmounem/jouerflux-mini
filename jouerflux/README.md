
# JouerFlux Mini

Application de démonstration construite avec **Angular** (frontend) et un **backend Python/Flask** exposant des API REST documentées via **Swagger**.  
L’application permet de gérer 3 entités principales : **Firewalls**, **Policies** et **Rules**.

---

## Instructions de mise en place

### 1. Prérequis
- **Node.js** (v20) + **npm**
- **Angular CLI** (v20)  

  npm install -g @angular/cli


* **Docker Desktop** 
  Vérifier que Docker est démarré :

  docker --version

---

### 2. Lancer le backend (API Flask)

Le backend est conteneurisé dans **Docker**.

#### Étapes :

1. Depuis la racine du projet, construire l’image :

   docker build . --tag jouerflux-mini:latest

2. Lancer le conteneur:

   docker run -it -p 80:5000 jouerflux-mini

3. L’API sera accessible sur :

   * **[http://localhost/apidocs/#/default/get_firewalls]**
   * **[http://localhost/apidocs/#/default/get_policies]**
   * **[http://localhost/apidocs/#/default/get_rules]**
   * **Swagger UI** : [http://localhost/apidocs/#/](http://localhost/apidocs/#/)

---

### 3. Lancer le frontend (Angular)

1. Accéder au dossier frontend (jouerflux)
2. Installer les dépendances :

   npm install
  
3. Démarrer l’application Angular:

   ng serve 
   
4. Ouvrir dans le navigateur :
   [http://localhost:4200](http://localhost:4200)


5. Tests (unitaires) - fichier firewall-list.spec.ts:

ng test

---

##  Choix de conception / Hypothèses

## Hypothèses & choix de conception

- **Angular 20** avec **Standalone Components** → pas de NgModules, chaque composant est autonome et déclare ses propres imports.

- **Routing basé sur `app.routes.ts`** (API de routing moderne Angular), plus simple et lisible que l’ancien système via `AppRoutingModule`.

- **Signals Angular** pour gérer l’état local dans les composants (search, pagination, etc.).

- **NgRx Store (state management)** pour centraliser l’état global des entités (**Firewalls**, **Policies**, **Rules**) :
  - `actions` pour déclencher les intentions,
  - `reducers` pour mettre à jour le state,
  - `selectors` pour exposer les données aux composants,
  - `effects` pour gérer les appels asynchrones (API).
  
- **Services API centralisés** (`ApiService` + services spécifiques) pour consommer les endpoints REST.

- **UX** :
  - navigation claire via le routing standalone,
  - retour automatique à la liste après création, modification ou suppression,
  - gestion du feedback utilisateur (loading, erreur).

- **La pagination** est gérée par l’API (`page`, `per_page`) et relayée dans Angular.

* Les entités Firewalls → Policies → Rules sont liées hiérarchiquement :
  * Un **Firewall** contient plusieurs **Policies**.
  * Une **Policy** contient plusieurs **Rules**.

- **Proxy Angular** est configuré pour éviter les problèmes de CORS (`proxy.conf.json`).

---

## Fonctionnalités principales

 **Firewalls**

  * Lister / Rechercher / Paginer
  * Créer / Modifier / Supprimer

 **Policies**

  * Lister / Rechercher / Paginer
  * Créer / Modifier / Supprimer
  * Associer une policy à un firewall

 **Rules**

  * Lister / Rechercher / Paginer
  * Créer / Modifier / Supprimer
  * Associer une rule à une policy


