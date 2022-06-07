# paris-sportifs-symfony
Petit site sur Symfony 5 qui permet de parier sur la deuxième semaine d'un tournoi (de tennis) du grand chelem :

Les utilisateurs inscrits peuvent :
- voir la fiche de chaque joueur
- consuleter le classement entre les parieurs
- regarder le résultat des matchs joués
- parier pour les matchs à venir (s’ils respectent la deadline).

L'administrateur peut :
- insérer le résultat des matchs
- insérer l'affiche des matchs à venir => cela déclenchera l'envoi d'un mail à tous les utilisateurs pour qu’ils aillent parier
- lancer le programme d'attribution des points suite aux résultats parus

Un job sur Heroku (l’hébergeur) envoie un premier mail de relance (entre 3 et 4h) avant la deadline, et un dernier mail de relance (entre 0 et 1h) avant la deadline.
