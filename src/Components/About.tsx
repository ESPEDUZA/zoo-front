import React from "react";

const About = () => {
  return (
    <div>
      <h2>À propos</h2>
      <p>
        Bienvenue sur notre gestionnaire de zoo ! Notre application permet de
        gérer les différents espaces, les animaux, les employés, les billets et
        les statistiques liées à notre magnifique zoo.
      </p>
      <h3>Gestion des espaces</h3>
      <p>
        Notre système permet de créer, lire, mettre à jour et supprimer des
        espaces du zoo. Chaque espace est caractérisé par son nom, sa
        description, des images, son type, sa capacité, sa durée de visite, ses
        horaires d'ouverture et s'il est accessible aux personnes handicapées.
      </p>
      <h3>Gestion des animaux par espaces</h3>
      <p>
        Les animaux peuvent être attribués à différents espaces. Un vétérinaire
        est responsable de tenir à jour un carnet de suivi des traitements des
        animaux.
      </p>
      <h3>Gestion hebdomadaire des employés</h3>
      <p>
        Pour assurer le bon fonctionnement du zoo, il doit y avoir au moins un
        employé à l'accueil, un soigneur, un agent d'entretien et un vendeur.
        Notre système garantit une gestion efficace des employés pour chaque
        semaine.
      </p>
      <h3>Gestion des billets</h3>
      <p>
        Les visiteurs peuvent acheter différents types de PASS pour accéder aux
        espaces du zoo. L'API valide les billets et contrôle l'accès à chaque
        espace. Certains billets permettent également l'accès à des espaces
        spécifiques selon un ordre prédéfini.
      </p>
      <h3>Statistiques</h3>
      <p>
        Nous fournissons des statistiques quotidiennes et hebdomadaires pour
        mettre en évidence l'affluence du zoo ainsi que le taux de fréquentation
        en temps réel des espaces.
      </p>
      <h3>Ouverture nocturne</h3>
      <p>
        Les administrateurs ont la possibilité d'activer l'ouverture nocturne du
        zoo avec le PASS Night.
      </p>
      <h3>Authentification</h3>
      <p>
        L'accès à l'API nécessite un compte d'employé. Seuls les employés sont
        autorisés à effectuer des actions dans le parc.
      </p>
    </div>
  );
};

export default About;
