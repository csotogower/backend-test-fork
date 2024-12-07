pipeline {
    agent any

    enviroment {
        USERNAME = "spensiones"
    }

    stages{
        stage("instalacion de dependencias"){
            agent {
                docker {
                    image 'node:22-alpine'
                    reuseNode true;
                }

            }
            stages{
                stage("1.a. Instalar dependencias"){
                    steps{
                        sh 'npm install'
                    }
                }
                stage("1.b test - ejecuta test del proyecto"){
                    steps{
                         sh 'npm run test'
                    }
                }
                stage("1.c build - buid del proyecto"){
                    steps{
                        sh 'npm run build'
                    }
                }
               
            }
        }
          
    }
}