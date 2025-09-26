pipeline {
    agent any

    stages {
        stage('Declarative: Checkout SCM') {
            steps {
                checkout scm
            }
        }

        stage('Setup') {
            steps {
                echo 'Installation des dÃ©pendances Composer...'
                bat 'composer install --no-interaction --prefer-dist'
                
                echo 'Installation des dÃ©pendances npm...'
                dir('tests/LOCAL-PourJenkis') {
                    bat 'npm install'
                    bat 'npm audit fix'
                }
            }
        }

        stage('Run Tests') {
            steps {
               echo 'Démarrage du serveur Symfony...'
                bat 'start /B php -S 127.0.0.1:8000 -t public'

                echo 'Vérification du démarrage de Symfony...'
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
                echo 'Démarrage du serveur Selenium Grid...'
                bat 'start /B powershell "Start-Process -NoNewWindow -FilePath \'java.exe\' -ArgumentList \'-jar C:\\SeleniumServerGrid\\selenium-server-4.35.0.jar standalone\'"'
                
                echo 'Vérification du démarrage de Selenium...'
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

                echo 'Lancement des tests...'
                dir('tests/LOCAL-PourJenkis') {
                    bat 'npm test'
                }
            }
        }

        stage('Deploy to Heroku') {
            steps {
                script {
                    echo "=== Début du déploiement sur Heroku ==="

                    try {
                        withCredentials([usernamePassword(
                            credentialsId: 'herok_api_key_and_login',
                            passwordVariable: 'HEROKU_API_KEY',
                            usernameVariable: 'HEROKU_LOGIN'
                        )]) {
                                // 1. Afficher les variables (pour le debug)
                                echo "Heroku Login : ${HEROKU_LOGIN}"
                                echo "Heroku API Key : ${HEROKU_API_KEY}"
                                echo "Heroku API Key And Login : ${herok_api_key_and_login}" 
                                echo "URL du dépôt Heroku : git.heroku.com/tests-symfony-bets.git"

                                // 2. Vérifier la connexion au dépôt Heroku
                                def herokuUrl = "https://${HEROKU_LOGIN}:${HEROKU_API_KEY}@git.heroku.com/tests-symfony-bets.git"
                                echo "Test de connexion à Heroku..."
                                bat "git ls-remote ${herokuUrl}"  // Vérifie que le dépôt est accessible

                                // 3. Déploiement avec logs détaillés
                                echo "Déploiement en cours..."
                                bat "git push ${herokuUrl} HEAD:refs/heads/main --verbose"

                                // 4. Vérifier le statut du déploiement (optionnel)
                                echo "Vérification du statut de l'application Heroku..."
                                bat "heroku ps:scale web=1 --app tests-symfony-bets"  // Démarre une instance web
                                bat "heroku logs --tail --app tests-symfony-bets"      // Affiche les logs en temps réel (optionnel)
                            }
                        }
                        catch (Exception e) {
                            // 5. Capture et affichage de l'erreur
                            echo "❌ ERREUR lors du déploiement : ${e.getMessage()}"
                            echo "Type d'erreur : ${e.getClass()}"
                            currentBuild.result = 'FAILURE'  // Marque le build comme échoué
                            error("Le déploiement sur Heroku a échoué. Voir les logs ci-dessus.")
                        }
                }
            }
        }//Fin du stage deploy
    } //Fin des stages

    post {
       always {
            echo 'ArrÃªt de tous les serveurs en arriÃ¨re-plan...'
            script {
                try {
                    // Tenter d'arrêter les processus Java (Selenium)
                    bat "taskkill /F /IM java.exe"
                } catch (e) {
                    echo "Erreur lors de l'arrÃªt des processus java.exe : ${e.getMessage()}"
                }
                try {
                    // Tenter d'arrêter les processus PHP (Symfony)
                    bat "taskkill /F /IM php.exe"
                } catch (e) {
                    echo "Erreur lors de l'arrÃªt des processus php.exe : ${e.getMessage()}"
                }
                echo 'ArrÃªt des serveurs terminÃ©.'
            }
            // Publication des rÃ©sultats des tests
            echo 'Publication des rÃ©sultats des tests...'
            junit testResults: 'reports/junit.xml', skipPublishingChecks: true
        }
        success {
            echo 'Build rÃ©ussi !'
        }
        failure {
            echo 'Build en Ã©chec.'
        }
    }

} //Fin du pipeline