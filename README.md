Testia entretien technique
====================================
Version Angular CLI : 14.2.3

Overview
--------
Développer une application Angular encapsulée dans de l'Electron. Créer une page comportant un formulaire où les informations suivantes sont à renseigner :
- Type de défaut (choix possibles : délaminage, porosité, inclusion) -> champs obligatoire
- Nom de l’opérateur : champs libre -> champs obligatoire et ne doit pas comporter de chiffres
- Un texte libre -> champs optionnel
- Un bouton envoyer

Les informations doivent être vérifiées avant envoi et doivent être accompagnées de la date courante


Pour utiliser le projet
--------
1. git clone
2. npm install
3. npm run start:electron


Commandes & infos utiles
--------
- npm run make : créer un distribuable
- ng extract-i18n --output-path src/locale : Extraire les textes marqués i18n pour traduire

Utilisation de la library Angular material