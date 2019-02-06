# Infos projet

IP maquette : 192 168 1 5

Attention se connecter au bon réseau !

Si module du centre (2ème en partant du haut) est débranché :
- Le rouge et le noir a gauche te le jaune et gris a droite
- Appuyer sur le petit bouton avec un truc pointu (en haut à droite du mudule)

Pour les adresses de groupe :
- Aller sur Adresse de groupe (flèche en haut à droite ou afficher directement)
- Adresse de groupe = x/y/z
y = par fonction (ex : on va mettre 1 pour lampe)

L'ensemble des actions possibles des participants dépend de la focntoin que l'ont a mis dans le participants

On touche que à la partie Télégramme et pas à la partie Bloquer.

On va tout mettre dans des adresses de groupe différentes.
Adresse de groupes des retours d'état : sur nos lampe on aura une adresse de groupe pour envoyer des commandes (on/off) par prise et on aura une adresse pour le retour d'état pour être informé sur l'état de la lampe.

0/1/0 --> on/off Lampe 1
0/1/1 --> on/off Lampe 2
0/1/2 --> on/off Lampe 3
0/1/3 --> on off Lampe 4

0/2/0 --> Retour d'état
0/2/1 --> Retour d'état
0/2/2 --> Retour d'état
0/2/3 --> Retour d'état

0/3/0 --> Bouton
0/3/1 --> Bouton
0/3/2 --> Bouton
0/3/3 --> Bouton

FING
mdp : maquettefing1
