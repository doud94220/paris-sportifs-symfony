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
                        withCredentials([string(credentialsId: 'HEROKU_API_KEY', variable: 'HEROKU_API_KEY')]) {
                            def herokuUrl = "https://heroku:${HEROKU_API_KEY}@git.heroku.com/tests-symfony-bets.git"

                            // 1. Tester la connexion
                            echo "Test de connexion à Heroku..."
                            def gitExitCode = bat returnStatus: true, script: "git ls-remote ${herokuUrl} --timeout=30 --verbose"
                            echo "Code de retour de 'git ls-remote' : ${gitExitCode}"
                            if (gitExitCode != 0) {
                                error("Échec de la connexion à Heroku. Vérifiez la clé API et l'URL.")
                            }

                            // 2. Déploiement
                            echo "Déploiement en cours..."
                            def pushExitCode = bat returnStatus: true, script: "git push ${herokuUrl} HEAD:refs/heads/main --verbose"
                            echo "Code de retour de 'git push' : ${pushExitCode}"
                            if (pushExitCode != 0) {
                                error("Échec du déploiement. Voir les logs ci-dessus.")
                            }

                            // 3. Vérification du statut de l'application
                            // echo "Vérification du statut de l'application Heroku..."
                            // def herokuScaleExitCode = bat returnStatus: true, script: "heroku ps:scale web=1 --app tests-symfony-bets"
                            // echo "Code de retour de 'heroku ps:scale' : ${herokuScaleExitCode}"
                            // if (herokuScaleExitCode != 0) {
                            //     error("Échec de la commande 'heroku ps:scale'. Voir les logs ci-dessus.")
                            // }

                            // 3. Redémarrer l'application (si le CLI Heroku n'est pas disponible)
                            echo "Redémarrage de l'application Heroku..."
                            def restartExitCode = bat(returnStatus: true, script: "git commit --allow-empty -m 'Restart Heroku app' && git push ${herokuUrl} HEAD:refs/heads/main")
                            echo "Code de retour du redémarrage : ${restartExitCode}"
                            if (restartExitCode != 0) {
                                echo "Attention : Impossible de redémarrer l'application automatiquement. Veuillez le faire manuellement via le dashboard Heroku."
                            }
                        }
                    }
                    catch (Exception e) {
                        echo "❌ ERREUR : ${e.getMessage()}"
                        currentBuild.result = 'FAILURE'
                        error("Le déploiement a échoué. Voir les logs ci-dessus.")
                    }
                }
            }
        }

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