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
                echo 'Clearing npm cache...'
                bat 'npm cache clean --force'
                bat 'cd tests\\LOCAL-PourJenkis && npm install'
            }
        }

        stage('Run Test 1') {
            steps {
                echo 'Starting servers...'
                // bat 'start_servers.bat'
                // bat "\"${pwd()}\\start_servers.bat\""
                // bat 'C:\\ProgramData\\Jenkins\\.jenkins\\workspace\\JobDoud1\\tests\\LOCAL-PourJenkis\\start_servers.bat'
                // Lancez les serveurs en arrière-plan
                bat 'start /B java -jar "C:\\SeleniumServerGrid\\selenium-server-4.35.0.jar" standalone'
                bat 'start /B php -S 127.0.0.1:8000 -t public'

                // Lance le serveur Selenium (si nécessaire) et exécute les tests Selenium Web Driver
                // bat 'java -jar selenium-server-4.35.0.jar standalone'
                // bat 'start "" java -jar selenium-server-4.35.0.jar standalone'
                // bat 'start "Selenium Server" java -jar selenium-server-4.35.0.jar standalone > selenium.log 2>&1'
                // bat 'start "Selenium Server" java -jar "C:\\SeleniumServerGrid\\selenium-server-4.35.0.jar" standalone'
                // bat 'start "Selenium Server" /B java -jar "C:\\SeleniumServerGrid\\selenium-server-4.35.0.jar" standalone'

                // Wait for the Selenium server to be ready
                // script {
                //     def maxAttempts = 60
                //     def attempts = 1
                //     // def serverIsUp = false

                //     while (attempts < maxAttempts) {

                //             try{
                //                 // Check if the server is listening on port 4444
                //                 // bat 'netstat -an | findstr ":4444.*LISTENING"'
                //                 bat 'netstat -an | findstr ":4444.*LISTENING"'
                //                 echo 'Selenium server is up!'
                //                 // serverIsUp = true
                //                 break
                //                 }
                //                 catch(Exception e)
                //                 {
                //                     echo "Waiting for Selenium server... Attempt ${attempt}/${maxAttempts}"
                //                     sleep 2
                //                     attempt++
                //                 } 
                //     }

                //     if (attempt > maxAttempts) {
                //         error('Selenium server did not start in time.')
                //     }
                // }

                // Starts the Symfony web server in the background
                // bat 'start "Symfony Server" php bin/console server:start -d public -v'
                // bat 'start "Symfony Server" php bin/console server:start'
                // bat 'start "Symfony Server" php bin/console server:start --no-tls -d public'
                // bat 'start "Symfony Server" symfony serve'
                // bat 'start "Symfony Server" /B symfony serve'

                // Wait for the Symfony server to be ready (e.g., on port 8000)
                // script {
                //     def maxAttempts = 30
                //     def attempts = 1
                //     // def serverIsUp = false

                //     while (attempts < maxAttempts) {
                //             // bat 'netstat -an | findstr ":8000.*LISTENING"'
                //             try{
                //                 bat 'netstat -an | findstr ":8000.*LISTENING"'
                //                 // bat 'curl --fail http://localhost:8000'
                //                 // powershell 'Invoke-WebRequest -Uri http://localhost:8000 -UseBasicParsing'
                //                 // println("Symfony server is up!")
                //                 // println("Symfony server is up and responsive!")
                //                 echo 'Symfony server is up!'
                //                 // serverIsUp = true
                //                 break
                //                 }
                //                 catch (Exception e) {
                //                     echo "Waiting for Symfony server... Attempt ${attempt}/${maxAttempts}"
                //                     sleep 2
                //                     attempt++
                //                 }
                //     }

                //     if (attempt > maxAttempts) {
                //         error('Symfony server did not start in time.')
                //     }

                //     // if (!serverIsUp) {
                //     //     error('Symfony server did not start in time.')
                //     // }
               
                // }

                // Utiliser le nouveau script pour attendre le serveur
                // bat 'cd tests\\LOCAL-PourJenkis && wait_for_server.bat'

                // sh 'npm install' // ou la commande qui lance vos tests (ex: npx mocha)
                // bat 'node tests\\LOCAL-PourJenkis\\S1.js'
                // bat 'mkdir reports'

                echo 'Waiting for servers to be up...'
                timeout(time: 120, unit: 'SECONDS') {
                    waitUntil {
                        script {
                            def seleniumIsUp = false
                            try {
                                // bat 'netstat -an | findstr ":4444.*LISTENING"'
                                bat 'curl --fail http://localhost:4444/status'
                                seleniumIsUp = true
                            } catch (e) {
                                echo 'Selenium server not ready yet.'
                            }
                            
                            def symfonyIsUp = false
                            try {
                                bat 'netstat -an | findstr ":8000.*LISTENING"'
                                symfonyIsUp = true
                            } catch (e) {
                                echo 'Symfony server not ready yet.'
                            }
                            
                            return seleniumIsUp && symfonyIsUp
                        }
                    }
                }

                echo 'Running tests...'

                // retry(2) {
                    // Add a timeout for the npm test command
                    timeout(time: 120, unit: 'SECONDS') {
                        bat 'cd tests\\LOCAL-PourJenkis && npm test'
                    }
                // }
            }
        }

        stage('Report') {
            steps {
                echo 'Publishing test report...'
                // bat 'dir reports' // Add this line
                // Publie les résultats des tests JUnit (si vos tests génèrent un rapport XML)
                // junit 'reports/junit.xml'
                junit testResults: 'reports/junit.xml', skipPublishingChecks: true
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

            echo 'Stop java server...'
            bat 'taskkill /F /IM java.exe || exit 0'

            // bat 'taskkill /F /IM symfony.exe'
            echo 'Stop PHP server...'
            bat 'taskkill /F /IM php.exe || exit 0'

            // bat 'taskkill /F /IM node.exe'
            echo 'Stop Node server...'
            bat 'taskkill /F /IM node.exe || exit 0' // Add `|| exit 0` to prevent failure

        }
    }
}