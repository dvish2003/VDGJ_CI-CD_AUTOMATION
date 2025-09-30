pipeline {
    agent any
    
    stages {
        stage('SCM Checkout') {
            steps {
                retry(3) {
                git branch: 'main', url: 'https://github.com/dvish2003/VDGJ_CI-CD_AUTOMATION.git'
                }
            }
        }
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t dvish2003/nodeapp-cuban:${BUILD_NUMBER} .'
            }
        }
        stage('Login to Docker Hub') {
            steps {
                withCredentials([string(credentialsId: 'dockerhubpasswordnew', variable: 'dockerpw')]) {
                    script {
                        sh "docker login -u dvish2003 -p '${dockerpw}'"
                    }
                }
            }
        }
        stage('Push Image') {
            steps {
                sh "docker push dvish2003/nodeapp-cuban:${BUILD_NUMBER}"
            }
        }
    }
    post {
        always {
            sh 'docker logout'
        }
    }
}