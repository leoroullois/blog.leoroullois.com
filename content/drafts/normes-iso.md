---
title: Normes ISO
description: I love React so I create a Blog Post !
author: Leyo
date: 9/10/2022
tags: react typescript
---

# Table of content

# Gestion Identités & accès

## Généralité

- Définition IAM :

  Ensemble des processus mis en oeuvre par une entité pour la gestion des habilitations de ses utilisateurs à son SI ou applications :

  - Gérer les accès à travers le temps
  - Administrer création/modifs & les droits d'accès de chaque entité numérique (utilisateurs, serveurs...)

  > En clair : ensemble des processus qui ont pr but d'assurer à la bonne personne (authentifiée), l'accès à la bonne information (intégrité),
  > au bon moment (disponibilité), pour la bonne raison (légitimité)
  > -> Authentication -> Authorization -> Access (**AAA**)

**L'IAM est un pilier incontournable de la sécurité d'un SI.**

---

## Caractéristiques

### GIA -> Infrastructure de processus métier

- Gestion identités numériques (ajout/modif/suppression)
- Comprend des règles organisationnelles de gestion des IdNs (identités numériques)
- Contrôlr l'accès des utilisateurs aux informations (création/consultation/modification)
  **Systèmes GIA = SSO + Gestion d'accès (+ 2FA)**

### 2FA :

- TOTP (timebase one time password)
- Clefs U2F, Yubikeys
- Mails

---

## Pré-requis

Les systèmes d'IAM doivent comprendre tous les contrôles et outils nécéssaires pour saisir et enregitrer les informations de connexion des utilisateurs, administrer la BDD des Identités
des utilisateurs et gérer l'affectation ET la suppression des privilèges d'accès.

## Fonctionalités requires pour la GIA

- Annuaire centralisé => supervision + suivi BDD utilisateurs
- Alimentation contrôlée & automatisée => limitationi erreurs (BDD consolidée)
- Administrateurs doivent pouvoir consutrer & modifier le droits
- Flexibilité dans la gestion des droits (uniformisation ou exceptions).

---

## Apports

Technologies IAM permettent de mettre en place, saisir, enregisrer et gérer de façon automatisées IdNs utilisateurs et les autorisations.
Les privilèges d'accès sont alors octroyés selon une seule et même interprétation des règles, tous les utilisateurs et services sont correcteme,t authentifiés, autorisés et vérifiés.

### La GIA permet :

- Un meilleur contrôle sur les accès utilisateurs
- La réduction des risques d'atteintes aux données
- L'automatisation renforce l'efficacité des organisations => moins d'efforts, temps et argent à la gestion des accès au SI.
- L'harmonisation des règles de sécurité
- La facilitation du déploiement des règles d'authentification, de validation rt d'autorisations des utilisateurs. => limiter les problèmes de prolifération des privilèges.
- Peut aider à accorder à des utilisateurs exterieurs (presta...), un accès à son réseau sans compromettre la sécurité.

---

## Composantes fonctionnelles

GIA constituée de 5 composantes distinctes :

**Identification** : Ensemble de paramètres qui caractérisen de façon unique l'utilisateur & ses droits d'accès.
**Authentification** Vérification de l'identité

- **L'identification et l'authentification permettent d'empêcher les intrusions**
  **Autorisation** Accès de l'utilisateur à la ressource demandée
  **gestion utilisateur** Cycle de vie entier de l'utilisateur -> gestion, modification, suppression des utilisateurs, des groupes et des rôles
  **Annuaire central d'utilisateurs** Stockage et la circulation à d'autre services des données de l'utilisateur.

---

## Enjeux

La mise en place système GIA est un investissement mais apporte des avantages :

- Souplesse : Augmenter la réactivité du SI (modification accès).
- Financier : réduire les coûts de gestion
- Sécuritaire : prévenir les intrusions & s&curiser informations
  => confidentialité (accès aux utilisateurs)
  => protection des données (modificaion uniquement par u tilisateurs autorisés)
  => Traçabilité (imputabilité)

**Nouvelles méthodes d'authentification: mdp > 2FA > Forte > Biométrique (avec ses problèmes de révocation)**

---

# Rappels réseaux

## Protocole HTTP

URL-QueryString : `scheme ://[authority][path]?QueryS#frag`

Méthodes : GET / POST / PUT / DELETE

State less : Toutes les requêtes sont indépendantes.

Codes courants : 200, 302, 400, 403, 404, 401, 407, 500, 502
User-Agent : Navigateur
Cookie : 4ko, date validité, HTTP Only, Secured, SameSite, domaine de validité
-> Set-Cookie: nom=valeur; expires=date; path=chemin_accès; domain=nom_domain; secure

---

## Proxy

Le serveur mandataire (proxy) permet de relayer des requêtes entre une fonction cliente et une fonction serveur :

- Accélération de la navigation (cache -> code 304 = Not modified)
- Journalisation de requêtes (traces), authentification utilisateurs
- Sécuriser reseau interne (rupture protocolaire, normalisation requêtes, masquage IPs)
- Déchiffrement SSL => IGC pour générer certificats "à la volée"
- Aiguillage par domaines

### Remarques

- Résolution DNS faite par le serveur proxy
- Configuration du proxy navigateur avec fichier PAC (proxy autmatic configuration) pour requeter des proxy.

---

## Reverse Proxy

Basé sur un serveur Web comme Apache ou Nginx :

- Apache
  1. Apparu en avril 1995 -> "a patch" de HTTPD
  2. Nombreux modules pour ajouter des fonctionnalités supplémentaires : Perl, PHP, Python, CGI, réécriture URL, ...
- Nginx (Engine X)
  1. Ecrit par le mathématicien Igor Synoev, développment a débuté en 2002 pour les besoins d'un site russe a très fort traffic
  2. Moins de fonctionnalités mais beaucoup plus performant
  3. Interface FastCGI/uWSGI native

---

## Reverse Proxy

### Contenu Statique (CDN)

Décharger serveurs web contenu Statique

### Intermédiaire de sécurité

Marsquage @IP, ré-écriture programmable URL pour masquer l'architecture d'un site web interne, "encaisser" la charge (DDoS)

### Chiffrement SSL 
Le reverse proxy "embraque" le certificat SSL

### répartition de charge (LB) 
Distribuer la charge d'un site unique sur plusieurs serveurs Web applicatifs (upstream)

### Compression
Optimiser la compression d'un contenu des sites web.

---

## Serveurs web

#### Vocabulaire :
- Apache : Virtual host
- Nginx : Block Server 
- Directives : Modifier fonctionnement
- Location : Routes/URL spécifiques
- Racine du site : Servir les pages
- Configuration : SSL, logs, paramètres divers.
- Interface : ModPerl, CGI, FastCGI, uWSGI, standard PSGI -> Perl

---

## Domain name Server

### Caractéristiques
- BDD distribuée et implémentée dans une hiérarchie de "serveurs de noms"
- Corresponsance nom logique de site avec adresse IP.
- Structure arborescante hiérzrchique
- Solution non centralisée pour :
  - Résilience
  - Scalabilité
  - Volume de trafic
  - Maintenance

**Name resolution order : hosts > Wins > lmhosts > DN (noeuds B, M).**

---

## Domain name system

Top lvel domain
Gérés par l'ICANN (Internet corporation for Assigned Names and Numbers). Ils sont regroupés en 2 ensembles :
- gTLD (generic TLD) -> .com, .net, .aero, .gov, ...
- ccTLD (country code TLD) -> fr, de, uk, ...
- Full Qualify Domain Name (casse non significative).

**La gestion de la racine et des TLDs est répartie sur 13 serveurs mondiaux.**

---

# ISO 2700-5 & IAM

## SMSI (Les systèmes de Management de la Sécurité de l'Information)

### Sécurité informatique

La sécurité, pendant longtemps parent pauvre de l'informatique...

- Source de complication
- N'apporte aucune fonctionalité aux utilisateurs
- Ne génère aucun revenu pour l'entreprise

> Aujourd'hui, **sécurité = enjeu majeur**

- Forte demande exterts RSSI expérimentés, ingénieurs sécurité
- Amélioration globale de la sécurité
- Sécurisation serveurs, équipements & applications

**Pourtant, encore beaucoup d'organisations victimes de cyber-attaques !**

Pourquoi ?

- Mesures de sécurité déployées au jour le jour
- Sans vraiment chercher les vulnérabilités ou besoins réels

> Manque chef d'orchestre => SM +SI

---

### Systèmes de management

**Systèmes de management (SM)** :
Concepts du système management n'est pas nouveau. Il concerne historiquement la qualité -> Norme ISO 9001 (Mise en place SMQ) publiée en 1987 puis révisée en 2008 & 2015.

#### Principes d'un système de management ?

-> ISO 9000
Système permettant d' :

- établir une politique
- établir des objectifs
- atteindre ces objectifs

**Ensemble de mesures organisationelles et techniques visant à atteindre un objectif et une fois atteint, à s'y tenir voire le dépasser.**

Différent référentiels de systèmes de management

- ISO 9001 -> Qualité
- ISO 14001 -> Environnement

---

### Systèmes de management

#### Propriétés des systèmes de management

- Impliquent un large spectre de métiers et compétences (approche transverse, horizontale)
- Projet fédérateur et mobilisateur (approche verticale, hiérarchique)
- Importance de l'écrit (politiques & procédures)
- Auditabilité (permettre vérification de ce qui est pratiqué)

#### Apports des systèmes de management

- Adoption de bonnes pratiques (guides)
- Augmentation de la fiabilité (améliroation continue par retours d'expériences)
- Confiance (audits certification) : actionnaires, clients, fournisseurs, personnels, opinion publique.

---

### Roue de Deming

![Roue de Deming](https://www.ccgps.org/wp-content/uploads/2018/10/pdca-vorlage-luxus-methode-pdca-presentation-de-la-roue-de-deming-bechir-der-pdca-vorlage.jpg)

---

## Systèmes de management

### Modèle PDCA

- PLAN : Dire ce que l'on va faire
- DO : Faire ce que l'on a dit
- CHECK : Vérifier s'il n'y a pas d'écart
- Act : Entreprendre des actions correctives

> Amélioration continue

**Caractère cyclique et fractale du modèle**
(fractale = on peut utiliser le système sur juste un petit service ou alors sur toute l'entreprise)

---

## Sécurité de l'information

### ISO 27001

Sécurité information au sens large, pas uniquement informatique.
**Réduire SMSI à son côté uniquement informatique est une erreur !**
C'est L'Information sous toutes ses formes : logiciel, matériel, mais aussi humain, papier, savoir-faire, ...

#### Principes sécurité information ? -> ISO 27001

| Nom             | Description                                                                                                                                                                                |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Confidentialité | L'information ne doit pas être divulguée à toute personne, entité, ou processus non autorisé -> le besoin d'en connaitre                                                                   |
| Intégrité       | Le caractère correct et complet des actifs doit être préservé -> l'information ne peut être modifiée que par ceux qui en ont le droit.                                                     |
| Disponibilité   | L'information doit être rendue accessible et utilisable sur demande par une entité autorisée -> L'information doit être disponible dans des conditions convenues à l'avance (H24, 7j/7...) |

---

## Sécurité de l'information

### ISO 27001

D'autres principes sont également abordés dans la norme ISO 27001. Ceux-ci sont déployés en fonction des besoins de sécurité de l'organisation.

SMSI -> ISO 27001

- Tracabilité
- Authentification
- Imputabilité
- Non-répudiation

> Gestion IAM par exemple avec SSO

Depuis 1995, plusieurs normes concernant directement ou indirectement les SMSI ont été publiées. Aujourd'hui, nous disposons de deux normes :

| Norme     | Description                                                          |
| --------- | -------------------------------------------------------------------- |
| ISO 27001 | Exigence pour les SMSI                                               |
| ISO 27002 | Receueil de bonnes pratiques en matière de sécurité de l'information |

---

# Famille des normes ISO 27000

### ISO 27000

## Principales normes

| Norme | Domaine traité               |
| ----- | ---------------------------- |
| 27000 | Généralités et vocabulaire   |
| 27001 | **Exigence pour les SMSI**   |
| 27002 | Mesures de sécurité          |
| 27004 | Indicateurs                  |
| 27005 | **Appréciation des risques** |
| 27007 | Audits des SMSI              |
| 27017 | Sécurité dans le Cloud       |
| 27031 | Continuité d'activité        |
| 27033 | Sécurité réseau              |
| 27034 | Sécurité des applications    |

---

### ISO 27001

#### Généralités

Objectifs généraux : L'ISO 27001 a été publiée en octobre 2005 puis révisée en 2013. Elle s'est imposée comme référence en matière de SMSI.

Premiers constats :

- Disponible site AFNOR (23 pages, 100€)
- Constituée de 10 articles
- 1 à 3 : Notions de base
- 4 à 10 : Normes ==> 7 pages seulement !!!
- Annexe A + bibliographie = 13 pages

Articles 1 à 3
Ces articles précisent que la norme spécifie des exigences :

- Pour mettre en place, exploiter et améliorer un SMSI -> **Ne pas oublier de le faire évoluer**
- De façon générique -> **Tous les organismes peuvent la mettre en oeuvre**
- Adaptées aux besoin de l'organisation -> **Dispositions mises en oeuvre adéquates et proportionnelles**

---

#### Structure de la norme

**Pour être conforme à la norme, un SMSI doit impérativement répondre à toute les exigences des articles 4 à 10, sans exceptions.**

La structure de la norme est calqué sur le modèle PDCA.

- Plan : Articles 4 à 7, fondations à mettre en place -> périmètre du SMSI, politique, obkectifs de sécurité, communication, documentation...
- Do : Article 8, mise en oeuvre des dispositions définies précédemment.
- Check : Article 9, indicateurs, audits et revues de direction.
- Act : Article 10, tous les incidents, anomalies ou non-conformité doivent faire l'objet d'actions d'améliorations.

---

#### Articles 4 et 5

**Article 4 : définir le contexte et le périmètre**
- Contexte de l'organisme : Décrire contexte et identifier parties prenantes SMSI.
- Périmètre du SMSI : Domain application du SMSI. C'est sur lui sur vont porter les exigences de la norme.

**Article 5 : responsabilités de la direction.**

- Management dans le SMSI : Obligation de promouvoir le SM, soutenir les équipes et gérer les ressources nécéssaires au bon fonctionnement du SMSI (prévoir les départs en retraite, gérer les licences, former les gens...)
- Politique de sécurité : Définir le niveau de sécurité qui sera pratiqué à l'intérieur du SMSI.
- Définition des rôles et des responsabilités : La direction doit les attribuer clairement en matière de sécurité.

**Un client peut demander sur quel périmètre et quelle politique porte la certification ISO-27001.**

---

#### Article 6 : PLAN

**Article 6 : Appréier les risques et les opportunités.**
**Obligatoire** d'adopter une méthode d'appréciation des risques (Ebios, Mehari, IS-27005 --> payante, perso).
La méthode choisis doit respecter les points suivants :
- Critères d'acceptation des risques : Seuils clairement déifnis.
- répététivité : résultats doivent être cohérents et comparables.
- Identification des risques : Nature très variées (cyber-attaques, intrusions dans les locaux, erreurs humaines).
- Vraisemblance : Probabilité survenance des risques
- Détermination niveaux risques : En fonction impact et vraisemblance.
- Priorisation des risques : Agir prioritairement sur les risques élévés.
- Traitement du risque : Réduction, maintien, refus ou partage. --> Annexe A
- Déclaration d'applicabilité : Sélectionner dans l'annexe A la mesure à appliquer.
- Plan de traitement des risques : Ordonnancement des taches, => Gestion de projet
- Validation des risques résiduels : Direction doit valider, accepter, les risques restants, après traitement.
- Validation plan traitement des risques  : Direction doit valider plan.

Annexe A : Liste très précise de 114 mesures de sécurité pouvant être implémentées, classées en 14 catégories principales et n umérotées sur 3 niveaux.
Il s'agit des titres de chaque mesure de sécurité figurant dans l'ISO 27002.

---

#### Article 7 : PLAN

**Article 7 : Les "servitudes" du SMSI.**

- Compétence : Formation des personnels pour exploiter outils déployée dans le SMSI.
- Sensibilisation : Expliquer à tous les principes de base de la sécurité.
- Communication : Intégrer la sécurité dans le schéma de communication de l'organisation.
- Documentation : Obligation de passer de la tradition orale à l'écrit.

---

#### Article 8 : DO

**Article 8 :Gérer le SMSI au quotidien.**
Maintenant que tout est spécifier. 
C'est à dire après avoir mis en place les fondations du SMSI et spécifier toutes les règles ainsi que les mesures à mettre en oeuvre.

---

#### Article 9 : CHECK

**Article 9 : controle du SMSI**
- Les indicateurs : Mesures performanes (nb incidents de sécurité) et de conformité (nb réunion comité sécurité).
- Les audits internes : Vérifier la conformité et l'efficacité du SM => Indépendance auditeur pour garantir impartialité.
- Revue de direction : regard retrospectif sur le SMSI pour améliorer l'efficacité (évolution contexte entreprise, point sur actions décidées...)

---

#### Article 10 : Act

**Article 10 : Amélioration du SMSI.**
Indicateurs mettent en lumière dysfonctionnement. Norme impose d'identifier systématiquement des actions corrective spour chacun des constats. 
**Un SMSI ne générant aucun constat suite à la phase Check serait très suspect !**

---

### ISO-27002

La norme ISO-27001 ne décrit pas comment déployer concrètement ces mesures.

# TP nginx

apt update
apt upgrade
netstat -ntlp
apt install lynx
lynx 127.0.0.1:631
service apache2 status
service apache2 start
apt remove apache2
apt install nginx
netstat -ntlp
ssh cyber@ip

- Reload : ``nginx -s reload`` pour reload le serveur nginx sans impact sur les utilisateurs
- Test : ``nginx -t`` pour tester les fichiers de configuration, indispensable surtout en prod
- Afficher toute la conf : ``nginx -T |less`` pour afficher TOUTE la conf, possible avec redirection ``nginx -T > my_conf``.


VIM : 
- ```dap``` supprimer paragraphe
- ```.``` rappeler la dernière commande
- ```ci'``` change l'intérieur des quotes
- ```alt gr ~``` inverser la casse
- ```2s``` supprimer 2 caractère + insertion
- ```dit``` dupprimer l'intérieur des tags (par exemple h1 h2 ou p)

```html
<html>
  Loem ipsum dolor sit amet



</html>
```

```javascript
function(param1, param2) {

    ihgr
    lrghrlkh
  }
```

## OpenLDAP

### Annuaire OpenLDAP

#### Généralités

Un annuaire, c'est quoi ?
- LDAP -> protocole d'accès annuaire X.500, normalisé fin 90s.
- X.500 -> norme pour la gestion d'annuaire sur des réseaux ISO
- LDAP a très rapidement évolué de l'accès à un annuaire X.500 à la gestion omplète d'un annuaire pour les environnements non X.500

Un annuaire, pour quoi faire ?
Permet de stocker des données :
- Faiblement typées
- Organisées selon des classes particulières 
- Présentées dans un arbre

Exemple
- Des comptes UNIX
- Des données personnelles 
- Des données des objets plus ou moins abstraits (données d'identité, certificats, CRLs,...)

#### SGBD vs Annuaire

**Ne pas à confondre un annuaire avec une base de dnnées relationnelle dont l'objectif est différent**

SGBD
- Typage fort
- Rapidité d'accés en Lecture/Ecriture

Annuaire
- Conçu pour recevoir beaucoup plus de requetes en lecture qu'en écriture 
- Facilité de mise en oeuvre de la réplication => Maitre -> Esclave
- Stocker des objets, avec des attributs (qui eux sont typés) organisés dans un arbre (DIT)

## SSO

### Authentification unique (SSO)

Single Sign On Application

3 avantages majeurs :
- Accès à l'emsemble des ressources autorisées du SI.
- Authentification auprès d'un portail unique -> limite fatigue & prolifération MdP
- Pas de circulation des MdP vers les ressources du SI -> jetons de sessions.

### Différentes approches

**Centralisée :**
BDD ou annuaire centralisé de tous les utilisateurs 
-> gestion centralisée PSSI
=> approche destinée aux services même organisation

**Fédérative :**
Chaque organisation/service gère un ensemble d'utilisateurs.

**Coopérative:**
Chaque service gère une partie des données utilisateurs.

Avec les approches fédérative/Coopérative, l'utilisateur choisit IdP puis les données d'idendité sont transmises au SP.
=> répond à un besoin de gestion décentralisée des utilisateurs.

**SSO donne potentiellement accès à de nombreuses ressources => renforcer la sécurité du SI**

### Les principaux protocoles

- Authentification
  1. Kerberos
  2. CAS
- Authentification et Fédération
  1. SAMLv2
  2. OIDC

### Kerberos

#### Présentation

- Protocole d'authentification AAA issu du projet Athena du MIT.
- Authentifier, autoriser et tracer utiisateurs voulant accéder aux ressources d'un réseau en HTTP. Pas SSL.
- Version 5 normalisée par l'IETF
- **Kerberos ce base sur une tierce partie de confiance pour gérer l'authentification -> KDC (Key Distribution Center)**
- Tous les utilisateurs et services du réseau font confiance à cette tierce partie -> mécanisme de chiffremet symétrique.
**=> Chaqe sujet ou service du réseau a une clef secrète partagée avec le KDC -> notion de royaume (Realm) ou Intranet.**

---

- Système d'authentification par ticket -> utilisateur s'authentifie auprès du KDC puis utilise ticket pour accéder aux services
**=> Utilisateur ne transmet jamais son mot de passe au service**
- KDC constitué de 2 services/serveurs :
  - Authentification Service : Service aurpsès duquel l'utilisateur s'authentifie. En cas d'authentification réussie, il lui délivre un ticket d'accès au TGS.
  -> Ticket Granting Service (TGT)
  - Ticket Granting Service : Service qui fournit tickets d'accès aux différents services -> Ticket Service (TS).

---

#### FOnctionnement

1. L'utilisateur s'authentifie auprès du service d'authentification (l vigile).
2. Celui-ci lui donne un ticket d'accès prouvant qu'il s'est authentifié (un badge).
3. L'utilisateur se rend aurpsès du service de gestion des tickets. Il demande un accès au service de fichiers
...

---

### CAS

#### Présentation

- Protocole développé en 2000
- Un des plus anciens modèles SSO, inspiré de Kerberos.
- Serveur d'authentification basé sur Java avec des moteurs Apache-Tomcat
- Ne permet pas de protéger des applications dites "sur étagère" => "CASifier" 
- Pas de fédération d'identité
- permet d'accéder ressources sur internet (HTTPS)
- **ne traite pas les besoins liés aux autorisations**
...

#### Fonctionnement

1. Authentifiation aurpès du serveur CAS
2. Délivrance du TGT dans un cookie (Ticket Granting Cookie).
3. Accès à des ressources protégées après authentification.
4. Redirection vers le serveur CAS avec le TGC (pas d'authen.).
5. Serveur CAS délivre un ST (Service Ticket) utilisable UNIQUEMENT sur le service demandé (URL).
6. Validation ST par client CAS auprès serveur CAS + identité

---

### Security Assertion Markup Language

#### Présentation

- Protocole créé par l'organisation OASIS en 2002.
- OASIS (Organization for the Advancement of Structured Information STandards) -> consortium mondial de standardisation protocoles basés fichiers XML
- En 2002, SAML, Shiboleth et Liberty Alliance ont fusionné pour devenir SAMLv2
- SAMLv2 basé sur notion cercle de confiance => **impose enregistrement prélable des FS (Service Provider) eet des FI (Identity Provider) par échange mutuel des métadonnées.**
- SAML définit structure des échanges des messages au format XML -> les assertions
- Protocole SOAP d'encapsulation des messages XML
- XML Signature est le protocole standard de signature des messages XML.

---

### OpenId Connect

#### Présentation

- Protocole porté par la fondation OpenId, créé en 2014.
- Standard adopté par de nombreux acteurs comme Google ou l'état français (France-Connect).
- OIDC fait appel aux notions de Relying Party (RP) et d'openID Provider (OP)
- Authorization code flow => Fourniture par OP client_id & client_secret PR
- Protocole prévoit de notifier l'utilisteur sur les données transmises => consentement.
- Couche d'identification basé sur protocole Oauth2.0 utilisant JSON en lieu et place de XML ou JWT encodé en base64 pour récupérer info. utilisateurs.
- **OIDC autorise les clients ) vérifier identité d'un utilisateur final (service REST).**

---

#### Fonctionnement détaillé

1. Application reçoit une requete sans jeton (ou invalide/expiré) => redirige utilisateur vers URL authentification OP.
2. Authentification par service OIDC.
3. Si authentificatino OK, le service OIDC fournit un code et redirige l'utilisateur vers l'application.
4. L'application présente ce code au service OIDC pour obtenir un jeton au com de l'utilisateur qui s'est connecté.
5. L'application fournit ce jeton au client qui peut maintenir le présenter dans les prochains appels.

L'application doit être connue du service d'authentification (client_id + client_secret) ainsi que l'URL de redirection pour des raisons de sécurité.

---


