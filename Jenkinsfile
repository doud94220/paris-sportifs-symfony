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
                // Démarrage du serveur Symfony en arrière-plan
                echo 'Démarrage du serveur Symfony...'
                bat 'start /B php bin/console server:run'
                
                // Démarrage du serveur Selenium Grid en arrière-plan
                echo 'Démarrage du serveur Selenium Grid...'
                bat 'start /B powershell "Start-Process -NoNewWindow -FilePath \'java.exe\' -ArgumentList \'-jar C:\\SeleniumServerGrid\\selenium-server-4.35.0.jar standalone\'"'
                
                // On patiente pour laisser les serveurs démarrer
                echo 'Attente de 10 secondes pour le dÃ©marrage des serveurs...'
                bat 'ping localhost -n 10 > nul'

                echo 'Lancement des tests PHPUnit...'
                dir('tests/LOCAL-PourJenkis') {
                    bat 'php ../../bin/phpunit --log-junit reports/junit.xml --no-interaction --colors'
                }
            }
        }

        stage('Deploy to Heroku') {
            steps {
                script {
                    echo "Déploiement en cours sur Heroku..."

                    withCredentials([usernamePassword(credentialsId: 'herok_api_key_and_login', passwordVariable: 'HEROKU_API_KEY', usernameVariable: 'HEROKU_LOGIN')]) {
                        bat 'git push https://${HEROKU_LOGIN}:${HEROKU_API_KEY}@git.heroku.com/tests-symfony-bets.git HEAD:refs/heads/main'
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