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
                // bat 'composer install --no-interaction --prefer-dist --no-progress'
                bat 'composer install --no-interaction --prefer-dist --no-progress > composer.log 2>&1'
                bat 'type composer.log'
                
                echo 'Installation des dÃ©pendances npm...'
                dir('tests/LOCAL-PourJenkis') {
                    bat 'npm install > npm.log 2>&1'
                    bat 'npm audit fix >> npm.log 2>&1'
                    bat 'type npm.log'
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

                    withCredentials([string(credentialsId: 'HEROKU_API_KEY', variable: 'HEROKU_API_KEY')]) {
                        def herokuUrl = "https://heroku:${HEROKU_API_KEY}@git.heroku.com/tests-symfony-bets.git"

                        // On s'assure que le remote existe
                        // bat "git remote remove heroku || echo 'Remote heroku absent'"
                        // bat "git remote add heroku ${herokuUrl}"

                        // Récupérer l'historique Heroku (important pour éviter les divergences)
                        // bat "git fetch heroku main || echo 'Pas encore de branche main sur Heroku'"

                        // Pousser la branche actuelle en forçant la mise à jour
                        // def pushExitCode = bat(returnStatus: true, script: "git push heroku HEAD:main -f")

                        // bat """
                        //     git remote remove heroku || echo Remote heroku absent
                        //     git remote add heroku https://heroku:%HEROKU_API_KEY%@git.heroku.com/tests-symfony-bets.git
                        //     git fetch heroku main || echo Pas encore de branche main sur Heroku
                        //     git push heroku HEAD:main -f
                        // """

                        // if (pushExitCode != 0) {
                        //     error("❌ Échec du git push vers Heroku (code ${pushExitCode})")
                        // }
                        
                        bat 'git remote remove heroku || echo Remote heroku absent'
                        bat "git remote add heroku https://heroku:%HEROKU_API_KEY%@git.heroku.com/tests-symfony-bets.git"
                        bat 'git fetch heroku main || echo Pas encore de branche main sur Heroku'

                        def pushExitCode = bat(returnStatus: true, script: 'git push heroku HEAD:main -f')

                        if (pushExitCode != 0) {
                            error("❌ Échec du git push vers Heroku (code ${pushExitCode})")
                        }

                        echo "✅ Déploiement réussi sur Heroku"

                        // Redémarrage via API (optionnel)
                        // def restartExitCode = bat(returnStatus: true, script: """
                        //     curl -X DELETE https://api.heroku.com/apps/tests-symfony-bets/dynos ^
                        //         -H "Accept: application/vnd.heroku+json; version=3" ^
                        //         -H "Authorization: Bearer ${HEROKU_API_KEY}"
                        // """)

                        // def restartExitCode = bat(returnStatus: true, script: """
                        //     curl -n -X DELETE https://api.heroku.com/apps/tests-symfony-bets/dynos -H "Accept: application/vnd.heroku+json; version=3" -H "Authorization: Bearer ${HEROKU_API_KEY}"
                        // """)

                        // def restartExitCode = powershell(returnStatus: true, script: """
                        //     curl -n -X DELETE "https://api.heroku.com/apps/tests-symfony-bets/dynos" `
                        //          -H "Accept: application/vnd.heroku+json; version=3" `
                        //          -H "Authorization: Bearer ${HEROKU_API_KEY}" `
                        //          --fail --silent --show-error
                        // """)

                        // def restartExitCode = powershell(returnStatus: true, script: """
                        //     \$headers = @{
                        //         Accept = "application/vnd.heroku+json; version=3"
                        //         Authorization = "Bearer ${HEROKU_API_KEY}"
                        //     }

                        //     try {
                        //         Invoke-RestMethod -Method Delete `
                        //             -Uri "https://api.heroku.com/apps/tests-symfony-bets/dynos" `
                        //             -Headers \$headers
                        //         exit 0
                        //     } catch {
                        //         Write-Output "Erreur lors du redémarrage Heroku : \$\$($_.Exception.Message)"
                        //         exit 1
                        //     }
                        // """)                  

                        // def restartExitCode = powershell(returnStatus: true, script: """
                        //     \$headers = @{
                        //         Accept = "application/vnd.heroku+json; version=3"
                        //         Authorization = "Bearer ${HEROKU_API_KEY}"
                        //     }

                        //     try {
                        //         # Redémarrage des dynos
                        //         Invoke-RestMethod -Method Delete `
                        //             -Uri "https://api.heroku.com/apps/tests-symfony-bets/dynos" `
                        //             -Headers \$headers

                        //         # Attente que l'app soit de nouveau UP
                        //         \$maxRetries = 12   # 12 essais
                        //         \$delaySec = 5      # 5 secondes entre chaque essai

                        //         for (\$i = 0; \$i -lt \$maxRetries; \$i++) {
                        //             Start-Sleep -Seconds \$delaySec
                        //             try {
                        //                 \$response = Invoke-RestMethod -Method Get `
                        //                     -Uri "https://tests-symfony-bets-1eef0349793f.herokuapp.com/" `
                        //                     -UseBasicParsing
                        //                 if (\$response) {
                        //                     Write-Output "App Heroku UP après \$((\$i+1)*\$delaySec) secondes"
                        //                     exit 0
                        //                 }
                        //             } catch {
                        //                 Write-Output "App non encore disponible, retry \$((\$i+1))..."
                        //             }
                        //         }

                        //         Write-Output "⚠️ Timeout, l'app Heroku n'a pas redémarré à temps"
                        //         exit 1

                        //     } catch {
                        //         Write-Output "Erreur lors du redémarrage Heroku : \$\$($_.Exception.Message)"
                        //         exit 1
                        //     }
                        // """)      

                        // if (restartExitCode == 0) {
                        //     echo "♻️ Redémarrage Heroku réussi"
                        // } else {
                        //     echo "⚠️ Impossible de redémarrer via API, fais-le manuellement si besoin"
                        // }

                        echo "🔄 Redémarrage de l'app Heroku..."

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
                            echo "♻️ Redémarrage Heroku demandé, attente de disponibilité..."

                            // Attendre que l'app Heroku réponde sur HTTP
                            def attempt = 0
                            timeout(time: 3, unit: 'MINUTES') {
                                waitUntil {
                                    attempt++
                                    def responseCode = powershell(returnStdout: true, script: """
                                        try {
                                            \$resp = Invoke-WebRequest -Uri 'https://tests-symfony-bets-1eef0349793f.herokuapp.com/' -UseBasicParsing -TimeoutSec 5 -ErrorAction Stop
                                            Write-Output \$resp.StatusCode
                                        } catch {
                                            Write-Output "0"
                                        }
                                        Start-Sleep -Seconds 5
                                                                                              """
                                                                ).trim().readLines().last()
                                    echo "[waitUntil] Tentative #${attempt} - code reçu : ${responseCode}"

                                    echo ">>> DEBUG responseCode brut <<<"
                                    echo "[$responseCode]"
                                    echo ">>> FIN DEBUG <<<"

                                    return responseCode == "200"
                                }
                            }
                            echo "[Pipeline] Sorti du waitUntil, le pipeline continue ici..."
                            echo "✅ Application Heroku disponible !"
                        }
                        else {
                                error "⚠️ Impossible de redémarrer via API, fais-le manuellement si besoin."
                        }
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