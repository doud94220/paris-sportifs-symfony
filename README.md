# paris-sportifs-symfony
Petit site sur Symfony 5 qui permet de parier sur la deuxième semaine d'un tournoi (de tennis) du grand chelem :

Les utilisateurs inscrits peuvent :
- voir la fiche de chaque joueur professionnel de tennis encore en lice dans le tournoi
- regarder le résultat des matchs terminés
- consulter le classement entre les parieurs
- parier pour les matchs à venir (s’ils respectent la deadline)

L'administrateur peut :
- insérer l'affiche des matchs à venir => cela déclenchera l'envoi d'un mail à tous les utilisateurs pour qu’ils aillent parier
- insérer le résultat des matchs
- lancer le programme d'attribution des points suite aux résultats parus

Un job sur Heroku (l’hébergeur) envoie un premier mail de relance (entre 2 et 3h) avant la deadline, et un dernier mail de relance (entre 0 et 1h) avant la deadline.
