pipeline {
    agent any

    stages {
        /*
            Récupérer mon code source depuis mon dépôt Git (GitHub) dans le workspace de Jenkins :
            => Pour ça, Jenkins va trouver l'URL de mon dépôt GitHub dans la configuration du pipeline du job sur l'URL
                http://localhost:8080/job/TestsAndDeploySymfonyBetsOnSpecificHerokuServerJob/configure
        */
        stage('Declarative: Checkout SCM') {
            steps {
                //Clone ou met à jour le dépôt Git qui contient ce Jenkinsfile
                checkout scm
            }
        }

        stage('Setup') {
            steps {
                echo 'Installation des dépendances Composer |><|'
                // bat 'composer install --no-interaction --prefer-dist --no-progress'

                /*
                    Exécute Composer depuis Windows (car bat = “Batch command” dans Jenkins) :
                    --no-interaction        Empêche Composer de poser des questions
                    --prefer-dist           Télécharge des archives .zip plutôt que de cloner les dépôts Git (plus rapide)
                    --no-progress           Supprime la barre de progression (inutile dans Jenkins)
                    > composer.log 2>&1     Redirige la sortie standard et les erreurs dans un fichier composer.log
                    La dernière option a été mise en place car j'avais une erreur en rouge de chargmement des logs dans Jenkins
                */
                bat 'composer install --no-interaction --prefer-dist --no-progress > composer.log 2>&1'

                //Lit le contenu du fichier composer.log et l’affiche proprement dans la sortie Jenkins
                bat 'type composer.log'
                
                echo 'Installation des dépendances npm |><|'
  
                dir('tests/LOCAL-PourJenkis') {// Change de répertoire avant de lancer NPM
                    /* 
                        Installe toutes les dépendances NPM listées dans mon package.json
                        > redirige la sortie vers un fichier npm.log
                        2>&1 y met aussi les erreurs
                    */
                    bat 'npm install > npm.log 2>&1'

                    /*
                        Lance une analyse de sécurité sur les dépendances (npm audit)
                        et corrige automatiquement les vulnérabilités sûres (celles qui ne cassent pas le code) :
                        npm audit       Vérifie la sécurité des paquets installés
                        npm audit fix   Met à jour les dépendances vulnérables, quand c’est sans danger
                        >> npm.log      Ajoute la sortie au même fichier npm.log (append, sans écraser)
                    */
                    bat 'npm audit fix >> npm.log 2>&1'

                    //Lit le fichier npm.log, et affiche tout son contenu dans la sortie standard (donc dans les logs Jenkins)
                    bat 'type npm.log'
                }
            }
        }

        stage('Run LOCAL Tests') {
            steps {
                echo 'Démarrage du serveur Symfony |><|'

                /*
                    Lance le serveur de SF :
                    bat                     Dit à Jenkins d’exécuter une commande Windows (batch)
                    /B                      "Background" : démarre le processus en arrière-plan (sans ouvrir de fenêtre)
                    php -S 127.0.0.1:8000   Démarre le SERVEUR (-S) web intégré de PHP sur l’adresse locale http://127.0.0.1:8000
                    -t public               Définit le répertoire racine du site : ici, ton dossier public/ (le dossier d’entrée d’un projet Symfony
                */
                bat 'start /B php -S 127.0.0.1:8000 -t public'

                echo 'Vérification du démarrage de Symfony |><|'

                /*
                    $status = Invoke-WebRequest -Uri http://127.0.0.1:8000 -UseBasicParsing
                    => Envoie une requête HTTP GET à http://127.0.0.1:8000 et récupère la réponse (code HTTP, contenu, etc.) dans la variable $status.” :
                    Invoke-WebRequest	            C’est la commande PowerShell pour faire des requêtes HTTP (GET, POST, etc.)
                    -Uri http://127.0.0.1:8000	    L’adresse à tester — ici mon serveur Symfony local
                    -UseBasicParsing	            Demande d’utiliser un analyseur simple (sans Internet Explorer ni Edge), utile sur Jenkins/serveur sans interface graphique
                    $status = ...	                Stocke la réponse HTTP complète dans une variable PowerShell nommée $status
                */
                powershell '''
                    $maxRetries = 10
                    $retries = 0
                    do {
                        try {
                            $status = Invoke-WebRequest -Uri http://127.0.0.1:8000 -UseBasicParsing
                            if ($status.StatusCode -eq 200) {
                                Write-Output "Symfony est prêt !"
                                exit 0
                            }
                        } catch {
                            Write-Output "Symfony pas encore prêt... ($retries/$maxRetries)"
                        }
                        Start-Sleep -Seconds 3
                        $retries++
                    } while ($retries -lt $maxRetries)

                    Write-Error "Symfony n'est pas prêt après $maxRetries tentatives"
                    exit 1
                '''

                // Démarrage du serveur Selenium Grid en arrière-plan
                echo 'Démarrage du serveur Selenium Grid |><|'

                /*
                    Lance Selenium Server Grid avec Java, en arrière-plan, sans bloquer Jenkins ni ouvrir de fenêtre.” :
                    bat	                    Exécute une commande Windows (batch) depuis Jenkins
                    start /B	            Démarre le processus en arrière-plan (background)
                    powershell	            Lance une session PowerShell
                    Start-Process	        Commande PowerShell qui lance un nouveau programme (ici java.exe)
                    -NoNewWindow	        Exécute sans ouvrir de fenêtre de console
                    -FilePath 'java.exe'	Programme à exécuter (ici Java)
                    -ArgumentList '-jar C:\\SeleniumServerGrid\\selenium-server-4.35.0.jar standalone'
                                            Arguments passés à Java : ici, il lance le fichier .jar de Selenium Server en mode standalone
                */
                bat 'start /B powershell "Start-Process -NoNewWindow -FilePath \'java.exe\' -ArgumentList \'-jar C:\\SeleniumServerGrid\\selenium-server-4.35.0.jar standalone\'"'
                
                echo 'Vérification du démarrage de Selenium |><|'

                // On boucle jusqu’à ce que Selenium réponde "ready": true
                powershell '''
                    $maxRetries = 10
                    $retries = 0
                    do {
                        try {
                            $status = Invoke-RestMethod -Uri http://localhost:4444/status -UseBasicParsing
                            if ($status.value.ready -eq $true) {
                                Write-Output "Selenium est prêt !"
                                exit 0
                            }
                        } catch {
                            Write-Output "Selenium pas encore prêt... ($retries/$maxRetries)"
                        }
                        Start-Sleep -Seconds 3
                        $retries++
                    } while ($retries -lt $maxRetries)

                    Write-Error "Selenium n'est pas prêt après $maxRetries tentatives"
                    exit 1
                '''

                echo 'Lancement des tests |><|'

                //Execution des tests et génération d'un fichier de report junit.xml
                dir('tests/LOCAL-PourJenkis') {//Va dans le dossier tests/LOCAL-PourJenkis
                    /*
                        Exécute le script npm test défini dans mon package.json :
                        "scripts": {
                                    "test": "mocha --reporter mocha-junit-reporter --reporter-options mochaFile=../../reports/junit.xml S1.js"
                                   }
                        => La suite de test S1.js va donc être éxécutée !

                        Analyse de ligne exécutée :
                        mocha	                                                C’est le framework de tests JavaScript que j'utilise. Il exécute mon script de test S1.js
                        --reporter mocha-junit-reporter	                        Indique à Mocha d’utiliser le reporter JUnit, un format standard compatible avec Jenkins
                        --reporter-options mochaFile=../../reports/junit.xml	Spécifie où sauvegarder le rapport XML généré (../../reports/junit.xml)
                        S1.js	                                                C’est ton fichier de test principal (le scénario Selenium ou fonctionnel à exécuter)
                    */
                    bat 'npm test'
                }
            }
        }

        stage('Deploy to Heroku') {
            steps {
                script {
                    echo "=== Début du déploiement sur Heroku ==="

                    withCredentials([string(credentialsId: 'HEROKU_API_KEY', variable: 'HEROKU_API_KEY')]) { //charge une clé ou un secret stocké dans Jenkins.
                        //Construit l’URL Git authentifiée pour pousser le code vers Heroku
                        //A noter que ce nouvrau dépôt n'est pas dans GitHub
                        def herokuUrl = "https://heroku:${HEROKU_API_KEY}@git.heroku.com/tests-symfony-bets.git"

                        /* Supprime le remote si jamais il existe déjà (pour éviter les doublons).
                           Et si ce remote n’existe pas (ex. premier build Jenkins), la commande échoue normalement.
                           Mais grâce à || echo Remote heroku absent, Jenkins n’interrompt pas le pipeline,
                           il affiche simplement "Remote heroku absent" et continue.
                        */
                        bat 'git remote remove heroku || echo Remote heroku absent'

                        /*Ajoute un nouveau remote nommé heroku pointant vers mon nouveau dépôt Git Heroku,
                            en utilisant ma clé API Heroku comme mot de passe.*/
                        bat "git remote add heroku https://heroku:%HEROKU_API_KEY%@git.heroku.com/tests-symfony-bets.git"

                        /*
                            Essaie de récupérer la branche main depuis le dépôt Heroku.
                            Si mon app Heroku a déjà un historique Git, il va le télécharger localement.
                            Si c’est la première fois que je déploies, cette branche peut ne pas exister.
                            'Le || echo Pas encore de branche main sur Heroku' fait la même chose que tout à l’heure :
                            Si la commande échoue (branche inexistante), Jenkins affiche un message informatif au lieu d’échouer.
                        */
                        bat 'git fetch heroku main || echo Pas encore de branche main sur Heroku'

                        //Elle force le push de ma branche actuelle (HEAD) vers la branche main du remote heroku
                        // Le -f sert à forcer le git push
                        def pushExitCode = bat(returnStatus: true, script: 'git push heroku HEAD:main -f')

                        if (pushExitCode != 0) {
                            error("❌ Échec du git push vers Heroku (code ${pushExitCode})")
                        }

                        echo "✅ Déploiement réussi sur Heroku"

                        echo "🔄 Redémarrage de l'app Heroku..."

                        /*
                            Redémarrage automatique de ton application Heroku via son API REST :
                            = Exécution d'un script PowerShell qui appelle l’API officielle de Heroku pour forcer le redémarrage des dynos (processus Heroku) 
                            = On fait à la main, en PowerShell, ce que ferait un heroku restart en ligne de commande.

                            1/ Préparation des en-têtes HTTP nécessaires à l’appel REST Heroku :
                            - Accept indique à Heroku que je veux la version 3 de son API REST
                            - Authorization	Ajoute ton token Heroku (HEROKU_API_KEY) pour authentification (type Bearer Token)

                            2/ Envoie d'une requête DELETE vers l’API pour redémarrer tous les dynos (les processus applicatifs Heroku).

                        */
                        def restartExitCode = powershell(returnStatus: true, script: """
                            \$headers = @{
                                Accept = "application/vnd.heroku+json; version=3"
                                Authorization = "Bearer ${HEROKU_API_KEY}"
                            }

                            try {
                                # Redémarrage des dynos
                                Invoke-RestMethod -Method Delete `
                                    -Uri "https://api.heroku.com/apps/tests-symfony-bets/dynos" `
                                    -Headers \$headers
                                exit 0
                            } catch {
                                Write-Output 'Erreur lors du redémarrage Heroku : ' + \$_.Exception.Message
                                exit 1
                            }
                        """)

                        if (restartExitCode == 0) {
                            echo "♻️ Redémarrage Heroku demandé, attente de disponibilité |><|"

                            // Attendre que l'app Heroku réponde sur HTTP
                            def attempt = 0
                            timeout(time: 3, unit: 'MINUTES') {
                                //Repète le bloc tant que responseCode !== "200"
                                waitUntil {
                                    attempt++
                                    /*
                                        1/ Force PowerShell à utiliser TLS 1.2 (sinon certaines connexions HTTPS échouent)
                                        2/ Envoie une requête HTTP GET vers l'app Heroku
                                        3/ Affiche le code HTTP reçu
                                        4/ Attend 5 secondes avant la prochaine tentative
                                        5/ Affiche le numéro de ma tentative et le code reçu
                                    */
                                    def responseCode = powershell(returnStdout: true, script: """
                                        try {
                                            [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
                                            \$resp = Invoke-WebRequest -Uri 'https://tests-symfony-bets-1eef0349793f.herokuapp.com/' -UseBasicParsing -TimeoutSec 5 -ErrorAction Stop
                                            Write-Output \$resp.StatusCode
                                        } catch {
                                            Write-Output "0"
                                        }
                                        Start-Sleep -Seconds 5
                                                                                              """
                                                                ).trim().readLines().last()
                                    echo "[waitUntil] Tentative #${attempt} - code reçu : ${responseCode}"

                                    // echo ">>> DEBUG responseCode brut <<<"
                                    // echo "[$responseCode]"
                                    // echo ">>> FIN DEBUG <<<"

                                    return responseCode == "200"
                                }
                            }
                            echo "[Pipeline] Sortie du waitUntil, le pipeline continue ici..."
                            echo "✅ Application Heroku disponible !"
                        }
                        else {
                                error "⚠️ Impossible de redémarrer via API, fais-le manuellement si besoin."
                        }
                    }
                }
             }
        }

        stage('Run HEROKU Tests') {
            steps {
                echo '🧪 Lancement des tests sur l’application Heroku (La PROD) |><|'

                dir('tests/LOCAL-PourJenkis') {
                    // Même tests que pour le local, mais sur l’app HEROKU déployée
                    // bat 'set BASE_URL=https://tests-symfony-bets-1eef0349793f.herokuapp.com && npm test -- --reporter-options mochaFile=../../reports/junit_heroku.xml'
                    bat 'set USE_CI=true && set BASE_URL=https://tests-symfony-bets-1eef0349793f.herokuapp.com && set SELENIUM_URL=http://localhost:4444 && npm test -- --reporter-options mochaFile=../../reports/junit_heroku.xml'
                }
            }
        }

    } //Fin des stages

    post {
        always {
            echo 'Arrêt de tous les serveurs en arrière-plan |><|'
            powershell '''
                try {
                    # Ce bloc try arrête uniquement les processus Selenium (java) sans tuer Jenkins

                    # La ligne dessous renvoie la liste de tous les processus java.exe actuellement actifs sur la machine Windows.
                    $procs = Get-Process -Name java -ErrorAction SilentlyContinue

                    foreach ($p in $procs) {
                        try {
                            if ($p.Path -like "*selenium-server*" -or $p.Path -like "*SeleniumServerGrid*") {
                                Stop-Process -Id $p.Id -Force
                                Write-Output "✅ Processus Selenium arrêté (PID: $($p.Id))"
                            } else {
                                Write-Output "⏩ Ignoré : autre process Java (PID: $($p.Id))"
                            }
                        } catch {
                            Write-Output "⚠️ Impossible d'arrêter java.exe (PID: $($p.Id))"
                        }
                    }

                    # Stop PHP si présent
                    Get-Process -Name php -ErrorAction SilentlyContinue | ForEach-Object {
                        try {
                            Stop-Process -Id $_.Id -Force
                            Write-Output "✅ Processus PHP arrêté (PID: $($_.Id))"
                        } catch {
                            Write-Output "⚠️ Impossible d'arrêter PHP (peut-être déjà arrêté)"
                        }
                    }
                } catch {
                    Write-Output "⚠️ Erreur dans l'arrêt des serveurs : $_"
                }
            '''

            echo 'Arrêt des serveurs terminé.'

            echo 'Publication des résultats des tests |><|'

            /*
            Lis le fichier reports/junit.xml, interprète-le comme un rapport de tests JUnit, et affiche les résultats dans l’interface Jenkins :
                junit	                            C’est une étape intégrée de Jenkins Pipeline pour lire des rapports de tests au format JUnit XML
                testResults: 'reports/junit.xml'	Indique le chemin du fichier XML contenant les résultats de test (celui généré par mocha-junit-reporter)
                skipPublishingChecks: true	        (Option facultative) Désactive l’intégration “GitHub Checks API”
                                                    👉 En gros, ça évite à Jenkins de publier un statut “Test passed/failed” sur GitHub
                                                    Utile si tu n’as pas besoin d’envoyer les résultats sur GitHub
            */
            junit testResults: 'reports/junit_local.xml, reports/junit_heroku.xml', skipPublishingChecks: true
        }
        success {
            echo 'Build réussi !!!'
        }   
        failure {
            echo 'Build en échec...'
        }
    }

} //Fin du pipeline