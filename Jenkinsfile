pipeline {
    agent any

    // Use a Windows agent
    // This is a more explicit way to tell Jenkins to use a Windows shell.
    // agent {
    //     label 'windows' // Or the label you've set for your Windows machine
    // }

    stages {
        // stage('Checkout') {
        //     steps {
        //         // Récupère le code depuis le dépôt Git
        //         git branch: 'main', url: 'https://github.com/doud94220/paris-sportifs-symfony'
        //     }
        // }

        stage('Setup') {
            steps {
                // Installe les dépendances PHP et JavaScript
                bat 'composer install --no-interaction --prefer-dist'
                // bat 'npm install'
                bat 'cd tests\\LOCAL-PourJenkis && npm install'
            }
        }

        stage('Run Test 1') {
            steps {
                // Lance le serveur Selenium (si nécessaire) et exécute les tests Selenium Web Driver
                // bat 'java -jar selenium-server-4.35.0.jar standalone'
                // bat 'start "" java -jar selenium-server-4.35.0.jar standalone'
                // bat 'start "Selenium Server" java -jar selenium-server-4.35.0.jar standalone > selenium.log 2>&1'
                // bat 'start "Selenium Server" java -jar "C:\\SeleniumServerGrid\\selenium-server-4.35.0.jar" standalone'
                bat 'start "Selenium Server" /B java -jar "C:\\SeleniumServerGrid\\selenium-server-4.35.0.jar" standalone'

                // Wait for the Selenium server to be ready
                script {
                    def maxAttempts = 60
                    def attempts = 0
                    def isReady = false

                    while (attempts < maxAttempts && !isReady) {
                        try {
                            // Check if the server is listening on port 4444
                            bat 'netstat -an | findstr ":4444.*LISTENING"'
                            println("Selenium server is up!")
                            isReady = true
                        } catch (Exception e) {
                            println("Waiting for Selenium server... Attempt ${attempts + 1}/${maxAttempts}")
                            sleep(2) // Wait for 2 seconds before retrying
                            attempts++
                        }
                    }

                    if (!isReady) {
                        error("Selenium server did not start within the given time. Check selenium.log for details.")
                    }
                }

                // Starts the Symfony web server in the background
                // bat 'start "Symfony Server" php bin/console server:start -d public -v'
                // bat 'start "Symfony Server" php bin/console server:start'
                // bat 'start "Symfony Server" php bin/console server:start --no-tls -d public'
                // bat 'start "Symfony Server" symfony serve'
                bat 'start "Symfony Server" /B symfony serve'

                // Wait for the Symfony server to be ready (e.g., on port 8000)
                script {
                    def maxAttempts = 30
                    def attempts = 0
                    def isReady = false
                    while (attempts < maxAttempts && !isReady) {
                        try {
                            bat 'netstat -an | findstr ":8000.*LISTENING"'
                            // bat 'curl --fail http://localhost:8000'
                            // powershell 'Invoke-WebRequest -Uri http://localhost:8000 -UseBasicParsing'
                            println("Symfony server is up!")
                            // println("Symfony server is up and responsive!")
                            isReady = true
                        } catch (Exception e) {
                            println("Waiting for Symfony server... Attempt ${attempts + 1}/${maxAttempts}")
                            sleep(2)
                            attempts++
                        }
                    }
                    if (!isReady) {
                        error("Symfony server did not start within the given time.")
                    }
                }

                // Utiliser le nouveau script pour attendre le serveur
                // bat 'cd tests\\LOCAL-PourJenkis && wait_for_server.bat'

                // sh 'npm install' // ou la commande qui lance vos tests (ex: npx mocha)
                // bat 'node tests\\LOCAL-PourJenkis\\S1.js'
                // bat 'mkdir reports'

                retry(2) {
                    timeout(time: 600, unit: 'SECONDS') { // Add a timeout here
                        bat 'cd tests\\LOCAL-PourJenkis && npm test'
                     }
                }
            }
        }

        stage('Report') {
            steps {
                // bat 'dir reports' // Add this line
                // Publie les résultats des tests JUnit (si vos tests génèrent un rapport XML)
                junit 'reports/junit.xml'
                // junit allowEmptyResults: true, testResults: 'reports/junit.xml'
                // junit allowEmptyResults: true, testResults: 'C:\\ProgramData\\Jenkins\\.jenkins\\workspace\\JobDoud1\\reports\\junit.xml'
            }
        }
    }

    post {
        always {
            // This step runs at the end of the pipeline, regardless of success or failure.
            // It ensures the servers are killed.
            echo 'Stopping servers...'
            bat 'taskkill /F /IM java.exe'
            bat 'taskkill /F /IM symfony.exe'
            // bat 'taskkill /F /IM node.exe'
            bat 'taskkill /F /IM node.exe || exit 0' // Add `|| exit 0` to prevent failure

        }
    }
}